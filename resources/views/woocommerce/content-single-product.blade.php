@php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

$product_id = get_the_ID();

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked wc_print_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
@endphp
<div id="product-@php the_ID(); @endphp" @php wc_product_class( '', $product ); @endphp>

	@php
	/**
	 * Hook: woocommerce_before_single_product_summary.
	 *
	 * @hooked woocommerce_show_product_sale_flash - 10
	 * @hooked woocommerce_show_product_images - 20
	 */
	do_action( 'woocommerce_before_single_product_summary' );
@endphp
<div class="sidebar">
			<ul>
				<?php
				
				/**
				 * Add availability display to product single page and product modal
				 */

					$terms = get_the_terms( $product_id, 'pa_availability' );
					$prefix = $days_available = '';
					if (is_array($terms) || is_object($terms)) {
							
							foreach ($terms as $term) {
									$days = $term->name;
									$days_available .= $prefix . '' . $days . '';
									$prefix = ', ';
							}
					}
					$days_available = explode(",",$days_available);
					
					if (in_array('Everyday', $days_available)) {
						echo '<li>Available: <span>Tuesday - Saturday!</span></li>';
					}
					else {
							$days = implode(', ', $days_available);
							echo '<li>Available: <span>'.$days .'</span></li>';
					}
					
					// get product_tags of the current product
					$current_tags = get_the_terms( $product_id, 'product_tag' );
					if ( $current_tags && ! is_wp_error( $current_tags ) ) { 
						foreach ($current_tags as $tag) {
							$tag_title = $tag->name; // tag name
							$tag_link = get_term_link( $tag ); // might use this later. for now only displaying text
							echo '<li>'.$tag_title.'</li>';
						}
					}
					?>
					</ul>

					<?php
					// Ingredients list
					$ingredients = get_field( "ingredients", $product_id );
					if ( $ingredients && ! is_wp_error( $ingredients ) ) { 
						echo '<div class="ingredients">Ingredients: <span>'.$ingredients.'</span></div>';
					}
				?>

		</div>
	<div class="summary entry-summary">
		@php
			/**
			 * Hook: woocommerce_single_product_summary.
			 *
			 * @hooked woocommerce_template_single_title - 5
			 * @hooked woocommerce_template_single_rating - 10
			 * @hooked woocommerce_template_single_price - 10
			 * @hooked woocommerce_template_single_excerpt - 20
			 * @hooked woocommerce_template_single_add_to_cart - 30
			 * @hooked woocommerce_template_single_meta - 40
			 * @hooked woocommerce_template_single_sharing - 50
			 * @hooked WC_Structured_Data::generate_product_data() - 60
			 */
			do_action( 'woocommerce_single_product_summary' );
		@endphp
	</div>
	@php
	/**
	 * Hook: woocommerce_after_single_product_summary.
	 *
	 * @hooked woocommerce_output_product_data_tabs - 10
	 * @hooked woocommerce_upsell_display - 15
	 * @hooked woocommerce_output_related_products - 20
	 */
	do_action( 'woocommerce_after_single_product_summary' );
	@endphp
	
</div>

@php
	do_action( 'woocommerce_after_single_product' ); 
@endphp
