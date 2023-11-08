
{{-- This file controls the print-only content for printing out an individual order from the pickup list --}}
<button class="btn btn-default" onclick="printDiv('order-{{ $phoneOrder['TxID'] }}','receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="font-size: 17px;"> Print Receipt</i></button>
    

<div id="order-{{ $phoneOrder['TxID'] }}" class="d-none">
  @php
    $cooler_count = 0;
    $shelf_count = 0;

    // $date_selector_date = get_field('list_date');
    // $timeslot = $order->get_meta( 'pickup_timeslot', true );

  /*
  * Barcode Encoder tool
  * (C) 2008, Eric Stern
  * http://www.firehed.net, http://www.eric-stern.com
  *
  * This code may be re-used or re-distributed in any application, commercial
  * or non-commercial, free of charge provided that this credit remains intact.
  *
  */

  

  $barcode = 'T'.$phoneOrder['TxID'];

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
        {{ $pickupTimeSlot }}        
    </p>
    <h1>      
        {{ $daily_phone_order_number }}
    </h1>
    <div class="customer">
      @if($hasPaid)
        <strong>$$: </strong>Pre-Paid
      @else
        <strong>$$: </strong>Requires Payment
      @endif        
      <strong>{{ $phoneOrder['Customer']['AccountName'] }}</strong><br>
      <strong>Phone:</strong> {{ $phoneOrder['Customer']['Phone'] }}<br>
      <strong>Order #:</strong> POS - {{ $phoneOrder['TxID'] }}<br>       
    </div>

    @foreach ($phoneOrder['Details'] as $detail )                                          
      @unless($detail['Item']['CategoryID'] === "123" || $detail['Item']['DepartmentName'] === "Modifier" || $detail['Item']['CategoryID'] == "70" )
        @unless($list_type === "shelf" && $is_packing_list == true)
          @php
            $prod_id = $detail['Item']['ItemID'];
            $cat_id = $detail['Item']['CategoryID'];
          @endphp

          @if(in_array($cat_id, $phone_cooler_array))
            @php
              $cooler_count++;
            @endphp

            @if($cooler_count == 1)
              <span class="storage">Cooler Items</span>
            @endif
            <div class="items">
              <div class="item_content">
                <strong>{{ $detail['Item']['ItemName'] }}</strong><br>

                @php 
                  $lineNumber = $detail['LineNumber'];
                  $instruction = "";
                  $instruction_desc = "";
                @endphp
                @if($has_instruction)
                  <ul>
                    @foreach($phoneOrder['Details'] as $instructionSearch)

                      @if($instructionSearch['ItemLineNumber'] === $lineNumber)
                      
                        @php
                          $has_instruction = TRUE;
                          $instruction = $instructionSearch['Item']['ItemName'];

                          if(isset($instructionSearch['ManualDescription'])) {
                            $instruction_desc = $instructionSearch['ManualDescription'];
                          }
                        @endphp

                        @if($instruction != 'Item Instruction')
                          <li>{{ $instruction }}</li>
                        @endif
                        @if($instruction_desc != '')
                          <li>{{ $instruction_desc }}</li> 
                        @endif
                      @endif                                    
                    @endforeach
                  </ul>
                @endif
              </div>
              <div class="qty"><span>{{ $detail['Qty'] }}</span></div> 
            </div>
            
          @endif
        @endunless
      @endunless
    @endforeach
    
    @foreach ($phoneOrder['Details'] as $detail )                                          
      @unless($detail['Item']['CategoryID'] === "123" || $detail['Item']['DepartmentName'] === "Modifier" || $detail['Item']['CategoryID'] == "70" )
      
        @unless($list_type === "cooler" && $is_packing_list == true)
          @php
            $prod_id = $detail['Item']['ItemID'];
            $cat_id = $detail['Item']['CategoryID'];            
          @endphp


          @if(!in_array($cat_id, $phone_cooler_array))
            @php
              $shelf_count++;
            @endphp 

            @if($shelf_count == 1)
              <span class="storage">Shelf Items</span>
            @endif
            <div class="items">
              <div class="item_content">
                <strong>{{ $detail['Item']['ItemName'] }}</strong><br>

                  @php 
                    $lineNumber = $detail['LineNumber'];
                    $instruction = "";
                    $instruction_desc = "";
                  @endphp
                  {{-- @if($has_instruction) --}}
                    <ul>
                      @foreach($phoneOrder['Details'] as $instructionSearch)
                        @if($instructionSearch['ItemLineNumber'] === $lineNumber)
                        
                          @php
                            $has_instruction = TRUE;
                            $instruction = $instructionSearch['Item']['ItemName'];

                            if(isset($instructionSearch['ManualDescription'])) {
                              $instruction_desc = $instructionSearch['ManualDescription'];
                            }
                          @endphp

                          @if($instruction != 'Item Instruction')
                            <li>{{ $instruction }}</li>
                          @endif
                          @if($instruction_desc != '')
                            <li>{{ $instruction_desc }}</li> 
                          @endif
                        @endif
                      @endforeach
                    </ul>
                  {{-- @endif --}}
              </div>
              <div class="qty"><span>{{ $detail['Qty'] }}</span></div> 
            </div>
          @endif
        @endunless
      @endunless
    @endforeach
    
    <br>
    <span style="font-size: 0.875rem; font-weight:bold; padding: 1.5rem 0;">{{ $bag_details }} @if($bag_quantity)({{ $bag_quantity }})@endif</span>
    <br><br>
    @php barcode::code39($barcode, 'app/uploads/barcodes/'.$barcode.'.png'); @endphp  
    <img src="/app/uploads/barcodes/{{ $barcode }}.png" />
    <div class="page-break"></div>
  </div>
</div>