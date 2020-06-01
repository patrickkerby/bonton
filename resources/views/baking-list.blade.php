{{--
  Template Name: Baking List
--}}

@extends('layouts.lists')

@php
$post_id = get_the_ID();
do_action( 'acf/save_post', $post_id );

use Automattic\WooCommerce\Client;
use Automattic\WooCommerce\HttpClient\HttpClientException;

$site_url = home_url();
$date_selector_date = get_field('pickup_date');

  $woocommerce = new Client(
      $site_url, // Your store URL
      'ck_a89cb8cd00b36072147bb5da86a500e16dc283d6', // Your consumer key
      'cs_23e8504fe5f51b21b7385f1bc2e9c5b58f919d16', // Your consumer secret
      [
          'wp_api' => true, // Enable the WP REST API integration
          'version' => 'wc/v3',
          'verify_ssl' => false
      ]
  );

  $results = $woocommerce->get('orders', array( 'status' => array('processing')));  
  $filtered_orders = array();

  // Get date of each order, create array of only those arrays with meta value that matches the ACF variable
  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->id;
    $meta = $daily_results->meta_data;
      
    $approved_array = array(
      'pickuplocation',
      'pickup_date',
      'pickup_timeslot'
    );

    $order_meta_arr = array(); // new list to store data that we can pull from 

    foreach ($meta as $order_meta) {
      if (!in_array($order_meta->key, $approved_array)) {
            continue;
        }
        $order_meta_arr[$order_meta->key] = $order_meta->value;
    }
    
    if ($order_meta_arr['pickup_date'] === $date_selector_date) {
      $filtered_orders[] = $daily_results;
    }    
  }
  
  
  
  foreach($filtered_orders as $details) {

    foreach($details->line_items as $item) {

      $prod_id = $item->product_id; 
      $variation_id = $item->variation_id; 
      
      $product = $woocommerce->get('products/'.$prod_id.'');
      $categories = $product->categories;
      
      $prefix = $cat_array = '';
      foreach ($categories as $cat_item) 
      {
        $cat_names = $cat_item->name;
        $cat_array .= $prefix . '' . $cat_names . '';
        $prefix = ', ';
      }
            
      if (empty($variation_id)) {        
        $prod[] = array('name' => $product->name, 'quantity' => $item->quantity, 'category' => $cat_array); 
      }
      else {
        $variations = $woocommerce->get('products/'.$prod_id.'/variations/'.$variation_id.'');
        $variation_attributes = $variations->attributes;

        foreach($variation_attributes as $variation) {
          $variation_array = array_column($variation_attributes, 'option');          
          $variation_list = implode(' - ', $variation_array);
        }
        $prod[] = array('name' => $product->name ." - " .$variation_list , 'quantity' => $item->quantity, 'category' => $cat_array); 
      }
    }
  }

  // extract the values name and quantity, compare for matches, sum up matched, then output unique with total sums as new array
  $aSortedArray = array();
  foreach ($prod as $aArray) {
    $bSet = false;
    foreach ($aSortedArray as $iPos => $aTempSortedArray) {
      if($aTempSortedArray['name'] == $aArray['name']) {
        $aSortedArray[$iPos]['quantity'] += $aArray['quantity'];
        $bSet = true;
      }
    }
    if(!$bSet) {
      $aSortedArray[] = array(
        'name' => $aArray['name'], 
        'quantity' => $aArray['quantity'],
        'category' => $aArray['category']
        );
    }
  }

  // Item quantity (ex: 1/2 dozen buns would be 6 buns)
  function itemQuantity($name) {
    if(strpos($name, "- Dozen") !== false){
      return 12;
    } 
    elseif(strpos($name, "1/2 Dozen") !== false){
      return 6;
    }
    else{
      return 1;
    }
  }

  @endphp
  @section('content')

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10">
        @php
        acf_form(array(
          'submit_value' => __('Choose Date', 'acf'),
          'fields' => array(
              'pickup_date',
          ),
          'return' => '%post_url%',
          'updated_message' => false,
        ));
        @endphp
      </div>
    </div>
  <div class="row no-gutters">
    <table id="lists" class="display">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Pkg. Quantity</th>
          <th>Total Items</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($aSortedArray as $item )
          @php 
            $name = $item['name'];
            $category = $item['category'];
            $quantity = $item['quantity'];                      
            $item_quantity = call_user_func('itemQuantity', $name);
            $total_items = $item_quantity * $quantity;  
          @endphp
          <tr>
            <td>{{ $name }}</td>
            <td>{{ $category }}</td>
            <td>{{ $quantity }}</td>
            <td>{{ $total_items }}</td>
          </tr>
        @endforeach
      </tbody>
    </table>
  </div>

@endsection