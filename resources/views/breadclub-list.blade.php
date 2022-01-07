{{--
  Template Name: Bread Club List
--}}

@extends('layouts.lists')

@php  
  global $wpdb;
  $daily_order_number = 900;
  $date_selector_date = '';
  $pickup_day_list = array("Tuesday", "Thursday");

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
      @if($program_loop)
        @foreach ($program_loop as $program)
          @php
            $program_title = $program['program_title'];
            $start_date = $program['start_date'];
            $end_date = $program['end_date'];
            $bc_program_products = $program['bc_program_products'];
          @endphp

          <h3>{{ $program['program_title'] }}</h3>
          <strong>{{ $program['start_date'] }} - {{ $program['end_date'] }}</strong><br>
          <br>
          @if ($bc_program_products)
            @foreach ( $bc_program_products as $program_products )        
              @php
                $products_size_1 = $program_products['products_size_1'];
                $products_size_2 = $program_products['products_size_2'];
                $products_size_3 = $program_products['products_size_3'];
                $products_size_4 = $program_products['products_size_4'];
                $addons = $program_products['addons'];
              @endphp        
              <h3>Week {{ $loop->iteration }}</h3>
              @foreach ( $program['size_titles'] as $size )
                <h4>{{ $size['size_title'] }}</h4>
                @if($loop->iteration == 1)
                  @if($products_size_1)
                    @foreach ($products_size_1 as $item1 )
                      {!! $item1->post_title !!}<br>
                    @endforeach
                  @endif
                  @if($addons)
                    <strong>Addons:</strong>
                    @foreach ($addons as $addon )
                      {!! $addon->post_title !!}
                    @endforeach
                    <br><br>
                  @endif            
                @elseif($loop->iteration == 2)
                  @if($products_size_2)
                    @foreach ($products_size_2 as $item )
                      {!! $item->post_title !!}<br>
                    @endforeach            
                  @endif
                  @if($addons)
                    <strong>Addons:</strong>
                    @foreach ($addons as $addon )
                      {!! $addon->post_title !!}
                    @endforeach
                    <br><br>
                  @endif

                @elseif($loop->iteration == 3)
                  @if($products_size_3)
                    @foreach ($products_size_3 as $item )
                      {!! $item->post_title !!}<br>
                    @endforeach
                  @endif
                  @if($addons)
                    <strong>Addons:</strong>
                    @foreach ($addons as $addon )
                      {!! $addon->post_title !!}
                    @endforeach
                    <br><br>
                  @endif

                @elseif($loop->iteration == 4)
                  @if($products_size_4)
                    @foreach ($products_size_4 as $item )
                      {!! $item->post_title !!}<br>
                    @endforeach
                  @endif
                  @if($addons)
                    <strong>Addons:</strong>
                    @foreach ($addons as $addon )
                      {!! $addon->post_title !!}
                    @endforeach
                    <br><br>
                  @endif
                @endif
              @endforeach
            @endforeach
          @endif
          <br><br><br>
        @endforeach
      @endif
      <br><br><br><br><br><br>
      
      {{-- Customer Pickup List - probably separate into a different page --}}
      @foreach($pickup_day_list as $day) 
        <h2>{{ $day }} Bread Club</h2>
        <table id="lists-{{ $day }}" class="display {{ $list_type }}">
          <thead>
            <tr>
              <th width="10%">ID</th>
              <th width="20%">Customer</th>
              <th width="20%">Size</th>
              <th width="20%">Pickup Day</th>
              <th width="30%" class="products">Note</th>
            </tr>
          </thead>
          <tbody>
            @foreach ($results as $order_id)
              @php
                $order = wc_get_order($order_id);
                $order_items = $order->get_items();                
                $firstName = $order->get_billing_first_name();
                $lastName = $order->get_billing_last_name();
                $customer_note = $order->get_customer_note(); 
              @endphp

              @foreach ($order->get_items() as $item_id => $item)
                @php
                  $prod_id = $item['product_id']; 
                  $product = $item->get_product();
                  $pickup_day = $product->get_attribute( 'Pickup Date' );
                  $product_size = $product->get_attribute( 'Size' );
                @endphp
                
                @if ($prod_id == 18200 && str_contains($pickup_day, $day))
                @php $daily_order_number++; @endphp
                  <tr>
                    <td><strong>{{ $daily_order_number }}</strong><br>{{ $order_id }}</td>
                    <td>{{ $firstName }} {{ $lastName }}</td>
                    <td>{{ $product_size }}</td>
                    <td>{{ $pickup_day }}</td>
                    <td class="small">{{ $customer_note }}</td>
                  </tr>
                @endif
              @endforeach
            @endforeach
          </tbody>
        </table>
        <br><br>
      @endforeach
    </div>
  </div>
@endsection