{{--
  Template Name: Delivery Export
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

    window.addEventListener("afterprint", (event) => {
      document.body.innerHTML = originalContents;
    });
  }
</script>

@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');
  $is_packing_list = false;
  $is_storetodoor = true;
  date_default_timezone_set('MST');
  $dateformat = "l, F j, Y";
  $pickupdate_object = DateTime::createFromFormat($dateformat, $date_selector_date);      
  $selectedDateComparisonFormat = $pickupdate_object->format('Y-m-d'); //This is to compare agains POS date format


  //function for creating unique arrays from a key/value set
  function unique_multidim_array($array, $key) {
    $temp_array = array();
    $i = 0;
    $key_array = array();
   
    foreach($array as $val) {
        if (!in_array($val[$key], $key_array)) {
            $key_array[$i] = $val[$key];
            $temp_array[$i] = $val;
        }
        $i++;
    }
    return $temp_array;
}

// Users query
  $user_ids = (array) get_users([
    'role'       => 'customer',
    'number'     => -1,
    'fields'     => 'ID',
  ]);

// Get order data!
  $query = new WC_Order_Query( array(  
      'limit' => -1,
      // 'orderby' => 'name',
      // 'order' => 'asc',
      // 'customer_id' => $user_ids, //This limits the query to customers only (excludes wholesale)
      'status' => array('wc-processing', 'wc-completed'),
      'pickup_date' => $date_selector_date,

  ) );
  $results = $query->get_orders();
  
//Create filtered list of orders based on the date selected on list page.
  $filtered_orders = array();
  $timeslot_array = array();
  $filtered_orders_print = array();

  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->get_id();
    $order_pickup_date = $daily_results->get_meta('pickup_date');
    $shipping_method = $daily_results->get_shipping_methods();
    // $timeslot = $daily_restuls->get_meta('_timeslot');
    
    if($daily_results->has_shipping_method('flat_rate') || $daily_results->has_shipping_method('free_shipping')) {
      $is_shipped = true;
    }
    else {
      $is_shipped = false;
    }

    //Create array of pickup timeslots, then loop through them to create two sets of filtered orders
    if ($order_pickup_date === $date_selector_date && $is_shipped) {
      $filtered_orders[] = $daily_results;
      $filtered_orders_print[] = $daily_results;
    }
  }

  // Sort the packing list by timeslot
  // $sorted_orders = array(); 
  // foreach ($filtered_orders as $order) {
  //   $timeslot = $order->get_meta( '_timeslot', true );
  //   $sorted_orders[] = $timeslot; //any object field
  // }

  // $timeslot_array = array_unique($sorted_orders);
  // array_multisort($sorted_orders, SORT_ASC, $filtered_orders);



  //THIS IS NOT FUTURE PROOF. INSTEAD OF MANUAL IDS BELOW, PUT AN OPTION IN THE CATEGORY FOR FREEZER, SHELF, OR COOLER.
//THEN GET ALL CATEGORIES (ONCE). USE LIST TYPE (SHELF/COOLER/FREEZER) TO ONLY QUERY APPROPRIATE PRODUCTS THE FIREST TIME AROUND.

//Cooler List
$cooler_list = array(  '22', '53', '51','107','103' );
    $cooler_list_slugs = array('cakes', 'pies-flans', 'dips-salsa', 'individual-pastries', 'gluten-free-baked-goods');

