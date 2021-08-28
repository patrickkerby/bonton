<?php

namespace App;

use Roots\Sage\Container;
use Roots\Sage\Assets\JsonManifest;
use Roots\Sage\Template\Blade;
use Roots\Sage\Template\BladeProvider;

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('sage/main.css', asset_path('styles/main.css'), false, null);
    wp_enqueue_script('sage/main.js', asset_path('scripts/main.js'), ['jquery'], null, true);

    if (is_front_page()) {
        wp_enqueue_style('sage/home.css', asset_path('styles/home.css'), false, null);
    }
    
    if (is_woocommerce() || is_page(array( 'cart', 'checkout' ))) {
        wp_enqueue_style('sage/woo.css', asset_path('styles/woo.css'), false, null);
    }

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    if (is_page( array( 789, 819, 815, 810, 791, 6968, 6177, 10794, 10071, 15435 )) ) {
        wp_enqueue_script('sage/lists.js', asset_path('scripts/lists.js'), [], null, true);
    }
}, 100);

/**
 * Theme setup
 */
add_action('after_setup_theme', function () {
    /**
     * Enable features from Soil when plugin is activated
     * @link https://roots.io/plugins/soil/
     */
    add_theme_support('soil-clean-up');
    // add_theme_support('soil-jquery-cdn');
    add_theme_support('soil-nav-walker');
    add_theme_support('soil-nice-search');
    add_theme_support('soil-relative-urls');

    /**
     * Enable plugins to manage the document title
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Register navigation menus
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
        'footer_navigation' => __('Footer Navigation', 'sage'),
        'mobile_navigation' => __('Mobile Navigation', 'sage'),
        'top_navigation' => __('Top Navigation', 'sage')
    ]);

    /**
     * Enable post thumbnails
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable HTML5 markup support
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

    /**
     * Enable selective refresh for widgets in customizer
     * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
     */
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Use main stylesheet for visual editor
     * @see resources/assets/styles/layouts/_tinymce.scss
     */
    add_editor_style(asset_path('styles/main.css'));

    /**
     * Add WooCommerce Support
     */
    add_theme_support('woocommerce');
    add_theme_support( 'wc-product-gallery-zoom' );
    remove_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
    add_theme_support( 'post-thumbnails', array( 'product' ) );
    
}, 20);

/**
 * Register sidebars
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>'
    ];
    register_sidebar([
        'name'          => __('Primary', 'sage'),
        'id'            => 'sidebar-primary'
    ] + $config);
    register_sidebar([
        'name'          => __('Footer', 'sage'),
        'id'            => 'sidebar-footer'
    ] + $config);
    register_sidebar([
        'name'          => __('Shop Page - Before Products', 'sage'),
        'id'            => 'sidebar-shop'
    ] + $config);
});

/**
 * Updates the `$post` variable on each iteration of the loop.
 * Note: updated value is only available for subsequently loaded views, such as partials
 */
add_action('the_post', function ($post) {
    sage('blade')->share('post', $post);
});

/**
 * Setup Sage options
 */
add_action('after_setup_theme', function () {
    /**
     * Add JsonManifest to Sage container
     */
    sage()->singleton('sage.assets', function () {
        return new JsonManifest(config('assets.manifest'), config('assets.uri'));
    });

    /**
     * Add Blade to Sage container
     */
    sage()->singleton('sage.blade', function (Container $app) {
        $cachePath = config('view.compiled');
        if (!file_exists($cachePath)) {
            wp_mkdir_p($cachePath);
        }
        (new BladeProvider($app))->register();
        return new Blade($app['view']);
    });

    /**
     * Create @asset() Blade directive
     */
    sage('blade')->compiler()->directive('asset', function ($asset) {
        return "<?= " . __NAMESPACE__ . "\\asset_path({$asset}); ?>";
    });
});

if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Bon Ton General Settings',
		'menu_title'	=> 'Bon Ton Settings',
		'menu_slug' 	=> 'bonton-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}

// Add instore vs curbside to checkout

// add fields
add_action( 'woocommerce_after_order_notes', function( $checkout ){
  
    woocommerce_form_field( 'pickuplocation', array(
        'type'          => 'select',
        'class'         => array('bonton-field', 'form-row-wide'), 
        'label'         => 'In-store or curbside pickup?',
        'required'      => true,
        'options'	=> array( 
            ''		=> 'Please select',
            'Curbside'	=> 'Curbside',
            'In-store'	=> 'In-store'
            ),
        ), $checkout->get_value( 'pickuplocation' ) ); 
});
 
// save fields to order meta
add_action( 'woocommerce_checkout_update_order_meta', function( $order_id ){
 
	if( !empty( $_POST['pickuplocation'] ) )
		update_post_meta( $order_id, 'pickuplocation', sanitize_text_field( $_POST['pickuplocation'] ) );
 
});

add_action('init', function () {
    remove_filter('script_loader_tag', 'Roots\\Soil\\CleanUp\\clean_script_tag');
});