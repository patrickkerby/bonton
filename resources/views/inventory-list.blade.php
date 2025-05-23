{{--
  Template Name: Time Range List
--}}

@extends('layouts.lists')
@section('content')

@php
  $post_id = get_the_ID();
  $bundle_parent_value = "";
  $date_selector_date = get_field('list_date');

  if ( isset($_POST['to']) && isset($_POST['from']))  { // Save post data to session. Only use session data from here on in.
		$date1 = $_POST['from'];
		$date2 = $_POST['to'];

		//Format the date in a few different ways.
		// 1 - We pass a php variable back to js in order to prepopulate the calendar with session data it needs dd-mm-yyyy
		// 2 - We need a version in mm/dd/yy that will convert via PHP to a version spelled out to compare product availability ex: "Tuesday"
		// $date1 = str_replace('/', '-', $date1);
		$date1_std = date('m-d-Y', strtotime($date1)); //formatted to go into the jquery datepicker as a preset date
		$date2_std = date('m-d-Y', strtotime($date2)); //formatted to go into the jquery datepicker as a preset date
		$date1_cal = date('l, F j, Y', strtotime($date1));
		$date2_cal = date('l, F j, Y', strtotime($date2));

    $date_time1 = date('l, F j, Y', strtotime($date1));
    $date_time2 = date('l, F j, Y', strtotime($date2));
    
    function createRange($start, $end, $format = 'l, F j, Y') {
      $start  = new DateTime($start);
      $end    = new DateTime($end);
      $invert = $start > $end;

      $dates = array();
      $dates[] = $start->format($format);
      while ($start != $end) {
          $start->modify(($invert ? '-' : '+') . '1 day');
          $dates[] = $start->format($format);
      }
      return $dates;
    }

    $range = createRange($date_time1, $date_time2);
  }

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
    elseif($package_size == "Pack of 10"){
      return 10;
    } 
    elseif($package_size == "Pack of 8"){
      return 8;
    } 
    else{
      return 1;
    }
  }

  if (isset($range)) {
    $date_range = $range;
  }
  else {
    // $date_range = array();
    $date_range = false;
  }
@endphp

