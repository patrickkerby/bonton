{{-- This file controls the print-only content for printing out an individual order from the pickup list --}}

<button class="btn btn-default" onclick="printDiv('order-{{ $phoneOrder[0]['TxID'] }}','receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="font-size: 17px;"> Print Receipt</i></button>
                                
<div id="order-{{ $phoneOrder[0]['TxID'] }}" class="d-none">
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

  class barcode {
    protected static $code39 = array(
    '0' => 'bwbwwwbbbwbbbwbw','1' => 'bbbwbwwwbwbwbbbw',
    '2' => 'bwbbbwwwbwbwbbbw','3' => 'bbbwbbbwwwbwbwbw',
    '4' => 'bwbwwwbbbwbwbbbw','5' => 'bbbwbwwwbbbwbwbw',
    '6' => 'bwbbbwwwbbbwbwbw','7' => 'bwbwwwbwbbbwbbbw',
    '8' => 'bbbwbwwwbwbbbwbw','9' => 'bwbbbwwwbwbbbwbw',
    'A' => 'bbbwbwbwwwbwbbbw','B' => 'bwbbbwbwwwbwbbbw',
    'C' => 'bbbwbbbwbwwwbwbw','D' => 'bwbwbbbwwwbwbbbw',
    'E' => 'bbbwbwbbbwwwbwbw','F' => 'bwbbbwbbbwwwbwbw',
    'G' => 'bwbwbwwwbbbwbbbw','H' => 'bbbwbwbwwwbbbwbw',
    'I' => 'bwbbbwbwwwbbbwbw','J' => 'bwbwbbbwwwbbbwbw',
    'K' => 'bbbwbwbwbwwwbbbw','L' => 'bwbbbwbwbwwwbbbw',
    'M' => 'bbbwbbbwbwbwwwbw','N' => 'bwbwbbbwbwwwbbbw',
    'O' => 'bbbwbwbbbwbwwwbw','P' => 'bwbbbwbbbwbwwwbw',
    'Q' => 'bwbwbwbbbwwwbbbw','R' => 'bbbwbwbwbbbwwwbw',
    'S' => 'bwbbbwbwbbbwwwbw','T' => 'bwbwbbbwbbbwwwbw',
    'U' => 'bbbwwwbwbwbwbbbw','V' => 'bwwwbbbwbwbwbbbw',
    'W' => 'bbbwwwbbbwbwbwbw','X' => 'bwwwbwbbbwbwbbbw',
    'Y' => 'bbbwwwbwbbbwbwbw','Z' => 'bwwwbbbwbbbwbwbw',
    '-' => 'bwwwbwbwbbbwbbbw','.' => 'bbbwwwbwbwbbbwbw',
    ' ' => 'bwwwbbbwbwbbbwbw','*' => 'bwwwbwbbbwbbbwbw',
    '$' => 'bwwwbwwwbwwwbwbw','/' => 'bwwwbwwwbwbwwwbw',
    '+' => 'bwwwbwbwwwbwwwbw','%' => 'bwbwwwbwwwbwwwbw');


    public static function code39($text, $filename=null, $height = 50, $widthScale = 1) {
        if (!preg_match('/^[A-Z0-9-. $+\/%]+$/i', $text)) {
        throw new Exception('Invalid text input.');
      }
      
      $text = '*' . strtoupper($text) . '*'; // *UPPERCASE TEXT*
      $length = strlen($text);

      $barcode = imageCreate($length * 16 * $widthScale, $height);

      $bg = imagecolorallocate($barcode, 255, 255, 0); //sets background to yellow
      imagecolortransparent($barcode, $bg); //makes that yellow transparent
      $black = imagecolorallocate($barcode, 0, 0, 0); //defines a color for black

      $chars = str_split($text);

      $colors = '';

      foreach ($chars as $char) {
        $colors .= self::$code39[$char];
      }

      foreach (str_split($colors) as $i => $color) {
        if ($color == 'b') {
          // imageLine($barcode, $i, 0, $i, $height-13, $black);
          imageFilledRectangle($barcode, $widthScale * $i, 0, $widthScale * ($i+1) -1 , $height-13, $black);
        }
      }

      //16px per bar-set, halved, minus 6px per char, halved (5*length)
      // $textcenter = $length * 5 * $widthScale;
      $textcenter = ($length * 8 * $widthScale) - ($length * 3);
      
      imageString($barcode, 2, $textcenter, $height-13, $text, $black);

      if (is_null($filename)) {
        header('Content-type: image/png');
        imagePNG($barcode);
        imageDestroy($barcode);
        exit;
      } else {
        imagePNG($barcode, $filename);
      }
    } // function code39
  } // class barcode

  $barcode = 'T'.$phoneOrder[0]['TxID'];

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
      <strong>{{ $phoneOrder[0]['Customer']['AccountName'] }}</strong><br>
      <strong>Phone:</strong> {{ $phoneOrder[0]['Customer']['Phone'] }}<br>
      <strong>Order #:</strong> POS - {{ $phoneOrder[0]['TxID'] }}<br> 
      @if($hasPaid)
        <strong>$$: </strong>Pre-Paid
      @else
        <strong>$$: </strong>Requires Payment
      @endif        
    </div>

    @foreach ($phoneOrder[0]['Details'] as $detail )                                          
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
                    @foreach($phoneOrder[0]['Details'] as $instructionSearch)

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
    
    @foreach ($phoneOrder[0]['Details'] as $detail )                                          
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
                  @if($has_instruction)
                    <ul>
                      @foreach($phoneOrder[0]['Details'] as $instructionSearch)
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
    
    <br>
    <span style="font-size: 0.875rem; font-weight:bold; padding: 1.5rem 0;">{{ $bag_details }}</span>
    <br><br>
    @php barcode::code39($barcode, 'app/uploads/barcodes/'.$barcode.'.png'); @endphp  
    <img src="/app/uploads/barcodes/{{ $barcode }}.png" />
    <div class="page-break"></div>
  </div>
</div>