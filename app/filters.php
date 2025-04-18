<?php

namespace App;

/**
 * Add <body> classes
 */
add_filter('body_class', function (array $classes) {
    /** Add page slug if it doesn't exist */
    if (is_single() || is_page() && !is_front_page()) {
        if (!in_array(basename(get_permalink()), $classes)) {
            $classes[] = basename(get_permalink());
        }
    }

    /** Add class if sidebar is active */
    if (display_sidebar()) {
        $classes[] = 'sidebar-primary';
    }

    /** Clean up class names for custom templates */
    $classes = array_map(function ($class) {
        return preg_replace(['/-blade(-php)?$/', '/^page-template-views/'], '', $class);
    }, $classes);

    return array_filter($classes);
});

/**
 * Add "… Continued" to the excerpt
 */
add_filter('excerpt_more', function () {
    return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'sage') . '</a>';
});

/**
 * Template Hierarchy should search for .blade.php files
 */
collect([
    'index', '404', 'archive', 'author', 'category', 'tag', 'taxonomy', 'date', 'home',
    'frontpage', 'page', 'paged', 'search', 'single', 'singular', 'attachment', 'embed'
])->map(function ($type) {
    add_filter("{$type}_template_hierarchy", __NAMESPACE__.'\\filter_templates');
});

/**
 * Render page using Blade
 */
add_filter('template_include', function ($template) {
    collect(['get_header', 'wp_head'])->each(function ($tag) {
        ob_start();
        do_action($tag);
        $output = ob_get_clean();
        remove_all_actions($tag);
        add_action($tag, function () use ($output) {
            echo $output;
        });
    });
    $data = collect(get_body_class())->reduce(function ($data, $class) use ($template) {
        return apply_filters("sage/template/{$class}/data", $data, $template);
    }, []);
    if ($template) {
        echo template($template, $data);
        return get_stylesheet_directory().'/index.php';
    }
    return $template;
}, PHP_INT_MAX);

/**
 * Render comments.blade.php
 */
add_filter('comments_template', function ($comments_template) {
    $comments_template = str_replace(
        [get_stylesheet_directory(), get_template_directory()],
        '',
        $comments_template
    );

    $data = collect(get_body_class())->reduce(function ($data, $class) use ($comments_template) {
        return apply_filters("sage/template/{$class}/data", $data, $comments_template);
    }, []);

    $theme_template = locate_template(["views/{$comments_template}", $comments_template]);

    if ($theme_template) {
        echo template($theme_template, $data);
        return get_stylesheet_directory().'/index.php';
    }

    return $comments_template;
}, 100);

//Settings for displaying sidebar
add_filter('sage/display_sidebar', function ($display) {
    static $display;

    isset($display) || $display = in_array(true, [
      // The sidebar will be displayed if any of the following return true
      is_single(),
      is_404(),
      is_page_template('template-custom.php'),
      is_shop()
    ]);

    return $display;
});

//WC login/out
add_filter( 'wp_nav_menu_items', 'App\add_loginout_link', 10, 2 );
function add_loginout_link( $items, $args ) {
  if (is_user_logged_in() && $args->theme_location == 'footer_navigation') {
    $items .= '<li class="small menu-item logout"><a href="'. wp_logout_url( get_permalink( wc_get_page_id( 'myaccount' ) ) ) .'">Log Out</a></li>';
  }
   elseif (!is_user_logged_in() && $args->theme_location == 'footer_navigation') {
    $items .= '<li class="small menu-item login"><a href="' . get_permalink( wc_get_page_id( 'myaccount' ) ) . '">Log In</a></li>';
  }
   return $items;
}

//remove woocommerce tabs
add_filter( 'woocommerce_product_tabs', function ( $tabs ) {
	unset( $tabs['additional_information'] );
	return $tabs;
}, 11);

//Setup for thumbnails
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );    // Strip out the default linking so we can control the quickview
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5 );     // Strip out the default linking so we can control the quickview
remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );           // No prices in thumbnail view plz
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );           // We need to add our own button in for the quick view

// Setup for Product Modal Quickview
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );              // Get rid of sku and categories on product modal
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
add_action( 'woocommerce_before_single_product_summary', 'woocommerce_template_single_title', 30 );
/**
 * Remove related products output
 */
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );


/**
 * @snippet       Variable Product Price Range: "From: <del>$$$min_reg_price</del> $$$min_sale_price"
 */
 
add_filter( 'woocommerce_variable_price_html', function( $price, $product ) {
 
// 1. Get min/max regular and sale variation prices
$min_var_reg_price = $product->get_variation_regular_price( 'min', true );
$min_var_sale_price = $product->get_variation_sale_price( 'min', true );
$max_var_reg_price = $product->get_variation_regular_price( 'max', true );
$max_var_sale_price = $product->get_variation_sale_price( 'max', true );
 
// 2. New $price, unless all variations have exact same prices
if ( ! ( $min_var_reg_price == $max_var_reg_price && $min_var_sale_price == $max_var_sale_price ) ) {   
    if ( $min_var_sale_price < $min_var_reg_price ) {
        $price = sprintf( __( 'From: <del>%1$s</del><ins>%2$s</ins>', 'woocommerce' ), wc_price( $min_var_reg_price ), wc_price( $min_var_sale_price ) );
    } else {
        $price = sprintf( __( 'From: %1$s', 'woocommerce' ), wc_price( $min_var_reg_price ) );
    }
}
return $price;
}, 10, 2 );


