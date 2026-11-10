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
 * 
 * THIS FILE IS FOR THE PRODUCT SINGLE PAGE (NOT QUICK VIEW)
 */

defined( 'ABSPATH' ) || exit;

global $product;

$product_id = get_the_ID();

// Change form action to avoid redirect to product page.
add_filter( 'woocommerce_add_to_cart_form_action', '__return_empty_string' );

do_action( 'wc_quick_view_before_single_product' );

$sixth_item_free = "";

@endphp

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
		@unless ($product_id == 18200)		
			<div class="product-availability-slot d-md-none">
				<?php
					$long_fermentation = '';
					$bulk_discount = '';

					if ( has_term( array('long-fermentation'), 'product_tag', $product_id ) ){
						$long_fermentation = "<span class=\"long_fermentation\">* Not available for next-day orders</span>";
					}

					if ( has_term( array('bulk-discount'), 'product_tag', $product_id ) ){
						$bulk_discount = "<a class=\"bulk-discount\" target=\"_blank\" href=\"/bulk-bread-pricing\">Eligible for Bulk Discount</a>";
					}

					if ( has_term( array('6th-item-free'), 'product_tag', $product_id ) ){
						$sixth_item_free = "<a class=\"bulk-discount\" target=\"_blank\" href=\"/bulk-bread-pricing\">Sixth item is free when you buy 1/2 dozen!</a>";
					}

					\App\Helpers\LimitedMenu::echoAvailabilityCard((int) $product_id);
					echo $long_fermentation;
				?>
			</div>
		@endunless
		<div class="sidebar d-none d-md-block">
			@unless ($product_id == 18200)
			<?php \App\Helpers\LimitedMenu::echoAvailabilityCard((int) $product_id); ?>
			<ul>
				<?php
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
				@endunless

					<?php
					// Ingredients list
					$ingredients = get_field( "ingredients", $product_id );
					if ( $ingredients && ! is_wp_error( $ingredients ) ) { 
						echo '
						<a class="ingredients showmore collapsed" data-toggle="collapse" href="#collapseIngredients" role="button" aria-expanded="false" aria-controls="collapseIngredients">View Ingredients</a>
						<div class="collapse" id="collapseIngredients">
							<div class="card card-body">
							'.$ingredients.'
							</div>
						</div>';
					}

					// Recommended Storage
					$recommended_storage = get_field( "recommended_storage", $product_id );
					if ( $recommended_storage && ! is_wp_error( $recommended_storage ) ) { 
						echo '
						<a class="storage showmore collapsed" data-toggle="collapse" href="#collapseStorage" role="button" aria-expanded="false" aria-controls="collapseStorage">Recommended Storage</a>
						<div class="collapse" id="collapseStorage">
							<div class="card card-body">
							'.$recommended_storage.'
							</div>
						</div>';
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

			<div class="extra-info d-md-none">
			<?php
					$collapse_close = \App\bonton_collapse_panel_close_button();

					// Ingredients list
					if ( $ingredients && ! is_wp_error( $ingredients ) && $recommended_storage && ! is_wp_error( $recommended_storage ) ) { 
						echo '
						<a class="ingredients showmore collapsed" data-toggle="collapse" href="#collapseIngredients" role="button" aria-expanded="false" aria-controls="collapseIngredients">Ingredients & Storage Recommendations</a>
						<div class="collapse" id="collapseIngredients">' . $collapse_close . '
							<h4>Ingredients:</h4>
							<div class="ingredients">'.$ingredients.'</div>
							<h4>Recommended Storage:</h4>
							<div class="storage">'.$recommended_storage.'</div>
						</div>';
					}
					// Recommended Storage
					elseif ( $recommended_storage && ! is_wp_error( $recommended_storage )) { 
						echo '
						<a class="storage showmore collapsed" data-toggle="collapse" href="#collapseStorage" role="button" aria-expanded="false" aria-controls="collapseStorage">Recommended Storage</a>
						<div class="collapse" id="collapseStorage">' . $collapse_close . '
							<h4>Recommended Storage:</h4>
							<div>'.$recommended_storage.'</div>
						</div>';
					}
					elseif ( $ingredients && ! is_wp_error( $ingredients ) ) { 
						echo '
						<a class="storage showmore collapsed" data-toggle="collapse" href="#collapseStorage" role="button" aria-expanded="false" aria-controls="collapseStorage">Ingredients</a>
						<div class="collapse" id="collapseStorage">' . $collapse_close . '
							<h4>Ingredients:</h4>
							<div>'.$ingredients.'</div>
						</div>';
					}
				?>

			</div>
			<div class="product_meta d-md-none">
				
					<?php
						$has_tags = !empty($current_tags) && ! is_wp_error( $current_tags );
						if ( $has_tags ) {
							echo '<ul>';
							foreach ($current_tags as $tag) {
								$tag_title = $tag->name;
								if ($tag_title != "Bulk Discount") {
									echo '<li>'.$tag_title.'</li>';
								}
							}
							echo '</ul>';
						}
					?>
					<?php echo $bulk_discount ?>
					<?php echo $sixth_item_free ?>					
			</div>
		</div>

	</div>
</div>

@php
	do_action( 'woocommerce_after_single_product' ); 
@endphp
