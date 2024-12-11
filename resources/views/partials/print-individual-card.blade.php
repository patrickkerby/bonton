{{-- This file controls the print-only content for printing out an individual order from the pickup list --}}

<button class="btn btn-default" onclick="printDiv('order-{{ $order_number }}-card', 'cardPrint') "><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print Card</i></button>
                                
<div id="order-{{ $order_number }}-card" class="d-none">
  @php
      $cooler_count = 0;
      $shelf_count = 0;

      // $date_selector_date = get_field('list_date');
      // $timeslot = $order->get_meta( 'pickup_timeslot', true );
  @endphp



<style id="cardSizes" class="cardSizes">

</style>

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

      body.cardPrint {
        margin: 0;
        padding: 0 !important;
        width: 4in;
        max-width: 4in;
        min-width: 4in !important;
      }

      .cardPrint .print-order {
        max-width: 4in;
        /* border: solid 2px #000; */
        padding: 0 8mm;
        position: relative;
      }
      .cardPrint .items {
        break-inside: avoid;
        border-bottom: dotted 1px #666;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        box-decoration-break: clone;
      }
      .cardPrint .items strong {
        line-height: 1;
        margin-bottom: 1mm;
        display: inline-flex;
        font-size: 10pt;
      }
      .cardPrint .storage {
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
      .cardPrint .meta-label {
        font-weight: 700;
        font-size: .875rem;
        padding-bottom: 0.25rem;
        display: inline-block;
        margin-left: 0.5rem;
      }
      .cardPrint span.meta {
        margin: 0 !important;
        font-size: 8pt !important;
      }
      .cardPrint span.meta::before {
        font-size: 8pt !important;
      }
      .cardPrint .meta-label strong {
        font-weight: 900;
        font-size: 11px;        
        text-transform: uppercase;
      }
      .cardPrint .meta:before {
        opacity: 1 !important;
      }

      .cardPrint .date {
        position: absolute;
        top: 8mm;
        right: 8mm;
        font-size: 14px;
        text-align: right;
      }

      .cardPrint .item_content {
        width: 85%;   
        padding: 3mm 0;
      }
      .cardPrint .qty {
        width: 15%;
        font-size: 11pt;
        font-weight: bolder;
        border-left: dotted 1px #666;
        text-align: center;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
      }
      .cardPrint .qty span {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
      .cardPrint .customer {
        margin-bottom: 1rem;
      }
    }
    
  </style>

  <div class="print-order">
    <p class="date">
      <strong>{{ $date_selector_date }}</strong> <br>
        @if($details->has_shipping_method('flat_rate'))
          {!! $order_location !!}                
        @endif
        @if($timeslot)
          {{ $timeslot }}
        @endif
        @if($timeslot_new)
          {{ $timeslot_new }}
        @endif
        @if ($timeslot_delivery)
          {{ $timeslot_delivery_esc }}
        @endif     
    </p>
    <h1>
      @if($details->has_shipping_method('flat_rate'))
        #{{ $daily_delivery_number }}
      @else
        #{{ $daily_order_number }}
      @endif
    </h1>
    <div class="customer">
      <strong>{{ $last_name }}, {{ $first_name }}</strong><br>
      <strong>Phone:</strong> {{ $phone }}<br>
      <strong>Order #:</strong> {{ $order_number }}<br>
    </div>

    @foreach ($details->get_items() as $item_id => $item)
      @php                      
        $prod_id = $item->get_product_id(); 
        $quantity = $item->get_quantity();
        $product_name = $item->get_name();
        $product_meta_objects = $item->get_meta_data();

        $cooler_override = $item->get_meta( '_cooler', true );

        // Check to see if line items have been refunded
        $order = wc_get_order( $order_number );
        $order_refunds = $order->get_refunds();  
        $refund_item_id = "";
        $total_qty = $prod_quantity;
        $line_item_id = $item->get_id();

        if($order_refunds) {
          foreach( $order_refunds as $refund ){
            foreach( $refund->get_items() as $item_id => $item ){

                ## --- Using WC_Order_Item_Product methods --- ##
                $refund_item_id = $item->get_meta('_refunded_item_id');
                $refunded_quantity      = $item->get_quantity(); // Quantity: zero or negative integer
                $refunded_line_subtotal = $item->get_subtotal(); // line subtotal: zero or negative number
            }
          }
          if($line_item_id == $refund_item_id) {
            $total_qty = $prod_quantity + $refunded_quantity;
          }    
        }

      @endphp

      @unless($list_type === "shelf" && $is_packing_list == true || $total_qty == 0)

        @if(in_array($prod_id, $cooler_array))
          @php
            $cooler_count++;
          @endphp

          @if($cooler_count == 1)
            <span class="storage">Cooler Items</span>
          @endif
          <div class="items">
            <div class="item_content">
              <strong>{!! $product_name !!}</strong><br>

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
      @endunless
    @endforeach
    
    @foreach ($details->get_items() as $item_id => $item)

      @php                                         
        $prod_id = $item->get_product_id(); 
        $quantity = $item->get_quantity();
        $product_name = $item->get_name();
        $product_meta_objects = $item->get_meta_data();

        $cooler_override = $item->get_meta( '_cooler', true );

        // Check to see if line items have been refunded
        $order = wc_get_order( $order_number );
        $order_refunds = $order->get_refunds();  
        $refund_item_id = "";
        $total_qty = $prod_quantity;
        $line_item_id = $item->get_id();

        if($order_refunds) {
          foreach( $order_refunds as $refund ){
            foreach( $refund->get_items() as $item_id => $item ){

                ## --- Using WC_Order_Item_Product methods --- ##
                $refund_item_id = $item->get_meta('_refunded_item_id');
                $refunded_quantity      = $item->get_quantity(); // Quantity: zero or negative integer
                $refunded_line_subtotal = $item->get_subtotal(); // line subtotal: zero or negative number
            }
          }
          if($line_item_id == $refund_item_id) {
            $total_qty = $prod_quantity + $refunded_quantity;
          }    
        }

      @endphp

      @unless($list_type === "cooler" && $is_packing_list == true || $total_qty == 0)
        @if(!in_array($prod_id, $cooler_array))
          @php
            $shelf_count++;
          @endphp     

          @if($shelf_count == 1)
            <span class="storage">Shelf Items</span>
          @endif
          <div class="items">
            <div class="item_content">
              <strong>{!! $product_name !!}</strong><br>

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
      @endunless

    @endforeach
    
    @if($customer_note)
      <strong>Note:</strong><br>
      {{ $customer_note }}
    @endif
  
    <div class="page-break"></div>
  </div>
</div>