// settings for product modal photo gallery. show bullets rather than thumbs. show prev and next arrows
add_filter( 'woocommerce_single_product_carousel_options', function( $options ) {
    $options['directionNav'] = true;
    $options['controlNav'] = true;
	return $options;
} );

// Add in our own button to trigger the quick view
add_action('woocommerce_after_shop_loop_item', function() {
    global $product;
    $link = $product->get_permalink();
    $id = $product->get_id();
    echo do_shortcode('<a class="inside-thumb quick-view-button manual" data-product_id="' . esc_attr($id) . '" href="#"><span>Learn more</a></span>');
} );

//Remove Price Range
add_filter( 'woocommerce_variable_price_html', function ( $price, $product ) {

    // Main Price
    $prices = array( $product->get_variation_price( 'min', true ), $product->get_variation_price( 'max', true ) );
    
    if ($prices[0] !== $prices[1]) {
        $price = $prices[0] !== $prices[1] ? sprintf( __( '', 'woocommerce' ), wc_price( $prices[0] ) ) : wc_price( $prices[0] );
    }

    // Sale Price
    $prices = array( $product->get_variation_regular_price( 'min', true ), $product->get_variation_regular_price( 'max', true ) );
    sort( $prices );
    $saleprice = $prices[0] !== $prices[1] ? sprintf( __( '', 'woocommerce' ), wc_price( $prices[0] ) ) : wc_price( $prices[0] );
    if ( $price !== $saleprice ) {
        $price = '<del>' . $saleprice . '</del> <ins>' . $price . '</ins>';
    }
    return $price;
}, 10, 2 );

//Remove parent categories from baking list
add_filter( 'get_the_terms', function ( $terms, $post_id, $taxonomy ){
    // HERE below define your excluded product categories Term IDs in this array
    $category_ids = array( 83,84,94 );

    if( ! is_page('baking') ) // Only single product pages
        return $terms;

    foreach( $terms as $key => $term ){
        if( in_array( $term->term_id, $category_ids ) ){
            unset($terms[$key]); // If term is found we remove it
        }
    }
    return $terms;
}, 20, 3 );

// add data attributes to wp nav item: schedule
add_filter( 'nav_menu_link_attributes', function ( $atts, $item, $args ) {
    //Set the menu ID
    $menu_link = 2309;
    // Conditionally match the ID and add the attribute and value
    if ($item->ID == $menu_link) {
        $atts['data-toggle'] = 'modal';
    }
    //Return the new attribute
    return $atts;
        
}, 10, 3 );

// Let's see if we can get these damned sorting options setup right
add_filter( 'woocommerce_catalog_orderby', function( $options ){
	$options['title'] = 'Sort alphabetically';
	return $options;
});

add_filter( 'woocommerce_get_catalog_ordering_args', function ( $args ) {
	// Sort alphabetically
	if ( isset( $_GET['orderby'] ) && 'title' === $_GET['orderby'] ) {
		$args['orderby'] = 'title';
		$args['order'] = 'asc';
	}
	return $args;
});

// custom query for cooler & shelf lists
add_filter( 'woocommerce_product_data_store_cpt_get_products_query', function( $query, $query_vars ) {
	if ( ! empty( $query_vars['cooler'] ) ) {
		$query['meta_query'][] = array(
			'key' => 'cooler',
			'value' => esc_attr( $query_vars['cooler'] ),
		);
	}
	return $query;
}, 10, 2 );

add_filter( 'woocommerce_product_data_store_cpt_get_products_query', function( $query, $query_vars ) {
	if ( ! empty( $query_vars['shelf'] ) ) {
		$query['meta_query'][] = array(
			'key' => 'shelf',
			'value' => esc_attr( $query_vars['shelf'] ),
		);
	}
	return $query;
}, 10, 2 );


// TAX RULES
// if category is not Grocery
// if product is_taxable
//   get_quantity of each line item
//     if line item = "1/2 dozen", quantity = quantity * 6
//     if line item = "Dozen", quantity = quantity * 12
//       calculate total cart quantity
//         if total cart quantity > 5, change line-item tax class to 'zero-rate'

// Your product categories settings
function get_my_terms(){
    return array( 83, 84 );
}
 // ToDO add all sub cats of the above

