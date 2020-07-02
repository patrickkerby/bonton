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
		<h4>Pickup Details:</h4>
		<?php 
			/*
			 * get all the meta data values we need
			 */ 
			$date = get_post_meta( $order->get_id(), 'pickup_date', true );
			$timeslot = get_post_meta( $order->get_id(), 'pickup_timeslot', true );                    
        ?>
        <p><strong>Pickup Date:</strong> <?php echo $date ?></p>
        <p><strong>Timeslot:</strong> <?php echo $timeslot ?></p>
<?php }