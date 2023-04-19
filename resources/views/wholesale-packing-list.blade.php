{{--
  Template Name: Whoelsale Packing List
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

    document.body.innerHTML = originalContents;
  }
</script>

@php  
  $daily_order_number = 900;
  $post_id = get_the_ID();
  $date_selector_date = get_field('list_date');
  $is_packing_list = true;

// Users query
  $user_ids = (array) get_users([
      'role'       => 'wcwp_wholesale',
      'number'     => - 1,
      'fields'     => 'ID',
  ]);

// Get order data!
  $query = new WC_Order_Query( array(  
    'limit' => -1,
    'customer_id' => $user_ids,
    'status' => array('wc-processing', 'wc-completed', 'ws-processing', 'ws-completed'),
    'pickup_date' => $date_selector_date,
  ) );
  $results = $query->get_orders();

//THIS IS NOT FUTURE PROOF. INSTEAD OF MANUAL IDS BELOW, PUT AN OPTION IN THE CATEGORY FOR FREEZER, SHELF, OR COOLER.
//THEN GET ALL CATEGORIES (ONCE). USE LIST TYPE (SHELF/COOLER/FREEZER) TO ONLY QUERY APPROPRIATE PRODUCTS THE FIREST TIME AROUND.

//Product pages give an option to override the natural category and assign the product as cooler. Add to cooler array:
// ***IMPORTANT: for these to work, there is a custom filter in filters.php
  $cooler_override_args = array(
    'status' => 'publish',
    'cooler' => '1',
    'return' => 'ids',
    'limit' => '-1'
  );

   $shelf_override_args = array(
    'status' => 'publish',
    'shelf' => '1',
    'return' => 'ids',
    'limit' => '-1'
  );

//Cooler List
  $cooler_list = array( '22, 53, 51, 107, 103' );
  $cooler_list_slugs = array('cakes', 'pies-flans', 'dips-salsa', 'individual-pastries', 'gluten-free-baked-goods');

  $shelf_list = array( '91, 83, 52, 104, 13, 105, 135, 94, 102, 106, 54, 10, 67, 285, 289, 662 ' );
  $shelf_list_slugs = array('buns-bagels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'preserves-spreads-honey', 'sauces-dressings', 'treats-and-ice-cream', 'general-grocery', 'baking-ingredients', 'savoury-treats');

  $cooler_overrides = wc_get_products( $cooler_override_args );
  $shelf_overrides = wc_get_products( $shelf_override_args );

  $cooler_args = array(
    'status' => 'publish',
    'category' => $cooler_list_slugs,
    'limit' => -1,
    'return' => 'ids',
    'exclude' => $shelf_overrides
  );

  $shelf_args = array(
    'status' => 'publish',
    'category' => $shelf_list_slugs,
    'limit' => -1,
    'return' => 'ids',
    'exclude' => $cooler_overrides
  );

  $cooler_array = wc_get_products( $cooler_args );

  $cooler_array = array_merge($cooler_array,$cooler_overrides);

  $shelf_array = wc_get_products( $shelf_args );
  $shelf_array = array_merge($shelf_array,$shelf_overrides);


// Create filtered list of orders based on the date selected on list page.
// Also filter list based on whether Cooler or Shelf is selected on the list page.
  $filtered_orders = array();

  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->get_id();
    $order_pickup_date = $daily_results->get_meta('pickup_date');

    // filter orders by shelf vs. cooler
    if ($order_pickup_date === $date_selector_date) {
      $filtered_orders[] = $daily_results;
    }
  }

// Set current list selection based on ACF field
if ($list_type === "shelf") {
    $pickup_list_selection = $shelf_array;
  }
  elseif($list_type === "cooler") {
    $pickup_list_selection = $cooler_array;
  }
  else {
    $pickup_list_selection = NULL;
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

@endphp

@section('content')
  <div class="row no-gutters">
    <div class="col-12">      
      <table id="lists" class="display {{ $list_type }}">
        <thead>
          <tr>
            <th width="3%">ID</th>
            <th width="5%">Pick-up</th>
            <th width="33%">Customer</th>
            <th width="61%" class="products">
              <span class="qty_header">Qty.</span>
              <span class="product">Product</span>
              <span class="details">Details</span>
            </th>
            <td class="d-print-none">Order Details to Print</td>
          </tr>
        </thead>
        <tbody>
          @foreach ($filtered_orders as $details )
          
            @php
              $shipping_method = $details->get_shipping_methods();

              $phone = $details->get_billing_phone();
              $order_id = $details->get_id();
              $first_name = $details->get_billing_first_name();
              $last_name = $details->get_billing_last_name();
              $status = $details->get_status();
              $customer_note = $details->get_customer_note();
              $timeslot = $details->get_meta( 'pickup_timeslot', true );
              $location = $details->get_meta( 'pickuplocation', true );
              $order_number = $details->get_id();  

              foreach( $details->get_items( 'shipping' ) as $item_id => $item ){
                // Get the data in an unprotected array
                $item_data = $item->get_data();

                $shipping_data_name         = $item_data['name'];
                $shipping_data_method_title = $item_data['method_title'];
              }
              
              $timeslot_new = $details->get_meta( '_timeslot_pickup', true );
              $timeslot_delivery = $details->get_meta( '_timeslot', true );

              //Simplify output for timeslots - Pickup
              if($timeslot_new == '9am - 11am') {
                $timeslot_new = 'Morning';
              }
              elseif ($timeslot_new == '11am - 2pm') {
                $timeslot_new = 'Midday';
              }
              elseif ($timeslot_new == '2pm - 5pm') {
                $timeslot_new = 'Afternoon';
              }
              else {

              }
              //Simplify output for timeslots - Delivery
              if($timeslot_delivery == 'Between 10 am &amp; 1 pm') {
                $timeslot_delivery_esc = '10 - 1';
              }
              elseif ($timeslot_delivery == 'Between 3 pm &amp; 6 pm') {
                $timeslot_delivery_esc = '4 - 7';
              }
              else {}

              // Check to see if the products associated with the order are shelf or cooler.
              $list_check = array();
              $list_class = array();
              
              foreach ($details->get_items() as $item_id => $item) {
                $prod_id = $item->get_product_id(); 
                
                if(in_array($prod_id, $cooler_array)) {
                  $list_check[] = '<span class="order_location cooler">C</span>';
                  $list_class[] = 'cooler';
                } 
                // Add elseif for freezer list        
                elseif(in_array($prod_id, $shelf_array)) {  
                  $list_check[] = '<span class="order_location shelf">S</span>';
                  $list_class[] = 'shelf';
                }                   
              }
              $list_check_unique = array_unique($list_check);
              $order_location = implode("", $list_check_unique);
              
              $list_class_unique = array_unique($list_class);
              $list_class_marker = implode(" ", $list_class_unique);
              
              if($details->has_shipping_method('flat_rate')) {
                $order_location = 'Delivery';
              }
              else {
                $order_location = 'Pickup';
              }

              $daily_order_number++;              

            @endphp

            <tr class="pack {{ $status }} {{ $list_class_marker }}">
              <td class="id">
                <span class="check"></span>
                <span class="id">#{{ $daily_order_number }}</span>
              </td>
              <td class="location">
                @if($details->has_shipping_method('flat_rate'))
                  <p class="timeslot">Delivery: {!! $shipping_data_name !!}</p>
                @endif
                @if($timeslot)
                  <p class="timeslot {{ $location }}">{{ $timeslot }}</p>  
                @endif
                @if($timeslot_new)
                <p class="timeslot {{ $location }}">{{ $timeslot_new }}</p>  
                @endif
                @if ($timeslot_delivery)
                  <p class="timeslot {{ $location }}">{{ $timeslot_delivery_esc }}</p>   
                @endif
                
              </td>
              <td> 
                <strong>{{ $last_name }}, {{ $first_name }} (#{{ $order_number }})</strong>
                <p>{{ $phone }}</p>                    
                @if ($customer_note)        
                  <span class="notes">{{ $customer_note }}</span>
                @endif
              </td>
              <td class="details_table">
                <table>
                  @foreach ($details->get_items() as $item_id => $item)
                    @php 

                      $prod_id = $item->get_product_id(); 

                      // $product_raw = wc_get_product($prod_id);
                      $product_raw = wc_get_product($prod_id);
                      
                      if ($product_raw) {
                        $prod_name = $product_raw->get_name();
                      }
                      
                      $prod_quantity = $item->get_quantity();

                      $sliced_meta = $item->get_meta( 'Sliced Option', true );

                      //If the product is a bundled product, we want to hide the parent. We only want to see the items that require packing.
                        $bundle_mode = $item->get_meta( '_bundle_group_mode', true);
                        
                        if ($bundle_mode == "parent") {
                          $is_bundle_parent = true;
                        }
                        else {
                          $is_bundle_parent = false;
                        }

                      // Hide specific meta data from the details column. List the items by key here:
                        $hidden_meta = array( "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping" );

                      $product_meta_objects = $item->get_meta_data();

                      $item_product_data_array = $item->get_data();

                      // Check to see if line items have been refunded
                      $order = wc_get_order( $order_number );
                      $order_refunds = $order->get_refunds();  
                      $refund_item_id = "";
                      $total_qty = $prod_quantity;
                      if($order_refunds) {
                        foreach( $order_refunds as $refund ){
                          foreach( $refund->get_items() as $item_id => $item ){

                              ## --- Using WC_Order_Item_Product methods --- ##
                              $refund_item_id = $item -> get_product_id();
                              $refunded_quantity      = $item->get_quantity(); // Quantity: zero or negative integer
                              $refunded_line_subtotal = $item->get_subtotal(); // line subtotal: zero or negative number
                          }
                        }

                        if($prod_id == $refund_item_id) {
                          $total_qty = $prod_quantity + $refunded_quantity;
                        }                        
                      }
                    @endphp

                    @if(in_array($prod_id, $pickup_list_selection)) {{-- check to see if product is in cooler or shelf array --}}
                      @unless($is_bundle_parent || $total_qty == 0)
                        <tr>
                          <td class="qty_cell"><span class="qty">
                          
                          @if($order_refunds)
                            {{ $total_qty }}
                          @else
                            {{ $prod_quantity }}
                          @endif
                          </span>
                          
                          </td>
                          <td class="prod_name_cell">
                            <span class="prod_name">{{ $prod_name }}</span>
                          </td>
                          <td class="details_cell">
                            @foreach ( $product_meta_objects as $meta )
                              @unless(in_array($meta->key, $hidden_meta))
                                <span class="{!! $meta->key !!} meta"> {!! $meta->value !!}</span>
                              @endunless
                            @endforeach
                          </td>               
                        </tr> 
                      @endunless
                    @endif
                  @endforeach
                </table>
              </td>
              <td class="d-print-none">
                <div id="hiddenPrint">
                  @include('print.print-individual-wholesale-receipt')
                  @include('print.print-individual-wholesale-card')
                </div>
              </td>
            </tr>
          
          @endforeach
        </tbody>
      </table>
      <div id="receipt-printer-all" class="d-none">
        @include('print.print-packing-wholesale-receipts')
      </div>
      <div id="card-printer-all" class="d-none">
        @include('print.print-packing-wholesale-cards')
      </div>
      <button class="btn btn-default" onclick="printDiv('receipt-printer-all', 'receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print All Orders (Receipt Printer)</i></button>
      <button class="btn btn-default" onclick="printDiv('card-printer-all', 'cardPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print All Orders (Cards)</i></button>

<br><br><br><br>
@php

$json3='[  
  {  
    "fullName":"Shachar Ganot",
    "address":"Yad Rambam",
    "phoneNumber":"050-1231233",
    "email":"",
    "note":"",
    "role":"",
    "area":""
  },
  {  
    "fullName":"Betty Ganot",
    "address":"Modiin",
    "phoneNumber":"054-3213211",
    "email":"",
    "note":"",
    "role":"",
    "area":""
  },
  {  
    "fullName":"Someone Else",
    "address":"Somewhere",
    "phoneNumber":"123456789",
    "email":"",
    "note":"",
    "role":"",
    "area":""
  }
]';


// Read the JSON file 
$json2 = file_get_contents('app/uploads/pos/test2.json');
$json_data2 = json_decode($json2,true);
  
// Display data

print_r($json_data2);

@endphp


    </div>
  </div>


@endsection