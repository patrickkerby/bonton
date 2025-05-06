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

add_action('admin_enqueue_scripts', function () {
	wp_enqueue_script('jquery-ui-datepicker');
    wp_enqueue_script('jquery-ui.multidatespicker', 'https://cdn.rawgit.com/dubrox/Multiple-Dates-Picker-for-jQuery-UI/master/jquery-ui.multidatespicker.js', array('jquery-ui-datepicker'));	
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
			 * get all the meta data values we need
			 */ 
			$date = get_post_meta( $order->get_id(), 'pickup_date', true );
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
	update_post_meta( $ord_id, 'pickup_date', wc_clean( $_POST[ 'pickup_date' ] ) );
	
	// wc_clean() and wc_sanitize_textarea() are WooCommerce sanitization functions
}


/**
 * @snippet       Add Column to Orders Table (e.g. Billing Country) - WooCommerce
 * @how-to        Get CustomizeWoo.com FREE
 * @sourcecode    https://businessbloomer.com/?p=78723
 * @author        Rodolfo Melogli
 * @compatible    WooCommerce 3.4.5
 */
 
add_filter( 'manage_edit-shop_order_columns', 'App\add_new_order_admin_list_column' );
 
function add_new_order_admin_list_column( $columns ) {
    $columns['pickup_date'] = 'Pickup Date';
    return $columns;
}
 
add_action( 'manage_shop_order_posts_custom_column', 'App\add_new_order_admin_list_column_content' );
 
function add_new_order_admin_list_column_content( $column ) {
   
    global $post;
 
    if ( 'pickup_date' === $column ) {
 
				$order = wc_get_order( $post->ID );
				$date = get_post_meta( $order->get_id(), 'pickup_date', true );
			
        echo $date;
      
    }
}

/**
 * 
 * Make order screen custom column sortable
 * 
 */
add_filter( 'manage_edit-shop_order_sortable_columns', 'App\MY_COLUMNS_SORT_FUNCTION' );

function MY_COLUMNS_SORT_FUNCTION( $columns ) 
{
	$custom = array(
			'pickup_date'    => 'pickup_date' 
			);
	return wp_parse_args( $custom, $columns );
}

add_action( 'pre_get_posts', 'App\pickupdate_orderby' );

function pickupdate_orderby( $query ) {
    if( ! is_admin() )
        return;
 
    $orderby = $query->get( 'orderby');
 
    if( 'pickup_date' == $orderby ) {
						
				$query->set('meta_key','pickup_date_object');
        $query->set('orderby','meta_value');
    }
}


// add custom billing field to edit order screen

add_action( 'woocommerce_admin_order_data_after_billing_address', 'App\misha_editable_order_meta_billing' );	 	
function misha_editable_order_meta_billing( $order ){	 	 
	$billing_unitno = get_post_meta( $order->get_id(), 'billing_unitno', true );
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
	update_post_meta( $ord_id, 'billing_unitno', wc_clean( $_POST[ 'billing_unitno' ] ) );
}

// add custom shipping field to edit order screen

add_action( 'woocommerce_admin_order_data_after_shipping_address', 'App\misha_editable_order_meta_shipping' );	 	
function misha_editable_order_meta_shipping( $order ){	 	 
	$shipping_unitno = get_post_meta( $order->get_id(), 'shipping_unitno', true );
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
	update_post_meta( $ord_id, 'shipping_unitno', wc_clean( $_POST[ 'shipping_unitno' ] ) );
}