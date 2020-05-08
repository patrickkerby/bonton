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
 * @snippet       Variable Product Price Range: "From: <del>$$$min_reg_price</del> $$$min_sale_price"
 */
 
// add_filter( 'woocommerce_variable_price_html', function( $price, $product ) {
 
// // 1. Get min/max regular and sale variation prices
// $min_var_reg_price = $product->get_variation_regular_price( 'min', true );
// $min_var_sale_price = $product->get_variation_sale_price( 'min', true );
// $max_var_reg_price = $product->get_variation_regular_price( 'max', true );
// $max_var_sale_price = $product->get_variation_sale_price( 'max', true );
 
// // 2. New $price, unless all variations have exact same prices
// if ( ! ( $min_var_reg_price == $max_var_reg_price && $min_var_sale_price == $max_var_sale_price ) ) {   
//    if ( $min_var_sale_price < $min_var_reg_price ) {
//       $price = sprintf( __( 'From: <del>%1$s</del><ins>%2$s</ins>', 'woocommerce' ), wc_price( $min_var_reg_price ), wc_price( $min_var_sale_price ) );
//    } else {
//       $price = sprintf( __( 'From: %1$s', 'woocommerce' ), wc_price( $min_var_reg_price ) );
//    }
// }
 
// return $price;
// }, 10, 2 );


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
// add_filter( 'woocommerce_variable_sale_price_html', 'detect_variation_price_format', 10, 2 ); <- add this in. after testing.


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

// CART LOGIC: use pickup date to 
add_action('acf/validate_save_post', function() {
    if(!wp_doing_ajax() || !isset($_POST['_acf_post_id']) || !acf_verify_nonce('acf_form'))
        return;
        
    // Native ACF Form validation (required, minimum/maximum etc...)
    if($errors = acf_get_validation_errors())
        wp_send_json_success(array(
            'valid' 	=> 0,
            'errors' 	=> $errors,
        ));
    
    // acf_form() arguments are stocked in $_POST['_acf_form']
    if(!$form = $_POST['_acf_form'])
        return;
    
    // Decoding the form arguments via acf_decrypt().
    $form = json_decode(acf_decrypt($form), true);
        
    // Creating a 'proxy form' for the Legacy ACF Form fields saving
    // Setting 'return' to null to avoid built-in redirection
    $proxy = $form;
    $proxy['return'] = '';

    // Using native ACF Form submission method
    acf()->form_front = new acf_form_front();
    acf()->form_front->submit_form($proxy);

    wp_send_json_success(array(
        'valid' => 1,
        'data' 	=> 'Success!',
    ));
});

// /**
//  * Save pickup date selection to customer order.
//  *
//  * @param WC_Order_Item_Product $item
//  * @param string                $cart_item_key
//  * @param array                 $values
//  * @param WC_Order              $order
//  */
// function iconic_add_engraving_text_to_order_items( $item, $cart_item_key, $values, $order ) {
// 	if ( empty( $values['iconic-engraving'] ) ) {
// 		return;
// 	}

// 	$item->add_meta_data( __( 'Engraving', 'iconic' ), $values['iconic-engraving'] );
// }

// add_action( 'woocommerce_checkout_create_order_line_item', 'iconic_add_engraving_text_to_order_items', 10, 4 );