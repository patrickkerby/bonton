<?php
/**
 * Coupon Email Content
 *
 * @author      StoreApps
 * @version     1.2.0
 * @package     woocommerce-smart-coupons/templates/plain/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $store_credit_label, $woocommerce_smart_coupon;

if ( ! isset( $email ) ) {
	$email = null;
}

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>" />
		<title><?php echo get_bloginfo( 'name', 'display' ); ?></title>
		<style>
			@import url("https://use.typekit.net/wvm4dbv.css");
			/*
 * The Typekit service used to deliver this font or fonts for use on websites
 * is provided by Adobe and is subject to these Terms of Use
 * http://www.adobe.com/products/eulas/tou_typekit. For font license
 * information, see the list below.
 *
 * orpheuspro:
 *   - http://typekit.com/eulas/000000000000000000016ea6
 *   - http://typekit.com/eulas/00000000000000003b9aff70
 *
 * © 2009-2020 Adobe Systems Incorporated. All Rights Reserved.
 */
/*{"last_published":"2020-07-01 07:41:14 UTC"}*/

@import url("https://p.typekit.net/p.css?s=1&k=wvm4dbv&ht=tk&f=24425.34517&a=4193400&app=typekit&e=css");

@font-face {
font-family:"orpheuspro";
src:url("https://use.typekit.net/af/972118/000000000000000000016ea6/27/l?primer=ec1cdd61c86ea54544edc1c5ee26b1a9a2365cc235e1ad12ad17b2e35345290a&fvd=n7&v=3") format("woff2"),url("https://use.typekit.net/af/972118/000000000000000000016ea6/27/d?primer=ec1cdd61c86ea54544edc1c5ee26b1a9a2365cc235e1ad12ad17b2e35345290a&fvd=n7&v=3") format("woff"),url("https://use.typekit.net/af/972118/000000000000000000016ea6/27/a?primer=ec1cdd61c86ea54544edc1c5ee26b1a9a2365cc235e1ad12ad17b2e35345290a&fvd=n7&v=3") format("opentype");
font-display:auto;font-style:normal;font-weight:700;
}

@font-face {
font-family:"orpheuspro";
src:url("https://use.typekit.net/af/3fe6c5/00000000000000003b9aff70/27/l?primer=ec1cdd61c86ea54544edc1c5ee26b1a9a2365cc235e1ad12ad17b2e35345290a&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/3fe6c5/00000000000000003b9aff70/27/d?primer=ec1cdd61c86ea54544edc1c5ee26b1a9a2365cc235e1ad12ad17b2e35345290a&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/3fe6c5/00000000000000003b9aff70/27/a?primer=ec1cdd61c86ea54544edc1c5ee26b1a9a2365cc235e1ad12ad17b2e35345290a&fvd=n5&v=3") format("opentype");
font-display:auto;font-style:normal;font-weight:500;
}

