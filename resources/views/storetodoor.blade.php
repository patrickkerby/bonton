{{--
  Template Name: Store To Door Export
--}}

@extends('layouts.lists')

@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');
  $is_packing_list = false;

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


// Get order data!
  $query = new WC_Order_Query( array(  
      'limit' => -1,
      // 'orderby' => 'name',
      // 'order' => 'asc',
      'status' => array('wc-processing', 'wc-completed'),
      'pickup_date' => $date_selector_date,

  ) );
  $results = $query->get_orders();

//Create filtered list of orders based on the date selected on list page.
  $filtered_orders = array();
  $timeslot_array = array();

  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->get_id();
    $order_pickup_date = $daily_results->get_meta('pickup_date');
    $shipping_method = $daily_results->get_shipping_methods();
    // $timeslot = $daily_restuls->get_meta('_timeslot');

    //Create array of pickup timeslots, then loop through them to create two sets of filtered orders
    

    if ($order_pickup_date === $date_selector_date && $daily_results->has_shipping_method('flat_rate')) {
      $filtered_orders[] = $daily_results;
    }
  }

  // Sort the packing list by timeslot
  $sorted_orders = array(); 
  foreach ($filtered_orders as $order) {
    $timeslot = $order->get_meta( '_timeslot', true );
    $sorted_orders[] = $timeslot; //any object field
  }

  
  $timeslot_array = array_unique($sorted_orders);
  array_multisort($sorted_orders, SORT_ASC, $filtered_orders);

  // $unique_array = unique_multidim_array($filtered_orders,'_timeslot');

@endphp

@section('content')
  <div class="row">
    <div class="col-sm-12">

    @foreach ($timeslot_array as $timeslot)
        
      
      <h2>{!! $timeslot !!}</h2>
      
      <table id="lists{{ $loop->iteration }}" class="display">
        <thead>
          <tr>
            <th>Recipient Name (Optional)</th>
            <th>Recipient Phone (Optional)</th>
            <th>Street Number</th>
            <th>Street</th>
            <th>Apartment / Unit (Optional)</th>
            <th>City</th>
            <th>Province / State</th>
            <th>Country</th>
            <th>Postal / ZIP Code</th>
            <th>Delivery Notes (Optional)</th>
            <th>Number of Packages</th>     
          </tr>
        </thead>
        <tbody>  
          @foreach ($filtered_orders as $details )
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

            @if ($order_timeslot == $timeslot)
              <tr>
                <td class="name"><strong>{{ $last_name }}, {{ $first_name }} <br> {!! $timeslot !!}</strong></td>
                <td class="phone">{{ $phone }}</td>
                <td class=""> 
                  {{ $address1 }}
                </td>
                <td class="">
                  {{ $address2 }}
                </td>
                <td>
                  @if($unitno_shipping)
                    {{ $unitno_shipping }}
                  @else
                    {{ $unitno_billing }}
                  @endif
                </td>
                <td>{{  $city }}</td>
                <td>{{ $state }}</td>
                <td>Canada</td>
                <td>{{ $postcode }}</td>
                <td class="notes">{{ $customer_note }}</td>              
                <td></td>
              </tr>   
            @endif
     
          @endforeach
        </tbody>
      </table>
      <br><br>
      @endforeach       
    </div>
  </div>
@endsection