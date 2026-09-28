<?php

namespace App;



/**
 * Theme customizer
 */
add_action('customize_register', function (\WP_Customize_Manager $wp_customize) {
    // Add postMessage support
    $wp_customize->get_setting('blogname')->transport = 'postMessage';
    $wp_customize->selective_refresh->add_partial('blogname', [
        'selector' => '.brand',
        'render_callback' => function () {
            bloginfo('name');
        }
    ]);
});

/**
 * Customizer JS
 */
add_action('customize_preview_init', function () {
    wp_enqueue_script('sage/customizer.js', asset_path('scripts/customizer.js'), ['customize-preview'], null, true);
});


add_action('admin_enqueue_scripts', function ($hook) {
	$screen = function_exists('get_current_screen') ? get_current_screen() : null;
	$screen_id = $screen ? $screen->id : '';
	$post_type = $screen && !empty($screen->post_type) ? $screen->post_type : '';

	if (!$post_type && $hook === 'post.php' && !empty($_GET['post'])) {
		$post_type = get_post_type((int) $_GET['post']);
	}

	$is_product = in_array($hook, ['post.php', 'post-new.php'], true) && (
		$post_type === 'product' ||
		(isset($_GET['post_type']) && $_GET['post_type'] === 'product')
	);

	$is_order = in_array($screen_id, ['shop_order', 'woocommerce_page_wc-orders'], true) ||
		(isset($_GET['post_type']) && $_GET['post_type'] === 'shop_order') ||
		(isset($_GET['page']) && $_GET['page'] === 'wc-orders');

	$is_product_term = $screen && !empty($screen->taxonomy) && in_array($screen->taxonomy, ['product_cat', 'product_tag'], true);

	if (!$is_product && !$is_order && !$is_product_term) {
		return;
	}

	// Sage 9: get_template_directory_uri() already points at /resources
	$admin_uri = get_template_directory_uri() . '/admin';

	wp_enqueue_script('jquery-ui-datepicker');
	wp_enqueue_style(
		'jquery-ui-smoothness',
		'https://code.jquery.com/ui/1.13.3/themes/smoothness/jquery-ui.css',
		[],
		'1.13.3'
	);
	wp_enqueue_style(
		'jquery-ui.multidatespicker',
		$admin_uri . '/jquery-ui.multidatespicker.css',
		['jquery-ui-smoothness'],
		'1.6.6'
	);
	wp_enqueue_script(
		'jquery-ui.multidatespicker',
		$admin_uri . '/jquery-ui.multidatespicker.js',
		['jquery-ui-datepicker'],
		'1.6.6',
		true
	);

	if ($is_product || $is_product_term) {
		wp_enqueue_script(
			'bonton-variation-dates',
			$admin_uri . '/variation-dates.js',
			['jquery-ui.multidatespicker'],
			'1.1.1',
			true
		);
	}
});


/**
 * Pickup details in order dashboard
 */
add_action( 'woocommerce_admin_order_data_after_order_details', 'App\bonton_pickup_meta' );
 
function bonton_pickup_meta( $order ){  ?>
 
		<br class="clear" />
		<h4>Pickup Details: <a href="#" class="edit_address">Edit</a></h4>
		<?php 
			/*
			 * get all the meta data values we need - Updated for HPOS
			 */ 
			$date = $order->get_meta( 'pickup_date', true );
        ?>
        <div class="address">
				<p><strong>Pickup Date:</strong> <?php echo $date ?></p>
        </div>
        <div class="edit_address"><?php
 
			woocommerce_wp_text_input( array(
				'id' => 'pickup_date',
				'label' => 'Pickup Date:',
				'value' => $date,
				'description' => '(Format: Thursday, September 12, 2020)',
				'wrapper_class' => 'form-field-wide'
			) );			
 
		?></div>
<?php }

add_action( 'woocommerce_process_shop_order_meta', 'App\save_general_details' );
 
