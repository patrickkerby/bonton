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
	// Only load on WooCommerce order edit/add screens
	global $typenow;
	if (
		($typenow === 'shop_order' && ($hook === 'post.php' || $hook === 'post-new.php')) ||
		(isset($_GET['post_type']) && $_GET['post_type'] === 'shop_order')
	) {
		wp_enqueue_script('jquery-ui-datepicker');
		wp_enqueue_script('jquery-ui.multidatespicker', 'https://cdn.rawgit.com/dubrox/Multiple-Dates-Picker-for-jQuery-UI/master/jquery-ui.multidatespicker.js', array('jquery-ui-datepicker'));
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


// add custom billing field to edit order screen

add_action( 'woocommerce_admin_order_data_after_billing_address', 'App\misha_editable_order_meta_billing' );	 	
function misha_editable_order_meta_billing( $order ){	 	 
	$billing_unitno = $order->get_meta( 'billing_unitno', true );
	?>
	<div class="address">
		<p<?php if( !$billing_unitno ) echo ' class="none_set"' ?>>
			<strong>Unit / House Number:</strong>
			<?php echo ( $billing_unitno ) ? $billing_unitno : 'No unit / apartment set.' ?>
		</p>
	</div>
	<div class="edit_address"><?php
		woocommerce_wp_text_input( array( 
			'id' => 'billing_unitno',
			'label' => 'Unit / Apartment Number', 
			'wrapper_class' => 'form-field-half',
			'value' => $billing_unitno
		) );
        ?></div><?php
}

add_action( 'woocommerce_process_shop_order_meta', 'App\misha_save_billing_details' );

function misha_save_billing_details( $ord_id ){
	$order = wc_get_order( $ord_id );
	if ( $order ) {
		$order->update_meta_data( 'billing_unitno', wc_clean( $_POST[ 'billing_unitno' ] ) );
		$order->save();
	}
}

// add custom shipping field to edit order screen

add_action( 'woocommerce_admin_order_data_after_shipping_address', 'App\misha_editable_order_meta_shipping' );	 	
function misha_editable_order_meta_shipping( $order ){	 	 
	$shipping_unitno = $order->get_meta( 'shipping_unitno', true );
	?>
	<div class="address">
		<p<?php if( !$shipping_unitno ) echo ' class="none_set"' ?>>
			<strong>Unit / House Number:</strong>
			<?php echo ( $shipping_unitno ) ? $shipping_unitno : 'No unit / apartment set.' ?>
		</p>
	</div>
	<div class="edit_address"><?php
		woocommerce_wp_text_input( array( 
			'id' => 'shipping_unitno',
			'label' => 'Unit / Apartment Number', 
			'wrapper_class' => 'form-field-half',
			'value' => $shipping_unitno
		) );
        ?></div><?php
}

add_action( 'woocommerce_process_shop_order_meta', 'App\misha_save_shipping_details' );

function misha_save_shipping_details( $ord_id ){
	$order = wc_get_order( $ord_id );
	if ( $order ) {
		$order->update_meta_data( 'shipping_unitno', wc_clean( $_POST[ 'shipping_unitno' ] ) );
		$order->save();
	}
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
 * Display WooCommerce store notice with proper styling
 */
add_action('get_footer', function() {
    // Check if store notice is enabled
    $store_notice_enabled = get_option('woocommerce_demo_store', 'no');
    
    if ($store_notice_enabled === 'yes') {
        $notice = get_option('woocommerce_demo_store_notice', __('This is a demo store for testing purposes &mdash; no orders shall be fulfilled.', 'woocommerce'));
        $notice = wp_unslash($notice);
        
        // Check if notice was dismissed (server-side check)
        $notice_hash = md5($notice);
        $dismissed_cookie = "bonton_notice_dismissed_{$notice_hash}";
        $is_dismissed = isset($_COOKIE[$dismissed_cookie]);
        
        if (!empty($notice) && !$is_dismissed) {
            echo '<p class="demo_store woocommerce-store-notice bonton-site-notice" style="display: block !important; position: fixed !important; bottom: 0 !important; left: 0 !important; right: 0 !important; z-index: 99999 !important; background: #53c999 !important; color: white !important; padding: 3rem 4rem !important; margin: 2rem !important; width: calc(100% - 4rem) !important; font-size: 1.15rem !important; box-sizing: border-box !important;">';
            echo '<span style="position: relative; z-index: 3;">' . wp_kses_post($notice) . '</span>';
            echo ' <a href="#" onclick="bontonDismissNotice(); return false;" style="color: white !important; text-decoration: underline !important; margin-left: 10px !important; position: relative !important; z-index: 3 !important;">Dismiss</a>';
            echo '</p>';
            
            // Add the white border with CSS
            echo '<style>
                .bonton-site-notice::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: calc(100% - 20px);
                    height: calc(100% - 20px);
                    margin: 10px;
                    border: solid 2px #fff;
                    pointer-events: none;
                }
            </style>';
            
            // JavaScript to handle dismissal
            echo '<script>
                function bontonDismissNotice() {
                    var notice = document.querySelector(".bonton-site-notice");
                    if (notice) {
                        notice.style.display = "none";
                        // Set cookie to remember dismissal (30 days)
                        document.cookie = "' . $dismissed_cookie . '=1; path=/; max-age=" + (60 * 60 * 24 * 30);
                    }
                }
            </script>';
        }
    }
});

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