add_action( 'woocommerce_before_calculate_totals', 'App\zero_tax_items_based_on_invoice_choice', 30, 1 );
function zero_tax_items_based_on_invoice_choice( $cart ) {
    if ( is_admin() && ! defined( 'DOING_AJAX' ) )
        return;

    if ( did_action( 'woocommerce_before_calculate_totals' ) >= 2 )
        return;

    $total_item_quantity = 0;

    // Loop through cart items
    foreach ( $cart->get_cart() as $cart_item ) {
        if( has_term( get_my_terms(), 'product_cat', $cart_item['product_id'] ) ){
            $attributes = $cart_item['data']->get_attributes();            
            $quantity = $cart_item['quantity'];
            $product = wc_get_product( $cart_item['product_id'] );
            $tax_status = $product->get_tax_status();
        
            if ($tax_status == 'taxable') {


                if (isset($attributes['pa_package-size'])) {

                    $size = $attributes['pa_package-size'];
                    
                    if ($size === 'half-dozen') {
                        $quantity = $quantity * 6;                
                    }
                    if ($size === '6-pack') {
                        $quantity = $quantity * 6;
                    }                    
                    if ($size === 'dozen') {
                        $quantity = $quantity * 12;
                    }
                }                
                $total_item_quantity +=  $quantity;
            }
        }
    }
    if ( $total_item_quantity > 5 ) {
        foreach ( $cart->get_cart() as $cart_item ) {      
            // Set price excluding taxes
            if( isset($cart_item['price_excl_tax']) ){
                $cart_item['data']->set_price($cart_item['price_excl_tax']);
            }  
            if ( has_term( get_my_terms(), 'product_cat', $cart_item['product_id'] ) ) {
                $cart_item['data']->set_tax_class( 'zero-rate' );
            }
        }
    }
}

/**
 * Save pickup date and timeslot to WooCommerce order (from session)
 */
add_action('woocommerce_checkout_update_order_meta', 'App\add_pickup_to_order');
function add_pickup_to_order($order_id) {
	$pickup_date = WC()->session->get('pickup_date');
	$pickup_date_formatted = WC()->session->get('pickup_date_formatted');
    $pickup_object = WC()->session->get('pickup_date_object');

	$order = wc_get_order( $order_id );

	$order->update_meta_data( 'pickup_date', $pickup_date );
	$order->update_meta_data( 'pickup_date_formatted', $pickup_date_formatted );
	$order->update_meta_data( 'pickup_date_object', $pickup_object );
	$order->save();
}

/*
 * ADD PICKUP DETAILS TO EMAILS
 * @param $order_obj Order Object
 * @param $sent_to_admin If this email is for administrator or for a customer
 * @param $plain_text HTML or Plain text (can be configured in WooCommerce > Settings > Emails)
 */

add_action( 'woocommerce_email_order_meta', 'App\bonton_add_email_order_meta', 10, 3 );
function bonton_add_email_order_meta( $order_obj, $sent_to_admin, $plain_text ){

	$date = get_post_meta( $order_obj->get_order_number(), 'pickup_date', true );
 
	// ok, we will add the separate version for plaintext emails
	if ( $plain_text === false ) {
 
		// you shouldn't have to worry about inline styles, WooCommerce adds them itself depending on the theme you use
        echo '<h2>Important: Pickup Details</h2>
		<ul>
		<li><strong>Pickup Date:</strong> ' . $date . '</li>
		</ul>';
 
	} else {
 
		echo "Important: Pickup Details\n
		Pickup Date: $date";
	}
}


// BULK PRICING FOR BAKED YEASTED ITEMS
// if category is Bread (52), Buns & Bagels (91) & if product is not in blacklist
//   get_quantity of each line item
//     if line item = "single", unit_quantity = quantity * 1/6
//     if line item = "1/2 dozen", unit_quantity = quantity * 1
//     if line item = "Dozen", unit_quantity = quantity * 2
//       calculate total cart quantity
//         if total cart unit_quantity > 5 && < 10, apply discount of 10% to products within categories
//         if total cart unit_quantity > 10, apply discount of 20% to products within categories
//            if line item = "single"
//               apply discount to quantity that makes up unit_quantity. Apply full price to remainder of items. 

// Product categories
function get_my_bulk_terms(){
    return array( 91, 52 );
}

