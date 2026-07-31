<?php

namespace App;

/**
 * WooCommerce email color helpers.
 *
 * Spark Mail inverts CSS colors on some elements (td, h2, footer) when
 * backgrounds are forced white. Use inline styles from these helpers in
 * templates, and spark_text in @media (prefers-color-scheme: dark) CSS.
 */
function bonton_wc_email_colors() {
	static $colors = null;

	if ( null !== $colors ) {
		return $colors;
	}

	$colors = array(
		'bg'          => get_option( 'woocommerce_email_background_color', '#fcfcfc' ),
		'body'        => get_option( 'woocommerce_email_body_background_color', '#ffffff' ),
		'text'        => get_option( 'woocommerce_email_text_color', '#4c4c4c' ),
		'footer_text' => get_option( 'woocommerce_email_footer_text_color', '#3c3c3c' ),
		'link'        => '#53C999',
	);

	if ( apply_filters( 'woocommerce_is_email_preview', false ) ) {
		$map = array(
			'bg'          => 'woocommerce_email_background_color',
			'body'        => 'woocommerce_email_body_background_color',
			'text'        => 'woocommerce_email_text_color',
			'footer_text' => 'woocommerce_email_footer_text_color',
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

function bonton_wc_email_invert_hex( $hex ) {
	$hex = ltrim( (string) $hex, '#' );

	if ( 3 === strlen( $hex ) ) {
		$hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
	}

	return sprintf(
		'#%02x%02x%02x',
		255 - hexdec( substr( $hex, 0, 2 ) ),
		255 - hexdec( substr( $hex, 2, 2 ) ),
		255 - hexdec( substr( $hex, 4, 2 ) )
	);
}

function bonton_wc_email_light_bg( $color ) {
	return sprintf(
		'background-color:%1$s !important;background-image:linear-gradient(%1$s,%1$s) !important;',
		esc_attr( $color )
	);
}

function bonton_wc_email_text_style( $color = null ) {
	if ( null === $color ) {
		$color = bonton_wc_email_colors()['text'];
	}

	return 'color:' . esc_attr( $color ) . ';';
}

function bonton_wc_email_link_style( $color = null ) {
	if ( null === $color ) {
		$color = bonton_wc_email_colors()['link'];
	}

	return 'color:' . esc_attr( $color ) . ';';
}

function bonton_wc_email_spark_text( $color = null ) {
	if ( null === $color ) {
		$color = bonton_wc_email_colors()['text'];
	}

	return bonton_wc_email_invert_hex( $color );
}
