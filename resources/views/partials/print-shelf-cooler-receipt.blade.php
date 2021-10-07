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
                                
  <div id="order-{{ $order_number }}" class="{{ $list_type }}">
    @php
        $cooler_count = 0;
        $shelf_count = 0;
    @endphp
    <style>
      @media print {
        .page-break	{ display: block; page-break-after: always; }
        @page {
          margin: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;   /* Chrome, Safari, Edge */
          color-adjust: exact !important;                 /*Firefox*/
        }
  
        body.pickup-list,
        html {
          margin: 0;
          padding: 0;
        }
        .print-order {
          max-width: 108mm;
          border: solid 2px #000;
          padding: 3mm;
          position: relative;
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
          text-transform: uppercase;
        }
        .meta:before {
          opacity: 1 !important;
        }
  
        .date {
          position: absolute;
          top: 2mm;
          right: 2mm;
          font-size: 14px;
          text-align: right;
        }

        .cooler .shelf.print-order,
        .shelf .cooler.print-order {
          display: none;
        }

        

        .cooler .shelf.cooler.print-order,
        .shelf .shelf.cooler.print-order {
          display: block;
        }

        
      }
      
    </style>

    <div class="print-order {{ $list_class_marker }}">

      <p class="date"><strong>{{ $date_selector_date }}</strong> <br> {{ $timeslot }}</strong></p>
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

@unless ($list_type === "shelf")
    

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

          @endunless
      @endforeach
        
        @foreach ($details->get_items() as $item_id => $item)
          @php                                         
            $prod_id = $item->get_product_id(); 
            $quantity = $item->get_quantity();
            $product_name = $item->get_name();
            $product_meta_objects = $item->get_meta_data();
            
            $cooler_override = $item->get_meta( '_cooler', true );

          @endphp
@unless ($list_type === "cooler")

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
          @endunless
      @endforeach
        
        @if($customer_note)
          <strong>Note:</strong><br>
          {{ $customer_note }}
        @endif
      
    
    <div class="page-break"></div>
    </div>
  </div>
@endforeach