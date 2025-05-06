{{--
  Template Name: Pickup List
--}}

@extends('layouts.lists')

<script> //print script
  function printDiv(divName, printSize) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;    
    var body = document.body;
    body.classList.add(printSize);
    if (body.classList.contains("cardPrint")) {
      var pageRules = document.getElementById('cardSizes');
      let pageSizeString = '@page {size: 4in 5.5in;}';
      pageRules.innerHTML = pageSizeString;
    }
    window.print();
    
    window.addEventListener("afterprint", (event) => {
      document.body.innerHTML = originalContents;
    });
  }
</script>
@php

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

  global $wpdb;
  $post_id = get_the_ID();
  $breadclub_id = 18200;
  $is_packing_list = false;
  $is_storetodoor = false;
  $breadcblub_enabled = get_field('breadclub_active', 'option');

  $daily_order_number = 100;
  $daily_breadclub_number = 900;
  $daily_phone_order_number = 700;

  $date_selector_date = get_field('list_date');
  date_default_timezone_set('MST');
  $dateformat = "l, F j, Y";
  $pickupdate_object = DateTime::createFromFormat($dateformat, $date_selector_date);      
  $selectedDateComparisonFormat = $pickupdate_object->format('Y-m-d'); //This is to compare agains POS date format


// ---- ALL THE QUERIES!  ----- //

  //main products
  $query = new WC_Order_Query( array(  
    'limit' => -1,
    'pickup_date' => $date_selector_date,
    'status' => array('wc-processing', 'wc-completed'),
  ) );
  $results = $query->get_orders();

  $orders = PickupList::ordersarray($phonedata, $results);  


  @endphp

@section('content')
  <div class="row">
    <div class="col-sm-12">

      <table id="lists" class="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {{-- <th>Email</th> --}}
            <th>Order #</th>
            <th>Phone</th>
            <th>Bags</th>
            <th>Pickup</th>
            <th>Location</th>
            <th>Notes</th>
            <td class="d-print-none">Order Details to Print</td>
          </tr>
        </thead>
        <tbody>  
          @if ($orders['web_orders'])
            @foreach ($orders['web_orders'] as $order)  
              @if($selectedDateComparisonFormat == $order['pickup_date'] && $order['delivery_method'] != "delivery")
                
                <tr>
                  <td>
                    @if($order['delivery_method'] == "delivery")
                      @php $daily_delivery_number++; @endphp
                      #{{ $daily_delivery_number }}
                    @else
                      @php $daily_order_number++; @endphp
                      #{{ $daily_order_number }}
                    @endif
                  </td>
                  <td class="name">
                    <strong>{{ $order['customer_name'] }}</strong>
                  </td>
                  {{-- <td>{{ $order['email'] }}</td> --}}
                  <td>{{ $order['order_id'] }}</td>
                  <td class="phone">{{ $order['phone'] }}</td>
                  <td class="bags">{{ $order['bag_details'] }}</td>
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
                  <td class="notes">@if ($order['customer_note'])
                    <span class="notes">{{ $order['customer_note'] }}</span>
                  @endif</td>
                  <td class="d-print-none">
                    @include('partials.print-individual-receipt')
                  </td>
                </tr>
              @endif
            @endforeach
          @endif
          @if ($orders['phone_orders'])
            @foreach ($orders['phone_orders'] as $order)  
              @if($selectedDateComparisonFormat == $order['pickup_date'] && $order['delivery_method'] != "delivery")
                <tr>
                  <td>
                    @if($order['delivery_method'] == "delivery")
                      @php $daily_delivery_number++; @endphp
                      #{{ $daily_delivery_number }}
                    @else
                      @php $daily_phone_order_number++; @endphp
                      #{{ $daily_phone_order_number }}
                    @endif
                  </td>
                  <td class="name">
                    <strong>{{ $order['customer_name'] }}</strong>
                  </td>
                  {{-- <td>{{ $order['email'] }}</td> --}}
                  <td>T{{ $order['order_id'] }}</td>
                  <td class="phone">{{ $order['phone'] }}</td>
                  <td class="bags">{{ $order['bag_details'] }} @if($order['bag_quantity'])({{ $order['bag_quantity'] }})@endif
                    
                  </td>
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
                  <td class="notes">
                      {{-- Phone orders don't have order-level notes, only product level notes --}}
                  </td>
                  <td class="d-print-none">
                    @include('partials.print-individual-receipt')
                  </td>
                </tr>
              @endif
            @endforeach
          @endif
        </tbody>
      </table>
      <button class="btn btn-default" onclick="printDiv('receipt-printer-all', 'receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print All Orders (Receipt Printer)</i></button>

      <div id="receipt-printer-all" class="d-none">
        @include('partials.print-all-receipt')
      </div>
    </div>
  </div>
@endsection