{{--
  Template Name: Phone Orders List
--}}

@extends('layouts.lists')

@php
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
@endphp

@section('content')
  <div class="row">
    <div class="col-sm-12">

      @php
        $date_selector_date = get_field('list_date');
        // $date_selector_date = '31/08/2023';
        date_default_timezone_set('MST');
        $dateformat = "l, F j, Y";
        $pickupdate_object = DateTime::createFromFormat($dateformat, $date_selector_date);
        
        $selectedDateComparisonFormat = $pickupdate_object->format('Y-m-d'); //This is to compare agains POS date format

        $daily_phone_order_number = 700;

        $phone_cooler_array = array( '52', '32', '51','50' );
        $phone_shelf_array = array( '30', '34', '35','136','172' );

        $seen_phone_ids = [];

        $jsonDataArray = array();
        foreach (new DirectoryIterator('app/uploads/pos') as $fileInfo) {
          if($fileInfo->isDot()) continue;
            $path = $fileInfo->getFilename();
            $jsonString = file_get_contents('app/uploads/pos/'.$path);            
            $jsonData = json_decode($jsonString, true);
            
          if($jsonData) {
            $jsonDataArray[] = json_decode($jsonString, true);              
          }          
        }  
      @endphp

      <table id="lists" class="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Order #</th>
            <th>Phone</th>
            <th>Bags</th>
            <th>Pickup</th>
            <th>Location</th>
            <th>Notes</th>
            {{-- <th>Order Date</th> --}}
            <th>Pickup Date</th>
            <th>Payment</th>
            <th>Delivery/Pickup</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          @foreach($jsonDataArray as $phoneOrder)
          
            @php
              //Dates
              $orderDateRaw = $phoneOrder[0]['OpenTime'];
              $orderDate = substr($orderDateRaw, 0, 10);
              $pickupDateRaw = $phoneOrder[0]['RequestTime'];
              $pickupDate = substr($pickupDateRaw, 0, 10);
              $pickupTime = substr($pickupDateRaw, 11, 2); 
              
              //General Variables
              $is_delivery = false;
              $has_instruction = false;
              $has_ManualDesc = false;
              $barcode = 'T'.$phoneOrder[0]['TxID'];
              $daily_phone_order_number++;
              $hasPaid = $phoneOrder[0]['Tenders'];
              $bag_details = "";              
              foreach ($phoneOrder[0]['Details'] as $detail ) {                                
                if ($detail['Item']['ItemName'] === "Item Instruction" || isset($detail['ManualDescription']) && $detail['ManualDescription'] != '') {
                  $has_instruction = TRUE;
                }
                if($detail['Item']['CategoryID'] == "70") {
                  $bag_details = $detail['Item']['ItemName'];                  
                }
                if(in_array("Edmonton Delivery", $detail['Item'])) {
                  $is_delivery = TRUE;
                }
              }
            @endphp
            {{-- @if($selectedDateComparisonFormat == $pickupDate ) --}}

            @if($selectedDateComparisonFormat && !$is_delivery)
              @php
                if (in_array($phoneOrder[0]['TxID'], $seen_phone_ids)) {
                  continue;
                }
                $seen_phone_ids[] = $phoneOrder[0]['TxID'];                              
                
                if($pickupTime <= 11) {
                  $pickupTimeSlot = "Morning";
                }
                elseif($pickupTime > 10 && $pickupTime < 14 ) {
                  $pickupTimeSlot = "Midday";
                }
                else {
                  $pickupTimeSlot = "Afternoon";
                }              
              @endphp
              <tr valign="top">
                <td>{{ $daily_phone_order_number }}</td>
                <td>{{ $phoneOrder[0]['Customer']['AccountName'] }}</td>
                <td>
                  @php barcode::code39($barcode, 'app/uploads/barcodes/'.$barcode.'.png'); @endphp  
                  <img src="/app/uploads/barcodes/{{ $barcode  }}.png" />    
                </td>
                <td>POS - {{ $phoneOrder[0]['TxID'] }}</td>
                <td>{{ $phoneOrder[0]['Customer']['Phone'] }}</td>
                <td>{{ $bag_details }}</td>
                <td class="location"><p class="timeslot">{{ $pickupTimeSlot }}</p></td>
                <td class="location">
                  {{-- Check to see if the products associated with the order are shelf or cooler.      --}}
                  @php 
                    $responses = array(); @endphp
                    @foreach ($phoneOrder[0]['Details'] as $item )

                      @php 

                        $prod_id = $item['Item']['ItemID'];
                        $cat_id = $item['Item']['CategoryID'];
                                          
                        if(in_array($cat_id, $phone_cooler_array)) {
                          $responses[] = '<span class="order_location cooler">C</span>';   
                          $in_cooler = true; 
                        } 
                        // Add elseif for freezer list
                        else {  
                          $responses[] = '<span class="order_location shelf">S</span>';
                          $in_shelf = true;
                        }
                      @endphp
                    @endforeach
                    @php
                      $responses_unique = array_unique($responses);
                      $order_location = implode("", $responses_unique);
                    @endphp
                    {!! $order_location !!}
                </td>
                <td>{{ $phoneOrder[0]['Notes'] }}</td>
                {{-- <td>{{ $orderDate }}</td> --}}
                <td>{{ $pickupDate }}</td>
                <td>@if($hasPaid) Pre-paid @else - @endif</td>
                <td>@if($is_delivery) Delivery @else Pickup @endif</td>
                <td>
                  <table style="width: 100%;">
                    <thead>
                      <th>Qty</th>
                      <th>Item</th>
                    </thead>
                    <tbody>
                      @foreach ($phoneOrder[0]['Details'] as $detail )
                      @php
                        $cat_id = $detail['Item']['CategoryID'];
                      @endphp
                                          
                        @unless($detail['Item']['CategoryID'] === "123" || $detail['Item']['DepartmentName'] === "Modifier" )
                          <tr>
                            <td>
                              {{ $detail['Qty'] }}
                            </td>
                            <td style="margin-right: 1rem;">
                              {{ $detail['Item']['ItemName'] }}

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

                            </td>
                          </tr>
                        @endunless
                      @endforeach
                    </tbody>
                  </table>
                </td>
              </tr>
            @endif
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
@endsection