{{--
  Template Name: Bread Club List
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
  global $wpdb;
  $daily_order_number = 900;
  $date_selector_date = '';
  $day = 'Thursday';
  $product_id = 18200; //TODO: have this set via ACF incase the product ever changes, or to build new programs.

  //Get all orders that contain specific product - OPTIMIZED QUERY
  // Check cache first to prevent repeated expensive queries
  $cache_key = "breadclub_list_orders_" . $product_id;
  $results = wp_cache_get($cache_key);
  
  if (false === $results) {
    $results = $wpdb->get_col($wpdb->prepare("
      SELECT DISTINCT order_items.order_id
      FROM {$wpdb->prefix}woocommerce_order_items as order_items
      INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta as order_item_meta 
        ON order_items.order_item_id = order_item_meta.order_item_id
      INNER JOIN {$wpdb->posts} AS posts 
        ON order_items.order_id = posts.ID
      WHERE order_item_meta.meta_key = '_product_id'
      AND order_item_meta.meta_value = %d
      AND order_items.order_item_type = 'line_item'
      AND posts.post_type = 'shop_order'
      AND posts.post_status IN ('wc-processing', 'wc-completed')
      ORDER BY posts.post_date DESC
      LIMIT 1000
    ", $product_id));
    
    // Cache for 15 minutes to prevent repeated queries
    wp_cache_set($cache_key, $results, '', 900);
  }

  // Check schedule to see if program is current. Find current date and see which week lines up.
  date_default_timezone_set('MST');
  $program_loop = get_field('program_scheduler', 'option');
  //TODO: compare against current date to show appropriate week.


@endphp	

@section('content')

  <div class="row no-gutters justify-content-center">
    <div class="col-10">
        @php
          $daily_order_number = 900; 
          $product_sizes_array = array();
        @endphp

        <h2>Bread Club</h2>
        <table id="lists" class="display {{ $list_type }}">
          <thead>
            <tr>
              <th width="5%">ID</th>
              <th width="20%">Customer</th>
              <th width="20%">Email</th>
              <th width="15%">Size</th>     
              <th width="15%">Location</th>         
              <th width="5%">Details</th>
              <th width="20%" class="products">Note</th>
            </tr>
          </thead>
          <tbody>
            @foreach ($results as $order_id)
              @php
                $order = wc_get_order($order_id);
                $order_items = $order->get_items();   
                $get_date = $order->get_date_created();             
                $order_date_created = $get_date->date('Y-m-d');
                $date_for_comparison = strtotime($order_date_created);
                $firstName = $order->get_billing_first_name();
                $lastName = $order->get_billing_last_name();
                $customer_note = $order->get_customer_note(); 
                $customer_email = $order->get_billing_email(); 
              @endphp

              @foreach ($order->get_items() as $item_id => $item)
                @php
                  $prod_id = $item['product_id']; 
                  $product = $item->get_product();
                  $qty = $item->get_quantity();
                  $location = $product->get_attribute( 'Location' );
                  $product_size = $product->get_attribute( 'Size' );
                  $sliced_meta = $item->get_meta( 'Sliced Option', true );
                  $product_meta_objects = $item->get_meta_data();                  
                  $hidden_meta = array( "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping" );
                @endphp

                @if ($prod_id == 18200 && $date_for_comparison > 1674226526 && $date_for_comparison < 1677052892) 
                @php 
                  $daily_order_number++; 
                  $product_sizes_array[] = $product_size;

                  if ($qty === 2) {
                    $product_sizes_array[] = $product_size;
                  }

                  if ($qty === 3) {
                    $product_sizes_array[] = $product_size;
                    $product_sizes_array[] = $product_size;
                  }

                @endphp
                  <tr>
                    <td><strong>{{ $daily_order_number }}</strong><br>{{ $order_id }}</td>
                    <td>{{ $firstName }} {{ $lastName }}</td>
                    <td>{{ $customer_email }}</td>
                    <td>{{ $product_size }}</td>
                    <td>{{ $location }}</td>
                    <td>
                      <ul>
                        @if($sliced_meta)
                          <li>{{ $sliced_meta }}</li>
                        @endif                                                                 
                      </ul>
                    </td>
                    <td class="small">{{ $customer_note }}</td>
                  </tr>
                  @if ($qty === 2)
                  @php
                    $daily_order_number++; 
                  @endphp
                  <tr>
                    <td><strong>{{ $daily_order_number }}</strong><br>{{ $order_id }}</td>
                    <td>{{ $firstName }} {{ $lastName }}</td>
                    <td>{{ $customer_email }}</td>
                    <td>{{ $product_size }}</td>
                    <td>{{ $location }}</td>
                    <td>
                      <ul>
                        @if($sliced_meta)
                          <li>{{ $sliced_meta }}</li>
                        @endif                                                                 
                      </ul>
                    </td>
                    <td class="small">{{ $customer_note }}</td>
                  </tr>
                  @endif
                @endif
              @endforeach
            @endforeach
          </tbody>
        </table>
        <div class="totals col-sm-4">
          <h5>Totals:</h5>
          <ul>
            @foreach (array_count_values($product_sizes_array) as $key => $value)
              <li>{{ $key }}: <strong>{{ $value }}</strong></li>
            @endforeach   
          </ul>
        </div>
        <br><br>
      <button class="btn btn-default" onclick="printDiv('receipt-printer-all', 'receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;">Print All Order Items </i></button>

      <div id="receipt-printer-all" class="d-none">
        @include('partials.print-all-breadclub')
      </div> 
    </div>
  </div>
@endsection