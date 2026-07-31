<?php

namespace App;

/**
 * WooCommerce email helpers — backgrounds only.
 * Text colors come from WooCommerce settings via email-styles.php.
 */
function bonton_wc_email_colors() {
	static $colors = null;

	if ( null !== $colors ) {
		return $colors;
	}

	$colors = array(
		'bg'   => get_option( 'woocommerce_email_background_color', '#fcfcfc' ),
		'body' => get_option( 'woocommerce_email_body_background_color', '#ffffff' ),
	);

	if ( apply_filters( 'woocommerce_is_email_preview', false ) ) {
		$map = array(
			'bg'   => 'woocommerce_email_background_color',
			'body' => 'woocommerce_email_body_background_color',
		);
		foreach ( $map as $key => $option ) {
			$transient = get_transient( $option );
			if ( $transient ) {
				$colors[ $key ] = $transient;
			}
		}
	}

	return $colors;
}

function bonton_wc_email_light_bg( $color ) {
	return sprintf(
		'background-color:%1$s !important;background-image:linear-gradient(%1$s,%1$s) !important;',
		esc_attr( $color )
	);
}
