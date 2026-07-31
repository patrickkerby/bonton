<?php
/**
 * Email Order Items
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 9.9.0
 */

use Automattic\WooCommerce\Utilities\FeaturesUtil;

defined( 'ABSPATH' ) || exit;

$margin_side      = is_rtl() ? 'left' : 'right';
$email_text_style = \App\bonton_wc_email_text_style();

$email_improvements_enabled = FeaturesUtil::feature_is_enabled( 'email_improvements' );
$price_text_align           = $email_improvements_enabled ? 'right' : 'left';

foreach ( $items as $item_id => $item ) :
	$product       = $item->get_product();
	$sku           = '';
	$purchase_note = '';
	$image         = '';

	if ( ! apply_filters( 'woocommerce_order_item_visible', true, $item ) ) {
		continue;
	}

	if ( is_object( $product ) ) {
		$sku           = $product->get_sku();
		$purchase_note = $product->get_purchase_note();
		$image         = $product->get_image( $image_size );
	}

	?>
	<tr class="<?php echo esc_attr( apply_filters( 'woocommerce_order_item_class', 'order_item', $item, $order ) ); ?>">
		<td class="td font-family text-align-left" style="vertical-align:middle;word-wrap:break-word;<?php echo esc_attr( $email_text_style ); ?>">
			<?php if ( $email_improvements_enabled ) { ?>
				<table class="order-item-data">
					<tr>
						<?php
						if ( $show_image ) {
							echo '<td>' . wp_kses_post( apply_filters( 'woocommerce_order_item_thumbnail', $image, $item ) ) . '</td>';
						}
						?>
						<td style="<?php echo esc_attr( $email_text_style ); ?>">
							<?php
							echo wp_kses_post( apply_filters( 'woocommerce_order_item_name', $item->get_name(), $item, false ) );

							if ( $show_sku && $sku ) {
								echo wp_kses_post( ' (#' . $sku . ')' );
							}

							do_action( 'woocommerce_order_item_meta_start', $item_id, $item, $order, $plain_text );

							$item_meta = wc_display_item_meta(
								$item,
								array(
									'before'       => '',
									'after'        => '',
									'separator'    => '<br>',
									'echo'         => false,
									'label_before' => '<span>',
									'label_after'  => ':</span> ',
								)
							);
							echo '<div class="email-order-item-meta" style="' . esc_attr( $email_text_style ) . '">';
							echo wp_kses(
								$item_meta,
								array(
									'br'   => array(),
									'span' => array(),
									'a'    => array(
										'href'   => true,
										'target' => true,
										'rel'    => true,
										'title'  => true,
									),
								)
							);
							echo '</div>';

							do_action( 'woocommerce_order_item_meta_end', $item_id, $item, $order, $plain_text );
							?>
						</td>
					</tr>
				</table>
				<?php
			} else {
				if ( $show_image ) {
					echo wp_kses_post( apply_filters( 'woocommerce_order_item_thumbnail', $image, $item ) );
				}

				echo wp_kses_post( apply_filters( 'woocommerce_order_item_name', $item->get_name(), $item, false ) );

				if ( $show_sku && $sku ) {
					echo wp_kses_post( ' (#' . $sku . ')' );
				}

				do_action( 'woocommerce_order_item_meta_start', $item_id, $item, $order, $plain_text );

				wc_display_item_meta(
					$item,
					array(
						'label_before' => '<strong class="wc-item-meta-label" style="float: ' . ( is_rtl() ? 'right' : 'left' ) . '; margin-' . esc_attr( $margin_side ) . ': .25em; clear: both">',
					)
				);

				do_action( 'woocommerce_order_item_meta_end', $item_id, $item, $order, $plain_text );
			}
			?>
		</td>
		<td class="td font-family text-align-<?php echo esc_attr( $price_text_align ); ?>" style="vertical-align:middle;<?php echo esc_attr( $email_text_style ); ?>">
			<?php
			echo $email_improvements_enabled ? '&times;' : '';
			$qty          = $item->get_quantity();
			$refunded_qty = $order->get_qty_refunded_for_item( $item_id );

			if ( $refunded_qty ) {
				$qty_display = '<del>' . esc_html( $qty ) . '</del> <ins>' . esc_html( $qty - ( $refunded_qty * -1 ) ) . '</ins>';
			} else {
				$qty_display = esc_html( $qty );
			}
			echo wp_kses_post( apply_filters( 'woocommerce_email_order_item_quantity', $qty_display, $item ) );
			?>
		</td>
		<td class="td font-family text-align-<?php echo esc_attr( $price_text_align ); ?>" style="vertical-align:middle;<?php echo esc_attr( $email_text_style ); ?>">
			<?php echo wp_kses_post( $order->get_formatted_line_subtotal( $item ) ); ?>
		</td>
	</tr>
	<?php

	if ( $show_purchase_note && $purchase_note ) {
		?>
		<tr>
			<td colspan="3" class="font-family text-align-left" style="vertical-align:middle;<?php echo esc_attr( $email_text_style ); ?>">
				<?php echo wp_kses_post( wpautop( do_shortcode( $purchase_note ) ) ); ?>
			</td>
		</tr>
		<?php
	}
	?>

<?php endforeach; ?>
