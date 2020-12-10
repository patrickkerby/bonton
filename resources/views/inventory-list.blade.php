{{--
  Template Name: Time Range List
--}}

@extends('layouts.lists')
@section('content')

@php
  $post_id = get_the_ID();
  // do_action( 'acf/save_post', $post_id );

  $date_selector_date = get_field('list_date');

  if ( isset($_POST['to']) && isset($_POST['from']))  { // Save post data to session. Only use session data from here on in.
		$date1 = $_POST['from'];
		$date2 = $_POST['to'];

		//Format the date in a few different ways.
		// 1 - We pass a php variable back to js in order to prepopulate the calendar with session data it needs dd-mm-yyyy
		// 2 - We need a version in mm/dd/yy that will convert via PHP to a version spelled out to compare product availability ex: "Tuesday"
		// $date1 = str_replace('/', '-', $date1);
		$date1_std = date('m-d-Y', strtotime($date1)); //formatted to go into the jquery datepicker as a preset date
		$date1_cal = date('l, F j, Y', strtotime($date1));
		$date2_cal = date('l, F j, Y', strtotime($date2));

    $range = new DatePeriod(
     new DateTime($date1_cal),
     new DateInterval('P1D'),
     new DateTime($date2_cal)
    );

    $range_selected = array();
    foreach ($range as $key => $value) {
      $range_selected[] = $value->format('l, F j, Y');       
    }
  }
  

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


  if (isset($range_selected)) {
    $date_range = $range_selected;
  }
  else {
    $date_range = array();
  }

foreach ($date_range as $day) {
  // This uses a custom filter that allows us to query the customvar 'pickup_date' rather than looping through all processing orders and date matching.
  $filtered_orders = wc_get_orders( 
  array( 
    'pickup_date' => $day,
    'status' => 'processing'
    ) );

  foreach($filtered_orders as $details) {
    $order_pickup_date = $details->get_meta('pickup_date');
        
    foreach ($details->get_items() as $item_id => $item) {

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
      $package_size = $product->get_attribute( 'package-size' );
      $product_size = $product->get_attribute( 'size' );

      $item_quantity = call_user_func('itemQuantity', $package_size);
      $quantity = $item_quantity * $prod_quantity;  

      if (!empty($variation_id)) {  
        if (!empty($option) && !empty($product_size)) {
          $prod[] = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $quantity, 'category' => $categories, 'day' => $order_pickup_date); 
        }
        elseif (!empty($option) && empty($product_size)) {
          $prod[] = array('name' => $prod_name ." - " .$option, 'total_quantity' => $quantity, 'category' => $categories, 'day' => $order_pickup_date); 
        }
        elseif (!empty($product_size) && empty($option)) {
          $prod[] = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $quantity, 'category' => $categories, 'day' => $order_pickup_date); 
        }
        else {
          $prod[] = array('name' => $prod_name , 'total_quantity' => $quantity, 'category' => $categories, 'day' => $order_pickup_date); 
        }
      }
      else {
        $prod[] = array('name' => $prod_name, 'total_quantity' => $quantity, 'category' => $categories, 'day' => $order_pickup_date); 
      }
    }
  }
}
  
// Reduce the products array down so that any duplicates per day are combined with their totals summed
  $filteredProducts = array();
  $productsPerDay = array_reduce(
      $prod,
      function($filteredProducts, $value) {
          $key = $value['name']." - ".$value['day'];
          if (!isset($filteredProducts[$key])) {
              $filteredProducts[$key] = $value;
          } else {
              $filteredProducts[$key]['total_quantity'] += $value['total_quantity'];              
          }
          return $filteredProducts;
      },
      $filteredProducts
  );

// Reorganize the filteredProducts array to be grouped by date
  foreach($productsPerDay as $value){
   $dailyProducts[$value['day']][$value['name']] = array('quantity' => $value['total_quantity'], 'category' => $value['category']);
  }

// Array of ALL products ordered in time range
  $listedProducts = array_column($productsPerDay, 'name');
  $uniqueListedProducts = array_unique($listedProducts);

  print("<pre>".print_r($dailyProducts,true)."</pre>");
  // print("<pre>".print_r($uniqueListedProducts,true)."</pre>");

@endphp

  
  {{-- @foreach ($uniqueListedProducts as $item)
    <div>
      <strong>{{ $item }}</strong>
      
    </div>          
  @endforeach --}}

    
    
<div class="container-fluid">
  <div class="row no-gutters">

    
    <table id="lists" class="display">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          @foreach ($dailyProducts as $key => $value)
            <th>{{ $key }}</th>
          @endforeach
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
          
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
      </tbody>
    </table>
  </div>
</div>
@endsection