function save_general_details( $ord_id ){
	$order = wc_get_order( $ord_id );
	if ( $order ) {
		$pickup_date = wc_clean( $_POST[ 'pickup_date' ] );
		$order->update_meta_data( 'pickup_date', $pickup_date );
		
		// Create a sortable date format (Y-m-d) for sorting purposes
		if ( !empty( $pickup_date ) ) {
			$date_timestamp = strtotime( $pickup_date );
			if ( $date_timestamp !== false ) {
				$sortable_date = date( 'Y-m-d', $date_timestamp );
				$order->update_meta_data( 'pickup_date_sort', $sortable_date );
			}
		}
		
		$order->save();
	}
	
	// wc_clean() and wc_sanitize_textarea() are WooCommerce sanitization functions
}


/**
 * @snippet       Add Column to Orders Table (e.g. Billing Country) - WooCommerce
 * @how-to        Get CustomizeWoo.com FREE
 * @sourcecode    https://businessbloomer.com/?p=78723
 * @author        Rodolfo Melogli
 * @compatible    WooCommerce 3.4.5
 */
 
// HPOS compatible hooks for admin order columns
add_filter( 'manage_woocommerce_page_wc-orders_columns', 'App\add_new_order_admin_list_column' );
// Keep the old hook for backward compatibility with non-HPOS sites
add_filter( 'manage_edit-shop_order_columns', 'App\add_new_order_admin_list_column' );
 
function add_new_order_admin_list_column( $columns ) {
    $columns['pickup_date'] = 'Pickup Date';
    return $columns;
}
 
// HPOS compatible hook for column content
add_action( 'manage_woocommerce_page_wc-orders_custom_column', 'App\add_new_order_admin_list_column_content', 10, 2 );
// Keep the old hook for backward compatibility with non-HPOS sites
add_action( 'manage_shop_order_posts_custom_column', 'App\add_new_order_admin_list_column_content_legacy' );
 
function add_new_order_admin_list_column_content( $column, $order ) {
    if ( 'pickup_date' === $column ) {
        $date = $order->get_meta( 'pickup_date', true );
		$date_sort = $order->get_meta( 'pickup_date_sort', true );
		if ( empty( $date ) ) {
            echo '<span style="color:red;">(empty)</span>';
        } else {
            echo esc_html($date);
        }
    }
}

// Legacy function for non-HPOS sites
function add_new_order_admin_list_column_content_legacy( $column ) {
    global $post;
 
    if ( 'pickup_date' === $column ) {
        $order = wc_get_order( $post->ID );
        if ( $order ) {
            $date = $order->get_meta( 'pickup_date', true );
            echo $date;
        }
    }
}


/**
 * 
 * Make order screen custom column sortable - Updated for HPOS
 * 
 */
// HPOS compatible hook for sortable columns
add_filter('manage_woocommerce_page_wc-orders_sortable_columns', 'App\MY_COLUMNS_SORT_FUNCTION');
add_filter('manage_edit-shop_order_sortable_columns', 'App\MY_COLUMNS_SORT_FUNCTION');

if (!function_exists('App\MY_COLUMNS_SORT_FUNCTION')) {
    function MY_COLUMNS_SORT_FUNCTION($columns) {
        $custom = array(
            'pickup_date' => 'pickup_date_sort'
        );
        return wp_parse_args($custom, $columns);
    }
}

// HPOS: Sorting logic
add_filter('woocommerce_order_query_args', function ($args, $query = null) {
    if (
        isset($_GET['orderby']) && $_GET['orderby'] === 'pickup_date_sort'
    ) {
        $args['meta_key'] = 'pickup_date_sort';
        $args['orderby'] = 'meta_value';
        $args['order'] = isset($_GET['order']) ? $_GET['order'] : 'asc';
        $args['meta_type'] = 'DATE';
    }
    return $args;
}, 10, 2);

