{{--
  Template Name: Pickup List
--}}

@extends('layouts.lists')
<script >
  function printDiv(divName) {
       var printContents = document.getElementById(divName).innerHTML;
       var originalContents = document.body.innerHTML;
  
       document.body.innerHTML = printContents;
  
       window.print();
  
       document.body.innerHTML = originalContents;
  }
  </script>
@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');

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
          
    if ($order_pickup_date === $date_selector_date) {
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
            <th>ID</th>
            <th>Name</th>
            <th>Order #</th>
            <th>Phone</th>
            <th>Pickup</th>
            <th>Location</th>
            <th>Notes</th>
            <td>Email</td>
            <td class="d-print-none">Order Details to Print</td>
          </tr>
        </thead>
        <tbody>  
          @foreach ($filtered_orders as $details )
            @php 
              $daily_order_number++;
              $phone = $details->get_billing_phone();
              $email = $details->get_billing_email();
              $order_id = $details->get_id();
              $first_name = $details->get_billing_first_name();
              $last_name = $details->get_billing_last_name();
              $status = $details->get_status();
              $customer_note = $details->get_customer_note();
              $timeslot = $details->get_meta( 'pickup_timeslot', true );
              $location = $details->get_meta( 'pickuplocation', true );
              $order_number = $details->get_id();
            @endphp
            <tr>
              <td>{{ $daily_order_number }}</td>
              <td class="name"><strong>{{ $last_name }}, {{ $first_name }}</strong></td>
              <td>{{ $order_number }}</td>
              <td class="phone">{{ $phone }}</td>
              <td class="location"> 
                <p class="timeslot {{ $location }}">{{ $timeslot }}</p>  
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
                  @endphp
                @endforeach
                @php
                  $responses_unique = array_unique($responses);
                  $order_location = implode("", $responses_unique);
                @endphp
                {!! $order_location !!}
              </td>
              <td class="notes">{{ $customer_note }}</td>
              <td>{{ $email }}</td>
              <td class="d-print-none">
                <button class="btn btn-default" onclick="printDiv('order-{{ $order_number }}')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print</i></button>
                
                {{-- Begin print-only section --}}
                
                
                <div id="order-{{ $order_number }}" class="d-none">
                  @php
                      $cooler_count = 0;
                      $shelf_count = 0;
                  @endphp
                  <style>
                    @media print {
                      .page-break	{ display: block; page-break-before: always; }
                      @page {
                        margin: 5mm;
                      }
                      * {
                        -webkit-print-color-adjust: exact !important;   /* Chrome, Safari, Edge */
                        color-adjust: exact !important;                 /*Firefox*/
                      }
                      .print-order {
                        max-width: 80mm;
                        border: solid 2px #000;
                        padding: 5mm;
                      }
                      .storage {
                        font-size: 16px;
                        font-weight: 700;
                        color: #fff;
                        background: #000;
                        width: 100%;
                        padding: 0.25rem;
                        display: block;
                        margin: 0 0 1rem 0;
                        text-align: center;
                      
                      }
                      .meta-label {
                        font-weight: 700;
                        font-size: .875rem;
                        padding-bottom: 0.25rem;
                        display: inline-block;
                        margin-left: 0.5rem;
                      }
                      .meta-label strong {
                        font-weight: 900;
                        font-size: 11px;
                        opacity: .4;
                        text-transform: uppercase;
                      }
                    }
                    
                  </style>

                  <div class="print-order">
                  <h1>{{  $daily_order_number  }}</h1>
                  <strong>{{ $last_name }}, {{ $first_name }}</strong><br>
                  <strong>Phone:</strong> {{ $phone }}<br>
                  <strong>Order #:</strong> {{ $order_number }}<br><br>
                  
                  @foreach ($details->get_items() as $item_id => $item)
                    @php                      
                      $prod_id = $item->get_product_id(); 
                      $quantity = $item->get_quantity();
                      $product_name = $item->get_name();
                      $product_meta_objects = $item->get_meta_data();

                      $cooler_override = $item->get_meta( '_cooler', true );

                    @endphp

                    @if(in_array($prod_id, $cooler_array))
                      @php
                        $cooler_count++;
                      @endphp

                      @if($cooler_count == 1)
                        <span class="storage">Cooler Items</span>
                      @endif
                      
                      <div class="items">
                        <strong>{{ $product_name }}</strong><br>
                        <span class="meta-label"><strong>Qty:</strong> {{ $quantity }}</span> <br>
                        
                        @foreach ( $product_meta_objects as $meta )
                          @unless(in_array($meta->key, $hidden_meta))
                            @if(!is_array($meta->value))
                              <span class="{!! $meta->key !!} meta"> {!! $meta->value !!}</span>
                            @endif
                              
                          @endunless
                        @endforeach
                      </div>
                      
                    @endif
                  @endforeach
                  
                  @foreach ($details->get_items() as $item_id => $item)
                    @php                                         
                      $prod_id = $item->get_product_id(); 
                      $quantity = $item->get_quantity();
                      $product_name = $item->get_name();
                      $product_meta_objects = $item->get_meta_data();

                      $cooler_override = $item->get_meta( '_cooler', true );

                    @endphp

                    @if(!in_array($prod_id, $cooler_array))
                      @php
                        $shelf_count++;
                      @endphp     
               
                      @if($shelf_count == 1)
                        <span class="storage">Shelf Items</span>
                      @endif

                      <strong>{{ $product_name }}</strong><br>
                      <span class="meta-label"><strong>Qty:</strong> {{ $quantity }}</span> <br>

                      @foreach ( $product_meta_objects as $meta )
                        @unless(in_array($meta->key, $hidden_meta))
                          @if(!is_array($meta->value))
                            <span class="{!! $meta->key !!} meta"> {!! $meta->value !!}</span>
                          @endif
                            
                        @endunless
                      @endforeach
                      <hr>
                      
                    @endif
                  @endforeach
                  @if($customer_note)
                  <strong>Note:</strong><br>
                    {{ $customer_note }}
                  @endif
                  <div class="page-break"></div>
                </div>
                </div>

              </td>
            </tr>        
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
@endsection