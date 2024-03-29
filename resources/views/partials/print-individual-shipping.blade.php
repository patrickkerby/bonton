{{-- This file controls the print-only content for printing out an individual order from the pickup list --}}

<button class="btn btn-default" onclick="printDiv('order-{{ $order_number }}','receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print Receipt</i></button>
                                
<div id="order-{{ $order_number }}" class="d-none">
  
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
    <p><strong>Delivery Date: </strong><br>{{ $date_selector_date }}</p>
    <p><strong>Time: </strong> {!! $timeslot !!}</p>
    <div class="customer">
      <strong>{{ $last_name }}, {{ $first_name }}</strong><br>
      <strong>Phone:</strong> {{ $phone }}<br>
      <strong>Address:</strong> {{ $address1 }} {{ $address2 }}<br>
      
        @if($unitno_shipping)
          <strong>Unit: </strong>{{ $unitno_shipping }}<br>
        @elseif($unitno_billing)
          <strong>Unit: </strong>{{ $unitno_billing }}<br>
        @else
        @endif
        <strong>City: </strong> {{ $city }} <br>
        <strong>Postcode: </strong>{{ $postcode }}
      </div>
    
    @if($customer_note)
      <strong>Note:</strong><br>
      {{ $customer_note }}
    @endif
  
    <div class="page-break"></div>
  </div>
</div>