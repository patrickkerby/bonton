<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
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

	// Ensure visibility.
	if ( empty( $product ) || ! $product->is_visible() ) {
		return;
	}

	global $wp_query;
	
// all this shit is to find out what category we're looking at on the filtered shop page
//// get all the categories per product and create array of slugs. 
////// get current URL. See if any of the slugs are in the url. Set current category.

	global $wp;
	$current_url = home_url(add_query_arg($_GET,$wp->request));
	$terms_post = get_the_terms( $post->cat_ID , 'product_cat' );
	$cat_slugs = array();

	foreach ($terms_post as $term_cat) { 
		$term_cat_id = $term_cat->term_id;
		$cat_slugs[] = $term_cat->slug;
	}

	foreach ($cat_slugs as $slug) {
		if(str_contains($current_url, $slug)) {
			$pk_slug = $slug;
		}
	}
	
	$category = get_term_by( 'slug', $pk_slug, 'product_cat' );
	$pk_cat_id = $category->term_id;
//end get current category for filtered shop pages

	$featured_class = "";
	$prod_id = $product->get_id();
	$custom_image_check = false;
	$description = "";
	$rows = get_field('featured_products', 'product_cat_' . $pk_cat_id);
	$featured_ids[] = "";
?>	

@if($rows)
	@foreach ($rows as $row)
		@php 
			

			$title = $row['custom_title']; 
			$product_selection = $row['select_a_product']; 

			$featured_ids[] = $product_selection;
if(is_admin()) {
	var_dump($featured_ids);
}

			$description = $row['custom_description'];
			$custom_image = $row['custom_image'];

			if(!empty($custom_image)) {
				$custom_image_check = true;	
			}

		@endphp
		@if ($prod_id === $product_selection && $loop->count === 1)
			@php 
				$featured_class = "single-feature";	
			@endphp		
		@elseif ($prod_id === $product_selection && $loop->count > 1)
			@php 
				$featured_class = "double-feature";			
			@endphp	
		@endif
	@endforeach

	@else
		{{-- <p>no rows found</p> --}}
@endif

{{-- <h3>@dump($featured_ids)</h3> --}}
<li <?php wc_product_class( $featured_class, $prod_id ); ?>>

<?php
	/**
	 * Hook: woocommerce_before_shop_loop_item.
	 *
	 * @hooked woocommerce_template_loop_product_link_open - 10
	 */
	do_action( 'woocommerce_before_shop_loop_item' );
	if($custom_image_check) {
		remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
		
		echo wp_get_attachment_image( $custom_image, array('600', '399'),"", array( "class" => "attachment-woocommerce_thumbnail size-woocommerce_thumbnail" ) ); 
	}

	/**
	 * Hook: woocommerce_before_shop_loop_item_title.
	 *
	 * @hooked woocommerce_show_product_loop_sale_flash - 10
	 * @hooked woocommerce_template_loop_product_thumbnail - 10
	 */
	do_action( 'woocommerce_before_shop_loop_item_title' );

	/**
	 * Hook: woocommerce_shop_loop_item_title.
	 *
	 * @hooked woocommerce_template_loop_product_title - 10
	 */
	do_action( 'woocommerce_shop_loop_item_title' );

	/**
	 * Hook: woocommerce_after_shop_loop_item_title.
	 *
	 * @hooked woocommerce_template_loop_rating - 5
	 * @hooked woocommerce_template_loop_price - 10
	 */
	do_action( 'woocommerce_after_shop_loop_item_title' );

	if ($description) {
		echo "<h3>" . $description . "</h3>";
	}

	/**
	 * Hook: woocommerce_after_shop_loop_item.
	 *
	 * @hooked woocommerce_template_loop_product_link_close - 5
	 * @hooked woocommerce_template_loop_add_to_cart - 10
	 */
	do_action( 'woocommerce_after_shop_loop_item' );
	?>
</li>