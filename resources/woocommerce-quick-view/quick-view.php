<?php
/**
 * Quick view template
 *
 * Uses same hooks as single product template so more plugins will work with
 * quick view.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product;

$product_id = get_the_ID();

// Change form action to avoid redirect to product page.
add_filter( 'woocommerce_add_to_cart_form_action', '__return_empty_string' );

do_action( 'wc_quick_view_before_single_product' );
?>
<div class="woocommerce quick-view single-product">
	<div id="product-<?php the_ID(); ?>" <?php wc_product_class(); ?>>

		<?php
		/**
		 * Hook: woocommerce_before_single_product_summary.
		 *
		 * @hooked woocommerce_show_product_sale_flash - 10
		 * @hooked woocommerce_show_product_images - 20
		 */
		do_action( 'woocommerce_before_single_product_summary' );
		?>
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
						$days = "";
						echo '<li>Available: <span>Every day! (Tuesday - Saturday)</span></li>';
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
			<?php
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
			?>
			<?php 
				if($days) {
					// echo '<span>Please note, this is only available for pick up on' . $days . '</span>';
					echo '<span class="warning">Please ensure this product is available on your intended pickup date!</span>';
				}
			?>
		</div>
	</div>
</div>

<?php
remove_filter( 'woocommerce_add_to_cart_form_action', '__return_empty_string' );
?>
