{{--
  Template Name: Baking List
--}}

@extends('layouts.lists')

@php
  $post_id = get_the_ID();
  do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');

// Get order data!
  $query = new WC_Order_Query( array(  
      'limit' => -1,
      // 'orderby' => 'name',
      // 'order' => 'asc',
      'status' => 'processing',
  ) );
  $results = $query->get_orders();

//Create filtered list of orders based on the date selected on list page.
  $filtered_orders = array();

  foreach ( $results as $daily_results ) {    
    $order_id = $daily_results->get_id();
    $order_pickup_date = $daily_results->get_meta('pickup_date');
          
    if ($order_pickup_date === $date_selector_date) {
      $filtered_orders[] = $daily_results;
    }
  }
  
  foreach($filtered_orders as $details) {

    foreach ($details->get_items() as $item_id => $item) {

      $prod_id = $item->get_product_id(); 
      $prod_quantity = $item->get_quantity();

      $variation_id = $item->get_variation_id(); 

      $product_raw = get_product($prod_id);
      $product = $item->get_product($prod_id);
      $prod_name = $product_raw->get_name();

      $categories = $product->get_categories();
      $variation_categories = $product_raw->get_categories();
      $variation_categories_name = $variation_categories->name;

      print_r($variation_categories_name);

      if (empty($variation_id)) {        
        $prod[] = array('name' => $prod_name, 'quantity' => $prod_quantity, 'category' => $categories); 
      }
      else {
        $variation_attributes = $product->get_attributes();
        $option = $product->get_attribute( 'variety' );
        $prod[] = array('name' => $prod_name ." - " .$option , 'quantity' => $prod_quantity, 'category' => $variation_categories); 
      }
    }
  }

  // extract the values name and quantity, compare for matches, sum up matched, then output unique with total sums as new array
  $aSortedArray = array();
  foreach ($prod as $aArray) {
    $bSet = false;
    foreach ($aSortedArray as $iPos => $aTempSortedArray) {
      if($aTempSortedArray['name'] == $aArray['name']) {
        $aSortedArray[$iPos]['quantity'] += $aArray['quantity'];
        $bSet = true;
      }
    }
    if(!$bSet) {
      $aSortedArray[] = array(
        'name' => $aArray['name'], 
        'quantity' => $aArray['quantity'],
        'category' => $aArray['category']
        );
    }
  }

  // Item quantity (ex: 1/2 dozen buns would be 6 buns)
  function itemQuantity($name) {
    if(strpos($name, "- Dozen") !== false){
      return 12;
    } 
    elseif(strpos($name, "1/2 Dozen") !== false){
      return 6;
    }
    else{
      return 1;
    }
  }
@endphp

@section('content')

  <div class="container">
    <div class="row no-gutters">
      <table id="lists" class="display">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Pkg. Quantity</th>
            <th>Total Items</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($aSortedArray as $item )
            @php 
              $name = $item['name'];
              $category = $item['category'];
              $quantity = $item['quantity'];                      
              $item_quantity = call_user_func('itemQuantity', $name);
              $total_items = $item_quantity * $quantity;  
            @endphp
            <tr>
              <td>{{ $name }}</td>
              <td>{!! $category !!}</td>
              <td>{{ $quantity }}</td>
              <td>{{ $total_items }}</td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>

@endsection