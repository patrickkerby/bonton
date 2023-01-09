{{--
  Template Name: Bread Club List w/addons
--}}

{{-- This template is for breadclub when it has multiday AND multiple addons --}}

@extends('layouts.lists')

@php  
  global $wpdb;
  $daily_order_number = 900;
  $date_selector_date = '';
  $pickup_day_list = array("Tuesday", "Friday");

  $product_id = 18200; //TODO: have this set via ACF incase the product ever changes, or to build new programs.

  //Get all orders that contain specific product 
  $results = $wpdb->get_col("
      SELECT order_items.order_id
      FROM {$wpdb->prefix}woocommerce_order_items as order_items
      LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as order_item_meta ON order_items.order_item_id = order_item_meta.order_item_id
      LEFT JOIN {$wpdb->posts} AS posts ON order_items.order_id = posts.ID
      WHERE posts.post_type = 'shop_order'
      AND posts.post_status IN ( 'wc-processing', 'wc-completed' )
      AND order_items.order_item_type = 'line_item'
      AND order_item_meta.meta_key = '_product_id'
      AND order_item_meta.meta_value = '$product_id'
  ");

  // Check schedule to see if program is current. Find current date and see which week lines up.
  date_default_timezone_set('MST');
  $program_loop = get_field('program_scheduler', 'option');
  //TODO: compare against current date to show appropriate week.


@endphp	

@section('content')

  <div class="row no-gutters justify-content-center">
    <div class="col-10">
      @foreach($pickup_day_list as $day) 
        @php
          $daily_order_number = 900; 
          $product_sizes_array = array();
          $addon_bun_count = 0;
          $addon_cookie_count = 0;
          $addon_pie_count = 0;
          $addon_pastries_count = 0;
        @endphp

        <h2>{{ $day }} Bread Club</h2>
        <table id="lists-{{ $day }}" class="display {{ $list_type }}">
          <thead>
            <tr>
              <th width="5%">ID</th>
              <th width="20%">Customer</th>
              <th width="20%">Email</th>
              <th width="15%">Size</th>
              <th width="20%">Details</th>
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
                  $pickup_day = $product->get_attribute( 'Pickup Day' );
                  $product_size = $product->get_attribute( 'Size' );
                  $sliced_meta = $item->get_meta( 'Sliced Option', true );
                  $addon_meta_friday = $item->get_meta( 'Friday Addons', true);
                  $addon_meta_tuesday = $item->get_meta( 'Tuesday Addons', true);
                  $product_meta_objects = $item->get_meta_data();                  
                  $hidden_meta = array( "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping" );
                @endphp
                
                @if ($prod_id == 18200 && str_contains($pickup_day, $day) && $date_for_comparison > 1650054601)
                @php 
                  $daily_order_number++; 
                  $product_sizes_array[] = $product_size;    

                  if(str_contains($addon_meta_tuesday, 'Cookie')) {
                    $addon_cookie_count++;
                  }
                  if(str_contains($addon_meta_tuesday, 'Bun')) {
                    $addon_bun_count++;
                  }
                  if(str_contains($addon_meta_friday, 'Bun')) {
                    $addon_bun_count++;
                  }
                  if(str_contains($addon_meta_friday, 'Pie')) {
                    $addon_pie_count++;
                  }
                  if(str_contains($addon_meta_friday, 'Pastries')) {
                    $addon_pastries_count++;
                  }
                  
                        
                @endphp
                  <tr>
                    <td><strong>{{ $daily_order_number }}</strong><br>{{ $order_id }}</td>
                    <td>{{ $firstName }} {{ $lastName }}</td>
                    <td>{{ $customer_email }}</td>
                    <td>{{ $product_size }}</td>
                    <td>
                      <ul>
                        @if($sliced_meta)
                          <li>{{ $sliced_meta }}</li>
                        @endif
                        @if($addon_meta_tuesday)
                          <li>{!! $addon_meta_tuesday !!}</li>                          
                        @endif
                        @if($addon_meta_friday)
                          <li>{!! $addon_meta_friday !!}</li>                        
                        @endif                                            
                      </ul>
                    </td>
                    <td class="small">{{ $customer_note }}</td>
                  </tr>
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
            @if( $addon_bun_count)  
              <li>Addon Buns &amp; Bagels: <strong>{{ $addon_bun_count }}</strong></li>     
            @endif
            @if( $addon_cookie_count)  
              <li>Addon Cookies: <strong>{{ $addon_cookie_count }}</strong></li>     
            @endif
            @if( $addon_pie_count)  
              <li>Addon Pie: <strong>{{ $addon_pie_count }}</strong></li>     
            @endif
            @if( $addon_pastries_count)  
              <li>Addon Pastries: <strong>{{ $addon_pastries_count }}</strong></li>     
            @endif
          </ul>
        </div>
        <br><br>
      @endforeach
    </div>
  </div>
@endsection