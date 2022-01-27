{{--
  Template Name: Store To Door Export
--}}

@extends('layouts.lists')

@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');
  $is_packing_list = false;

// Get order data!
  $query = new WC_Order_Query( array(  
      'limit' => -1,
      // 'orderby' => 'name',
      // 'order' => 'asc',
      'status' => array('wc-processing', 'wc-completed'),
      'pickup_date' => $date_selector_date,

  ) );
  $results = $query->get_orders();

//Create filtered list of orders based on the date selected on list page.
  $filtered_orders = array();

  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->get_id();
    $order_pickup_date = $daily_results->get_meta('pickup_date');
    $shipping_method = $daily_results->get_shipping_methods();
    // var_dump($shipping_method);
    

    if ($order_pickup_date === $date_selector_date && $daily_results->has_shipping_method('flat_rate')) {
      $filtered_orders[] = $daily_results;
    }
  }

  // Sort the packing list by timeslot
  $sorted_orders = array(); 
  foreach ($filtered_orders as $order) {
    $timeslot = $order->get_meta( 'pickup_timeslot', true );
    
    $sorted_orders[] = $timeslot; //any object field
  }

  array_multisort($sorted_orders, SORT_DESC, $filtered_orders);


  //THIS IS NOT FUTURE PROOF. INSTEAD OF MANUAL IDS BELOW, PUT AN OPTION IN THE CATEGORY FOR FREEZER, SHELF, OR COOLER.
  //THEN GET ALL CATEGORIES (ONCE). USE LIST TYPE (SHELF/COOLER/FREEZER) TO ONLY QUERY APPROPRIATE PRODUCTS THE FIREST TIME AROUND.

  //Cooler List
    $cooler_list = array(  '22', '53', '51','107','103' );
    $cooler_list_slugs = array('cakes', 'pies-flans', 'dips-salsa', 'individual-pastries', 'gluten-free-baked-goods');

  // Shelf List
    $shelf_list = array( '91, 83, 52, 104, 13, 105, 135, 94, 102, 106, 54, 10, 67, 285, 289, 662 ' );
    $shelf_list_slugs = array('buns-bagels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'preserves-spreads-honey', 'sauces-dressings', 'treats-and-ice-cream', 'general-grocery', 'baking-ingredients', 'savoury-treats');

    //Product pages give an option to override the natural category and assign the product as cooler. Add to cooler array:
    $cooler_override_args = array(
      'status' => 'publish',
      'cooler' => '1',
      'return' => 'ids',
      'limit' => '-1'
    );
    $cooler_overrides = wc_get_products( $cooler_override_args );

    //Product pages give an option to override the natural category and assign the product as shelf. Add to shelf array:
    $shelf_override_args = array(
      'status' => 'publish',
      'shelf' => '1',
      'return' => 'ids',
      'limit' => '-1'
    );
    $shelf_overrides = wc_get_products( $shelf_override_args );

    $cooler_args = array(
      'status' => 'publish',
      'category' => $cooler_list_slugs,
      'limit' => -1,
      'return' => 'ids',
      'exclude' => $shelf_overrides
    );
    $cooler_array = wc_get_products( $cooler_args );
    $cooler_array = array_merge($cooler_array,$cooler_overrides);

    $shelf_args = array(
      'status' => 'publish',
      'category' => $shelf_list_slugs,
      'limit' => -1,
      'return' => 'ids',
      'exclude' => $cooler_overrides
    );
    $shelf_array = wc_get_products( $shelf_args );
    $shelf_array = array_merge($shelf_array,$shelf_overrides);

    $daily_order_number = 100;

    // Hide specific meta data from the details column. List the items by key here:
    $hidden_meta = array( "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping" );


@endphp

@section('content')
  <div class="row">
    <div class="col-sm-12">
      <table id="lists" class="display">
        <thead>
          <tr>
            <th>Recipient Name (Optional)</th>
            <th>Recipient Phone (Optional)</th>
            <th>Street Number</th>
            <th>Street</th>
            <th>Apartment / Unit (Optional)</th>
            <th>City</th>
            <th>Province / State</th>
            <th>Country</th>
            <th>Postal / ZIP Code</th>
            <th>Delivery Notes (Optional)</th>
            <th>Number of Packages</th>     
          </tr>
        </thead>
        <tbody>  
          @foreach ($filtered_orders as $details )
            @php 
              $daily_order_number++;
              $phone = $details->get_billing_phone();
              $email = $details->get_billing_email();
              $order_id = $details->get_id();
              $first_name = $details->get_shipping_first_name();
              $last_name = $details->get_shipping_last_name();
              $address1 = $details->get_shipping_address_1();
              $address2 = $details->get_shipping_address_2();
              $unitno_shipping = $details->get_meta( 'shipping_unitno', true );
              $unitno_billing = $details->get_meta( 'billing_unitno', true );
              $city = $details->get_shipping_city();
              $state = $details->get_shipping_state();
              $postcode = $details->get_shipping_postcode();
              $status = $details->get_status();
              $customer_note = $details->get_customer_note();
              $timeslot = $details->get_meta( 'pickup_timeslot', true );
              $location = $details->get_meta( 'pickuplocation', true );
              $order_number = $details->get_id();
            @endphp

            <tr>
              <td class="name"><strong>{{ $last_name }}, {{ $first_name }}</strong></td>
              <td class="phone">{{ $phone }}</td>
              <td class=""> 
                {{ $address1 }}
              </td>
              <td class="">
                {{ $address2 }}
              </td>
              <td>
                @if($unitno_shipping)
                  {{ $unitno_shipping }}
                @else
                  {{ $unitno_billing }}
                @endif
              </td>
              <td>{{  $city }}</td>
              <td>{{ $state }}</td>
              <td>Canada</td>
              <td>{{ $postcode }}</td>
              <td class="notes">{{ $customer_note }}</td>              
              <td></td>
            </tr>        
          @endforeach
        </tbody>
      </table>            
    </div>
  </div>
@endsection