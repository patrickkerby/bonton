{{-- This file controls the print-only content for printing out all orders from the pickup list --}}
@php 
  $daily_order_number = 100;
@endphp

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
                                
  <div id="order-{{ $order_number }}-card" class="">
    @php
        $cooler_count = 0;
        $shelf_count = 0;
    @endphp
    

    

    <div class="print-order">
      <p class="date"><strong>{{ $date_selector_date }}</strong> <br> {{ $timeslot }}</strong></p>
      <h1>{{  $daily_order_number  }}</h1>
      <div class="customer">
        <strong>{{ $last_name }}, {{ $first_name }}</strong><br>
        <strong>Phone:</strong> {{ $phone }}<br>
        <strong>Order #:</strong> {{ $order_number }}<br><br>
      </div>
    
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
              <div class="item_content">
                <strong>{{ $product_name }}</strong><br>
              
                @foreach ( $product_meta_objects as $meta )
                  @unless(in_array($meta->key, $hidden_meta))
                    @if(!is_array($meta->value))
                      <span class="{!! $meta->key !!} meta"> {!! $meta->value !!}</span>
                    @endif                      
                  @endunless
                  @endforeach
                </div>
                <div class="qty"><span>{{ $quantity }}</span></div> 
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
            
            <div class="items">
              <div class="item_content">
                <strong>{{ $product_name }}</strong><br>

                @foreach ( $product_meta_objects as $meta )
                  @unless(in_array($meta->key, $hidden_meta))
                    @if(!is_array($meta->value))
                      <span class="{!! $meta->key !!} meta"> {!! $meta->value !!}</span>
                    @endif
                      
                  @endunless
                @endforeach
              </div>
              <div class="qty"><span>{{ $quantity }}</span></div> 
            </div>          
          @endif
      @endforeach
        
        @if($customer_note)
          <strong>Note:</strong><br>
          {{ $customer_note }}
        @endif
      
    
    <div class="page-break"></div>
    </div>
  </div>
@endforeach