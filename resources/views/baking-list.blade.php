{{--
  Template Name: Baking List
--}}

@extends('layouts.lists')

@php
use Automattic\WooCommerce\Client;
use Automattic\WooCommerce\HttpClient\HttpClientException;

$woocommerce = new Client(
        'https://bonton.workwithrye.ca', // Your store URL
				'ck_a89cb8cd00b36072147bb5da86a500e16dc283d6', // Your consumer key
				'cs_23e8504fe5f51b21b7385f1bc2e9c5b58f919d16', // Your consumer secret
				[
						'wp_api' => true, // Enable the WP REST API integration
						'version' => 'wc/v3',
						'verify_ssl' => false
				]
		);

  $query = [
      'date_min' => '2020-04-15',
      'date_max' => '2020-04-15'
  ];
  $sales = $woocommerce->get('reports/top_sellers', $query);

  $order_query = [
    'status' => 'processing',
    'after' => '2020-04-10T00:00:00',
    'before' => '2020-09-23T23:59:59',
    'per_page'=> '100'
  ];
  
  $results = $woocommerce->get('orders', $order_query);
  
  foreach($results as $details) {

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