{{--
  Template Name: Packing List
--}}

@extends('layouts.lists')

@php
  $post_id = get_the_ID();
  do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');

// Get order data!
  $query = new WC_Order_Query( array(  
      'limit' => -1,
      // 'orderby' => 'name',
      // 'order' => 'asc',
      'status' => 'processing',
  ) );
  $results = $query->get_orders();

//Create filtered list of orders based on the date selected on list page.
  $filtered_orders = array();

  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->get_id();
    $order_pickup_date = $daily_results->get_meta('pickup_date');
          
    if ($order_pickup_date === $date_selector_date) {
      $filtered_orders[] = $daily_results;
    }
  }

//THIS IS NOT FUTURE PROOF. INSTEAD OF MANUAL IDS BELOW, PUT AN OPTION IN THE CATEGORY FOR FREEZER, SHELF, OR COOLER.
//THEN GET ALL CATEGORIES (ONCE). USE LIST TYPE (SHELF/COOLER/FREEZER) TO ONLY QUERY APPROPRIATE PRODUCTS THE FIREST TIME AROUND.

    $shelf_list = array( '91, 83, 52, 104, 13, 105, 103, 135, 94, 102, 106, 54, 10, 67' );
    $shelf_list_slugs = array('buns-pretzels', 'bread', 'cookies', 'sweet-buns', 'patisserie', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'gluten-free-baked-goods', 'preserves-spreads-honey', 'sauces-dressings');
    
    $shelf_args = array(
      'status' => 'publish',
      'category' => $shelf_list_slugs,
      'limit' => -1,
      'return' => 'ids'
      // 'exclude' => array(  )   Add array of products that have meta 'cooler'
    );
    $shelf_array = wc_get_products( $shelf_args );
    
    $cooler_list = '22,53,51,104,107';
    $cooler_list_slugs = array('cakes', 'pies-flans', 'dips-salsa', 'individual-pastries');

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
  <div class="row no-gutters">
    <div class="col-12">      
      <table id="lists" class="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timeslot</th>
            <th>Customer</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
            @foreach ($filtered_orders as $details )
            @php 
              $daily_order_number++;
              $phone = $details->get_billing_phone();
              $order_id = $details->get_id();
              $first_name = $details->get_billing_first_name();
              $last_name = $details->get_billing_last_name();
              $status = $details->get_status();
              $customer_note = $details->get_customer_note();
              $timeslot = $details->get_meta( 'pickup_timeslot', true );
              $location = $details->get_meta( 'pickuplocation', true );
            @endphp     

              <tr class="pack {{ $status }}">
                <td class="id">#{{ $daily_order_number }}</td>
                <td class="timeslot"><p>{{ $timeslot }}</p></td>
                <td> 
                  <strong>{{ $last_name }}, {{ $first_name }}</strong>
                  <p>{{ $phone }}</p>
                  <p class="location">{{ $location }}</p>          
                  <span class="notes">{{ $customer_note }}</span>
                </td>
                <td class="details_table">
                  <table>
                    @foreach ($details->get_items() as $item_id => $item)
                      @php 
                        $prod_id = $item->get_product_id(); 
                        $prod_name = $item->get_name();
                        $prod_quantity = $item->get_quantity();              
                        $sliced_meta = $item->get_meta( 'Sliced Option', true );
                        $cooler_override = $item->get_meta( '_cooler', true );
                        $product_meta_objects = $item->get_meta_data();              
                      
                      @endphp
                                                          
                      @if(in_array($prod_id, $pickup_list_selection)) {{-- check to see if product is in cooler or shelf array --}}
                        <tr>
                          <td width="10%"><span class="qty">{{ $prod_quantity }} </span></td>
                          <td width="40%"><span class="prod_name">{{ $prod_name }}</span></td>
                          <td width="50%">
                            @foreach ( $product_meta_objects as $meta )
                              <span class="@php print_r($meta->key); @endphp meta"> @php print_r($meta->value);@endphp</span>
                            @endforeach
                          </td>               
                        </tr>            
                      @else
                        @php $response = "<h6>More items in ". $other_list . " List!</h6>"; @endphp
                      @endif                        
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
  </div>
@endsection