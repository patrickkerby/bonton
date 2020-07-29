<?php
/**
 * Quick View Button
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $product;

echo apply_filters(
	'woocommerce_loop_quick_view_button',
	sprintf(
		'<a href="#" title="%s" data-product_id="%s" id="%s" class="quick-view-button inside-thumb"><span>%s</span></a>',
		esc_attr( get_the_title() ),
		$product->get_id(),
		$product->get_id(),
		esc_html__( 'Learn More', 'wc_quick_view' ) 
	)
);