// Legacy: Classic WP Orders Table
add_action('pre_get_posts', function ($query) {
    if (!is_admin()) return;
    $orderby = $query->get('orderby');
    if ('pickup_date_sort' === $orderby) {
        $query->set('meta_key', 'pickup_date_sort');
        $query->set('orderby', 'meta_value');
        $query->set('meta_type', 'DATE');
    }
});

/**
 * Site-wide Notice Management Dashboard Widget
 */
add_action('wp_dashboard_setup', 'App\add_site_notice_dashboard_widget');

function add_site_notice_dashboard_widget() {
    wp_add_dashboard_widget(
        'site_notice_widget',
        'Site-wide Notice',
        'App\site_notice_widget_content'
    );
}

function site_notice_widget_content() {
    // Get current WooCommerce store notice settings
    $store_notice = get_option('woocommerce_demo_store', 'no');
    $store_notice_text = wp_unslash(get_option('woocommerce_demo_store_notice', __('This is a demo store for testing purposes &mdash; no orders shall be fulfilled.', 'woocommerce')));
    
    // Handle form submission
    if (isset($_POST['update_store_notice']) && wp_verify_nonce($_POST['store_notice_nonce'], 'update_store_notice')) {
        $new_notice_enabled = isset($_POST['store_notice_enabled']) ? 'yes' : 'no';
        $new_notice_text = wp_unslash(sanitize_textarea_field($_POST['store_notice_text']));
        
        update_option('woocommerce_demo_store', $new_notice_enabled);
        update_option('woocommerce_demo_store_notice', $new_notice_text);
        
        $store_notice = $new_notice_enabled;
        $store_notice_text = $new_notice_text;
        
        echo '<div class="notice notice-success inline"><p>Notice updated successfully!</p></div>';
    }
    
    ?>
    <form method="post" action="">
        <?php wp_nonce_field('update_store_notice', 'store_notice_nonce'); ?>
        
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="store_notice_enabled">Enable Notice</label>
                </th>
                <td>
                    <label>
                        <input type="checkbox" id="store_notice_enabled" name="store_notice_enabled" value="1" <?php checked($store_notice, 'yes'); ?>>
                        Show site-wide notice
                    </label>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="store_notice_text">Notice Text</label>
                </th>
                <td>
                    <textarea 
                        id="store_notice_text" 
                        name="store_notice_text" 
                        rows="3" 
                        cols="50" 
                        class="large-text"
                        placeholder="Enter your notice text here..."
                    ><?php echo esc_textarea($store_notice_text); ?></textarea>
                    <p class="description">HTML is allowed. The notice will appear at the bottom of every page.</p>
                </td>
            </tr>
        </table>
        
        <p class="submit">
            <input type="submit" name="update_store_notice" class="button button-primary" value="Update Notice">
            <?php if ($store_notice === 'yes'): ?>
                <a href="<?php echo home_url(); ?>" target="_blank" class="button">Preview Notice</a>
            <?php endif; ?>
        </p>
    </form>
    
    <style>
        #site_notice_widget .form-table th {
            width: 120px;
            padding-left: 0;
        }
        #site_notice_widget .form-table td {
            padding-left: 10px;
        }
        #site_notice_widget textarea {
            width: 100%;
        }
    </style>
    <?php
}

/**
 * Notice ids WooCommerce uses for the store_notice{md5} cookie, plus the
 * unslashed variant in case dashboard saves and option reads disagree.
 */
function bonton_store_notice_hashes($notice = null)
{
    if ($notice === null) {
        $notice = get_option('woocommerce_demo_store_notice');
        if (empty($notice)) {
            $notice = __('This is a demo store for testing purposes &mdash; no orders shall be fulfilled.', 'woocommerce');
        }
    }

    $notice = is_string($notice) ? $notice : '';

    return array_values(array_unique(array_filter([
        $notice !== '' ? md5($notice) : null,
        md5(wp_unslash($notice)),
    ])));
}

