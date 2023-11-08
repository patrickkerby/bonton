<?php

namespace App\Controllers\Partials;

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

  public static function phoneordersarray($var) {
    // Phone order data is passed from the App.php controller
    $seen_phone_ids = [];

    foreach($var as $phoneOrder) {  
      // Ignore voided orders          
      if ($phoneOrder['STS'] == 'Voided') {
        $has_items_PO = false;
      }
      else {
        $has_items_PO = true;
      }

      //Date Variables
      $pickupDateRaw_PO = $phoneOrder['RequestTime'];
      $pickupDate_PO = substr($pickupDateRaw_PO, 0, 10);
      $pickupTime_PO = substr($pickupDateRaw_PO, 11, 2);

      // Order will be duplicated and listed in each daily export until they're picked up. This only uses the most recent order data based on TxID field
      if (in_array($phoneOrder['TxID'], $seen_phone_ids)) {
        continue;
      }
      if ($has_items_PO == false) {
        continue;
      }
      $seen_phone_ids[] = $phoneOrder['TxID'];

      //General Phone Order Variables
      $is_delivery_PO = false;
      $has_instruction_PO = false;
      $has_ManualDesc_PO = false;
      $barcode_PO = 'T'.$phoneOrder['TxID'];
      $bag_details_PO = 'No bags';  
      $bag_quantity_PO = "0"; 
      $account_name_PO = $phoneOrder['Customer']['AccountName'];
      $order_id_PO = $phoneOrder['TxID'];
      $phone_number_PO = $phoneOrder['Customer']['Phone'];

      // Payment owed?
      
      if ($phoneOrder['Tenders']) {
        $hasPaid_PO = true;
      }
      else {
        $hasPaid_PO = false;
      }
      
      //  Pickup time
      if($pickupTime_PO <= 11) {
        $pickupTimeSlot_PO = "Morning";
      }
      elseif($pickupTime_PO > 10 && $pickupTime_PO < 14 ) {
        $pickupTimeSlot_PO = "Midday";
      }
      else {
        $pickupTimeSlot_PO = "Afternoon";
      }

      //Create order details array. Later we'll push product items to this as well
      // $phone_prod[$order_id_PO]['customer_name'] = $account_name_PO; 

      $phone_prod[$order_id_PO] = array(
        'customer_name' => $account_name_PO,
        'order_id' => $order_id_PO,
        'pickup_date' => $pickupDate_PO,
        'timeslot' => $pickupTimeSlot_PO,
        'paid' => $hasPaid_PO
      );

      // Get product specific details
      foreach ($phoneOrder['Details'] as $detail ) {
        $prod_id_PO = $detail['Item']['ItemID'];
        $wc_match_PO = $detail['Item']['ItemNumber'];
        $prod_object_PO = wc_get_product($wc_match_PO);
        $POS_prod_name = $detail['Item']['ItemName'];
        $instruction = "";
        $instruction_desc = "";
        $quantity_PO = $detail['Qty'];

        // Has the woocommerce variation ID been entered into the POS ItemNumber field?
        if (empty($wc_match)) {
          $warning = true;
        }
        else {
          $warning = false;
        }
        
        // Is the order for delivery?
        if(in_array("Edmonton Delivery", $detail['Item'])) {
          $is_delivery = TRUE;
          $pickup_details = "delivery";
        }
        else {
          $is_delivery = FALSE;
          $pickup_details = "pickup";
        }
        
        // Check to see if a product has special instructions
        // this one is weird because Instructions are store as an item just like a product purchased. But it has a LineNumber that references the product it's referencing
        $lineNumber = $detail['LineNumber'];
        $instruction_title = "";
        $instruction_desc = "";

        foreach($phoneOrder['Details'] as $instructionSearch) {            
          if($instructionSearch['ItemLineNumber'] === $lineNumber) {
            $has_instruction_PO = TRUE;
            $instruction_title = $instructionSearch['Item']['ItemName'];

            if(isset($instructionSearch['ManualDescription'])) {
              $instruction_desc = $instructionSearch['ManualDescription'];
            }              
          }
        }

        // Check to see if there are any bags for the order
        if($detail['Item']['CategoryID'] == '70') {
          $bag_details_PO = $detail['Item']['ItemName'];
          $bag_quantity_PO = $detail['Qty'];
        }
        
        $phone_prod[$order_id_PO]['order_type'] = "phone";        
        $phone_prod[$order_id_PO]['delivery'] = $pickup_details;
        $phone_prod[$order_id_PO]['bag_details'] = $bag_details_PO;
        $phone_prod[$order_id_PO]['bag_quantity'] = $bag_quantity_PO;

        // Find the equivalent product in the woocommerce database. Use this info to get all of the 
        if($prod_object_PO && $detail['Item']['CategoryID'] != "123" || $prod_object_PO && $detail['Item']['DepartmentName'] !== "Modifier" || $prod_object_PO && $detail['Item']['CategoryID'] !== "70" ) {
          $variation_id = $wc_match_PO; // because all of these should already be variations
          $prod_id = $prod_object_PO->get_parent_id(); // get the variation parent product id. not sure if we need it
          
          if ($prod_id) {
            $prod_parent_object = wc_get_product($prod_id);            
          }
          else {
            $prod_parent_object = $prod_object_PO; //If there isn't a parent, then this is a single product. Just use the id we already have.
          }
          $prod_name = $prod_parent_object->get_name();
          $option = $prod_object_PO->get_attribute( 'variety' );
          $topping = $prod_object_PO->get_attribute( 'topping' );
          $package_size = $prod_object_PO->get_attribute( 'package-size' );
          $product_size = $prod_object_PO->get_attribute( 'size' );
          $product_type = $prod_object_PO->get_type();
          $item_quantity = PhoneOrders::itemquantity($package_size);
          $total_qty = $item_quantity * $quantity_PO; //This is calculated using a function in App.php controller

          //Filter the list of categories to exclude terms that have been excluded via ACF
          $category_names = array();
          $term_obj_list = get_the_terms( $prod_id, 'product_cat' );

          if ($term_obj_list) {
            foreach ($term_obj_list as $term) {
              //While we're looping the terms, create array of term names
                array_push($category_names, $term->name);
            }
          }
          $categories = implode(', ', $category_names);
          $parent_cat_id = join(', ', wp_list_pluck($term_obj_list, 'parent'));         

          // Push product details to Phone Orders array

          //size, option, topping
          if (!empty($option) && !empty($product_size) && !empty($topping)) {
            $phone_prod[$order_id_PO]['items'][] = array('name' => $prod_name ." - " .$topping ." (".$product_size .") " , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //option, topping
          if (!empty($option) && empty($product_size) && !empty($topping)) {
            $phone_prod[$order_id_PO]['items'][] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //size, topping
          if (empty($option) && !empty($product_size) && !empty($topping)) {
            $phone_prod[$order_id_PO]['items'][] = array('name' => $prod_name ." - " .$option ." - " .$topping, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //option, size
          if (!empty($option) && !empty($product_size)) {
            $phone_prod[$order_id_PO]['items'][] = array('name' => $prod_name ." - " .$option ." (".$product_size .") " , 'total_quantity' => $total_qty, 'product_id' => $variation_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //option
          elseif (!empty($option) && empty($product_size)) {
            $phone_prod[$order_id_PO]['items'][] = array('name' => $prod_name ." - " .$option, 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          //size
          elseif (!empty($product_size) && empty($option)) {
            $phone_prod[$order_id_PO]['items'][] = array('name' => $prod_name ." (" .$product_size .") ", 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
          else {
            $phone_prod[$order_id_PO]['items'][] = array('name' => $prod_name , 'total_quantity' => $total_qty, 'variation_id' => $variation_id, 'product_id' => $prod_id, 'category' => $categories, 'category_parent' => $parent_cat_id, 'warning' => $warning, 'instruction' => $instruction_desc);
          }
        }
        elseif ($POS_prod_name != "ItemInstruction") {
          //skip this product
        }
        else {
          $phone_prod[$order_id_PO]['items'][] = array('name' => $POS_prod_name, 'total_quantity' => $total_qty, 'product_id' => $prod_id, 'variation_id' => null, 'category' => null, 'category_parent' => null, 'warning' => $warning, 'instruction' => $instruction_desc);
        }
      }
    }
    return $phone_prod;
  }
}