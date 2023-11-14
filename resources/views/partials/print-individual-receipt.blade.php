{{-- This file controls the print-only content for printing out an individual order from the pickup list --}}

<button class="btn btn-default" onclick="printDiv('order-{{ $order['order_id'] }}','receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="font-size: 17px;"> Print Receipt</i></button>
                                
<div id="order-{{ $order['order_id'] }}" class="d-none">
  @php
      $cooler_count = 0;
      $shelf_count = 0;
      $freezer_count = 0;
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
        border-bottom: dotted 1px #000;
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
    }
    
  </style>

  <div class="print-order">
    <p class="date">
      <strong>{{ $date_selector_date }}</strong> <br>
      @if($order['delivery_method'] == "delivery")
        <p class="timeslot">Delivery</p>
      @else
        <p class="timeslot">{{ $order['timeslot'] }}</p>
      @endif
    </p>
    <h1>
      @if($order['delivery_method'] == "delivery")
        #{{ $daily_delivery_number }}
      @elseif ($order['order_type'] == 'web')
        #{{ $daily_order_number }}
      @else
        #{{ $daily_phone_order_number }}
      @endif
    </h1>
    <div class="customer">
      @if($order['order_type'] == 'phone')
        @if($order['paid'])
          <strong>$$: </strong>Pre-Paid<br>
        @else
          <strong>$$: </strong>Requires Payment<br>
        @endif 
      @endif
      <strong>{{ $order['customer_name'] }}</strong><br>
      <strong>Phone:</strong> {{ $order['phone'] }}<br>
      <strong>Order #:</strong> @if($order['order_type'] == 'phone') #POS @endif {{ $order['order_id'] }}<br>      
      {{-- @if($is_wholesale_user)
        <strong>Paid with:</strong> {{ $payment_method }}
      @endif --}}
    </div>

    
    @foreach ( $order['items'] as $item )
      @if ($item['shelf_type'] == $list_type || $item['shelf_type'] == 'unknown')
        @php
          if ($item['shelf_type'] == "shelf") {
            $shelf_count++;
          }
          elseif ($item['shelf_type'] == "cooler") {
            $cooler_count++;
          }
          elseif ($item['shelf_type'] == "freezer") {
            $freezer_count++;
          }
        @endphp

        @if($cooler_count == 1)
          <span class="storage">Cooler Items</span>
        @elseif($shelf_count == 1)
          <span class="storage">Shelf Items</span>
          @elseif($freezer_count == 1)
          <span class="storage">Freezer Items</span>
        @endif
        <div class="items">
          <div class="item_content">
            <strong>{!! $item['name'] !!}</strong><br>
            @if ($item['instruction'])
              @foreach ($item['instruction'] as $key => $value)
              <span class="{!! $key !!} meta"> {!! $value !!}</span>
              @endforeach
            @endif

            @if ($item['warning'])
              @if($order['order_type'] == 'phone')
                <p class="note"><strong>(!)</strong> Missing ItemNumber in the POS</p>
              @else
                <span class="note meta"> !! {{ $item['warning'] }}</span>
              @endif
            @endif
          </div>
          <div class="qty"><span>{{ $item['total_quantity'] }}</span></div> 
        </div>
      @endif
    @endforeach
    
    @if($order['order_type'] == 'web')
      @if ($order['customer_note'])
        <span class="notes">{{ $order['customer_note'] }}</span>
      @endif
    @endif
    <br>
    <span style="font-size: 0.875rem; font-weight:bold; padding-top: 1.5rem;">{{ $order['bag_details'] }}</span>
  
    <div class="page-break"></div>
  </div>
</div>