function bonton_store_notice_is_dismissed($notice = null)
{
    foreach (bonton_store_notice_hashes($notice) as $hash) {
        if (!empty($_COOKIE['bonton_notice_dismissed_' . $hash])) {
            return true;
        }
        if (isset($_COOKIE['store_notice' . $hash]) && $_COOKIE['store_notice' . $hash] === 'hidden') {
            return true;
        }
    }

    return false;
}

/**
 * Never print a dismissed bar (cart/checkout are uncached, so this stops the
 * reload flash). Also honor old bonton_notice_dismissed_* cookies.
 */
add_filter('woocommerce_demo_store', function ($html, $notice) {
    if (bonton_store_notice_is_dismissed($notice)) {
        return '';
    }

    return $html;
}, 10, 2);

/**
 * Hide the bar before first paint. Woo's own JS only hide()/show() after
 * jQuery ready, which is why dismissed visitors see a flash on reload.
 */
add_action('wp_head', function () {
    if (!function_exists('is_store_notice_showing') || !is_store_notice_showing()) {
        return;
    }

    $hashes = bonton_store_notice_hashes();
    ?>
    <style id="bonton-store-notice-css">
      html.bonton-store-notice-hidden .woocommerce-store-notice,
      html.bonton-store-notice-hidden p.demo_store { display: none !important; }
    </style>
    <script>
    function bontonStoreNoticeGate() {
      var hashes = <?php echo wp_json_encode($hashes); ?>;
      var cookies = document.cookie ? document.cookie.split(';') : [];
      var dismissed = false;
      for (var h = 0; h < hashes.length; h++) {
        var woo = 'store_notice' + hashes[h] + '=hidden';
        var bonton = 'bonton_notice_dismissed_' + hashes[h] + '=';
        for (var i = 0; i < cookies.length; i++) {
          var c = cookies[i].trim();
          if (c.indexOf(woo) === 0 || c.indexOf(bonton) === 0) {
            dismissed = true;
            break;
          }
        }
        if (dismissed) {
          break;
        }
      }
      if (dismissed) {
        document.documentElement.classList.add('bonton-store-notice-hidden');
      }
    }
    bontonStoreNoticeGate();
    </script>
    <?php
}, 0);

add_filter('rocket_delay_js_exclusions', function ($exclusions) {
    $exclusions[] = 'bontonStoreNoticeGate';
    return $exclusions;
});

/**
 * Native Woo notice hooks to wp_body_open. If a layout skips that, still print
 * it in the footer so the bar is not missing on older templates.
 */
add_action('wp_footer', function () {
    if (!function_exists('woocommerce_demo_store') || did_action('wp_body_open')) {
        return;
    }
    woocommerce_demo_store();
}, 5);

// Clear breadclub caches when new orders are saved to ensure real-time updates
add_action('woocommerce_new_order', 'App\clear_breadclub_caches');
add_action('woocommerce_order_status_changed', 'App\clear_breadclub_caches');
add_action('woocommerce_update_order', 'App\clear_breadclub_caches');

function clear_breadclub_caches($order_id = null) {
    $breadclub_id = 18200; // TODO: Get from ACF options
    
    // If we have an order ID, check if it contains breadclub product
    if ($order_id) {
        $order = wc_get_order($order_id);
        if (!$order) return;
        
        $has_breadclub = false;
        foreach ($order->get_items() as $item) {
            if ($item->get_product_id() == $breadclub_id) {
                $has_breadclub = true;
                break;
            }
        }
        
        // Only clear cache if this order contains breadclub
        if (!$has_breadclub) return;
    }
    
    // Clear all breadclub-related caches
    $cache_keys = [
        "breadclub_orders_hpos_{$breadclub_id}",
        "breadclub_list_orders_hpos_{$breadclub_id}",
        "breadclub_addons_orders_hpos_{$breadclub_id}",
        "breadclub_schedule_orders_hpos_{$breadclub_id}"
    ];
    
    foreach ($cache_keys as $key) {
        wp_cache_delete($key);
    }
}

