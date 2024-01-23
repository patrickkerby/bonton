{{--
  Template Name: Baking List
--}}

@extends('layouts.lists')
@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );
  $excluded_categories = array();
  $excluded_category_ids = array();
  date_default_timezone_set('MST');
  $dateformat = "l, F j, Y";
  $date_selector_date = get_field('list_date');
  $pickupdate_object = DateTime::createFromFormat($dateformat, $date_selector_date);
  $selectedDateComparisonFormatted = $pickupdate_object->format('Y-m-d'); //This is to compare agains POS date format
  $prod = array();
  $phone_prod = array();
  $warning = false;

  $selectedDateComparisonFormat = $pickupdate_object->format('Y-m-d'); //This is to compare agains POS date format


  //Get phone orders data
  $seen_phone_ids = [];
  function removeUselessArrays($array) {
    $newArray = [];
    foreach ($array as $key => $value) {
      if (is_array($value)) {
          if (array_keys($value) === [ 0 ]) {
              $newArray[$key] = removeUselessArrays($value);
          } else {
              $newArray[$key] = removeUselessArrays($value);
          }
      } else {
          $newArray[$key] = $value;
      }
    }
    return $newArray;
  }

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

  $jsonDataArray = array_merge(...$jsonDataArray); 

  // Normalize quantities into individual items based on package size
  // function itemQuantity($package_size) {
  //   if($package_size == "Dozen"){
  //     return 12;
  //   } 
  //   elseif($package_size == "1/2 Dozen"){
  //     return 6;
  //   } 
  //   elseif($package_size == "6 Pack"){
  //     return 6;
  //   } 
  //   elseif($package_size == "Bag of 10"){
  //     return 10;
  //   } 
  //   elseif($package_size == "Pack of 10"){
  //     return 10;
  //   } 
  //   elseif($package_size == "Pack of 8"){
  //     return 8;
  //   } 
  //   else{
  //     return 1;
  //   }
  // }

// Get order data!
  $query = new WC_Order_Query( array(
      'limit' => -1,
      // 'orderby' => 'name',
      // 'order' => 'asc',
      // 'status' => array('wc-processing', 'ws-processing'),
      'status' => array('wc-processing', 'ws-processing', 'wc-completed'),
      'pickup_date' => $date_selector_date,
  ) );
  $results = $query->get_orders();

  $orders_data = BakingList::ordersarray($phonedata, $results);  
  $phone_orders = array();
  $web_orders = array();

  foreach($orders_data['phone_orders'] as $order) {
    if($selectedDateComparisonFormat == $order['pickup_date']) {
      foreach ($order['items'] as $item) {
        $phone_orders[] = $item;
      }
    }
  }
  foreach($orders_data['web_orders'] as $order) {
    if($selectedDateComparisonFormat == $order['pickup_date']) {
      foreach ($order['items'] as $item) {
        $web_orders[] = $item;
      }
    }
  }
  
