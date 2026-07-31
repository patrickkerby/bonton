<?php

namespace App;

/**
 * WooCommerce email helpers.
 *
 * Sage sets STYLESHEETPATH to resources/, but email templates live in
 * resources/views/woocommerce/. The locate filter bridges that gap.
 */

/**
 * Resolve WooCommerce email templates from resources/views/woocommerce/.
 *
 * @param string $template      Absolute path to the template file.
 * @param string $template_name Template name relative to woocommerce/.
 * @param string $template_path Template path within the theme.
 */
function bonton_wc_locate_email_template( $template, $template_name, $template_path ) {
	if ( 'woocommerce/' !== $template_path ) {
		return $template;
	}

	$theme_template = locate_template(
		array(
			'views/woocommerce/' . $template_name,
			'woocommerce/' . $template_name,
		)
	);

	return $theme_template ? $theme_template : $template;
}

add_filter( 'woocommerce_locate_template', __NAMESPACE__ . '\\bonton_wc_locate_email_template', 10, 3 );

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
		foreach ( array(
			'bg'   => 'woocommerce_email_background_color',
			'body' => 'woocommerce_email_body_background_color',
		) as $key => $option ) {
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

/**
 * Primary text color for the new email template — always the WC setting, never lightened.
 */
function bonton_wc_email_text_color() {
	$text = get_option( 'woocommerce_email_text_color', '#4c4c4c' );

	if ( apply_filters( 'woocommerce_is_email_preview', false ) ) {
		$transient = get_transient( 'woocommerce_email_text_color' );
		if ( $transient ) {
			$text = $transient;
		}
	}

	return $text;
}