add_action( 'woocommerce_before_calculate_totals', 'App\bulk_pricing', 30, 10 );
function bulk_pricing( $cart ) {
    if ( is_admin() && ! defined( 'DOING_AJAX' ) )
        return;

    if ( did_action( 'woocommerce_before_calculate_totals' ) >= 2 )
        return;

    $bulk_discount_enabled = get_field('bulk_discount', 'option');;
    $blackoutdates = get_field('bulk_discount_blackout_dates', 'option');

    if ($blackoutdates) {
        $blackout_array = array();

        foreach($blackoutdates as $blackout) {
            $date = $blackout['date'];
            $blackout_array[] = $date;
        }

        $session_pickup_date = WC()->session->get('pickup_date_formatted');
        
        if ( isset($_POST['date']) || isset($session_pickup_date))  { 
            
            if ( isset($_POST['date'])) {
                $pickupdate = $_POST['date'];
            }
            else {
                $pickupdate = $session_pickup_date;
            } 

            if (in_array($pickupdate, $blackout_array)) {
                $bulk_discount_enabled = false;
            }
        }
    }

    if ($bulk_discount_enabled) {
    
        $total_item_quantity = 0;

        $excluded_products = array( 899, 963, 1087, 1119, 1164, 1988, 1158, 1168, 1177, 2098, 8703, 8516, 10167, 10144, 10036, 10028, 11723); // @TODO hook up to ACF
        //Excluded Products Legend:
        // 899  = Pretzels
        // 963  = Egg Bread
        // 1087 = Olive Flutes
        // 1119 = Amandine Croissant
        // 1164 = Rugelach
        // 1988 = Fig & Pistachio Rugelach
        // 1158 = Cranberry, Almond, Marmalade Rugelach
        // 1168 = Kouign-Amann
        // 1177 = Canelé de Bordeaux
        // 2098 = Hot Cross Buns
        // 8703 = White Chocolate & Blueberry Filled Croissant
        // 8516 = Strawberry Mascarpone Croissant 
        // 10167 = Paska
        // 10144 = Easter Egg Filled Croissant
        // 10036 = Roasted Vegetable Cheddar Turnover
        // 10028 = Focaccia
        // 4382 = Pizza Swirl
        // 11723 = Raspberry White Chocolate Filled Croissant
        // 11854 = Beef & Cheddar Swirl 

        $seasonal_pricing_activated = false; // @TODO Hook this up to ACF fiels.
        $regular_discount_small = 0.9; // @TODO hook up to ACF
        $regular_discount_large = 0.8; // @TODO hook up to ACF
        $seasonal_discount_small = 1; // @TODO hook up to ACF
        $seasonal_discount_large = 1; // @TODO hook up to ACF
        $discount_percentage = 1;

        // Loop through cart items
        if( is_user_logged_in() ) { // check if there is a logged in user 	 
            $user = wp_get_current_user(); // getting & setting the current user 
            $roles = ( array ) $user->roles; // obtaining the role         
        }
        else {            
            $roles = array(); // if there is no logged in user return empty array  
        }

        if (! in_array("wcwp_wholesale", $roles)) {

            foreach ( $cart->get_cart() as $cart_item ) {
                $prod_id = $cart_item['product_id'];
                $exclusion_set = get_field('bulk_discount_exclusion', $prod_id);
                if($exclusion_set === true) {
                    $exclusion = true;
                }
                else {
                    $exclusion = false;
                }

                if( has_term( get_my_bulk_terms(), 'product_cat', $cart_item['product_id'] ) && ! in_array( $cart_item['product_id'], $excluded_products) && $exclusion === false ){
                    $attributes = $cart_item['data']->get_attributes();    
                    $quantity = $cart_item['quantity'];
                    $product = wc_get_product( $cart_item['product_id'] );

                    if (isset($attributes['pa_package-size'])) {

                        $size = $attributes['pa_package-size'];
                        
                        if ($size === 'single') {
                            $quantity = $quantity * 0.166666666667;                
                        }
                        elseif ($size === 'half-dozen') {
                            $quantity = $quantity * 1;                
                        }
                        elseif ($size === '6-pack') {
                            $quantity = $quantity * 1;
                        }                    
                        elseif ($size === 'dozen') {
                            $quantity = $quantity * 2;
                        }
                        else {
                            $quantity = $quantity * 1;
                        }
                    }                
                    $total_item_quantity +=  $quantity;
                }
            }

            // Check if seasonal pricing has been enabled
            // Check for a selected pickup date, either through POST or in the session data. Set single pickupdate variable, regardless of where it comes from
            /// Convert date from dd/mm/yyyy to Y-m-d so we can compare properly
            //// Compare selected pickup date to hardcoded cutoff date
            ///// If pickup date is within special pricing range, set special pricing to true (then adust bulk discount percentage)
            
            if ($seasonal_pricing_activated === true) {

                $session_pickup_date = WC()->session->get('pickup_date_formatted');
                
                if ( isset($_POST['date']) || isset($session_pickup_date))  { 
                    
                    if ( isset($_POST['date'])) {
                        $pickupdate = $_POST['date'];
                    }
                    else {
                        $pickupdate = $session_pickup_date;
                    }

                    $date = str_replace('/', '-', $pickupdate);
                    $pickupdate_time = date('Y-m-d', strtotime($date));
                    $start_date = '2021-12-21'; // @TODO hook up to ACF
                    $cutoff_date = '2021-12-31'; // @TODO hook up to ACF

                    if ($pickupdate_time > $start_date && $pickupdate_time < $cutoff_date) {
                        // Set discount percentage based on total number of eligible items in the cart
                        if ( $total_item_quantity >= 5 && $total_item_quantity < 10) {
                            $discount_percentage = $seasonal_discount_small;
                        }
                        elseif ( $total_item_quantity >= 10  ) {
                            $discount_percentage = $seasonal_discount_large;
                        }
                    }
                    else {
                        // Set discount percentage based on total number of eligible items in the cart
                        if ( $total_item_quantity >= 5 && $total_item_quantity < 10) {
                            $discount_percentage = $regular_discount_small;
                        }
                        elseif ( $total_item_quantity >= 10  ) {
                            $discount_percentage = $regular_discount_large;
                        }
                    }
                }
            }
            else {
                // Set discount percentage based on total number of eligible items in the cart
                if ( $total_item_quantity >= 5 && $total_item_quantity < 10) {
                    $discount_percentage = $regular_discount_small;
                }
                elseif ( $total_item_quantity >= 10  ) {
                    $discount_percentage = $regular_discount_large;
                }
            }

            // Set price with 10% discount, for items within set categories only (bread, bagels, sweet buns)
            if ( $total_item_quantity >= 5) {
                $bulk_discount_savings_total = 0;
                $discounted_quantity = 0;
                $discount_savings_percentage = 1 - $discount_percentage;

                foreach ( $cart->get_cart() as $cart_item ) {
                    $prod_id = $cart_item['product_id'];
                    $exclusion_set = get_field('bulk_discount_exclusion', $prod_id);
                    if($exclusion_set === true) {
                        $exclusion = true;
                    }
                    else {
                        $exclusion = false;
                    }
                    
                    // Set price with discount, for items within set categories only (bread, bagels, sweet buns)
                    if ( has_term( get_my_bulk_terms(), 'product_cat', $cart_item['product_id'] ) && ! in_array( $cart_item['product_id'], $excluded_products) && $exclusion === false ) {
                        $product = $cart_item['data'];
                        $quantity = $cart_item['quantity'];
                        $price = $product->get_price();
                        $name = $product->get_name();
                        
                        // If line item qualifies for bulk pricing, but is of single items, the discount only applies to  the number of items that directly make up a full "unit" (batches of 6).
                        $attributes = $cart_item['data']->get_attributes(); 
                        if (isset($attributes['pa_package-size'])) {
                            $size = $attributes['pa_package-size'];                                                
                            if ($size == 'single') {
                                $is_single = true;
                                $discounted_quantity = $quantity;
                                $discounted_quantity -= $discounted_quantity % 6;  // ex: if quantity is 32, this will reduce it to 30 items that get a discount
                                $discounted_price = $discounted_quantity * $price * $discount_percentage;
                                $bulk_discount_savings = $price * $discount_savings_percentage * $discounted_quantity;
                                $remaining_quantity = $quantity - $discounted_quantity; // determine remainder of items that should be charged at full price
                                $remainder_price = $remaining_quantity * $price;
                                $combined_total_price = $discounted_price + $remainder_price;
                                $discounted_unit_price = $combined_total_price / $quantity;

                                // Action! set the price of line item with what we've determined above
                                $cart_item['data']->set_price( $discounted_unit_price );                        
                            }
                            else {
                                $is_single = false;
                                $cart_item['data']->set_price( $price * $discount_percentage );
                                $discounted_price = $price * $discount_percentage;
                                $bulk_discount_savings = $price * $discount_savings_percentage * $quantity;
                            }                 
                        }
                        else {
                            $is_single = false;
                            $cart_item['data']->set_price( $price * $discount_percentage );
                            $discounted_price = $price * $discount_percentage;
                            $bulk_discount_savings = $price * $discount_savings_percentage * $quantity;
                        }

                        $bulk_discount_savings_total += $bulk_discount_savings;
                        // Following code is for debugging. Print the vars on screen to see if the math is right.
                        // if (is_cart()) {
                        //     echo '<h4>' .$name . '</h4>' ;
                        //     echo 'Original Price: ' . $price . '<br>';
                        //     echo 'Savings Percentage: ' . $discount_savings_percentage . '<br>';
                        //     echo 'Bulk Discount Savings: '. $bulk_discount_savings . '<br>';
                            
                        //     if ($is_single) {
                        //         echo '<br>Discounted Quantity: ' . $discounted_quantity . '<br>';
                        //         echo 'Remainder Quantity: ' . $remaining_quantity . '<br>';
                        //         echo 'Discounted Total Price: ' . $discounted_price . '<br>';
                        //         echo 'Remainder Total Price: ' . $remainder_price . '<br>';
                        //         echo 'New Unit Price: ' . $discounted_unit_price . '<br><br>';
                        //     }

                        //     if (! $is_single) {
                        //         echo 'Discounted Price: ' . $discounted_price . '<br><hr>';
                        //     }

                        // }
                    } 
                }
                if (is_cart()) {
                    echo '<div class="bulk_discounts">Bulk discount savings: <span>$'. $bulk_discount_savings_total . '</span></div>';
                }
            }
            else {
            } 
        }
    }
}

