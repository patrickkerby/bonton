<?php

namespace App\Controllers\Partials;

use DateTime;


trait PhoneOrders
{
  public function phonedata() 
	{
		$jsonDataArray = array();
		foreach (new \DirectoryIterator('app/uploads/pos') as $fileInfo) {
			if($fileInfo->isDot()) continue;
			
			$path = $fileInfo->getFilename();
			$jsonString = file_get_contents('app/uploads/pos/'.$path);            
			$jsonData = json_decode($jsonString, true);
									
			if($jsonData) {
				$jsonDataArray[] = json_decode($jsonString, true);              
			}              
		}
		$jsonDataArray = array_merge(...$jsonDataArray);

		return $jsonDataArray;
	}

  public static function itemquantity($package_size) {
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

  public function shelf_type() {
    //THIS IS NOT FUTURE PROOF. INSTEAD OF MANUAL IDS BELOW, PUT AN OPTION IN THE CATEGORY FOR FREEZER, SHELF, OR COOLER.
    //THEN GET ALL CATEGORIES (ONCE). USE LIST TYPE (SHELF/COOLER/FREEZER) TO ONLY QUERY APPROPRIATE PRODUCTS THE FIREST TIME AROUND.

    //Product pages give an option to override the natural category and assign the product as cooler. Add to cooler array:
    // ***IMPORTANT: for these to work, there is a custom filter in filters.php

      //Cooler List
      $cooler_list = array( '22, 53, 51, 107, 103' );
      $cooler_list_slugs = array('cakes', 'pies-flans', 'dips-salsa', 'individual-pastries', 'gluten-free-baked-goods');

      $shelf_list = array( '91, 83, 52, 104, 13, 105, 135, 94, 102, 106, 54, 10, 67, 285, 289, 662' );
      $shelf_list_slugs = array('buns-bagels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'preserves-spreads-honey', 'sauces-dressings', 'treats-and-ice-cream', 'general-grocery', 'baking-ingredients', 'savoury-treats');

      $cooler_override_args = array(
        'status' => 'publish',
        'cooler' => '1',
        'return' => 'ids',
        'limit' => '-1'
      );

      $shelf_override_args = array(
        'status' => 'publish',
        'shelf' => '1',
        'return' => 'ids',
        'limit' => '-1'
      );

      $cooler_overrides = wc_get_products( $cooler_override_args );
      $shelf_overrides = wc_get_products( $shelf_override_args );

      $cooler_args = array(
        'status' => 'publish',
        'category' => $cooler_list_slugs,
        'limit' => -1,
        'return' => 'ids',
        'exclude' => $shelf_overrides
      );

      $shelf_args = array(
        'status' => array('publish', 'draft'),
        'category' => $shelf_list_slugs,
        'limit' => -1,
        'return' => 'ids',
        'exclude' => $cooler_overrides
      );

      $cooler_array = wc_get_products( $cooler_args );
      $cooler_array = array_merge($cooler_array,$cooler_overrides);

      $shelf_array = wc_get_products( $shelf_args );
      $shelf_array = array_merge($shelf_array,$shelf_overrides);

      $shelf_type['cooler_product_ids'] = $cooler_array;
      $shelf_type['shelf_product_ids'] = $shelf_array;

      return $shelf_type;
  }

  public static function ordersarray($phonedata, $webdata) {
    
    $web_order = array();
    $phone_order = array();

    foreach($phonedata as $order) {  
      // Phone order data is passed from the App.php controller
      $seen_phone_ids = [];

      //General Variables that apply to both phone and web, and need to be stated early
      $existing_prod_list = array();
      $delivery_methods = array();
      $product_locations = array();
      
      // Ignore voided orders          
      if ($order['STS'] == 'Voided') {
        $has_items_PO = false;
      }
      else {
        $has_items_PO = true;
      }

      //Date Variables
      $pickupDateRaw_PO = $order['RequestTime'];
      $pickupDate_PO = substr($pickupDateRaw_PO, 0, 10);
      $pickupTime_PO = substr($pickupDateRaw_PO, 11, 2);
    
      // Order will be duplicated and listed in each daily export until they're picked up. This only uses the most recent order data based on TxID field
      if (in_array($order['TxID'], $seen_phone_ids)) {
        continue;
      }
      if ($has_items_PO == false) {
        continue;
      }
      $seen_phone_ids[] = $order['TxID'];
      //General Phone Order Variables
      $has_instruction_PO = false;
      $has_ManualDesc_PO = false;
      $barcode_PO = 'T'.$order['TxID'];
      $bag_details_PO = 'No bags';  
      $bag_quantity_PO = "0"; 
      $account_name_PO = $order['Customer']['AccountName'];
      $order_id_PO = $order['TxID'];
      $phone_number_PO = $order['Customer']['Phone'];
      $existing_prod_list = "";

      // Payment owed?      
      if ($order['Tenders']) {
        $hasPaid_PO = true;
      }
      else {
        $hasPaid_PO = false;
      }

      //  Pickup time
      if($pickupTime_PO <= 11) {
        $timeslot = "Morning";
      }
      elseif($pickupTime_PO > 10 && $pickupTime_PO < 14 ) {
        $timeslot = "Midday";
      }
      else {
        $timeslot = "Afternoon";
      }

      //Create order details array. Later we'll push product items to this as well
      $phone_order[$order_id_PO] = array(
        'customer_name' => $account_name_PO,
        'phone' => $phone_number_PO,
        'order_id' => $order_id_PO,
        'pickup_date' => $pickupDate_PO,
        'timeslot' => $timeslot,
        'paid' => $hasPaid_PO
      );

      foreach ($order['Details'] as $detail ) {
        $prod_id_PO = $detail['Item']['ItemID'];
        $department_name = $detail['Item']['DepartmentName'];
        $wc_match_PO = $detail['Item']['ItemNumber'];
        $prod_object_PO = wc_get_product($wc_match_PO);
        $POS_prod_name = $detail['Item']['ItemName'];
        $instruction = "";
        $quantity_PO = $detail['Qty'];
        $list_type = "";
        $variation_id = "";
        $is_duplicate = false;

        // Has the woocommerce variation ID been entered into the POS ItemNumber field?
        if (empty($wc_match_PO)) {
          $warning = true;
        }
        else {
          $warning = false;
        }

        // Is the order for delivery?
        if ($department_name == "Delivery") {
          $pickup_details = "delivery";
          $is_delivery = TRUE;
        }
        else {
          $pickup_details = "pickup";
          $is_delivery = FALSE;
        }
        $delivery_methods[] = $pickup_details;
        if(in_array('delivery', $delivery_methods)) {
          $is_delivery = TRUE;
          $pickup_details = "delivery";
        } 

        // Check to see if a product has special instructions
        // this one is weird because Instructions are store as an item just like a product purchased. But it has a LineNumber that references the product it's referencing
        $lineNumber = $detail['LineNumber'];
        $instruction_title = "";
        $instruction_desc = array();

        foreach($order['Details'] as $instructionSearch) {            
          if($instructionSearch['ItemLineNumber'] === $lineNumber) {
            $has_instruction_PO = TRUE;

            // The sliced information is stored as a title. Other notes are stored as a manual description. So we need to look in both areas and serve up which is populated
            $instruction_title = $instructionSearch['Item']['ItemName'];

            if(isset($instructionSearch['ManualDescription'])) {
              $instruction_desc[] = $instructionSearch['ManualDescription'];
            }
            if(isset($instruction_title) && $instruction_title != "Item Instruction") {
              $instruction_desc[] = $instruction_title;
            }
          }
        }
        $instruction_desc = array_filter($instruction_desc); // This removes empty values

        // Check to see if there are any bags for the order
        if($detail['Item']['CategoryID'] == '70') {
          $bag_details_PO = $detail['Item']['ItemName'];
          $bag_quantity_PO = $detail['Qty'];
        }
        
        $phone_order[$order_id_PO]['order_type'] = "phone";        
        $phone_order[$order_id_PO]['delivery_method'] = $pickup_details;
        $phone_order[$order_id_PO]['bag_details'] = $bag_details_PO;
        $phone_order[$order_id_PO]['bag_quantity'] = $bag_quantity_PO;        

        // Find the equivalent product in the woocommerce database. Use this info to get all of the 
        if($prod_object_PO && $detail['Item']['CategoryID'] != "123" || $prod_object_PO && $detail['Item']['DepartmentName'] !== "Modifier" || $prod_object_PO && $detail['Item']['CategoryID'] !== "70" ) {
          
          $is_variation = $prod_object_PO->get_parent_id(); //if the product has a parent, then it is a variation not a single
          
          if( $is_variation ){
            $prod_parent_object = wc_get_product($prod_object_PO->get_parent_id());
            $variation_id = $wc_match_PO; // because all of these should already be variations.
            $prod_name = $prod_parent_object->get_name();
          }
          else {
            $prod_id = $wc_match_PO;
            $variation_id = "n/a";
            $prod_name = $prod_object_PO->get_name();
          }
          
          $option = $prod_object_PO->get_attribute( 'variety' );
          $topping = $prod_object_PO->get_attribute( 'topping' );
          $package_size = $prod_object_PO->get_attribute( 'package-size' );
          $product_size = $prod_object_PO->get_attribute( 'size' );
          $item_quantity = PhoneOrders::itemquantity($package_size);
          $total_qty = $item_quantity * $quantity_PO; //This is calculated using a function in App.php controller

          //Get category names for the product. While we're at it, get the shelf/list type info from the category page
          $category_names = array();
          $term_obj_list = get_the_terms( $prod_id, 'product_cat' );

          if ($term_obj_list) {
            foreach ($term_obj_list as $term) {
              //While we're looping the terms, create array of term names
              array_push($category_names, $term->name);
              $list_type = get_field('list_type', $term);
            }
          }

          $categories = implode(', ', $category_names);
          $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));         

          // Now check the product to see if it has a product level shelf-type override
          $product_cooler_override = get_field('cooler', $prod_id);
          $product_shelf_override = get_field('shelf', $prod_id);
          $product_freezer_override = get_field('freezer', $prod_id);
          
          if ($product_cooler_override) {
            $list_type = "cooler";
          }
          if ($product_shelf_override) {
            $list_type = "shelf";
          }
          if ($product_freezer_override) {
            $list_type = "shelf";
          }

          // Make an array of the packing locations for each product, then show at an order level where they are
          $product_locations[] = $list_type;
          $product_locations = array_unique($product_locations);
          $phone_order[$order_id_PO]['product_locations'] = $product_locations;

          // We need to know if this is our first product being added or not
          if (isset($phone_order[$order_id_PO]['items'])) {
            $existing_prod_list = $phone_order[$order_id_PO]['items'];            
          }

          //See if previous items listed share the same name
          if ($existing_prod_list) {            
            foreach ($existing_prod_list as $key => $existing_item) {              
              if ($prod_name == $existing_item['name']) { 
                $is_duplicate = true;
                $total_qty = $existing_item['total_quantity'] + $total_qty; // Combine the quantities of the matched products
                $duplicate_index = $key; // Get the key so later we know which product line to replace
              }
            }
          }
          
          //create the array structure for the Items, before pushing it to the final array
          // We have all these options because WC is inconsistent in how it names the product, sometimes it uses attributes, sometimes it doesn't
          // This normalizes all product titles so that we can actually match them up later. 
          // Ex. trying to match "Buns 1/2 dozen" vs "Buns Single"

          if (!empty($option) && !empty($product_size) && !empty($topping)) {
            $product_items = array('name' => $prod_name ." - " .$topping ." (".$product_size .") " , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //option, topping
          if (!empty($option) && empty($product_size) && !empty($topping)) {
            $product_items = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //size, topping
          if (empty($option) && !empty($product_size) && !empty($topping)) {
            $product_items = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //option, size
          if (!empty($option) && !empty($product_size)) {
            $product_items = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $total_qty, 'product_id' => $variation_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //option only
          elseif (!empty($option) && empty($product_size)) {
            $product_items = array('name' => $prod_name ." -  " .$option, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //size only
          elseif (!empty($product_size) && empty($option)) {
            $product_items = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          else {
            $product_items = array('name' => $prod_name , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $instruction_desc);
          }

          // If this item is a duplicate product, replace the existing item. If it's not, just add the item normally
          if ($is_duplicate) {
            $phone_order[$order_id_PO]['items'][$duplicate_index] = array_replace($phone_order[$order_id_PO]['items'][$duplicate_index], $product_items);                        
          }
          else {
            $phone_order[$order_id_PO]['items'][] = $product_items;
          }
        }
        elseif ($POS_prod_name == "Item Instruction" || $POS_prod_name == "Edmonton Delivery" || $POS_prod_name == "Slice" || $detail['Item']['CategoryID'] == "70" || $detail['Item']['DepartmentID'] == "43" ) {
          // Don't display these as products because they're related to shipping, or modifiers etc coming in from the POS
        }
        else {
          //Add items straight from the POS. They get to bypass all of the above manipulations because we don't know their WC match
          $phone_order[$order_id_PO]['product_locations'] = array('unknown');
          $phone_order[$order_id_PO]['items'][] = array('name' => $POS_prod_name, 'total_quantity' => $quantity_PO, 'product_id' => 'POS-'.$prod_id_PO, 'variation_id' => $variation_id, 'category' => null, 'shelf_type' => 'unknown', 'warning' => true, 'instruction' => $instruction_desc);
        }      
      }
    }
    

    foreach($webdata as $order) {
      //General Variables that apply to both phone and web, and need to be stated early
      $existing_prod_list = array();
      $delivery_methods = array();
      $product_locations = array();
      
      $order_id = $order->get_id();
      $pickup_date = $order->get_meta('pickup_date');
      $first_name = $order->get_billing_first_name();
      $last_name = $order->get_billing_last_name();
      $phone_number = $order->get_billing_phone();
      $customer_note = $order->get_customer_note();
      $pickup_location = $order->get_meta( 'pickuplocation', true ); // This is for curbside vs instore
      $existing_prod_list = "";
      $bagfee = $order->get_meta( '_pickup_bag_fee', true );


      // Convert the date as it's stored in the WC database to be the same as the POS (Y-m-d)
      date_default_timezone_set('MST');
      $dateformat = "l, F j, Y";
      $pickupdate_object = DateTime::createFromFormat($dateformat, $pickup_date);      
      $pickup_date = $pickupdate_object->format('Y-m-d'); //This is to compare agains POS date format

      // Pickup or Delivery?
      if($order->has_shipping_method('flat_rate')) {
        $delivery_method = 'delivery';
        $timeslot = $order->get_meta( '_timeslot', true );
      }
      else {
        $delivery_method = 'pickup';
        $timeslot = $order->get_meta( '_timeslot_pickup', true );
      } 

      //Simplify output for timeslots
      if($timeslot == '9am - 11am') {
        $timeslot = 'Morning';
      }
      elseif ($timeslot == '11am - 2pm') {
        $timeslot = 'Midday';
      }
      elseif ($timeslot == '2pm - 5pm') {
        $timeslot = 'Afternoon';
      }
      elseif($timeslot == 'Between 10 am &amp; 1 pm') {
        $timeslot = '10 - 1';
      }
      elseif ($timeslot == 'Between 3 pm &amp; 6 pm') {
        $timeslot = '4 - 7';
      }
      else {
        $timeslot = '';
      }

      //Create order details array. Later we'll push product items to this as well
      $web_order[$order_id] = array(
        'customer_name' => $last_name.", ".$first_name,
        'phone' => $phone_number,
        'order_id' => $order_id,
        'pickup_date' => $pickup_date,
        'timeslot' => $timeslot,
        'paid' => true,
        'order_type' => 'web',
        'delivery_method' => $delivery_method,
        'bag_details' => $bagfee,
        'pickup_location' => $pickup_location,
        'customer_note' => $customer_note
      );
      
      //Get product details from order
      foreach ($order->get_items() as $item_id => $detail) {
        $prod_id = $detail->get_product_id();
        $prod_object = wc_get_product($prod_id);
        $variation_id = $detail->get_variation_id();
        $prod_name = $prod_object->get_name();
        $quantity = $detail->get_quantity();
        $list_type = "";
        $warning = false;
        $is_duplicate = false;
        $instruction = $detail->get_meta( 'Sliced Option', true );
        $product_meta_objects = $detail->get_meta_data();
        $product_items = "";  
          
        if ($variation_id != 0 || $variation_id = false) {
          $is_variation = true;
          $variable_product_object = wc_get_product($variation_id);
          $prod_parent_object = wc_get_product($variable_product_object->get_parent_id());
          $prod_name = $prod_parent_object->get_name();
          $option = $variable_product_object->get_attribute( 'variety' );
          $topping = $variable_product_object->get_attribute( 'topping' );
          $package_size = $variable_product_object->get_attribute( 'package-size' );
          $product_size = $variable_product_object->get_attribute( 'size' );
        }
        else {
          $is_variation = false;
        }
        
        //If the product is a bundled product, we want to hide the parent. We only want to see the items that require packing.
        $bundle_mode = $detail->get_meta( '_bundle_group_mode', true);
        if ($bundle_mode == "parent") {
          $is_bundle_parent = true;
        }
        else {
          $is_bundle_parent = false;
        }

        // Hide specific meta data from the details column. List the items by key here:
        $hidden_meta = array( "pa_package-size", "_WCPA_order_meta_data", "pa_variety", "pa_size", "_bundled_by", "_bundled_item_id", "_bundled_item_priced_individually", "_stamp", "_bundle_cart_key", "_bundled_item_needs_shipping" );
        $product_meta = array();
        foreach ( $product_meta_objects as $meta ) {
          if (!in_array($meta->key, $hidden_meta)) {              
            $product_meta[$meta->key] = $meta->value;
          }
        }

        // Check to see if line items have been refunded, then update quantity
        $order_refunds = $order->get_refunds();  
        $refund_item_id = "";
        $total_qty = $quantity;
        if ($order_refunds) {
          foreach ($order_refunds as $refund) {
            foreach ($refund->get_items() as $item_id => $item) {
                $refund_item_id = $item -> get_product_id();
                $refunded_quantity = $item->get_quantity(); 
                $refunded_line_subtotal = $item->get_subtotal();
            }
          }
          if($prod_id == $refund_item_id) {
            $total_qty = $quantity + $refunded_quantity;
          }
        }

        // Rather than establishing this with the other variation variables above, we need to do it after the refund check.
        if ($is_variation) {
          $item_quantity = PhoneOrders::itemquantity($package_size);
          $total_qty = $item_quantity * $total_qty; //This is calculated using a function in App.php controller
        }
        
        //Get category names for the product. While we're at it, get the shelf/list type info from the category page
        $category_names = array();
        $term_obj_list = get_the_terms( $prod_id, 'product_cat' );

        if ($term_obj_list) {
          foreach ($term_obj_list as $term) {
            //While we're looping the terms, create array of term names
            array_push($category_names, $term->name);
            $list_type = get_field('list_type', $term);
          }
        }

        $categories = implode(', ', $category_names);
        $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));         

        // Now check the product to see if it has a product level shelf-type override
        $product_cooler_override = get_field('cooler', $prod_id);
        $product_shelf_override = get_field('shelf', $prod_id);
        $product_freezer_override = get_field('freezer', $prod_id);
        
        if ($product_cooler_override) {
          $list_type = "cooler";
        }
        if ($product_shelf_override) {
          $list_type = "shelf";
        }
        if ($product_freezer_override) {
          $list_type = "freezer";
        }

        // Make an array of the packing locations for each product, then show at an order level where they are
        $product_locations[] = $list_type;
        $product_locations = array_unique($product_locations);
        $web_order[$order_id]['product_locations'] = $product_locations;

        //Some full categories are listed as mixed for shelf location. Products inherit this, but should have their own override for cooler or shelf
        // Check for mixed, allow it to show up in both lists, but flag it with a warning so it can be updated on the product level
        
        if ($list_type == '' || $list_type == 'mixed' ) {
          $warning = "This product is not designated shelf or cooler";
          $list_type = "shelf";
        }

        // We need to know if this is our first product being added or not
        if (isset($web_order[$order_id]['items'])) {
          $existing_prod_list = $web_order[$order_id]['items'];            
        }

        //See if previous items listed share the same name
        if ($existing_prod_list) {            
          foreach ($existing_prod_list as $key => $existing_item) {              
            if ($prod_name == $existing_item['name']) { 
              $is_duplicate = true;
              $total_qty = $existing_item['total_quantity'] + $total_qty; // Combine the quantities of the matched products
              $duplicate_index = $key; // Get the key so later we know which product line to replace
            }
          }
        }
        
        //create the array structure for the Items, before pushing it to the final array
        // We have all these options because WC is inconsistent in how it names the product, sometimes it uses attributes, sometimes it doesn't
        // This normalizes all product titles so that we can actually match them up later. 
        // Ex. trying to match "Buns 1/2 dozen" vs "Buns Single"
        if (!$is_bundle_parent && $total_qty > 0) {
          if ($is_variation) {
            if (!empty($option) && !empty($product_size) && !empty($topping)) {
              $product_items = array('name' => $prod_name ." - " .$topping ." (".$product_size .") " , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);
            }
            //option, topping
            if (!empty($option) && empty($product_size) && !empty($topping)) {
              $product_items = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);
            }
            //size, topping
            if (empty($option) && !empty($product_size) && !empty($topping)) {
              $product_items = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);
            }
            //option, size
            if (!empty($option) && !empty($product_size)) {
              $product_items = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $total_qty, 'product_id' => $variation_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);
            }
            //option only
            elseif (!empty($option) && empty($product_size)) {
              $product_items = array('name' => $prod_name ." -  " .$option, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);
            }
            //size only
            elseif (!empty($product_size) && empty($option)) {
              $product_items = array('name' => $prod_name ." (" .$product_size .")", 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);
            }
            else {
              $product_items = array('name' => $prod_name , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);

            }
          }
          else {
            $product_items = array('name' => $prod_name , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'shelf_type' => $list_type, 'warning' => $warning, 'instruction' => $product_meta);
          }

          // If this item is a duplicate product, replace the existing item. If it's not, just add the item normally
          if ($is_duplicate) {
            $web_order[$order_id]['items'][$duplicate_index] = array_replace($web_order[$order_id]['items'][$duplicate_index], $product_items);                        
            // $web_order[$order_id]['items'][] = $product_items;
          }
          else {
            $web_order[$order_id]['items'][] = $product_items;
          }
        }
      }
    }

    //Now let's sort by timeslot
    if ($web_order) {
      $sorted_web_orders = array ();
      foreach ($web_order as $order) {
        $timeslot = $order['timeslot'];
        $sorted_web_orders[] = $timeslot;
      }
      array_multisort($sorted_web_orders, SORT_DESC, $web_order);
    }

    if ($phone_order) {
      $sorted_phone_orders = array ();
      foreach ($phone_order as $order) {
        $timeslot = $order['timeslot'];
        $sorted_phone_orders[] = $timeslot;
      }
      array_multisort($sorted_phone_orders, SORT_DESC, $phone_order);
    }
   
    $output['phone_orders'] = $phone_order;
    $output['web_orders'] = $web_order;

    return $output;
  }
}