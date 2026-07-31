<?php
/**
 * Email Addresses
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 9.8.0
 */

use Automattic\WooCommerce\Utilities\FeaturesUtil;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$address        = $order->get_formatted_billing_address();
$shipping       = $order->get_formatted_shipping_address();
$email_text_style = \App\bonton_wc_email_text_style();
$email_link_style = \App\bonton_wc_email_link_style();

$email_improvements_enabled = FeaturesUtil::feature_is_enabled( 'email_improvements' );

?><table id="addresses" cellspacing="0" cellpadding="0" style="width: 100%; vertical-align: top; margin-bottom: <?php echo $email_improvements_enabled ? '0' : '40px'; ?>; padding:0;" border="0">
	<tr>
		<td class="font-family text-align-left" style="border:0;padding:0;<?php echo esc_attr( $email_text_style ); ?>" valign="top" width="50%">
			<?php if ( $email_improvements_enabled ) { ?>
				<b class="address-title" style="<?php echo esc_attr( $email_text_style ); ?>"><?php esc_html_e( 'Billing address', 'woocommerce' ); ?></b>
			<?php } else { ?>
				<h2><?php esc_html_e( 'Billing address', 'woocommerce' ); ?></h2>
			<?php } ?>

			<address class="address" style="<?php echo esc_attr( $email_text_style ); ?>">
				<?php echo wp_kses_post( $address ? $address : esc_html__( 'N/A', 'woocommerce' ) ); ?>
				<?php if ( $order->get_billing_phone() ) : ?>
					<br/><?php echo wc_make_phone_clickable( $order->get_billing_phone() ); ?>
				<?php endif; ?>
				<?php if ( $order->get_billing_email() ) : ?>
					<br/><span style="<?php echo esc_attr( $email_link_style ); ?>"><?php echo esc_html( $order->get_billing_email() ); ?></span>
				<?php endif; ?>
				<?php
				do_action( 'woocommerce_email_customer_address_section', 'billing', $order, $sent_to_admin, false );
				?>
			</address>
		</td>
		<?php if ( ! wc_ship_to_billing_address_only() && $order->needs_shipping_address() && $shipping ) : ?>
			<td class="font-family text-align-left" style="padding:0;<?php echo esc_attr( $email_text_style ); ?>" valign="top" width="50%">
				<?php if ( $email_improvements_enabled ) { ?>
					<b class="address-title" style="<?php echo esc_attr( $email_text_style ); ?>"><?php esc_html_e( 'Shipping address', 'woocommerce' ); ?></b>
				<?php } else { ?>
					<h2><?php esc_html_e( 'Shipping address', 'woocommerce' ); ?></h2>
				<?php } ?>

				<address class="address" style="<?php echo esc_attr( $email_text_style ); ?>">
					<?php echo wp_kses_post( $shipping ); ?>
					<?php if ( $order->get_shipping_phone() ) : ?>
						<br /><?php echo wc_make_phone_clickable( $order->get_shipping_phone() ); ?>
					<?php endif; ?>
					<?php
					do_action( 'woocommerce_email_customer_address_section', 'shipping', $order, $sent_to_admin, false );
					?>
				</address>
			</td>
		<?php endif; ?>
	</tr>
</table>
<?php echo $email_improvements_enabled ? '<br>' : ''; ?>