.tk-orpheuspro { font-family: "orpheuspro",serif; }

		</style>
		
	</head>
	<body <?php echo is_rtl() ? 'rightmargin' : 'leftmargin'; ?>="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
		<div id="wrapper" style="background-color:#fff;">
			<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
				<tr>
					<td align="center" valign="top">
						
						<table border="0" cellpadding="0" cellspacing="0" style="width: 90%;">
							<tr>
								<td align="center" valign="top">
									<!-- Body -->
									<table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td valign="top" id="body_content">
												<!-- Content -->
												<table border="0" cellpadding="20" cellspacing="0" width="100%">
													<tr>
														<td valign="top" style="padding: 30px !important; background-color: #fff;">
															
	<table style="border: dashed #ccc 2px; padding: 20px;">
		<tr>
			<td>
				<img style="max-height: 440px; width: auto;" src="https://bonton.ca/email/giftcertificate.jpg" alt="Bon Ton Bakery, Edmonton Alberta" />
			</td>
			<td>
				<h1 class="tk-orpheuspro" style="font-family: 'orpheuspro',serif; color: #333333; font-size: 42px; line-height: 38px; padding-bottom: 20px;">Gift Certificate</h1>
				<?php

				if ( ! empty( $receiver_details ) ) {
					echo '<div id="sc-cc"><div class="sc-coupons-list">';
					foreach ( $receiver_details as $receiver_data ) {

						$coupon_code    = $receiver_data['code'];
						$sender_message = isset( $receiver_data['message'] ) ? $receiver_data['message'] : '';
						$coupon         = new WC_Coupon( $coupon_code );

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
							$expiry_date      = $coupon->get_date_expires();
							$coupon_code      = $coupon->get_code();
						} else {
							$coupon_id        = ( ! empty( $coupon->id ) ) ? $coupon->id : 0;
							$coupon_amount    = ( ! empty( $coupon->amount ) ) ? $coupon->amount : 0;
							$is_free_shipping = ( ! empty( $coupon->free_shipping ) ) ? $coupon->free_shipping : '';
							$expiry_date      = ( ! empty( $coupon->expiry_date ) ) ? $coupon->expiry_date : '';
							$coupon_code      = ( ! empty( $coupon->code ) ) ? $coupon->code : '';
						}

						$coupon_post = get_post( $coupon_id );

						$coupon_data = $woocommerce_smart_coupon->get_coupon_meta_data( $coupon );

						$coupon_type = ( ! empty( $coupon_data['coupon_type'] ) ) ? $coupon_data['coupon_type'] : '';

						if ( 'yes' === $is_free_shipping ) {
							if ( ! empty( $coupon_type ) ) {
								$coupon_type .= __( ' & ', 'woocommerce-smart-coupons' );
							}
							$coupon_type .= __( 'Free Shipping', 'woocommerce-smart-coupons' );
						}

						if ( ! empty( $expiry_date ) ) {
							$expiry_time = (int) get_post_meta( $coupon_id, 'wc_sc_expiry_time', true );
							if ( ! empty( $expiry_time ) ) {
								if ( $this->is_wc_gte_30() && $expiry_date instanceof WC_DateTime ) {
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

							$coupon_target              = '';
							$wc_url_coupons_active_urls = get_option( 'wc_url_coupons_active_urls' ); // From plugin WooCommerce URL coupons.
						if ( ! empty( $wc_url_coupons_active_urls ) ) {
							$coupon_target = ( ! empty( $wc_url_coupons_active_urls[ $coupon_id ]['url'] ) ) ? $wc_url_coupons_active_urls[ $coupon_id ]['url'] : '';
						}
						if ( ! empty( $coupon_target ) ) {
							$coupon_target = home_url( '/' . $coupon_target );
						} else {
							$coupon_target = home_url( '/?sc-page=shop&coupon-code=' . $coupon_code );
						}

							$coupon_target = apply_filters( 'sc_coupon_url_in_email', $coupon_target, $coupon );
						?>

						<div>
						<?php
						if ( ! empty( $sender_message ) ) {
							?>
							<div>
							<?php
								echo $sender_message; // phpcs:ignore
							?>
							</div>
							<?php
						}
						?>
						<div style="margin: 10px 0;" title="<?php echo esc_html__( 'Click to visit store. This coupon will be applied automatically.', 'woocommerce-smart-coupons' ); ?>">
							<a href="<?php echo esc_url( $coupon_target ); ?>" style="color: #444; text-decoration: none; font-size: 16px; line-height: 22px;">
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
								<br><br>This email address must be used in the billing address when checking out. 
							</p>
							</a>
						</div>
						</div>
						<?php
					}
					echo '</div></div>';
				}

				?>
			</td>
		</tr>
	</table>
</div>
<center style="border-top: solid 2px #dedede; margin-top: 30px; margin-bottom: 30px; padding-top: 30px;">
	<a href="<?php echo esc_url( $site_url ); ?>"><?php echo esc_html__( 'Visit store', 'woocommerce-smart-coupons' ); ?></a>
	<?php
	$is_print         = get_option( 'smart_coupons_is_print_coupon', 'yes' );
	$is_print         = apply_filters( 'wc_sc_email_show_print_link', wc_string_to_bool( $is_print ), array( 'source' => $woocommerce_smart_coupon ) );
	$coupons_to_print = ( ! empty( $receiver_details ) ) ? wp_list_pluck( $receiver_details, 'code' ) : array();
	if ( true === $is_print && ! empty( $coupons_to_print ) ) {
		$print_coupon_url = add_query_arg(
			array(
				'print-coupons' => 'yes',
				'source'        => 'wc-smart-coupons',
				'coupon-codes'  => implode(
					',',
					$coupons_to_print
				),
			),
			home_url()
		);
		?>
		|
		<a href="<?php echo esc_url( $print_coupon_url ); ?>" target="_blank"><?php echo esc_html( _n( 'Print coupon', 'Print all coupons', count( $coupons_to_print ), 'woocommerce-smart-coupons' ) ); ?></a>
		<?php
	}
	?>
</center>

<div style="clear:both;"></div>

<?php
if ( has_action( 'woocommerce_email_footer' ) ) {
	do_action( 'woocommerce_email_footer', $email );
} else {
	if ( function_exists( 'wc_get_template' ) ) {
		wc_get_template( 'emails/email-footer.php' );
	} else {
		woocommerce_get_template( 'emails/email-footer.php' );
	}
}
