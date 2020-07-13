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
			$timeslot = get_post_meta( $order->get_id(), 'pickup_timeslot', true );                    
        ?>
        <div class="address">
            <p><strong>Pickup Date:</strong> <?php echo $date ?></p>
            <p><strong>Timeslot:</strong> <?php echo $timeslot ?></p>
        </div>
        <div class="edit_address"><?php
 

			woocommerce_wp_text_input( array(
				'id' => 'pickup_date',
				'label' => 'Pickup Date:',
				'value' => $date,
				'wrapper_class' => 'form-field-wide'
			) );
 
			woocommerce_wp_select( array(
				'id' => 'pickup_timeslot',
				'label' => 'Timeslot:',
				'value' => $timeslot,
				'options' => array(
					'morning' => 'morning',
                    'midday' => 'midday',
                    'afternoon' => 'afternoon'
				),
				'wrapper_class' => 'form-field-wide'
			) );
 
		?></div>
<?php }

add_action( 'woocommerce_process_shop_order_meta', 'App\save_general_details' );
 
function save_general_details( $ord_id ){
	update_post_meta( $ord_id, 'pickup_date', wc_clean( $_POST[ 'pickup_date' ] ) );
	update_post_meta( $ord_id, 'pickup_timeslot', wc_clean( $_POST[ 'pickup_timeslot' ] ) );
	// wc_clean() and wc_sanitize_textarea() are WooCommerce sanitization functions
}