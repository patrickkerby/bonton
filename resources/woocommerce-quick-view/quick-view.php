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

//Is the product restricted?
$dateformat = "d/m/Y";
$pickup_restriction_data = "";
$pickup_restriction_end_data = "";

$pickup_restriction_data_check = get_field('restricted_pickup', $product_id);
$pickup_restriction_end_data_check = get_field('restricted_pickup_end', $product_id);

if(isset($pickup_restriction_data_check)) {
	$pickup_restriction_data = get_field('restricted_pickup', $product_id);
}
if(isset($pickup_restriction_end_data_check)) {
	$pickup_restriction_end_data = get_field('restricted_pickup_end', $product_id);
}

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
		<div class="availability-mobile d-md-none">
			<?php
			
			/**
			 * Add availability display to product single page and product modal - MOBILE VIEW
			 */

				$terms = get_the_terms( $product_id, 'pa_availability' );
				$prefix = $days_available = '';
				$long_fermentation = '';
				$bulk_discount = '';

				if (is_array($terms) || is_object($terms)) {
						
						foreach ($terms as $term) {
								$days = $term->name;
								$days_available .= $prefix . '' . $days . '';
								$prefix = ', ';
						}
				}
				$days_available = explode(",",$days_available);
				
				//Check if requires long fermentation lead time
				if ( has_term( array('long-fermentation'), 'product_tag', $product_id ) ){
					$long_fermentation = "<span class=\"long_fermentation\">* Not available for next-day orders</span>";
				}

				//Check if qualifies for Bulk Ordering
				if ( has_term( array('bulk-discount'), 'product_tag', $product_id ) ){
					$bulk_discount = "<a class=\"bulk-discount\" target=\"_blank\" href=\"/bulk-bread-pricing\">Eligible for Bulk Discount</a>";
				}

				//Check if qualifies for buy 5 get 1 free
				if ( has_term( array('6th-item-free'), 'product_tag', $product_id ) ){
					$sixth_item_free = "<a class=\"bulk-discount\" target=\"_blank\" href=\"/bulk-bread-pricing\">Sixth item is free when you buy 1/2 dozen!</a>";
				}

				if (in_array('Everyday', $days_available)) {
					$days = "";
					echo '<strong>Available:</strong> <span>Every day! (Tuesday - Saturday) '.$long_fermentation.'</span>';
				}
				else {
						$days = implode(', ', $days_available);
						echo '<strong>Available:</strong> <span>'.$days . $long_fermentation.'</span>';
				}				
			?>
		</div>
		
			<?php
				//Display notice if the product has restricted pickup dates
				if ($pickup_restriction_data) {
					$restricted_start_date = DateTime::createFromFormat($dateformat, $pickup_restriction_data);
					$restricted_end_date = DateTime::createFromFormat($dateformat, $pickup_restriction_end_data);
					echo '<div class="restricted d-md-none">Only available from '. $restricted_start_date->format('D, M j') . ' to 	' . $restricted_end_date->format('D, M j').'</div>';
				}
			?>
		<div class="sidebar d-none d-md-block">
			<ul>
				<?php
				
				/**
				 * Add availability display to product single page and product modal
				 */
					
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

					if ($pickup_restriction_data) {
						$restricted_start_date = DateTime::createFromFormat($dateformat, $pickup_restriction_data);
						$restricted_end_date = DateTime::createFromFormat($dateformat, $pickup_restriction_end_data);
						echo '<div class="notice"><strong>Please note!</strong> This product is only available from '. $restricted_start_date->format('D, M j') . ' to 	' . $restricted_end_date->format('D, M j') . '</div>';
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
			
			<div class="d-sm-none d-md-flex"> 
				<?php echo $sixth_item_free ?>
			</div>

			<div class="extra-info d-md-none">
			<?php
					// Ingredients list
					if ( $ingredients && ! is_wp_error( $ingredients ) && $recommended_storage && ! is_wp_error( $recommended_storage ) ) { 
						echo '
						<a class="ingredients showmore collapsed" data-toggle="collapse" href="#collapseIngredients" role="button" aria-expanded="false" aria-controls="collapseIngredients">Ingredients & Storage Recommendations</a>
						<div class="collapse" id="collapseIngredients">
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
						<div class="collapse" id="collapseStorage">
							<h4>Recommended Storage:</h4>
							<div>'.$recommended_storage.'</div>
						</div>';
					}
					elseif ( $ingredients && ! is_wp_error( $ingredients ) ) { 
						echo '
						<a class="storage showmore collapsed" data-toggle="collapse" href="#collapseStorage" role="button" aria-expanded="false" aria-controls="collapseStorage">Ingredients</a>
						<div class="collapse" id="collapseStorage">
							<h4>Ingredients:</h4>
							<div>'.$ingredients.'</div>
						</div>';
					}
				?>

			</div>
			<div class="product_meta d-md-none">
				
					<?php
						// get product_tags of the current product
						if ( $current_tags && ! is_wp_error( $current_tags ) ) { 
							echo "<ul>";
							foreach ($current_tags as $tag) {
								$tag_title = $tag->name; // tag name
								$tag_link = get_term_link( $tag ); // might use this later. for now only displaying text

								if ($tag_title != "Bulk Discount") {
									echo '<li>'.$tag_title.'</li>';
								}
							}
							echo "</ul>";
						}
					?>
					</ul>
					<?php echo $bulk_discount ?>
					<?php echo $sixth_item_free ?>					
			</div>
		</div>

	</div>
</div>

<?php
// remove_filter( 'woocommerce_add_to_cart_form_action', '__return_empty_string' );
?>