// Shelf List
    $shelf_list = array( '91, 83, 52, 104, 13, 105, 135, 94, 102, 106, 54, 10, 67, 285, 289, 662 ' );
    $shelf_list_slugs = array('buns-bagels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'preserves-spreads-honey', 'sauces-dressings', 'treats-and-ice-cream', 'general-grocery', 'baking-ingredients', 'savoury-treats');

    //Product pages give an option to override the natural category and assign the product as cooler. Add to cooler array:
    $cooler_override_args = array(
      'status' => 'publish',
      'cooler' => '1',
      'return' => 'ids',
      'limit' => '-1'
    );
    $cooler_overrides = wc_get_products( $cooler_override_args );

    //Product pages give an option to override the natural category and assign the product as shelf. Add to shelf array:
    $shelf_override_args = array(
      'status' => 'publish',
      'shelf' => '1',
      'return' => 'ids',
      'limit' => '-1'
    );
    $shelf_overrides = wc_get_products( $shelf_override_args );

    $cooler_args = array(
      'status' => 'publish',
      'category' => $cooler_list_slugs,
      'limit' => -1,
      'return' => 'ids',
      'exclude' => $shelf_overrides
    );
    $cooler_array = wc_get_products( $cooler_args );
    $cooler_array = array_merge($cooler_array,$cooler_overrides);

    $shelf_args = array(
      'status' => 'publish',
      'category' => $shelf_list_slugs,
      'limit' => -1,
      'return' => 'ids',
      'exclude' => $cooler_overrides
    );
    $shelf_array = wc_get_products( $shelf_args );
    $shelf_array = array_merge($shelf_array,$shelf_overrides);

    $daily_order_number = 100;
    $daily_breadclub_number = 900;

    // Hide specific meta data from the details column. List the items by key here:
    $hidden_meta = array( "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping" );

    

  // $unique_array = unique_multidim_array($filtered_orders,'_timeslot');

@endphp

@section('content')
  <div class="row">
    <div class="col-sm-12">

    {{-- @foreach ($timeslot_array as $timeslot) --}}
              
      {{-- <h2>{!! $timeslot !!}</h2> --}}
      
      <table id="lists{{ $loop->iteration }}" class="display">
        <thead> 
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Name</th>
            <th colspan="5">Location ( Unit number / Street Address / City / Province / Postal Code )</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>what3words (Optional)</th>
            <th>Deeleeo Details</th>
            <td class="d-print-none">Order Details to Print</td>
          </tr>
        </thead>
        <tbody>  
          <tr>
            <td>*Customer name / Order ID</td>
            <td>Unit/apt # (Optional)</td>
            <td>Street Address</td>
            <td>City</td>
            <td>Province (ie: Alberta, not AB)</td>
            {{-- <th>Country</th> --}}
            <td>Postal code</td>
            <td>valid email address if no phone provided this becomes mandatory</td>
            <td>10 digit number of the recipient or shipper - if no email provided this becomes mandatory</td>
            <td>///optional.data.here</td>
            <td>Pick up/Drop off instruction (is it a home/apt/office?) and Unit/Buzzer numbers. Info about the package) Other phone numbers, etc. </td>
            {{-- <th>Number of Packages</th> --}}
            <td class="d-print-none">Order Details to Print</td>
          </tr>
          @foreach ($filtered_orders as $details)
            @php 
              $phone = $details->get_billing_phone();
              $email = $details->get_billing_email();
              $order_id = $details->get_id();
              $first_name = $details->get_shipping_first_name();
              $last_name = $details->get_shipping_last_name();
              $address1 = $details->get_shipping_address_1();
              $address2 = $details->get_shipping_address_2();
              $unitno_shipping = $details->get_meta( 'shipping_unitno', true );
              $unitno_billing = $details->get_meta( 'billing_unitno', true );
              $city = $details->get_shipping_city();
              $state = $details->get_shipping_state();
              $postcode = $details->get_shipping_postcode();
              $status = $details->get_status();
              $customer_note = $details->get_customer_note();
              $order_timeslot = $details->get_meta( '_timeslot', true );
              $location = $details->get_meta( 'pickuplocation', true );
              $order_number = $details->get_id();  
            @endphp

            {{-- @if($order_timeslot == $timeslot) --}}
              <tr>
                <td class="name"><strong>{{ $last_name }}, {{ $first_name }}</strong></td>
                <td>
                  @if($unitno_shipping)
                  {{ $unitno_shipping }}
                  @else
                  {{ $unitno_billing }}
                  @endif
                </td>
                <td class="">
                  {{ $address1 }} {{ $address2 }}
                </td>
                <td>{{ $city }}</td>
                <td>{{ $state }}</td>
                {{-- <td>Canada</td> --}}
                <td>{{ $postcode }}</td>
                <td class="email">{{ $email }}</td>
                <td class="phone">{{ $phone }}</td>
                <td></td>
                <td class="notes">{{ $customer_note }}</td>
                <td class="d-print-none">
                  @include('partials.print-individual-shipping')
                </td>
              </tr>   
            {{-- @endif --}}     
          @endforeach

          {{-- Begin phone orders for delivery --}}
          @php
            $seen_phone_ids = [];

            //phone orders: get data from ftp folder created by POS software
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
          @foreach($jsonDataArray as $phoneOrder)
          @php
            //Dates            
            $pickupDateRaw = $phoneOrder[0]['RequestTime'];
            $pickupDate = substr($pickupDateRaw, 0, 10);
            
            //General Variables
            $is_delivery = false;
            $has_instruction = false;
            $has_ManualDesc = false;
            $barcode = 'T'.$phoneOrder[0]['TxID'];
            $hasPaid = $phoneOrder[0]['Tenders'];              

            foreach ($phoneOrder[0]['Details'] as $detail ) {                                
              if ($detail['Item']['ItemName'] === "Item Instruction" || isset($detail['ManualDescription']) && $detail['ManualDescription'] != '') {
                $has_instruction = TRUE;
              }
              if(in_array("Edmonton Delivery", $detail['Item'])) {
                $is_delivery = TRUE;
              }
            }              
          @endphp
          
          @if($selectedDateComparisonFormat == $pickupDate && $is_delivery )
            @php
              if (in_array($phoneOrder[0]['TxID'], $seen_phone_ids)) {
                continue;
              }
              $seen_phone_ids[] = $phoneOrder[0]['TxID'];

              $email = $phoneOrder[0]['Customer']['EMail'];
              $phone = $phoneOrder[0]['Customer']['Phone'];
              $postal = $phoneOrder[0]['Customer']['Postal'];
              $province = $phoneOrder[0]['Customer']['Province'];
              $city = $phoneOrder[0]['Customer']['City'];
              $address = $phoneOrder[0]['Customer']['Address'];
            @endphp
            <tr valign="top">              
              <td class="name"><strong>{{ $phoneOrder[0]['Customer']['AccountName'] }}</strong></td>
              <td>
                
              </td>
              <td class="">
                @if($address) {{ $address }} @endif
              </td>
              <td>@if($city) {{ $city }} @endif</td>
              <td>@if($province) {{ $province }} @endif</td>
              {{-- <td>Canada</td> --}}
              <td>@if($postal) {{ $postal }} @endif</td>
              <td class="email">@if($email) {{ $email }} @endif</td>
              <td class="phone">@if($phone) {{ $phone }} @endif</td>
              <td></td>
              <td class="notes"></td>
              <td class="d-print-none">
                @include('partials.print-individual-shipping')
              </td>

            </tr>
          @endif
        @endforeach

        </tbody>
      </table>
      
      <br><br>
      {{-- @endforeach     --}}
      <button class="btn btn-default" onclick="printDiv('receipt-printer-all', 'receiptPrint')"><i class="fa fa-print" aria-hidden="true" style="    font-size: 17px;">Print All Order Items </i></button>

      <div id="receipt-printer-all" class="d-none">
        @include('partials.print-all-delivery-contents')
      </div>   
    </div>
  </div>
@endsection