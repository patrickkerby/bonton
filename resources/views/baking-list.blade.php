{{--
  Template Name: Baking List
--}}

@extends('layouts.lists')

@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');

  function itemQuantity($package_size) {
    if($package_size === "Dozen"){
      return 12;
    } 
    elseif($package_size === "1/2 Dozen"){
      return 6;
    } 
    elseif($package_size === "6 Pack"){
      return 6;
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
      
      // $product_raw = get_product($prod_id);
      $product = $item->get_product();
      $prod_name = $item->get_name();

      // $excluded_categories = array(83,84,94); // use these to exclude categories from appearing.
          
      $categories = wc_get_product_category_list($prod_id);

      $term_obj_list = get_the_terms( $prod_id, 'product_cat' );
      $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));

      $option = $product->get_attribute( 'variety' );
      $package_size = $product->get_attribute( 'package-size' );
      $product_size = $product->get_attribute( 'size' );

      $item_quantity = call_user_func('itemQuantity', $package_size);
      $quantity = $item_quantity * $prod_quantity;  

      if (!empty($variation_id)) {  
        if (!empty($option) && !empty($product_size)) {
          $prod[] = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id); 
        }
        elseif (!empty($option) && empty($product_size)) {
          $prod[] = array('name' => $prod_name ." - " .$option, 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id); 
        }
        elseif (!empty($product_size) && empty($option)) {
          $prod[] = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id); 
        }
        else {
          $prod[] = array('name' => $prod_name , 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id); 
        }
      }
      else {
        $prod[] = array('name' => $prod_name, 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id); 
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
              <td>{{ $name }}</td>
              <td>
                @if ($category_parent == 94)
                  <a href="#">Grocery, </a>
                @endif
                {!! $category !!}
              </td>
              <td>{{ $total_quantity }}</td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>

@endsection