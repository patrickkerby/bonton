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

/**
 * Nudge pure white/black — Apple Mail and Spark auto-invert those hex values.
 */
function bonton_wc_email_avoid_pure( $color ) {
	$hex = strtolower( ltrim( (string) $color, '#' ) );

	if ( in_array( $hex, array( 'fff', 'ffffff' ), true ) ) {
		return '#fffffe';
	}

	if ( in_array( $hex, array( '000', '000000' ), true ) ) {
		return '#010101';
	}

	return $color;
}

function bonton_wc_email_colors() {
	static $colors = null;

	if ( null !== $colors ) {
		return $colors;
	}

	$colors = array(
		'bg'   => get_option( 'woocommerce_email_background_color', '#fcfcfc' ),
		'body' => bonton_wc_email_avoid_pure( get_option( 'woocommerce_email_body_background_color', '#ffffff' ) ),
	);

	if ( apply_filters( 'woocommerce_is_email_preview', false ) ) {
		foreach ( array(
			'bg'   => 'woocommerce_email_background_color',
			'body' => 'woocommerce_email_body_background_color',
		) as $key => $option ) {
			$transient = get_transient( $option );
			if ( $transient ) {
				$colors[ $key ] = 'body' === $key ? bonton_wc_email_avoid_pure( $transient ) : $transient;
			}
		}
	}

	return $colors;
}

function bonton_wc_email_light_bg( $color ) {
	$color = bonton_wc_email_avoid_pure( $color );

	return sprintf(
		'background-color:%1$s !important;background-image:linear-gradient(%1$s,%1$s) !important;',
		esc_attr( $color )
	);
}
