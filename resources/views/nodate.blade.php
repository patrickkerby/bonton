{{--
  Template Name: Missing Dates List
--}}

@extends('layouts.lists')

@php
global $wpdb;

  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );
  $breadclub_id = 18200;
  $date_selector_date = get_field('list_date');
  $is_packing_list = false;

// Get order data!
  $query = new WC_Order_Query( array(  
      'limit' => -1,
      'status' => array('wc-processing'),
      'pickup_date' => '',
  ) );
  $results = $query->get_orders();

@endphp

@section('content')
  <div class="row">
    <div class="col-sm-12">
      <table id="lists" class="display">
        <thead>
          <tr>
            <th>Name</th>
            <th>Order #</th>
            <th>Phone</th>  
            <th>Pickup date</th>          
          </tr>
        </thead>
        <tbody>  
          @foreach ($results as $details )
            @php 
              $phone = $details->get_billing_phone();
              $order_id = $details->get_id();
              $email = $details->get_billing_email();
              $first_name = $details->get_billing_first_name();
              $last_name = $details->get_billing_last_name();
              $status = $details->get_status();
              $customer_note = $details->get_customer_note();
              $location = $details->get_meta( 'pickuplocation', true );
              $order_pickup_date = $details->get_meta( 'pickup_date', true );
              $order_number = $details->get_id();

            @endphp
            @if( !$order_pickup_date || $order_pickup_date === "")
            <tr>
              <td class="name">
                <strong>{{ $last_name }}, {{ $first_name }}</strong>
              </td>
              <td>{{ $order_number }}</td>
              <td class="phone">{{ $phone }}</td> 
              <td>{{ $order_pickup_date }}</td>             
            </tr>        
            @endif
          @endforeach

        </tbody>
      </table>
  
    </div>
  </div>
@endsection