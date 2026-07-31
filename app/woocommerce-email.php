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
 * Ensure email asset URLs are absolute (WC email editor may store root-relative paths).
 *
 * @param string $url Image or asset URL.
 */
function bonton_wc_email_absolute_url( $url ) {
	$url = trim( (string) $url );

	if ( '' === $url ) {
		return '';
	}

	if ( is_numeric( $url ) ) {
		$url = wp_get_attachment_url( (int) $url );
		if ( ! $url ) {
			return '';
		}
	}

	if ( preg_match( '#^https?://#i', $url ) ) {
		return $url;
	}

	if ( 0 === strpos( $url, '//' ) ) {
		return ( is_ssl() ? 'https:' : 'http:' ) . $url;
	}

	if ( 0 === strpos( $url, '/' ) ) {
		return home_url( $url );
	}

	return home_url( '/' . ltrim( $url, '/' ) );
}

/**
 * Inline styles for a white logo plate (Spark ignores <style> @media blocks).
 */
function bonton_wc_email_logo_plate_style() {
	return 'background-color:#fffffe;background-image:linear-gradient(#fffffe,#fffffe);padding:16px 24px;';
}

/**
 * Render the email logo on a forced-white plate so it stays visible in dark-mode clients.
 *
 * @param string $img_url    Logo image URL.
 * @param string $store_name Alt text.
 * @param string $width      Optional width in pixels.
 */
function bonton_wc_email_render_logo( $img_url, $store_name, $width = '' ) {
	$img_url = bonton_wc_email_absolute_url( $img_url );

	if ( ! $img_url ) {
		return '';
	}

	$width_style = $width ? 'width:' . esc_attr( $width ) . 'px;' : '';

	return sprintf(
		'<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><td bgcolor="#fffffe" style="%1$s"><img src="%2$s" alt="%3$s" style="display:block;margin:0 auto;%4$s" /></td></tr></table>',
		esc_attr( bonton_wc_email_logo_plate_style() ),
		esc_url( $img_url ),
		esc_attr( $store_name ),
		esc_attr( $width_style )
	);
}
