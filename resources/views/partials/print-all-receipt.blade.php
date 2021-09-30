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
                                
  <div id="order-{{ $order_number }}" class="">
    @php
        $cooler_count = 0;
        $shelf_count = 0;
    @endphp
    <style>
      @media print {
        .page-break	{ display: block; page-break-before: always; }
        @page {
          margin: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;   /* Chrome, Safari, Edge */
          color-adjust: exact !important;                 /*Firefox*/
        }
        .print-order {
          max-width: 80mm;
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
@endforeach