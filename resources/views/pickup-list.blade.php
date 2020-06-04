{{--
  Template Name: Pickup List
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

    $daily_order_number = 100;
@endphp

@section('content')
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
            <tr>
              <td>{{ $daily_order_number }}</td>
              <td class="name"><strong>{{ $last_name }}, {{ $first_name }}</strong></td>
              <td class="phone">{{ $phone }}</td>
              <td class="location">                  
                {{-- Check to see if the products associated with the order are shelf or cooler.      --}}
                @php $responses = array(); @endphp
                @foreach ($details->get_items() as $item_id => $item)
                  @php 
                    $prod_id = $item->get_product_id(); 
                    $cooler_override = $item->get_meta( '_cooler', true );
                                      
                    if(in_array($prod_id, $cooler_array)) {
                      $responses[] = '<span class="order_location">C</span>';    
                    } 
                    // Add elseif for freezer list        
                    else {  
                      $responses[] = '<span class="order_location">S</span>';
                    }                    
                  @endphp
                @endforeach
                @php
                  $responses_unique = array_unique($responses);
                  $order_location = implode("", $responses_unique);
                @endphp
                {!! $order_location !!}
              </td>
              <td class="notes">{{ $customer_note }}</td>
            </tr>        
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
@endsection