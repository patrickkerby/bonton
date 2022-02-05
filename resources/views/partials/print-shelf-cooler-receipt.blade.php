{{-- This file controls the print-only content for printing out all orders from the pickup list --}}
@php 
  $daily_order_number = 100;
  $daily_delivery_number = 500;
@endphp



@foreach ($filtered_orders as $details )

@php 
  
  if($details->has_shipping_method('flat_rate')) {
    $daily_delivery_number++;
  }
  else {
    $daily_order_number++;
  }

  $phone =          $details->get_billing_phone();
  $email =          $details->get_billing_email();
  $order_id =       $details->get_id();
  $first_name =     $details->get_billing_first_name();
  $last_name =      $details->get_billing_last_name();
  $status =         $details->get_status();
  $customer_note =  $details->get_customer_note();
  $location =       $details->get_meta( 'pickuplocation', true );
  $order_number =   $details->get_id();


  $timeslot = $details->get_meta( '_timeslot', true );
  $timeslot_old = $details->get_meta( 'pickup_timeslot', true );
  $timeslot_new = $details->get_meta( '_timeslot_pickup', true );

  if($timeslot_new == '9am - 11am') {
    $timeslot_new = 'Morning';
  }
  elseif ($timeslot_new == '11am - 2pm') {
    $timeslot_new = 'Midday';
  }
  elseif ($timeslot_new == '2pm - 5pm') {
    $timeslot_new = 'Afternoon';
  }


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
          padding: 0!important;
        }
        @page :first {
          /* margin-bottom: 1cm; */
        }
        * {
          -webkit-print-color-adjust: exact !important;   /* Chrome, Safari, Edge */
          color-adjust: exact !important;                 /*Firefox*/
        }
  
        body.receiptPrint {
          margin: 0;
          padding: 0 !important;
          width: 3in;
          max-width: 3in;
          min-width: 3in !important;
        }
  
        .receiptPrint .print-order {
          max-width: 3in;
          /* border: solid 2px #000; */
          padding: 0;
          position: relative;
        }
        .receiptPrint .items {
          break-inside: avoid;
          border-bottom: dotted 1px #666;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          box-decoration-break: clone;
        }
        .receiptPrint .items strong {
          line-height: 1;
          margin-bottom: 1mm;
          display: inline-flex;
          font-size: 11pt;
        }
        .receiptPrint .storage {
          font-size: 16px;
          font-weight: 700;
          color: #000;
          width: 100%;
          padding: 0.25rem;
          display: block;
          margin: 0 0 1rem 0;
          text-align: center;
          border: solid 2px #000;
        }
        .receiptPrint .meta-label {
          font-weight: 700;
          font-size: 1.2rem;
          padding-bottom: 0.25rem;
          display: inline-block;
          margin-left: 0.5rem;
        }
        .receiptPrint span.meta {
          margin: 0 !important;
          font-size: 10pt !important;
        }
        .receiptPrint span.meta::before {
          font-size: 10pt !important;
        }
        .receiptPrint .meta-label strong {
          font-weight: 900;
          font-size: 13px;        
          text-transform: uppercase;
        }
        .receiptPrint .meta:before {
          opacity: 1 !important;
        }
  
        .receiptPrint .date {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 14px;
          text-align: right;
          width: 1.5in;
          font-weight: 900;
        }
  
        .receiptPrint .item_content {
          width: 85%;   
          padding: 3mm 0;
        }
        .receiptPrint .qty {
          width: 15%;
          font-size: 13pt;
          font-weight: bolder;
          border-left: dotted 1px #666;
          text-align: center;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
        }
        .receiptPrint .qty span {
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
        .receiptPrint .customer {
          margin-bottom: 1rem;
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

  <p class="date"><strong>{{ $date_selector_date }}</strong> <br> {!! $timeslot !!} {{ $timeslot_new }} {{ $timeslot_old }}</strong></p>
  <h1>
    @if($details->has_shipping_method('flat_rate'))
      {{  $daily_delivery_number  }}
    @else
      {{  $daily_order_number  }}
    @endif
  
  </h1>
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

    @unless ($list_type === "shelf")


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
            <div class="qty"><span>{{ $quantity }}</span></div> 
          </div>
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
            <div class="qty"><span>{{ $quantity }}</span></div> 
          </div>
        </div>           
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