/**
 * Handle a custom 'customvar' query var to get orders with the 'customvar' meta. This is used in the inventory list pages to filter the orders query
 * @param array $query - Args for WP_Query.
 * @param array $query_vars - Query vars from WC_Order_Query.
 * @return array modified $query
 */
function handle_custom_query_var( $query, $query_vars ) {
	if ( ! empty( $query_vars['pickup_date'] ) ) {
		$query['meta_query'][] = array(
			'key' => 'pickup_date',
			'value' => esc_attr( $query_vars['pickup_date'] ),
		);
	}

	return $query;
}
add_filter( 'woocommerce_order_data_store_cpt_get_orders_query', 'App\handle_custom_query_var', 10, 2 );


function write_my_log( $log ) {
    if ( true === WP_DEBUG && true === WP_DEBUG_LOG) {
        error_log( is_array( $log ) || is_object( $log ) ? print_r( $log, true ) : $log );
    }
}

// Validate session pickup date on place order
add_action('woocommerce_after_checkout_validation', 'App\after_checkout_validation');

function after_checkout_validation( $posted ) {
    date_default_timezone_set('MST');
	$today = date('Ymd');
	$currenthour = date('H');
	$cutoffhour = '15:00';
    $cutoff = date('H', strtotime($cutoffhour));
    $tomorrow = date("Ymd", strtotime('tomorrow'));
    $pickup_date = WC()->session->get('pickup_date');
	$pickup_date_formatted = date("Ymd", strtotime($pickup_date));

    $giftcertificate_in_cart = false;
    $cart_count = 0;
    $gc_cart_count = 0;


        foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
            $giftcertificate_in_cart = false;
            $cart_count++;
        
            $product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
        
            if ( $product_id == 5317 || $product_id == 18153 || $product_id == 18200) {
                $giftcertificate_in_cart = true;
                $gc_cart_count++;
            }	
        }
        
        $cart_count = $cart_count - $gc_cart_count;
        
        if ( $giftcertificate_in_cart && $cart_count < 1) {
            $giftcertificate_only_item_in_cart = true;
            WC()->session->set('giftcertificate_only_item_in_cart', $giftcertificate_only_item_in_cart);
        }
        
        return $giftcertificate_in_cart;
        return $giftcertificate_only_item_in_cart;

	if ($currenthour > $cutoff) {
        $post3pm = true;
      }
      elseif ($currenthour < $cutoff) {
        $post3pm = false;
      }
      else {
          //
      }
    
    if ($giftcertificate_only_item_in_cart == false && $pickup_date_formatted == "" || !$giftcertificate_only_item_in_cart && is_empty($pickup_date_formatted)) {
        wc_add_notice( __( "We seem to have lost your pickup date, please return to cart and select a pickup date", 'woocommerce' ), 'error' );							
        write_my_log( 'Pickup date is empty' );
    }
    if ($post3pm == true && $pickup_date_formatted <= $tomorrow || $pickup_date_formatted == $today) {
        wc_add_notice( __( "Your pickup date is not valid, please return to cart and select a new pickup date", 'woocommerce' ), 'error' );							
    }
}

