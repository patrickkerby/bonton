{{--
  Template Name: Baking List
--}}

@extends('layouts.lists')
@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );
  $excluded_categories = array();
  $excluded_category_ids = array();

  $date_selector_date = get_field('list_date');

  function itemQuantity($package_size) {
    if($package_size == "Dozen"){
      return 12;
    } 
    elseif($package_size == "1/2 Dozen"){
      return 6;
    } 
    elseif($package_size == "6 Pack"){
      return 6;
    } 
    elseif($package_size == "Bag of 10"){
      return 10;
    } 
    elseif($package_size == "Pack of 8"){
      return 8;
    } 
    else{
      return 1;
    }
  }

// Get order data!
  $query = new WC_Order_Query( array(
      'limit' => -1,
      // 'orderby' => 'name',
      // 'order' => 'asc',
      'status' => array('wc-processing', 'ws-processing'),
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
    $order_id = $details->get_id();
    
    foreach ($details->get_items() as $item_id => $item) {

      $prod_id = $item->get_product_id(); 
      $prod_quantity = $item->get_quantity();
      $variation_id = $item->get_variation_id(); 
      $product = $item->get_product();
      $prod_name = $item->get_name();
      $option = $product->get_attribute( 'variety' );
      $topping = $product->get_attribute( 'topping' );
      $package_size = $product->get_attribute( 'package-size' );
      $product_size = $product->get_attribute( 'size' );

      // Check to see if line items have been refunded
      $order = wc_get_order( $order_id );
      $order_refunds = $order->get_refunds();
      $refund_item_id = "";
      $total_qty = $prod_quantity;
      if($order_refunds) {
        foreach( $order_refunds as $refund ){
          foreach( $refund->get_items() as $item_id => $item ){

              ## --- Using WC_Order_Item_Product methods --- ##
              $refund_item_id = $item -> get_product_id();
              $refunded_quantity      = $item->get_quantity(); // Quantity: zero or negative integer
              $refunded_line_subtotal = $item->get_subtotal(); // line subtotal: zero or negative number
          }
        }

        if($prod_id == $refund_item_id) {
          $total_qty = $prod_quantity + $refunded_quantity;
        }                        
      }

      //Filter the list of categories to exclude terms that have been excluded via ACF
      $category_names = array();
      $term_obj_list = get_the_terms( $prod_id, 'product_cat' );

      foreach ($term_obj_list as $term) {
        $baking_exlusion = get_field('baking_list_exclusion', 'product_cat_' . $term->term_id); //Gets the ACF field using term_id
        
        //Create an array of IDs to be excluded
        if($baking_exlusion == true) {
          array_push($excluded_category_ids, $term->term_id);
        }

        //Remove the duplicates created by the loop
        $excluded_categories = array_unique($excluded_category_ids);

        //While we're looping the terms, create array of term names
        if(!in_array($term->term_id, $excluded_categories)) {
          array_push($category_names, $term->name);
        }
      }
      $categories = implode(', ', $category_names);            
      $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));

      //Hide bundle parent items, as they're not really needed for the baking list
      if (wc_pb_is_bundle_container_order_item($item)) {
          $is_bundle_parent = true;
      }
      else {
        $is_bundle_parent = false;
      }

      $item_quantity = call_user_func('itemQuantity', $package_size);
      $total_qty = $item_quantity * $total_qty;  

      if (empty($is_bundle_parent)) {  
        if (!empty($variation_id)) {  
          //size, option, topping
          if (!empty($option) && !empty($product_size) && !empty($topping)) {
            $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping ." (".$product_size .") " , 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
          }
          //option, topping
          if (!empty($option) && empty($product_size) && !empty($topping)) {
            $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
          }
          //size, topping
          if (empty($option) && !empty($product_size) && !empty($topping)) {
            $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
          }
          //option, size
          if (!empty($option) && !empty($product_size)) {
            $prod[] = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
          }
          //option
          elseif (!empty($option) && empty($product_size)) {
            $prod[] = array('name' => $prod_name ." - " .$option, 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
          }
          //size
          elseif (!empty($product_size) && empty($option)) {
            $prod[] = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
          }
          else {
            $prod[] = array('name' => $prod_name , 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
          }
        }
        else {
          $prod[] = array('name' => $prod_name, 'total_quantity' => $total_qty, 'category' => $categories, 'category_parent' => $parent_cat_id); 
        }
      }
    }
  }

  // extract the values name and quantity, compare for matches, sum up matched, then output unique with total sums as new array
  $aSortedArray = array();
  
  foreach ($prod as $aArray) {
    $bSet = false;
    foreach ($aSortedArray as $iPos => $aTempSortedArray) {
      if($aTempSortedArray['name'] == $aArray['name']) {
        $aSortedArray[$iPos]['total_quantity'] += $aArray['total_quantity'];
        $bSet = true;
      }
    }
    if(!$bSet) {
      $aSortedArray[] = array(
        'name' => $aArray['name'], 
        'total_quantity' => $aArray['total_quantity'],
        'category' => $aArray['category'],
        'category_parent' => $aArray['category_parent'],
        );
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
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($aSortedArray as $item )
            @php 
              $name = $item['name'];
              $category = $item['category'];
              $category_parent = $item['category_parent'];
              $total_quantity = $item['total_quantity'];
            @endphp
            <tr>
              <td>{!! $name !!}</td>
              <td>
                @if (strpos($category_parent, '94') !== false)

                  <a href="#">Grocery, </a>
                @endif
                @unless(
                  $category == "picnic" || 
                  $category == "charcuterie" ||
                  $category == "date night" ||
                  $category == "gift ideas"
                )
                  {!! $category !!}
                @endunless
              </td>
              <td>{{ $total_quantity }}</td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>

@endsection