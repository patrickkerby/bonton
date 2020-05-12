{{--
  Template Name: Packing List
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

  $results = $woocommerce->get('orders', array( 'status' => array('processing')));
  $customers = $woocommerce->get('customers');
  
  // All products
    // $products = $woocommerce->get('products');

  // Cooler Products (Full objects)
  // Warning! as we add multiple categories to products, it may mess with the cooler vs. shelf categorization
    $products_cooler = $woocommerce->get('products', array('status' => 'publish', 'category'=>'22,53,51,84,104', 'per_page'=> '100'));
  
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
    $shelf_categories = $woocommerce->get('products/categories', array('exclude'=>'22,53,51,84,104')); //get category ids so we can make a new list with the cooler excluded (because api doesn't have "category_exclude" on product level)
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
<div class="row no-gutters">
  <table id="lists" class="display">
    <thead>
      <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Order Details</th>
      </tr>
    </thead>
    <tbody>
    @foreach ($results as $details )
    @php 
      $daily_order_number++;
      $phone = $details->billing->phone;
      $phone_formatted = substr($phone, -10, -7) . "-" . substr($phone, -7, -4) . "-" . substr($phone, -4); 
      $order_id = $details->id;

    @endphp
      <tr class="pack {{ $details->status }}">
        <td class="id">#{{ $daily_order_number }}</td>
        <td> 
          <strong>{{ $details->billing->last_name }}, {{ $details->billing->first_name }}</strong>
          <p>{{ $phone_formatted }}</p>
          <span class="notes">{{ $details->customer_note }}</span>
        </td>
        <td class="details_table">
          <table>
          @foreach ($details->line_items as $item)
            @php 
              // Use the Order Line Items product IDs to grab details for the /products table
              $prod_id = $item->product_id; 

              // check to see if product is in cooler or shelf array
              if(in_array($prod_id, $pickup_list_selection)) {
                                
                $product = $woocommerce->get('products/'.$prod_id.'');            
                $product_meta_objects = $product->meta_data;
                $approved_array = array(
                    'availability',
                    'Sliced?',
                    'cooler'
                );
                $product_meta_arr = array(); // new list to store data that we can pull from 
              
                foreach ($product_meta_objects as $product_meta) {
                  if (!in_array($product_meta->key, $approved_array)) {
                      continue;
                  }
                  $product_meta_arr[$product_meta->key] = $product_meta->value;
                }
                
                $availability = ($product_meta_arr['availability']);
                
                if (array_key_exists("Sliced?",$product_meta_arr)) {
                  $sliced_option = ($product_meta_arr['Sliced?']);
                }
                
                //Although the cooler products are already identified via category, this will pull in any exceptions via ACF field in the admin screen
                if (array_key_exists("cooler",$product_meta_arr)) {
                  $cooler_storage = ($product_meta_arr['cooler']);          
                }
                
                // Display Availability Array as a comma separated list
                $prefix = $availability_list = ''; // prevent trailing commas
                foreach ($availability as $day) {
                    $availability_list .= $prefix . '' . $day . ''; 
                    $prefix = ', ';
                } 
              
              @endphp
              
                <tr>
                  <td><span class="qty">{{ $item->quantity }}</span></td>
                  <td><span class="prod_name">{{ $product->name }}</span></td>
                  <td>
                    @foreach ( $item->meta_data as $meta )
                      <span class="{{ $meta->key }} meta">{{ $meta->value }}</span>
                    @endforeach  
                  </td>               
                </tr>
              
              @php 
                        
              }
              else { 
                $response = "<h6>More items in ". $other_list . " List!</h6>";
              }                          
              
              @endphp
              
          @endforeach
        </table>
        @isset($response)
          {!! $response !!}    
        @endisset
        
      </td>
      </tr>
    @endforeach
    </tbody>
  </table>
</div>

@endsection