add_action('woocommerce_before_add_to_cart_form', 'App\sixth_item_free_language');

function sixth_item_free_language() {
    global $product;
    $product_id = get_the_ID();

    if ( has_term( array('6th-item-free'), 'product_tag', $product_id ) ){
        $sixth_item_free = "<span class=\"bulk-discount\">Sixth item is free when you buy 1/2 dozen!</span>";
        echo $sixth_item_free;
    }
}

/**
 * @snippet       Rename Address 1 & 2 Placeholder | WooCommerce Checkout
 * @how-to        Get CustomizeWoo.com FREE
 * @author        Rodolfo Melogli
 * @testedwith    WooCommerce 3.8
 * @donate $9     https://businessbloomer.com/bloomer-armada/
 */
 
add_filter( 'woocommerce_default_address_fields' , 'App\bbloomer_rename_address_placeholders_checkout', 9999 );
 
function bbloomer_rename_address_placeholders_checkout( $address_fields ) {
   $address_fields['address_1'] = array(
        'label'  =>  'House Number',
        'placeholder'   => 'ex: 8720',
        'required'  => true
    );
    $address_fields['address_2'] = array(
        'label'  =>  'Street',
        'placeholder'   => 'ex: 149 Street',
        'required'  => true
    );   return $address_fields;
}

add_filter( 'woocommerce_checkout_fields' , 'App\bbloomer_add_field_and_reorder_fields' );
   
function bbloomer_add_field_and_reorder_fields( $fields ) {
   
    // Add New Fields
        
    $fields['billing']['billing_unitno'] = array(
    'label'     => 'Apartment/Unit',
    'placeholder'   => 'Apartment/Unit',
    'priority' => 60,
    'required'  => false,
    'clear'     => true
     );
   
    $fields['shipping']['shipping_unitno'] = array(
    'label'     => 'Apartment/Unit',
    'placeholder'   => 'Apartment/Unit',
    'priority' => 60,
    'required'  => false,
    'clear'     => true
     );     
      
    return $fields;
}

// ------------------------------------
// Add Billing House # to Address Fields
  
