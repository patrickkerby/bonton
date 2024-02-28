

@php

// this used to be in the pikcuplist code. Pulled it out when reworking the data source. Will eventually need to hook a version of this back in.

// ******** BREAD CLUB IS NOT HOOKED UP TO ANYTHING. THIS IS FOR FUTURE INTEGRATION INTO THE NEW DATA SOURCE ******

//Get all orders that contain breadclub product
if ($breadcblub_enabled) {
  $bread_club_results = $wpdb->get_col("
    SELECT order_items.order_id
    FROM {$wpdb->prefix}woocommerce_order_items as order_items
    LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as order_item_meta ON order_items.order_item_id = order_item_meta.order_item_id
    LEFT JOIN {$wpdb->posts} AS posts ON order_items.order_id = posts.ID
    WHERE posts.post_type = 'shop_order'
    AND posts.post_status IN ( 'wc-processing', 'wc-completed' )
    AND order_items.order_item_type = 'line_item'
    AND order_item_meta.meta_key = '_product_id'
    AND order_item_meta.meta_value = '$breadclub_id'
  ");
}

// This is a custom function to perform recursive array searches. (regular in_array doesn't work for multidimensional arrays)
function in_array_r($needle, $haystack, $strict = false) {
  foreach ($haystack as $item) {
    if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && in_array_r($needle, $item, $strict))) {
        return true;
    }
  }
  return false;
}
  
  ///////// BREAD CLUB!!!!!!
  /// Check to see if customer is a bread club member
  if ($breadcblub_enabled) {

    $current_date = new \DateTime($date_selector_date);
    $current_day_of_week = $current_date->format('l');
    $current_date_for_comparison = $current_date->format('l, M, d');

    function getDatesInRange($dateFromString, $dateToString, $dayOfWeek) {
      $dateFrom = new \DateTime($dateFromString);
      $dateTo = new \DateTime($dateToString);
      $dates = [];

      if ($dateFrom > $dateTo) {
          return $dates;
      }

      if (1 != $dateFrom->format('N')) {
          $dateFrom->modify($dayOfWeek);
      }

      while ($dateFrom <= $dateTo) {
          $dates[] = $dateFrom->format('l, M, d');
          $dateFrom->modify('+1 week');
      }

      return $dates;
    }
  
    $program_loop = get_field('program_scheduler', 'option');
    $bread_club_dates = array();
    
    if($program_loop) {
      foreach ($program_loop as $program) {
        $start_date = $program['start_date'];
        $startDateString = new \DateTime($start_date);
        $dayOfWeek = $startDateString->format('l');
        $end_date = $program['end_date'];
        $bread_club_dates[] = getDatesInRange($start_date, $end_date, $dayOfWeek);      
      }
    }

    // Check if the date selected on page is actually a pickup day for Bread Club    
    if(in_array_r($current_date_for_comparison, $bread_club_dates)) {
      $is_today_breadclub = true;
    }
    else {
      $is_today_breadclub = false;
    }

    $breadclub_array = array();
    $breadclub_email_list = array();
    $breadclub_id_list = array();
  
    if($is_today_breadclub) {

      // Limit the list of bread club orders to only those that chose a pickup day equal to the day picked on page. If the date on page is even a breadclub day to begin with
      if ($bread_club_results) {      
        foreach ($bread_club_results as $order_id) {
          $order = wc_get_order($order_id);
          $get_date = $order->get_date_created();             
          $order_date_created = $get_date->date('Y-m-d');
          $date_for_comparison = strtotime($order_date_created);

          foreach ($order->get_items() as $item_id => $item) {
            $product = $item->get_product();
            $breadclub_pickup_day = $product->get_attribute( 'Pickup Day' );

            if(str_contains($breadclub_pickup_day, $current_day_of_week) && $date_for_comparison > 1650054601) {
              $breadclub_array[] = $order;
              $breadclub_email_list[] = $order->get_billing_email();
              $breadclub_id_list[] = $order->get_id();
            }
          }
        }
      }
      //combine the breadclub orders with the original set of orders for this day
      $combined_orders_raw = array_merge( $breadclub_array, $filtered_orders );
    }
  }
  else {
    //reset the combined orders to the original non-breadclub orders
    $combined_orders_raw = $filtered_orders;
  }
  $combined_orders = array_unique($combined_orders_raw);
