<?php
/**
 * Print coupons html content
 *
 * @author      StoreApps
 * @since       4.7.0
 * @version     1.1.0
 * @package     woocommerce-smart-coupons/templates/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $woocommerce_smart_coupon;
$bloginfo = get_bloginfo( 'name', 'display' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.0">
		<title><?php echo $bloginfo;  // phpcs:ignore ?></title>
		<?php wp_head(); ?>
		<?php
		if ( ! wp_script_is( 'jquery' ) ) {
			wp_enqueue_script( 'jquery' );
		}
		?>
				<style>
			@import url("https://use.typekit.net/wvm4dbv.css");
		</style>
	</head>
	<body <?php body_class(); ?>>
		<div>
			<div style="width: 70%; margin: 50px auto; border: dashed 2px #ccc;">

			<table style="margin:30px 50px;">
		<tr>
			<td>
				<img style="max-height: 440px; width: auto; margin-right: 30px;" src="https://bonton.ca/email/giftcertificate.jpg" alt="Bon Ton Bakery, Edmonton Alberta" />
			</td>
			<td>
				<h1 class="tk-orpheuspro" style="font-family: 'orpheus pro', 'orpheuspro', 'orpheus-pro', Helvetica Neue, Helvetica, Roboto, Arial, sans-serif; color: #333333; font-size: 42px; line-height: 38px; padding-bottom: 20px;">Gift Certificate</h1>

				
			<?php
			foreach ( $coupon_codes as $coupon_data ) {
				$coupon = new WC_Coupon( $coupon_data['code'] );

				if ( $woocommerce_smart_coupon->is_wc_gte_30() ) {
					if ( ! is_object( $coupon ) || ! is_callable( array( $coupon, 'get_id' ) ) ) {
						continue;
					}
					$coupon_id = $coupon->get_id();
					if ( empty( $coupon_id ) ) {
						continue;
					}
					$coupon_amount    = $coupon->get_amount();
					$is_free_shipping = ( $coupon->get_free_shipping() ) ? 'yes' : 'no';
					$discount_type    = $coupon->get_discount_type();
					$expiry_date      = $coupon->get_date_expires();
					$coupon_code      = $coupon->get_code();
				} else {
					$coupon_id        = ( ! empty( $coupon->id ) ) ? $coupon->id : 0;
					$coupon_amount    = ( ! empty( $coupon->amount ) ) ? $coupon->amount : 0;
					$is_free_shipping = ( ! empty( $coupon->free_shipping ) ) ? $coupon->free_shipping : '';
					$discount_type    = ( ! empty( $coupon->discount_type ) ) ? $coupon->discount_type : '';
					$expiry_date      = ( ! empty( $coupon->expiry_date ) ) ? $coupon->expiry_date : '';
					$coupon_code      = ( ! empty( $coupon->code ) ) ? $coupon->code : '';
				}

				if ( empty( $coupon_id ) || empty( $discount_type ) ) {
					continue;
				}

				$coupon_post = get_post( $coupon_id );

				$coupon_meta = $woocommerce_smart_coupon->get_coupon_meta_data( $coupon );

				$coupon_type = ( ! empty( $coupon_meta['coupon_type'] ) ) ? $coupon_meta['coupon_type'] : '';

				if ( 'yes' === $is_free_shipping ) {
					if ( ! empty( $coupon_type ) ) {
						$coupon_type .= __( ' & ', 'woocommerce-smart-coupons' );
					}
					$coupon_type .= __( 'Free Shipping', 'woocommerce-smart-coupons' );
				}

				if ( ! empty( $expiry_date ) ) {
					$expiry_time = (int) get_post_meta( $coupon_id, 'wc_sc_expiry_time', true );
					if ( ! empty( $expiry_time ) ) {
						if ( $woocommerce_smart_coupon->is_wc_gte_30() && $expiry_date instanceof WC_DateTime ) {
							$expiry_date = $expiry_date->getTimestamp();
						} elseif ( ! is_int( $expiry_date ) ) {
							$expiry_date = strtotime( $expiry_date );
						}
						$expiry_date += $expiry_time; // Adding expiry time to expiry date.
					}
				}

				$coupon_description = '';

				if ( ! empty( $coupon_post->post_excerpt ) && 'yes' === $show_coupon_description ) {
					$coupon_description = $coupon_post->post_excerpt;
				}

				$is_percent = $woocommerce_smart_coupon->is_percent_coupon( array( 'coupon_object' => $coupon ) );

				$args = array(
					'coupon_object'      => $coupon,
					'coupon_amount'      => $coupon_amount,
					'amount_symbol'      => ( true === $is_percent ) ? '%' : get_woocommerce_currency_symbol(),
					'discount_type'      => wp_strip_all_tags( $coupon_type ),
					'coupon_description' => ( ! empty( $coupon_description ) ) ? $coupon_description : wp_strip_all_tags( $woocommerce_smart_coupon->generate_coupon_description( array( 'coupon_object' => $coupon ) ) ),
					'coupon_code'        => $coupon_code,
					'coupon_expiry'      => ( ! empty( $expiry_date ) ) ? $woocommerce_smart_coupon->get_expiration_format( $expiry_date ) : __( 'Never expires', 'woocommerce-smart-coupons' ),
					'thumbnail_src'      => $woocommerce_smart_coupon->get_coupon_design_thumbnail_src(
						array(
							'design'        => $design,
							'coupon_object' => $coupon,
						)
					),
					'classes'            => '',
					'template_id'        => $design,
					'is_percent'         => $is_percent,
				);

			}
			?>
<div style="margin: 10px 0;" title="<?php echo esc_html__( 'Click to visit store. This coupon will be applied automatically.', 'woocommerce-smart-coupons' ); ?>">
							<a href="<?php echo esc_url( $coupon_target ); ?>" style="color: #444; text-decoration: none; font-size: 22px; line-height: 28px;">
								<?php 
									// wc_get_template( 'coupon-design/' . $design . '.php', $args, '', plugin_dir_path( WC_SC_PLUGIN_FILE ) . 'templates/' ); 
								?>				

									<div class="coupon-container <?php echo esc_attr( $woocommerce_smart_coupon->get_coupon_container_classes() ); ?> <?php echo esc_attr( $classes ); ?> <?php echo esc_attr( $template_id ); ?>" data-coupon_code="<?php echo esc_attr( $coupon_code ); ?>">
										<?php
										echo '<div class="coupon-content ' . esc_attr( $woocommerce_smart_coupon->get_coupon_content_classes() ) . '">
															<div class="discount-info">';

										$discount_title = '';

										if ( ! empty( $coupon_amount ) ) {
											$discount_title = ( true === $is_percent ) ? $coupon_amount . '%' : wc_price( $coupon_amount );
										}

										// if ( ! empty( $discount_type ) ) {
										// 	$discount_title .= ' ' . $discount_type;
										// }

										// $discount_title = apply_filters( 'wc_smart_coupons_display_discount_title', $discount_title, $coupon_object );

										if ( $discount_title ) {

											// Not escaping because 3rd party developer can have HTML code in discount title.
											echo '<strong>Value: </strong>';
											echo $discount_title; // phpcs:ignore

										}

										echo '</div>';

										echo '<div class="code"><strong>Coupon Code: </strong>' . esc_html( $coupon_code ) . '</div>';

										$show_coupon_description = get_option( 'smart_coupons_show_coupon_description', 'no' );
										if ( ! empty( $coupon_description ) && 'yes' === $show_coupon_description ) {
											echo '<div class="discount-description">' . esc_html( $coupon_description ) . '</div>';
										}

										echo '</div>';
										?>
									</div>

							
								<?php if ( ! empty( $from ) ) { ?>
								<p>
									<?php
										echo '<strong>From: </strong>';
										echo esc_html__( '', 'woocommerce-smart-coupons' ) . ' ' . esc_html( $sender );
									?>
								</p>
							<?php } ?>

							<p style="font-size: 12px; width: 250px; line-height: 15px; margin-top: 20px; padding-top: 20px;">
							<br><br>This Gift Certificate is valid for online use only. Visit www.bonton.ca to redeem.
							</p>
							</a>

			</div>
			<div class="wc-sc-terms-page-wrapper">
				<?php
				if ( ! empty( $terms_page_content ) ) {
					?>
					<div class="wc-sc-terms-page-content">
						<?php
							echo $terms_page_content; // phpcs:ignore 
						?>
					</div>
					<?php
				}
				?>
			</div>
		</div>
		<script type="text/javascript">
			jQuery(function(){
				window.print();
			});
		</script>
	</body>
</html>