add_filter( 'woocommerce_order_formatted_billing_address' , 'App\bbloomer_default_billing_address_fields', 10, 2 );
  
function bbloomer_default_billing_address_fields( $fields, $order ) {
    $fields['billing_unitno'] = get_post_meta( $order->get_id(), '_billing_unitno', true );
    return $fields;
}
  
// ------------------------------------
// Add Shipping House # to Address Fields
  
add_filter( 'woocommerce_order_formatted_shipping_address' , 'App\bbloomer_default_shipping_address_fields', 10, 2 );
  
function bbloomer_default_shipping_address_fields( $fields, $order ) {
    $fields['shipping_unitno'] = get_post_meta( $order->get_id(), '_shipping_unitno', true );
    return $fields;
}

// ------------------------------------
// Create 'replacements' for new Address Fields
  
add_filter( 'woocommerce_formatted_address_replacements', 'App\add_new_replacement_fields',10,2 );
  
function add_new_replacement_fields( $replacements, $address ) {
    $replacements['{billing_unitno}'] = isset($address['billing_unitno']) ? $address['billing_unitno'] : '';
    $replacements['{shipping_unitno}'] = isset($address['shipping_unitno']) ? $address['shipping_unitno'] : '';
    return $replacements;
}

// save fields to order meta
add_action( 'woocommerce_checkout_update_order_meta', 'App\misha_save_what_we_added' );

function misha_save_what_we_added( $order_id ){

	if( !empty( $_POST['billing_unitno'] ) )
		update_post_meta( $order_id, 'billing_unitno', sanitize_text_field( $_POST['billing_unitno'] ) );

    if( !empty( $_POST['shipping_unitno'] ) )
    update_post_meta( $order_id, 'shipping_unitno', sanitize_text_field( $_POST['shipping_unitno'] ) );
}

// ----------  ADDITIONAL FEES

// Add fee to cart if delivery contains cooler items
// add_action('woocommerce_cart_calculate_fees', 'App\delivery_fee');

// function delivery_fee() {
// 	if (is_admin() && !defined('DOING_AJAX')) {
// 		return;
// 	}

//     $cooler_item_in_cart = false;
 
//     foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
//         $product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

//         $terms = get_the_terms( $product_id, 'product_cat' );

//         foreach($terms as $term) {
            
//             $product_cat_id = $term->term_id;									
//             $product_cat_meta = get_term_meta($product_cat_id, 'list_type', true);
                                                
//             if (str_contains($product_cat_meta, 'cooler')) {
//                 $cooler_item_in_cart = true;
//             }
//         }
//     }

// 	$chosen_shipping_method = WC()->session->get('chosen_shipping_methods'); 

// 	if (strpos($chosen_shipping_method[0], 'flat_rate') !== false && $cooler_item_in_cart == true) {
// 		WC()->cart->add_fee(__('Fee for Delivering Cold Item', 'txtdomain'), 2, true);
// 	}
// }

// Add bag fee to cart if is delivery
add_action('woocommerce_cart_calculate_fees', 'App\delivery_bag_fee');

function delivery_bag_fee() {
	if (is_admin() && !defined('DOING_AJAX')) {
		return;
	}

	$chosen_shipping_method = WC()->session->get('chosen_shipping_methods'); 

	if (strpos($chosen_shipping_method[0], 'flat_rate') !== false) {
		WC()->cart->add_fee(__('Delivery Bag Fee (includes tax)', 'txtdomain'), 0.5, true);
	}
}

// change delivery fee for custom wholesale account
add_action('woocommerce_cart_calculate_fees', 'App\delivery_fee');

function delivery_fee() {
	if (is_admin() && !defined('DOING_AJAX')) {
		return;
	}

    if (in_array( 'wcwp_wholesale', (array) wp_get_current_user()->roles)) { 
        $is_wholesale_user = true;
    }
    else {
        $is_wholesale_user = false;
    }

    $userid = get_current_user_id();
    $userid_var = 'user_'.$userid;
    $wholesale_user_delivery_discount = get_field('wholesale_user_delivery_discount', $userid_var);

	$chosen_shipping_method = WC()->session->get('chosen_shipping_methods'); 

	if (strpos($chosen_shipping_method[0], 'alg_wc_shipping') !== false) {
		WC()->cart->add_fee(__('Custom Delivery Discount', 'txtdomain'), -$wholesale_user_delivery_discount, true);
	}
}

add_filter( 'body_class', function ( $classes ) {

    if( is_user_logged_in() ) {  
        $user = wp_get_current_user(); // getting & setting the current user 
        $roles = ( array ) $user->roles; // obtaining the role         
    }
    else {
        $user = array();
        $roles = array();
    }

    if (in_array("wcwp_wholesale", $roles)) {
        $classes[] = 'wholesale-user';
    }
    return $classes;
});