$order_data = array_merge($phone_orders, $web_orders);



  // print('<pre>'.print_r($order_data,true).'</pre>');
  



  // // Create filtered list of orders based on the date selected on list page.
  // $filtered_orders = array();
  // $filtered_phone_orders = array();

  // foreach ( $results as $daily_results ) {
  //   $order_id = $daily_results->get_id();
  //   $order_pickup_date = $daily_results->get_meta('pickup_date');
          
  //   if ($order_pickup_date === $date_selector_date) {
  //     $filtered_orders[] = $daily_results;
  //   }
  // }

  // //Now do the same for phone orders
  // foreach($jsonDataArray as $phoneOrder) {    
  //   $pickupDateRaw = $phoneOrder['RequestTime'];
  //   $pickupDate = substr($pickupDateRaw, 0, 10);

  //   if($selectedDateComparisonFormatted == $pickupDate ) {
  //     $filtered_phone_orders[] = $phoneOrder;
  //   }
  // }

  


  // // Get line item info from phone orders
  // foreach($filtered_phone_orders as $details) {
  //   if (in_array($details['TxID'], $seen_phone_ids)) {
  //     continue;
  //   }
  //   $seen_phone_ids[] = $details['TxID']; 
    
  //   foreach ($details['Details'] as $item) {
  //     $cat_id = $item['Item']['CategoryID'];
  //     $cat_name = $item['Item']['CategoryName'];
  //     $prod_quantity = $item['Qty'];
  //     $prod_name = $item['Item']['ItemName'];
  //     $itemNumber = $item['Item']['ItemNumber'];
  //     $prod_object = wc_get_product($itemNumber);
  //     $total_qty = $prod_quantity;
  //     $prod_id = '';


  //     if($cat_id == "123" || $cat_id == "163" || $item['Item']['DepartmentName'] === "Modifier" ) {
  //       // do not add to array        
  //     }
  //     else if ($prod_object) {
  //       $prod_name = $prod_object->get_name();
  //       $variation_id = $itemNumber; // because all of these should already be variations
  //       $prod_id = $prod_object->get_parent_id(); // get the variation parent product id. not sure if we need it
  //       $option = $prod_object->get_attribute( 'variety' );
  //       $topping = $prod_object->get_attribute( 'topping' );
  //       $package_size = $prod_object->get_attribute( 'package-size' );
  //       $product_size = $prod_object->get_attribute( 'size' );
  //       $product_type = $prod_object->get_type();

  //       //Filter the list of categories to exclude terms that have been excluded via ACF
  //       $category_names = array();
  //       $term_obj_list = get_the_terms( $prod_id, 'product_cat' );

  //       if ($term_obj_list) {
  //         foreach ($term_obj_list as $term) {
  //           $baking_exlusion = get_field('baking_list_exclusion', 'product_cat_' . $term->term_id); //Gets the ACF field using term_id
            
  //           //Create an array of IDs to be excluded
  //           if($baking_exlusion == true) {
  //             array_push($excluded_category_ids, $term->term_id);
  //           }

  //           //Remove the duplicates created by the loop
  //           $excluded_categories = array_unique($excluded_category_ids);

  //           //While we're looping the terms, create array of term names
  //           if(!in_array($term->term_id, $excluded_categories)) {
  //             array_push($category_names, $term->name);
  //           }
  //         }
  //       }
  //       $categories = implode(', ', $category_names);            
  //       $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));

  //       // $item_quantity = call_user_func('itemQuantity', $package_size);
  //       $item_quantity = BakingList::itemquantity($package_size);

  //       $total_qty = $item_quantity * $total_qty;

  //       //size, option, topping
  //       if (!empty($option) && !empty($product_size) && !empty($topping)) {
  //         $phone_prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping ." (".$product_size .") " , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }
  //       //option, topping
  //       if (!empty($option) && empty($product_size) && !empty($topping)) {
  //         $phone_prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }
  //       //size, topping
  //       if (empty($option) && !empty($product_size) && !empty($topping)) {
  //         $phone_prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }
  //       //option, size
  //       if (!empty($option) && !empty($product_size)) {
  //         $phone_prod[] = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $total_qty, 'product_id' => $variation_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }
  //       //option
  //       elseif (!empty($option) && empty($product_size)) {
  //         $phone_prod[] = array('name' => $prod_name ." - " .$option, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }
  //       //size
  //       elseif (!empty($product_size) && empty($option)) {
  //         $phone_prod[] = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }
  //       else {
  //         $phone_prod[] = array('name' => $prod_name , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }                
  //     }      
  //     else {
  //       $phone_prod[] = array('name' => $prod_name, 'total_quantity' => $total_qty, 'product_id' => $prod_id, 'variation_id' => null, 'category' => null, 'category_parent' => null, 'warning' => true); 
  //     } 
  //   }
  // }

  // // Get line item info from web orders  
  // foreach($filtered_orders as $details) {
  //   $order_id = $details->get_id();
    
  //   foreach ($details->get_items() as $item_id => $item) {
  //     $prod_id = $item->get_product_id(); 
  //     $prod_quantity = $item->get_quantity();
  //     $variation_id = $item->get_variation_id(); 
  //     $product = $item->get_product();

  //     $prod_name = $item->get_name();
  //     $option = $product->get_attribute( 'variety' );
  //     $topping = $product->get_attribute( 'topping' );
  //     $package_size = $product->get_attribute( 'package-size' );
  //     $product_size = $product->get_attribute( 'size' );

  //     // Check to see if line items have been refunded
  //     $order = wc_get_order( $order_id );
  //     $order_refunds = $order->get_refunds();
  //     $refund_item_id = "";
  //     $total_qty = $prod_quantity;
  //     if($order_refunds) {
  //       foreach( $order_refunds as $refund ){
  //         foreach( $refund->get_items() as $item_id => $item ){

  //             ## --- Using WC_Order_Item_Product methods --- ##
  //             $refund_item_id = $item -> get_product_id();
  //             $refunded_quantity      = $item->get_quantity(); // Quantity: zero or negative integer
  //             $refunded_line_subtotal = $item->get_subtotal(); // line subtotal: zero or negative number
  //         }
  //       }

  //       if($prod_id == $refund_item_id) {
  //         $total_qty = $prod_quantity + $refunded_quantity;
  //       }                        
  //     }

  //     //Filter the list of categories to exclude terms that have been excluded via ACF
  //     $category_names = array();
  //     $term_obj_list = get_the_terms( $prod_id, 'product_cat' );

  //     foreach ($term_obj_list as $term) {
  //       $baking_exlusion = get_field('baking_list_exclusion', 'product_cat_' . $term->term_id); //Gets the ACF field using term_id
        
  //       //Create an array of IDs to be excluded
  //       if($baking_exlusion == true) {
  //         array_push($excluded_category_ids, $term->term_id);
  //       }

  //       //Remove the duplicates created by the loop
  //       $excluded_categories = array_unique($excluded_category_ids);

  //       //While we're looping the terms, create array of term names
  //       if(!in_array($term->term_id, $excluded_categories)) {
  //         array_push($category_names, $term->name);
  //       }
  //     }
  //     $categories = implode(', ', $category_names);            
  //     $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));

  //     //Hide bundle parent items, as they're not really needed for the baking list
  //     if (wc_pb_is_bundle_container_order_item($item)) {
  //         $is_bundle_parent = true;
  //     }
  //     else {
  //       $is_bundle_parent = false;
  //     }

  //     // $item_quantity = call_user_func('itemQuantity', $package_size);
  //     $item_quantity = BakingList::itemquantity($package_size);

  //     $total_qty = $item_quantity * $total_qty;  

  //     if (empty($is_bundle_parent)) {  
  //       if (!empty($variation_id)) {  
  //         //size, option, topping
  //         if (!empty($option) && !empty($product_size) && !empty($topping)) {
  //           $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping ." (".$product_size .") " , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //         }
  //         //option, topping
  //         if (!empty($option) && empty($product_size) && !empty($topping)) {
  //           $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //         }
  //         //size, topping
  //         if (empty($option) && !empty($product_size) && !empty($topping)) {
  //           $prod[] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //         }
  //         //option, size
  //         if (!empty($option) && !empty($product_size)) {
  //           $prod[] = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $total_qty, 'product_id' => $variation_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //         }
  //         //option
  //         elseif (!empty($option) && empty($product_size)) {
  //           $prod[] = array('name' => $prod_name ." - " .$option, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //         }
  //         //size
  //         elseif (!empty($product_size) && empty($option)) {
  //           $prod[] = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //         }
  //         else {
  //           $prod[] = array('name' => $prod_name , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //         }
  //       }
  //       else {
  //         $prod[] = array('name' => $prod_name, 'total_quantity' => $total_qty, 'product_id' => $prod_id, 'variation_id' => null, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => false); 
  //       }
  //     }
  //   }
  // }

    // $merged_prod = array_merge($prod, $phone_prod);



  // extract the values name and quantity, compare for matches, sum up matched, then output unique with total sums as new array
  $aSortedArray = array();
  
  if (isset($web_orders)) {
    foreach ($web_orders as $aArray) {
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
          'product_id' => $aArray['product_id'],
          'variation_id' => $aArray['variation_id'],
          'warning' => false
          );
      }
    }
  }

  // do the same for phone orders
  $aSortedArray_Phone = array();
  
  if (isset($phone_orders)) {
    foreach ($phone_orders as $aArray) {
      $bSet = false;
      foreach ($aSortedArray_Phone as $iPos => $aTempSortedArray) {
        if($aTempSortedArray['name'] == $aArray['name']) {
          $aSortedArray_Phone[$iPos]['total_quantity'] += $aArray['total_quantity'];
          $bSet = true;
        }
      }
      if(!$bSet) {
        $aSortedArray_Phone[] = array(
          'name' => $aArray['name'], 
          'total_quantity' => $aArray['total_quantity'],
          'category' => $aArray['category'],
          'category_parent' => $aArray['category_parent'],
          'product_id' => $aArray['product_id'],
          'variation_id' => $aArray['variation_id'],
          'warning' => $aArray['warning']
        );
      }
    }
  }

   // do the same for merged orders
   $aSortedArray_Merged = array();
  
  if (isset($order_data)) {
    foreach ($order_data as $aArray) {
      $bSet = false;
      foreach ($aSortedArray_Merged as $iPos => $aTempSortedArray) {
        if($aTempSortedArray['name'] == $aArray['name']) {
          $aSortedArray_Merged[$iPos]['total_quantity'] += $aArray['total_quantity'];
          $bSet = true;
        }
      }
      if(!$bSet) {
        $aSortedArray_Merged[] = array(
          'name' => $aArray['name'], 
          'total_quantity' => $aArray['total_quantity'],
          'category' => $aArray['category'],
          'category_parent' => $aArray['category_parent'],
          'product_id' => $aArray['product_id'],
          'variation_id' => $aArray['variation_id'],
          'warning' => $aArray['warning']
        );
      }
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
            <th>Product/Variation ID</th>
            <th>Category</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($aSortedArray_Merged as $item )
            @php 
              $name = $item['name'];
              $category = $item['category'];
              $product_id = $item['product_id'];
              $variation_id = $item['variation_id'];
              $category_parent = $item['category_parent'];
              $total_quantity = $item['total_quantity'];
              $warning = $item['warning'];
            @endphp
            <tr>
              <td>
                @if($warning)
                  <strong 
                    @if ($warning == 1)
                    data-toggle="tooltip" data-placement="top" title="check POS ItemNumber, make sure it matches WC ID"
                    @else
                    data-toggle="tooltip" data-placement="top" title="{{ $warning }}" 
                    @endif
                  >(!)</strong>
                  
                @endif
                {!! $name !!}</td>
              <td>
                @if($variation_id)
                  {{ $product_id }} / {{ $variation_id }}
                @elseif($product_id)
                  {{ $product_id }} /
                @else
                  --
                @endif
              </td>
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
    </div><br><br><br><br>
    <h2>Phone Orders</h2>
    <div class="row no-gutters">
      <table id="lists" class="display">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product/Variation ID</th>
            <th>Category</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($aSortedArray_Phone as $item )
            @php 
              $name = $item['name'];
              $category = $item['category'];
              $product_id = $item['product_id'];
              $variation_id = $item['variation_id'];
              $category_parent = $item['category_parent'];
              $total_quantity = $item['total_quantity'];
              $warning = $item['warning'];
            @endphp
            <tr>
              <td>
                @if($warning)
                  <strong>(!)</strong>
                @endif
                {!! $name !!}</td>
              <td>
                @if($variation_id)
                  {{ $product_id }} / {{ $variation_id }}
                @elseif($product_id)
                  {{ $product_id }} /
                @else
                  --
                @endif
              </td>
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
    </div><br><br><br><br>
    <div class="row no-gutters">
      <h2>Web Orders</h2>
      <table id="lists" class="display">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product/Variation ID</th>
            <th>Category</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($aSortedArray as $item )
            @php 
              $name = $item['name'];
              $category = $item['category'];
              $product_id = $item['product_id'];
              $variation_id = $item['variation_id'];
              $category_parent = $item['category_parent'];
              $total_quantity = $item['total_quantity'];
            @endphp
            <tr>
              <td>{!! $name !!}</td>
              <td>{{ $product_id }} / {{ $variation_id }}</td>
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