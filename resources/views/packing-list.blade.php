{{--
  Template Name: Packing List
--}}

@extends('layouts.lists')

<script>
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

    document.body.innerHTML = originalContents;
  }
</script>
 
@php

  $daily_order_number = 100;
  $daily_delivery_number = 500;
  $daily_phone_order_number = 700;
  $post_id = get_the_ID();
  $is_packing_list = true;
  
  $date_selector_date = get_field('list_date');
  date_default_timezone_set('MST');
  $dateformat = "l, F j, Y";
  $pickupdate_object = DateTime::createFromFormat($dateformat, $date_selector_date);      
  $selectedDateComparisonFormat = $pickupdate_object->format('Y-m-d'); //This is to compare agains POS date format

  // Get web order data!
  $query = new WC_Order_Query( array(  
    'limit' => -1,
    'status' => array('wc-processing', 'wc-completed'),
    'pickup_date' => $date_selector_date,
  ) );
  $results = $query->get_orders();
  
  $orders = PackingList::ordersarray($phonedata, $results);  

  print('<pre>'.print_r($orders,true).'</pre>');

@endphp
@section('content')

  <div class="row no-gutters">
    <div class="col-12">      
      <table id="lists" class="display {{ $list_type }}">
        <thead>
          <tr>
            <th width="3%">ID</th>
            <th width="5%">Pick-up</th>
            <th width="33%">Customer</th>
            <th width="61%" class="products">
              <span class="qty_header">Qty.</span>
              <span class="product">Product</span>
              <span class="details">Details</span>
            </th>
            <td class="d-print-none">Order Details to Print</td>
          </tr>
        </thead>
        <tbody>         
          @if ($orders['web_orders'])
            @foreach ($orders['web_orders'] as $order)  
              @if($selectedDateComparisonFormat == $order['pickup_date'])
                <tr class="pack @foreach($order['product_locations'] as $location){{ $location }} @endforeach">
                  <td class="id">
                    <span class="check"></span>
                    <span class="id">
                      @if($order['delivery_method'] == "delivery")
                        @php $daily_delivery_number++; @endphp
                        #{{ $daily_delivery_number }}
                      @else
                        @php $daily_order_number++; @endphp
                        #{{ $daily_order_number }}
                      @endif
                    </span>
                  </td>
                  <td class="location">
                    @if($order['delivery_method'] == "delivery")
                      <p class="timeslot">Delivery</p>
                    @else
                    <p class="timeslot">{{ $order['timeslot'] }}</p>
                    @endif
                  </td>
                  <td> 
                    <strong>{{ $order['customer_name'] }} (#{{ $order['order_id'] }})</strong>
                    <p>{{ $order['phone'] }}</p>
                    @if ($order['customer_note'])
                      <span class="notes">{{ $order['customer_note'] }}</span>
                    @endif
                  </td>
                  <td class="details_table">
                    <table>
                      @foreach ( $order['items'] as $item )
                        @if ($item['shelf_type'] == $list_type || $item['shelf_type'] == 'unknown' || $item['shelf_type'] == 'mixed')
                        <tr>
                          <td class="qty_cell">
                            <span class="qty">{{ $item['total_quantity'] }}</span>
                          </td>
                          <td class="prod_name_cell">
                            <span class="prod_name">{!! $item['name'] !!}</span>
                          </td>
                          <td class="details_cell">                            
                            @if ($item['instruction'])
                              @foreach ($item['instruction'] as $key => $value)
                              <span class="{!! $key !!} meta"> {!! $value !!}</span>
                              @endforeach
                            @endif
                            @if ($item['warning'])
                            <span class="note meta"> !! {{ $item['warning'] }}</span>
                            @endif
                          </td>
                        </tr> 
                        @endif
                      @endforeach
                    </table>
                  </td>
                  <td class="d-print-none">
                    <div id="hiddenPrint">
                      @include('partials.print-individual-receipt')
                      @include('partials.print-individual-card')
                    </div>
                  </td>
                </tr>
              @endif
            @endforeach
          @endif

          {{-- PHONE ORDERS --}}
          @if ($orders['phone_orders'])
          @foreach ($orders['phone_orders'] as $order)  
            @if($selectedDateComparisonFormat == $order['pickup_date'] )
            {{-- @if(in_array($list_type, $order['product_locations']) ||  in_array('unknown', $order['product_locations']) )   --}}
                <tr class="pack {{ $status }} {{ $list_class_marker }}">
                  <td class="id">
                    <span class="check"></span>
                    <span class="id">
                      @if($order['delivery_method'] == "delivery")
                        @php $daily_delivery_number++; @endphp
                        #{{ $daily_delivery_number }}
                      @else
                        @php $daily_phone_order_number++; @endphp
                        #{{ $daily_phone_order_number }}
                      @endif
                    </span>
                  </td>
                  <td class="location">
                    @if($order['delivery_method'] == "delivery")
                      <p class="timeslot">Delivery</p>
                    @else
                      <p class="timeslot">{{ $order['timeslot'] }}</p>
                    @endif                                    
                  </td>
                  <td> 
                    <strong>{{ $order['customer_name'] }} (#POS {{ $order['order_id'] }})</strong>
                    <p>{{ $order['phone'] }}</p>                    
                  </td>
                  <td class="details_table">
                    <table>
                      @foreach ( $order['items'] as $item )
                      @if ($item['shelf_type'] == $list_type || $item['shelf_type'] == 'unknown')
                        <tr>
                          <td class="qty_cell">
                            <span class="qty">{{ $item['total_quantity'] }}</span>                        
                          </td>
                          <td class="prod_name_cell">
                            <span class="prod_name">{{ $item['name'] }}</span>
                          </td>
                          <td class="details_cell">
                            <ul>
                              @if ($item['warning'])
                                <li><p class="note"><strong>(!)</strong> Missing ItemNumber in the POS</p></li>
                              @endif
                              @if ($item['instruction'])
                                @foreach ($item['instruction'] as $instruction)
                                  <li>{{ $instruction }}</li>
                                @endforeach
                              @endif
                            </ul>
                          </td>               
                        </tr> 
                        @endif
                      @endforeach
                    </table>
                  </td>
                  <td class="d-print-none">
                    <div id="hiddenPrint">
                      @include('partials.print-individual-receipt')
                      @include('partials.print-individual-card')
                    </div>
                  </td>
                </tr>
              @endif
            @endforeach
          @endif
        </tbody>
      </table>
      <div id="receipt-printer-all" class="d-none">
        {{-- @include('partials.print-shelf-cooler-receipt') --}}
      </div>
      <div id="card-printer-all" class="d-none">
        {{-- @include('partials.print-shelf-cooler-cards') --}}
      </div>
      <button class="btn btn-default" onclick="printDiv('receipt-printer-all', 'receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print All Orders (Receipt Printer)</i></button>
      <button class="btn btn-default" onclick="printDiv('card-printer-all', 'cardPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;"> Print All Orders (Cards)</i></button>
    </div>
  </div>
@endsection
