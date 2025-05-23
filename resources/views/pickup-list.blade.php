{{--
  Template Name: Pickup List
--}}

@extends('layouts.lists')

<script>
  function printDiv(divName, printSize) {

    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    
    var body = document.body;
    body.classList.add(printSize);

    if (body.classList.contains("cardPrint")) {
      var pageRules = document.getElementById('cardSizes');
      let pageSizeString = '@page {size: 4in 5.5in;}';
      pageRules.innerHTML = pageSizeString;
    }

    window.print();
    
    window.addEventListener("afterprint", (event) => {
      document.body.innerHTML = originalContents;
    });
  }
</script>
@php
global $wpdb;

  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );
  $breadclub_id = 18200;

  $date_selector_date = get_field('list_date');
  $is_packing_list = false;
  $is_storetodoor = false;

// Get order data!
  $query = new WC_Order_Query( array(  
    'limit' => -1,
    // 'orderby' => 'name',
    // 'order' => 'asc',
    'status' => array('wc-processing', 'wc-completed'),
    'pickup_date' => $date_selector_date,
  ) );

  $results = $query->get_orders();

  //Get all orders that contain specific product (breadclub) 
  $bread_club_results = $wpdb->get_col("
    SELECT order_items.order_id
    FROM {$wpdb->prefix}woocommerce_order_items as order_items
    LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as order_item_meta ON order_items.order_item_id = order_item_meta.order_item_id
    LEFT JOIN {$wpdb->posts} AS posts ON order_items.order_id = posts.ID
    WHERE posts.post_type = 'shop_order'
    AND posts.post_status IN ( 'wc-processing', 'wc-completed' )
    AND order_items.order_item_type = 'line_item'
    AND order_item_meta.meta_key = '_product_id'
    AND order_item_meta.meta_value = '$breadclub_id'
  ");

//Create filtered list of orders based on the date selected on list page.
  $filtered_orders = array();
  
  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->get_id();
    $order_pickup_date = $daily_results->get_meta('pickup_date');
    $shipping_method = $daily_results->get_shipping_methods();

    if($daily_results->has_shipping_method('flat_rate') || $daily_results->has_shipping_method('free_shipping')) {
      $is_shipped = true;
    }
    else {
      $is_shipped = false;
    }
    
          
    if ($order_pickup_date === $date_selector_date && !$is_shipped) {
      $filtered_orders[] = $daily_results;
    }
  }

// This is a custom function to perform recursive array searches. (regular in_array doesn't work for multidimensional arrays)
  function in_array_r($needle, $haystack, $strict = false) {
    foreach ($haystack as $item) {
      if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && in_array_r($needle, $item, $strict))) {
          return true;
      }
    }
    return false;
  }