@if($date_range == true)
  @foreach($date_range as $day)
    @php
      // This uses a custom filter that allows us to query the customvar 'pickup_date' rather than looping through all processing orders and date matching.
      $filtered_orders = wc_get_orders( 
      array( 
        'pickup_date' => $day,
        'status' => array('wc-processing', 'wc-completed'),
        'limit' => -1
      ) );
    @endphp
  
    @foreach($filtered_orders as $details)
      @php
        $order_pickup_date = $details->get_meta('pickup_date');
        $order_id = $details->get_id();      
      @endphp
          
      @foreach ($details->get_items() as $item_id => $item)
        @php 
          $prod_id = $item->get_product_id(); 
          $prod_quantity = $item->get_quantity();
          $variation_id = $item->get_variation_id(); 
          $product = $item->get_product();
          $prod_name = $item->get_name();
          // $excluded_categories = array(83,84,94); // use these to exclude categories from appearing.              
          $categories = wc_get_product_category_list($prod_id);
          $term_obj_list = get_the_terms( $prod_id, 'product_cat' );
          $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));
          $option = $product->get_attribute( 'variety' );
          $topping = $product->get_attribute( 'topping' );
          $package_size = $product->get_attribute( 'package-size' );
          $product_size = $product->get_attribute( 'size' );

          // Check to see if line items have been refunded
          $order = wc_get_order( $order_id );
            $order_refunds = $order->get_refunds();
            $refund_item_id = "";
            $total_qty = $prod_quantity;
            $line_item_id = $item->get_id();

            if($order_refunds) {
              foreach( $order_refunds as $refund ){
                foreach( $refund->get_items() as $item_id => $item ){
                  ## --- Using WC_Order_Item_Product methods --- ##
                  $refund_item_id = $item->get_meta('_refunded_item_id');
                  $refunded_quantity      = $item->get_quantity(); // Quantity: zero or negative integer
                  $refunded_line_subtotal = $item->get_subtotal(); // line subtotal: zero or negative number
                }
              }
              if($line_item_id == $refund_item_id) {
                $total_qty = $prod_quantity + $refunded_quantity;
              }    
            }

          if (wc_pb_is_bundle_container_order_item($item)) {
            $is_bundle_parent = true;
          }
          else {
            $is_bundle_parent = false;
          }

          $item_quantity = call_user_func('itemQuantity', $package_size);
          $quantity = $item_quantity * $total_qty;  

          if (empty($is_bundle_parent)) {  
            if (!empty($variation_id)) {  
                //size, option, topping
              if (!empty($option) && !empty($product_size) && !empty($topping)) {
                $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping ." (".$product_size .") " , 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id, 'day' => $order_pickup_date); 
              }
              //option, topping
              if (!empty($option) && empty($product_size) && !empty($topping)) {
                $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id, 'day' => $order_pickup_date); 
              }
              //size, topping
              if (empty($option) && !empty($product_size) && !empty($topping)) {
                $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id, 'day' => $order_pickup_date); 
              }
              //option, size
              if (!empty($option) && !empty($product_size)) {
                $prod[] = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id,'day' => $order_pickup_date); 
              }
              //option
              elseif (!empty($option) && empty($product_size)) {
                $prod[] = array('name' => $prod_name ." - " .$option, 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id, 'day' => $order_pickup_date); 
              }
              //size
              elseif (!empty($product_size) && empty($option)) {
                $prod[] = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id, 'day' => $order_pickup_date); 
              }
              else {
                $prod[] = array('name' => $prod_name , 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id, 'day' => $order_pickup_date); 
              }
            }
            else {
              $prod[] = array('name' => $prod_name, 'total_quantity' => $quantity, 'category' => $categories, 'category_parent' => $parent_cat_id, 'day' => $order_pickup_date, 'is_bundle_parent' => $is_bundle_parent); 
            }
          }
        @endphp
      @endforeach
    @endforeach

    @if(isset($prod))
      @php
        // Reduce the products array down so that any duplicates per day are combined with their totals summed
        $filteredProducts = array();
        $productsPerDay = array_reduce(
          $prod,
          function($filteredProducts, $value) {
            
            $key = $value['name']." - ".$value['day'];

            if (!isset($filteredProducts[$key])) {
              $filteredProducts[$key] = $value;
            }
            
            else {
              $filteredProducts[$key]['total_quantity'] += $value['total_quantity'];              
            }

            return $filteredProducts;
          },
          $filteredProducts
        );

        // Reorganize the filteredProducts array to be grouped by date        
          foreach($productsPerDay as $value){

            if(isset($value['is_bundle_parent'])) {
              $dailyProducts[$value['day']][$value['name']] = array('quantity' => $value['total_quantity'], 'category' => $value['category'], 'is_bundle_parent' => $bundle_parent_value);
            }
            else {
              $dailyProducts[$value['day']][$value['name']] = array('quantity' => $value['total_quantity'], 'category' => $value['category']);
            }
          }

        // Array of ALL products ordered in time range
        $listedProducts = array_column($productsPerDay, 'name');
        $uniqueListedProducts = array_unique($listedProducts);

        // print("<pre>".print_r($prod,true)."</pre>");
        // print("<pre>".print_r($dailyProducts,true)."</pre>");
      @endphp
    @endif
    @endforeach
    <div class="container-fluid">
      <div class="row no-gutters">        
        <table id="lists" class="display">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              @isset($dailyProducts)
                @foreach ($dailyProducts as $key => $value)
                  <th>{{ $key }}</th>
                @endforeach
              @endisset
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            @isset($uniqueListedProducts)
              @foreach ($uniqueListedProducts as $product)
              @php
                $totalQuantity = 0;
              @endphp
              <tr>
                <td style="min-width: 350px;">{{ $product }}</td>
                @foreach ($dailyProducts as $key => $value)
                    @if (array_key_exists($product, $value))
                      @php
                          $category = $value[$product]['category'];
                      @endphp 
                  @endif
                @endforeach
                <td style="min-width: 220px; font-size: 14px;">{!! $category !!}</td>

                @foreach ($dailyProducts as $key => $value)

                    @if(array_key_exists($product, $value))
                    
                      @foreach ($value as $k => $v)

                        @if ($k == $product)

                        @php
                          $totalQuantity += $v['quantity'];
                        @endphp

                        <td>
                          {{ $v['quantity'] }}
                        </td>
                        @endif

                      @endforeach

                    @else              
                      <td>0</td>
                    @endif
                @endforeach
                <td>
                  {{ $totalQuantity }}
                </td>
              </tr>
              @endforeach
            @endisset
          </tbody>
        </table>
      </div>
    </div>
@endif
@endsection