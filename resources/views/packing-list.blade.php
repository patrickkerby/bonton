{{--
  Template Name: Packing List
--}}

@extends('layouts.lists')

@php  
  $daily_order_number = 100;
  $post_id = get_the_ID();
  $date_selector_date = get_field('list_date');

// Get order data!
  $query = new WC_Order_Query( array(  
    'limit' => -1,
    'status' => 'processing',
  ) );
  $results = $query->get_orders();

//THIS IS NOT FUTURE PROOF. INSTEAD OF MANUAL IDS BELOW, PUT AN OPTION IN THE CATEGORY FOR FREEZER, SHELF, OR COOLER.
//THEN GET ALL CATEGORIES (ONCE). USE LIST TYPE (SHELF/COOLER/FREEZER) TO ONLY QUERY APPROPRIATE PRODUCTS THE FIREST TIME AROUND.

//Cooler List
  $cooler_list = '22,53,51,104,107';
  $cooler_list_slugs = array('cakes', 'pies-flans', 'dips-salsa', 'individual-pastries');

  $cooler_args = array(
    'status' => 'publish',
    'category' => $cooler_list_slugs,
    'limit' => -1,
    'return' => 'ids'
  );
  $cooler_array = wc_get_products( $cooler_args );

  //Product pages give an option to override the natural category and assign the product as cooler. Add to cooler array:
  $override_args = array(
    'status' => 'publish',
    'cooler' => '1',
    'return' => 'ids',
    'limit' => '-1'
  );
  $cooler_overrides = wc_get_products( $override_args );
  $cooler_array = array_merge($cooler_array,$cooler_overrides);

// Shelf List
  $shelf_list = array( '91, 83, 52, 104, 13, 105, 103, 135, 94, 102, 106, 54, 10, 67' );
  $shelf_list_slugs = array('buns-pretzels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'gluten-free-baked-goods', 'preserves-spreads-honey', 'sauces-dressings');

  $shelf_args = array(
    'status' => 'publish',
    'category' => $shelf_list_slugs,
    'limit' => -1,
    'return' => 'ids',
    'exclude' => $cooler_overrides
  );
  $shelf_array = wc_get_products( $shelf_args );

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
    $sorted_orders[] = $timeslot; //any object field
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
              $order_number = $details->get_id();
                
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
            @endphp

            <tr class="pack {{ $status }} {{ $list_class_marker }}">
              <td class="id">
                <span class="check"></span>
                <span class="id">#{{ $daily_order_number }}</span>
              </td>
              <td class="location">
                <p class="timeslot {{ $location }}">{{ $timeslot }}</p>                  
                {!! $order_location !!}
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

                      $product_raw = wc_get_product($prod_id);
                      $prod_name = $product_raw->get_name();
                      
                      $prod_quantity = $item->get_quantity();
                      $sliced_meta = $item->get_meta( 'Sliced Option', true );
                      
                      $product_meta_objects = $item->get_meta_data();

                    @endphp

                    @if(in_array($prod_id, $pickup_list_selection)) {{-- check to see if product is in cooler or shelf array --}}
                      <tr>
                        <td class="qty_cell"><span class="qty">{{ $prod_quantity }} </span></td>
                        <td class="prod_name_cell">
                          <span class="prod_name">{{ $prod_name }}</span>
                          
                        </td>
                        <td class="details_cell">
                          @foreach ( $product_meta_objects as $meta )
                            <span class="{!! $meta->key !!} meta"> {!! $meta->value !!}</span>
                          @endforeach
                        </td>               
                      </tr> 
                    @endif
                  @endforeach
                </table>                         
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
@endsection