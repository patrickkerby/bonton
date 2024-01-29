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



$results = null;
$orders = ListPhoneorders::ordersarray($phonedata, $results);  

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
          
      @endphp

      <table id="lists" class="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Bags</th>
            <th>Pickup</th>
            <th>Location</th>
            <th>Pickup Date</th>
            <th>Payment</th>
            <th>Delivery/Pickup</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>

          @if ($orders['phone_orders'])
            @foreach ($orders['phone_orders'] as $order)  
              {{-- @if($selectedDateComparisonFormat == $order['pickup_date']) --}}

                <tr valign="top">
                  <td>
                    {{ $daily_phone_order_number }}
                  </td>
                  <td>
                    <strong>{{ $order['customer_name'] }} (#{{ $order['order_id'] }})</strong>
                    <br><br>
                    {{ $order['phone'] }}
                    @php 
                    
                      $barcode = 'T'.$order['order_id'];
                      barcode::code39($barcode, 'app/uploads/barcodes/'.$barcode.'.png'); 
                    @endphp  
                    <br><br><img src="/app/uploads/barcodes/{{ $barcode }}.png" />    
                  </td>

                  <td>{{ $order['bag_details'] }} @if($order['bag_quantity'])({{ $order['bag_quantity'] }})@endif</td>
                  <td class="location">
                    @if($order['delivery_method'] == "delivery")
                      <p class="timeslot">Delivery</p>
                    @else
                    <p class="timeslot">{{ $order['timeslot'] }}</p>
                    @endif
                  </td>
                  <td class="location">
                    @if(in_array('cooler', $order['product_locations']))
                      <span class="order_location cooler">C</span>
                    @endif
                    @if(in_array('shelf', $order['product_locations']))
                      <span class="order_location shelf">S</span>
                    @endif
                    @if(in_array('freezer', $order['product_locations']))
                      <span class="order_location freezer cooler">F</span>
                    @endif
                  </td>                  
                  <td>{{ $order['pickup_date'] }}</td>
                  <td>@if($order['paid']) Pre-paid @else - @endif</td>
                  <td>
                    {{ $order['delivery_method'] }}
                  <td>
                    <table style="width: 100%;">
                      <thead>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Details</th>
                      </thead>
                      <tbody>
                        @foreach ( $order['items'] as $item )
                          <tr>
                            <td class="qty_cell">
                              <span class="qty">{{ $item['total_quantity'] }}</span>
                            </td>
                            <td class="prod_name_cell">
                              <span class="prod_name">{!! $item['name'] !!} 
                                @if ($item['warning'])
                                  <span class="note meta"><strong data-toggle="tooltip" data-placement="top" title="check POS ItemNumber, make sure it matches WC ID">(!)</strong></span>
                                @endif</span>
                            </td>
                            <td class="details_cell">                            
                              @if ($item['instruction'])
                                @foreach ($item['instruction'] as $key => $value)
                                <span class="{!! $key !!} meta"> {!! $value !!}</span>
                                @endforeach
                              @endif                              
                            </td>
                          </tr>
                        @endforeach
                      </tbody>
                    </table>
                  </td>
                </tr>
                @php
                    $daily_phone_order_number++;
                @endphp
            {{-- @endif --}}
          @endforeach
          @endif
        </tbody>
      </table>
    </div>
  </div>
@endsection