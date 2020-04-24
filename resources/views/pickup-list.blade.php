{{--
  Template Name: Pickup List
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

  $results = $woocommerce->get('orders', array( 'status' => 'processing'));

  // All products
    $products = $woocommerce->get('products');

  // Cooler Products (Full objects)
    $products_cooler = $woocommerce->get('products', array('status' => 'publish', 'category'=>'22,53,51', 'per_page'=> '100'));
  
  // Cooler Product ID Array
    $prefix = $cooler_array = '';
    foreach ($products_cooler as $cooler_item) 
    {
      $cooler_ids = $cooler_item->id;
      $cooler_array .= $prefix . '' . $cooler_ids . '';
      $prefix = ', ';
    }
    $cooler_array=explode(",",$cooler_array);

  // Shelf Products (Full objects)
    $shelf_categories = $woocommerce->get('products/categories', array('exclude'=>'22,53,51')); //get category ids so we can make a new list with the cooler excluded (because api doesn't have "category_exclude" on product level)
    $prefix = $shelf_list = ''; // prevent trailing commas
    foreach ($shelf_categories as $shelf_category)
    {
      $shelf_category_ids = $shelf_category->id;
      $shelf_list .= $prefix . '' . $shelf_category_ids . ''; 
      $prefix = ', ';
    }
    $products_shelf = $woocommerce->get('products', array('status' => 'publish', 'category'=>''.$shelf_list.'', 'per_page'=> '100'));
  // Shelf Product ID Array
    $prefix = $shelf_array = '';
    foreach ($products_shelf as $shelf_item) 
    {
      $shelf_ids = $shelf_item->id;
      $shelf_array .= $prefix . '' . $shelf_ids . '';
      $prefix = ', ';
    }
    $shelf_array=explode(",",$shelf_array);

  // Set current list selection based on ACF field
    if($list_type === "shelf")
    {
      $pickup_list_selection = $shelf_array;
      $other_list = "Cooler";
    }
    else
    {
      $pickup_list_selection = $cooler_array;
      $other_list = "Shelf";
    }
    $daily_order_number = 100;

@endphp
@section('content')
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <table id="lists" class="display" data-order='[[ 1, "asc" ]]'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>  
            @foreach ($results as $details )
              @php 
              $daily_order_number++;
              $phone = $details->billing->phone;
              $phone_formatted = substr($phone, -10, -7) . "-" . substr($phone, -7, -4) . "-" . substr($phone, -4); @endphp
              <tr>
                <td> #{{ $daily_order_number }}</td>
                <td class="name"><strong>{{ $details->billing->last_name }}, {{ $details->billing->first_name }}</strong></td>
                <td class="phone">{{ $phone_formatted }}</td>
                <td class="location">
                  @php
                  // Check to see if the products associated with the order are shelf or cooler.     
                  $responses = array();
                  foreach($details->line_items as $item) {
                  
                    $prod_id = $item->product_id; 

                    if(in_array($prod_id, $cooler_array)) {
                      $responses[] = "Cooler";    
                    }               
                    else { 
                      $responses[] = "Shelf";
                    }                    
                  }
                  $responses_unique = array_unique($responses);
                  $order_location = implode(" & ", $responses_unique);

                @endphp
                {{ $order_location }}
                </td>
                <td class="notes">{{ $details->customer_note }}</td>
              </tr>        
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
  </div>
@endsection