// Sort the packing list by timeslot
$sorted_orders = array(); 
  foreach ($filtered_orders as $order) {
    $timeslot = $order->get_meta( 'pickup_timeslot', true );
    $timeslot_new = $order->get_meta( '_timeslot_pickup', true );
    $timeslot_delivery = $order->get_meta( '_timeslot', true );

    //Simplify output for timeslots - Pickup
    if($timeslot_new == '9am - 11am') {
      $timeslot_new = 'morning';
    }
    elseif ($timeslot_new == '11am - 2pm') {
      $timeslot_new = 'midday';
    }
    elseif ($timeslot_new == '2pm - 5pm') {
      $timeslot_new = 'afternoon';
    }

    if($timeslot) {
      $sorted_orders[] = $timeslot; //any object field
    }
    elseif ($timeslot_new) {        
      $sorted_orders[] = $timeslot_new; //any object field
    }
    elseif ($timeslot_delivery) {        
      $sorted_orders[] = $timeslot_delivery; //any object field
    }
    else {
      $sorted_orders[] = 'No timeslot selected'; //any object field
    }
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
    $daily_breadclub_number = 900;

    // Hide specific meta data from the details column. List the items by key here:
    $hidden_meta = array( "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping", "_wdp_cart_item_key" );

    
    ///////// BREAD CLUB!!!!!!
    /// Check to see if customer is a bread club member
    
    $current_date = new \DateTime($date_selector_date);
    $current_day_of_week = $current_date->format('l');
    $current_date_for_comparison = $current_date->format('l, M, d');

    function getDatesInRange($dateFromString, $dateToString, $dayOfWeek) {
      $dateFrom = new \DateTime($dateFromString);
      $dateTo = new \DateTime($dateToString);
      $dates = [];

      if ($dateFrom > $dateTo) {
          return $dates;
      }

      if (1 != $dateFrom->format('N')) {
          $dateFrom->modify($dayOfWeek);
      }

      while ($dateFrom <= $dateTo) {
          $dates[] = $dateFrom->format('l, M, d');
          $dateFrom->modify('+1 week');
      }

      return $dates;
    }
    
    $program_loop = get_field('program_scheduler', 'option');
    $bread_club_dates = array();
    
    if($program_loop) {
      foreach ($program_loop as $program) {
        $start_date = $program['start_date'];
        $startDateString = new \DateTime($start_date);
        $dayOfWeek = $startDateString->format('l');
        $end_date = $program['end_date'];
        $bread_club_dates[] = getDatesInRange($start_date, $end_date, $dayOfWeek);      
      }
    }


    // Check if the date selected on page is actually a pickup day for Bread Club    
    if(in_array_r($current_date_for_comparison, $bread_club_dates)) {
      $is_today_breadclub = true;
    }
    else {
      $is_today_breadclub = false;
    }

    $breadclub_array = array();
    $breadclub_email_list = array();
    $breadclub_id_list = array();
    
    if($is_today_breadclub) {
      // Limit the list of bread club orders to only those that chose a pickup day equal to the day picked on page. If the date on page is even a breadclub day to begin with

      if ($bread_club_results) {      
        foreach ($bread_club_results as $order_id) {
          $order = wc_get_order($order_id);
          $get_date = $order->get_date_created();             
          $order_date_created = $get_date->date('Y-m-d');
          $date_for_comparison = strtotime($order_date_created);


          foreach ($order->get_items() as $item_id => $item) {
            $product = $item->get_product();
            $breadclub_pickup_day = $product->get_attribute( 'Pickup Day' );

            if(str_contains($breadclub_pickup_day, $current_day_of_week) && $date_for_comparison > 1650054601) {
              $breadclub_array[] = $order;
              $breadclub_email_list[] = $order->get_billing_email();
              $breadclub_id_list[] = $order->get_id();
            }
          }

        }

      }
      //combine the breadclub orders with the original set of orders for this day
      $combined_orders_raw = array_merge( $breadclub_array, $filtered_orders );
    }
    else {      
      //reset the combined orders to the original non-breadclub orders
      $combined_orders_raw = $filtered_orders;
    }

    $combined_orders = array_unique($combined_orders_raw);


  @endphp

@section('content')
  <div class="row">
    <div class="col-sm-12">

      <table id="lists" class="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Order #</th>
            <th>Phone</th>
            <th>Bags</th>
            <th>Pickup</th>
            <th>Location</th>
            <th>Notes</th>
            <td class="d-print-none">Order Details to Print</td>
          </tr>
        </thead>
        <tbody>  

          @foreach ($combined_orders as $details )
            @php 
              $phone = $details->get_billing_phone();
              $order_id = $details->get_id();
              $email = $details->get_billing_email();
              $first_name = $details->get_billing_first_name();
              $last_name = $details->get_billing_last_name();
              $status = $details->get_status();
              $customer_note = $details->get_customer_note();
              $timeslot = $details->get_meta( 'pickup_timeslot', true );
              $timeslot_new = $details->get_meta( '_timeslot_pickup', true );
              $location = $details->get_meta( 'pickuplocation', true );
              $order_pickup_date = $details->get_meta( 'pickup_date', true );
              $order_number = $details->get_id();
              $bagfee = $details->get_meta( '_pickup_bag_fee', true );


              if($timeslot_new == '9am - 11am') {
                $timeslot_new = 'Morning';
              }
              elseif ($timeslot_new == '11am - 2pm') {
                $timeslot_new = 'Midday';
              }
              elseif ($timeslot_new == '2pm - 5pm') {
                $timeslot_new = 'Afternoon';
              }

              if (in_array_r($email, $breadclub_email_list) && $order_pickup_date != $date_selector_date) {
                $is_breadclub_member = true;  
                $daily_breadclub_number++;                
              }
              else {
                $is_breadclub_member = false;
                $daily_order_number++;
              }
              if( in_array_r($order_number, $breadclub_id_list) && $order_pickup_date == $date_selector_date ) {
                $is_customer_and_bc = true;
                $daily_breadclub_number++;                
              }              
              else {
                $is_customer_and_bc = false;                
              }


            @endphp
            <tr>
              <td>
                @if($is_breadclub_member)
                  {{ $daily_breadclub_number }}
                @elseif($is_customer_and_bc)
                  {{ $daily_breadclub_number }}, {{ $daily_order_number }}
                @else
                  {{ $daily_order_number }}
                @endif
              </td>
              <td class="name">
                <strong>{{ $last_name }}, {{ $first_name }}</strong>
                @if ($is_breadclub_member || $is_customer_and_bc)
                    <span class="breadclubflag">Bread Club Pickup!</span>
                @else
                    
                @endif
              
              </td>
              <td>{{ $email }}</td>
              <td>{{ $order_number }}</td>
              <td class="phone">{{ $phone }}</td>
              <td class="bags">{{ $bagfee }}</td>
              <td class="location">    
                @if($timeslot)
                  <p class="timeslot {{ $location }}">{{ $timeslot }}</p>  
                @endif
                @if($timeslot_new)
                <p class="timeslot {{ $location }}">{{ $timeslot_new }}</p>  
                @endif
                
              </td>
              <td class="location">
                {{-- Check to see if the products associated with the order are shelf or cooler.      --}}
                @php $responses = array(); @endphp
                @foreach ($details->get_items() as $item_id => $item)                
                
                  @php 

                    $prod_id = $item->get_product_id(); 
                    $cooler_override = $item->get_meta( '_cooler', true );
                                      
                    if(in_array($prod_id, $cooler_array)) {
                      $responses[] = '<span class="order_location cooler">C</span>';   
                      $in_cooler = true; 
                    } 
                    // Add elseif for freezer list        
                    else {  
                      $responses[] = '<span class="order_location shelf">S</span>';                
                      $in_shelf = true;
                    }

                    //Does customer have a breadclub subscription?
                  @endphp
                @endforeach
                @php
                  $responses_unique = array_unique($responses);
                  $order_location = implode("", $responses_unique);
                @endphp
                @if ($is_breadclub_member)                
                  <span class="order_location breadclub">B</span>
                @elseif ($is_customer_and_bc)
                  {!! $order_location !!}
                  <span class="order_location breadclub">B</span>
                @else
                  {!! $order_location !!}
                @endif


              </td>
              <td class="notes">{{ $customer_note }}</td>
              <td class="d-print-none">
                @include('partials.print-individual-receipt')
              </td>
            </tr>        
          @endforeach

        </tbody>
      </table>
      <button class="btn btn-default" onclick="printDiv('receipt-printer-all', 'receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print All Orders (Receipt Printer)</i></button>

      <div id="receipt-printer-all" class="d-none">
        @include('partials.print-all-receipt')
      </div>
    </div>
  </div>
@endsection