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

// custom query for cooler lists
add_filter( 'woocommerce_product_data_store_cpt_get_products_query', function( $query, $query_vars ) {
	if ( ! empty( $query_vars['cooler'] ) ) {
		$query['meta_query'][] = array(
			'key' => 'cooler',
			'value' => esc_attr( $query_vars['cooler'] ),
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

add_action( 'woocommerce_before_calculate_totals', 'App\change_cart_items_prices', 10, 1 );
function change_cart_items_prices( $cart ) {

    if ( is_admin() && ! defined( 'DOING_AJAX' ) )
        return;

    if ( did_action( 'woocommerce_before_calculate_totals' ) >= 2 )
        return;

    $categories = array(83, 84);
    $total_item_quantity = 0;

    if (is_cart()) {
        foreach ( $cart->get_cart() as $cart_item ) {        

            if ( has_term( $categories, 'product_cat', $cart_item['product_id'] ) ){
                // add conditional for if is_taxable    
                $attributes = $cart_item['data']->get_attributes();
                $quantity = $cart_item['quantity'];

                if (isset($attributes['pa_package-size'])) {

                    $size = $attributes['pa_package-size'];
                    
                    if ($size === 'half-dozen') {
                        $quantity = $quantity * 6;                
                    }                    
                    if ($size === 'dozen') {
                        $quantity = $quantity * 12;
                    }
                }
                $total_item_quantity +=  $quantity;
            }        
        }
        
        if ( $total_item_quantity > 5 ) {
            foreach ( $cart->get_cart() as $cart_item ) {        
                if ( has_term( $categories, 'product_cat', $cart_item['product_id'] )  ) {
                    $cart_item['data']->set_tax_class( 'zero-rate' );
                }
            }
        }
    }
}

/**
 * Save pickup date and timeslot to WooCommerce order (from session)
 */
add_action('woocommerce_checkout_update_order_meta', 'App\add_pickup_to_order');
function add_pickup_to_order($order_id) {
	$pickup_date 		= WC()->session->get('pickup_date');
	$pickup_timeslot 	= WC()->session->get('pickup_timeslot');
	$order = wc_get_order( $order_id );
	$order->update_meta_data( 'pickup_date', $pickup_date );
	$order->update_meta_data( 'pickup_timeslot', $pickup_timeslot );
	$order->save();
}

/*
 * ADD PICKUP DETAILS TO EMAILS
 * @param $order_obj Order Object
 * @param $sent_to_admin If this email is for administrator or for a customer
 * @param $plain_text HTML or Plain text (can be configured in WooCommerce > Settings > Emails)
 */

/**
 * Add a custom field (in an order) to the emails
 */
add_filter( 'woocommerce_email_order_meta_fields', 'App\custom_woocommerce_email_order_pickupdate', 10, 3 );

function custom_woocommerce_email_order_pickupdate( $fields, $sent_to_admin, $order ) {
    $fields['pickup_date'] = array(
        'label' => __( 'Pickup Date' ),
        'value' => get_post_meta( $order->id, 'pickup_date', true ),
    );
    return $fields;
}

add_filter( 'woocommerce_email_order_meta_fields', 'App\custom_woocommerce_email_order_timeslot', 10, 3 );

function custom_woocommerce_email_order_timeslot( $fields, $sent_to_admin, $order ) {
    $fields['pickup_timeslot'] = array(
        'label' => __( 'Pickup Timeslot' ),
        'value' => get_post_meta( $order->id, 'pickup_timeslot', true ),
    );
    return $fields;
}
