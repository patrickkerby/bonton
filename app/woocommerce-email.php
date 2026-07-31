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