// Allow wholesale user to have credit account.
add_filter( 'woocommerce_available_payment_gateways', function( $available_gateways ) {
    
    $userid = get_current_user_id();
    $userid_var = 'user_'.$userid;
    $wholesale_user_has_credit = get_field('allow_customer_to_order_on_credit', $userid_var);

    if ( is_checkout() && ! is_wc_endpoint_url() || is_wc_endpoint_url( 'order-pay' ) ) {
    
        foreach ( $available_gateways as $payment_id => $available_gateway ) {
            if ( ! $wholesale_user_has_credit ) {
                unset($available_gateways['cod']);
                // var_dump($available_gateways[$payment_id]);
            }
        }
        return $available_gateways;
    }
} );

// When a wholesale order is made, switch order status to Wholesale Processing
add_filter( 'woocommerce_cod_process_payment_order_status', function( $order_status, $order ) {
    return 'ws-processing';
}, 10, 2 );

add_filter( 'woocommerce_ajax_variation_threshold', function( $threshold ) { 
    return 0;
} );

//add a custom dashboard widget for admins: display orders with missing pickup dates
add_action('wp_dashboard_setup', 'App\my_custom_dashboard_widget');
  
function my_custom_dashboard_widget() {
    global $wp_meta_boxes;
    wp_add_dashboard_widget('App\custom_help_widget', 'Orders with Missing Pickup Dates', 'App\custom_dashboard_help');
}
 
function custom_dashboard_help() {

    $orders = wc_get_orders( array(  
      'limit' => -1,
      'status' => array('wc-processing'),
      'pickup_date' => '',
    ) );

    echo '<table id="lists" class="display" style="width: 100%;">
        <thead>
          <tr>
            <th style="text-align: left;">Name</th>
            <th style="text-align: left;">Order #</th>
            <th style="text-align: left;">Phone</th>  
          </tr>
        </thead>
        <tbody>';
            foreach ($orders as $details ) {
            
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


                if( !$order_pickup_date || $order_pickup_date === "") {
                    echo 
                        '<tr>
                            <td class="name">
                                <strong> '. $last_name . ', ' . $first_name . '</strong>
                            </td>
                            <td>' . $order_number . '</td>
                            <td class="phone">' . $phone . '</td> 
                        </tr>';       
                }
            }
        echo '
        </tbody>
      </table>';
}

// add ACF fields to product variations

/* ACF filter for Variations */

/**
 * @snippet       Add Custom Field to Product Variations - WooCommerce
 */
 
// -----------------------------------------
// 1. Add custom field input @ Product Data > Variations > Single Variation
 
add_action( 'woocommerce_variation_options_pricing', function ( $loop, $variation_data, $variation ) {

    echo '<script>
        jQuery(document).ready(function($) {
            $(".datepicker").multiDatesPicker({
                minDate: 0,
                dateFormat: "y-m-d",
                showButtonPanel: true,
                changeMonth: true,
                changeYear: true,
                onSelect: function(dateText, inst) {
                    inst.settings.defaultDate = dateText;
                },
            });
        });
    </script>';
    
    $existing_soldout_value = get_post_meta( $variation->ID, 'sold_out', true );
    $available_override = get_post_meta( $variation->ID, 'available_override', true );

    echo '<p class="input-group date form-field form-row form-row-full">
            <label for="sold_out[' . $loop . ']">Sold Out / Unavailable Dates</label>
            <input
                type="text" 
                class="datepicker form-control"
                id="sold_out[' . $loop . ']"
                name="sold_out[' . $loop . ']"
                value="' . $existing_soldout_value . '"
            >
                <span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
            </p>
            
            <p class="input-group date form-field form-row form-row-full">
            <label for="available_override[' . $loop . ']">Availability Override</label>
            <input
                type="text" 
                class="datepicker form-control"
                id="available_override[' . $loop . ']"
                name="available_override[' . $loop . ']"
                value="' . $available_override . '"
            >
                <span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
            </p>';

 }, 10, 3 );
 

 
// -----------------------------------------
// 2. Save custom field on product variation save
 
add_action( 'woocommerce_save_product_variation', function ( $variation_id, $i ) {
    $sold_out = $_POST['sold_out'][$i];
    $available_override = $_POST['available_override'][$i];
        
    if ( isset( $sold_out ) ) update_post_meta( $variation_id, 'sold_out', esc_attr( $sold_out ) );
    if ( isset( $available_override ) ) update_post_meta( $variation_id, 'available_override', esc_attr( $available_override ) );
    
 }, 10, 2 );

 
// -----------------------------------------
// 3. Store custom field value into variation data
 
add_filter( 'woocommerce_available_variation', function ( $variations ) {
    $variations['sold_out'] = '<div class="woocommerce_custom_field">Sold Out: <span>' . get_post_meta( $variations[ 'variation_id' ], 'sold_out', true ) . '</span></div>';
    $variations['available_override'] = '<div class="woocommerce_custom_field">Availability Override: <span>' . get_post_meta( $variations[ 'variation_id' ], 'available_override', true ) . '</span></div>';

    return $variations;
 } );
 


 