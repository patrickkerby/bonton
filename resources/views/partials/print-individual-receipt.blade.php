{{-- This file controls the print-only content for printing out an individual order from the pickup list --}}

<button class="btn btn-default" onclick="printDiv('order-{{ $order_number }}')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print</i></button>
                                
<div id="order-{{ $order_number }}" class="d-none">
  @php
      $cooler_count = 0;
      $shelf_count = 0;

      // $date_selector_date = get_field('list_date');
      // $timeslot = $order->get_meta( 'pickup_timeslot', true );


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
    }
    
  </style>

  <div class="print-order">
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
    
    @unless($list_type === "shelf")
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

    @unless($list_type === "cooler")
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