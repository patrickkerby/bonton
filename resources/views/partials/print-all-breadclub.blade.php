{{-- This file controls the print-only content for printing out all orders from the pickup list --}}
@php 
  $daily_order_number = 900;
@endphp

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
      $qty = $item->get_quantity();
      $location = $product->get_attribute( 'Location' );
      $product_size = $product->get_attribute( 'Size' );
      $sliced_meta = $item->get_meta( 'Sliced Option', true );
      $product_meta_objects = $item->get_meta_data();                  
      $hidden_meta = array( "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping" );
    @endphp

    @if ($prod_id == 18200 && $date_for_comparison > 1674226526 && $date_for_comparison < 1677052892) 
    @php 
        $daily_order_number++; 
        $product_sizes_array[] = $product_size;

        if ($qty === 2) {
          $product_sizes_array[] = $product_size;
        }

        if ($qty === 3) {
          $product_sizes_array[] = $product_size;
          $product_sizes_array[] = $product_size;
        }
      @endphp
                            
      <div id="order-{{ $order_number }}" class="">    
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
              width: 1.75in;
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
            {{ $location }}
          </p>

          <h1>{{ $daily_order_number }}</h1>
          
          <span class="storage">{{ $lastName }}, {{ $firstName }}</span>              
          <div class="items">
            <div class="item_content">
              <strong>{{ $product_size }}</strong><br>
            </div>
          </div>           
            
            @if($customer_note)
              <strong>Note:</strong><br>
              {{ $customer_note }}
            @endif

          <div class="page-break"></div>
        </div>

        @if ($qty === 2)
          @php
            $daily_order_number++; 
          @endphp

          <div class="print-order">

            <p class="date">
              <strong>{{ $date_selector_date }}</strong> <br> 
              {{ $location }}
            </p>

            <h1>{{ $daily_order_number }}</h1>
            <div class="customer">
              <strong>{{ $lastName }}, {{ $firstName }}</strong><br>
            </div>
            <span class="storage">Shelf Items</span>              
            <div class="items">
              <div class="item_content">
                <strong>{{ $product_size }}</strong><br>
                <div class="qty"><span>{{ $qty }}</span></div> 
              </div>
            </div>           
              
              @if($customer_note)
                <strong>Note:</strong><br>
                {{ $customer_note }}
              @endif
          
            <div class="page-break"></div>
          </div>
        @endif
      </div>
    @endif
  @endforeach
@endforeach