{{--
  Template Name: Packing List
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
    
////THIS IS NOT FUTURE PROOF. INSTEAD OF MANUAL IDS BELOW, PUT AN OPTION IN THE CATEGORY FOR FREEZER, SHELF, OR COOLER.
////THEN GET ALL CATEGORIES (ONCE). USE LIST TYPE (SHELF/COOLER/FREEZER) TO ONLY QUERY APPROPRIATE PRODUCTS THE FIREST TIME AROUND.

    $shelf_list = array( '91, 83, 52, 104, 13, 105, 103, 135, 94, 102, 106, 54, 10, 67' );
    $shelf_list_slugs = array('buns-pretzels', 'bread', 'cookies', 'sweet-buns', 'patisserie', 'granola-crackers-nuts', 'individual-pastries', 'coffee-ice-cream', 'flours-flatbreads', 'gluten-free-baked-goods', 'preserves-spreads-honey', 'sauces-dressings');
    
    $shelf_args = array(
      'status' => 'publish',
      'category' => $shelf_list_slugs,
      'limit' => -1,
      'return' => 'ids'
    );
    $shelf_array = wc_get_products( $shelf_args );
    
    $cooler_list = '22,53,51,84,104,107';
    $cooler_list_slugs = array('cakes', 'pies-flans', 'dips-salsa');
    
    $cooler_args = array(
      'status' => 'publish',
      'category' => $cooler_list_slugs,
      'limit' => -1,
      'return' => 'ids'
    );
    $cooler_array = wc_get_products( $cooler_args );

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
  <h2>{{ $date_selector_date }}</h2>
  <table id="lists" class="display">
    <thead>
      <tr>
        <th>ID</th>
        <th>Timeslot</th>
        <th>Location</th>
        <th>Customer</th>
        <th>Order Details</th>
      </tr>
    </thead>
    <tbody>
    @foreach ($filtered_orders as $details )
    @php 

      $daily_order_number++;
      $phone = $details->billing->phone;
      $phone_formatted = substr($phone, -10, -7) . "-" . substr($phone, -7, -4) . "-" . substr($phone, -4); 
      $order_id = $details->id;

    @endphp     

      <tr class="pack {{ $details->status }}">
        <td class="id">#{{ $daily_order_number }}</td>
        <td class="timeslot"><p>{{ $order_meta_arr['pickup_timeslot'] }}</p></td>
        <td class="location"><p>{{ $order_meta_arr['pickuplocation'] }}</p></td>
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
                                
                // $product = $woocommerce->get('products/'.$prod_id.'');            
                $product_meta_objects = $item->meta_data;
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
                  <td><span class="prod_name">{{ $item->name }}</span></td>
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