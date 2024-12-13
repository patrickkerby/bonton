<?php
/**
 * Shipping Methods Display
 *
 * In 2.1 we show methods per package. This allows for multiple methods per order if so desired.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-shipping.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

$formatted_destination    = isset( $formatted_destination ) ? $formatted_destination : WC()->countries->get_formatted_address( $package['destination'], ', ' );
$has_calculated_shipping  = ! empty( $has_calculated_shipping );
$show_shipping_calculator = ! empty( $show_shipping_calculator );
$calculator_text = '';
$session_date_object = WC()->session->get('pickup_date_object');
$delivery_available = false;
$pickup_day_of_week = "";
$pickup_date = ""; 
$icecream_conflict = false;

if ($is_wholesale_user) {
	$delivery_available = true;
}

foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
   $cart_product = $cart_item['data'];
   $cart_product_id = $cart_item['product_id'];

	 if ($cart_product_id === 2045) {
		// $delivery_available = false;
		$icecream_conflict = true;
	 }
}

if($session_date_object) {
	$pickup_day_of_week = $session_date_object->format('l');
	$pickup_date = $session_date_object->format('Y-m-d');

	if ($pickup_day_of_week === "Saturday" && $pickup_date != "2024-12-21" && !$icecream_conflict && $pickup_date != "2024-12-14") {
		$delivery_available = true;
	}
	elseif ($is_wholesale_user) {
		$delivery_available = true;
	}
	else {
		$delivery_available = false;
	}
	if ($pickup_date == "2024-12-14" || $pickup_date == "2024-12-21" ) {
		$delivery_message = "Sorry! we're at capacity for delivery on Saturday, December 14 and 21, but we'd love to see your face in the store!";
	}
	else {
		$delivery_message = "(Delivery is currently only available on Saturdays)";
	}
}

if($icecream_conflict) {
	delete_user_meta( get_current_user_id(), 'shipping_method' );
	WC()->session->__unset( 'chosen_shipping_methods' );
}


?>

<tr class="woocommerce-shipping-totals shipping">
	<th><?php echo wp_kses_post( $package_name ); ?></th>
	<td data-title="<?php echo esc_attr( $package_name ); ?>">
		<?php if ( $available_methods ) : ?>
			<ul id="shipping_method" class="woocommerce-shipping-methods">
				<?php foreach ( $available_methods as $method ) : ?>

				
				@if($delivery_available)
					<li>
						<?php
						if ( 1 < count( $available_methods ) ) {
							printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ) ); // WPCS: XSS ok.
						} else {
							printf( '<input type="hidden" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ) ); // WPCS: XSS ok.
						}
						printf( '<label for="shipping_method_%1$s_%2$s">%3$s</label>', $index, esc_attr( sanitize_title( $method->id ) ), wc_cart_totals_shipping_method_label( $method ) ); // WPCS: XSS ok.
						do_action( 'woocommerce_after_shipping_rate', $method, $index );
						?>
					</li>	
				@else
					@if($method->method_id === 'local_pickup')
						<li>
							<?php
							if ( 1 < count( $available_methods ) ) {
								printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ) ); // WPCS: XSS ok.
							} else {
								printf( '<input type="hidden" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ) ); // WPCS: XSS ok.
							}
							printf( '<label for="shipping_method_%1$s_%2$s">%3$s</label>', $index, esc_attr( sanitize_title( $method->id ) ), wc_cart_totals_shipping_method_label( $method ) ); // WPCS: XSS ok.
							do_action( 'woocommerce_after_shipping_rate', $method, $index );
							?>
						</li>	
					@endif	
				@endif			
				<?php endforeach; ?>
			</ul>
			@if ( is_cart() && $icecream_conflict)
				<p class="small">We do deliver on this day, however you have icecream in your cart! Please remove the icecream if you'd like delivery.</p>

			@elseif ( is_cart() && $delivery_available )
				<p class="woocommerce-shipping-destination">
					<?php
					if ( $formatted_destination ) {
						// Translators: $s shipping destination.
						printf( esc_html__( '%s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' );
						$calculator_text = esc_html__( 'Change address', 'woocommerce' );
					} else {
						echo wp_kses_post( apply_filters( 'woocommerce_shipping_estimate_html', __( 'Set your location if you would like delivery!', 'woocommerce' ) ) );
					}
					?>
				</p>
			@else
				<p class="small">{{  $delivery_message }}</p>						
			@endif

			<?php
		elseif ( ! $has_calculated_shipping || ! $formatted_destination ) :
			if ( is_cart() && 'no' === get_option( 'woocommerce_enable_shipping_calc' ) ) {
				echo wp_kses_post( apply_filters( 'woocommerce_shipping_not_enabled_on_cart_html', __( 'Shipping costs are calculated during checkout.', 'woocommerce' ) ) );
			} else {
				echo wp_kses_post( apply_filters( 'woocommerce_shipping_may_be_available_html', __( 'Enter your address to view shipping options.', 'woocommerce' ) ) );
			}
		elseif ( ! is_cart() ) :
			echo wp_kses_post( apply_filters( 'woocommerce_no_shipping_available_html', __( 'There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.', 'woocommerce' ) ) );
		else :
			// Translators: $s shipping destination.
			echo wp_kses_post( apply_filters( 'woocommerce_cart_no_shipping_available_html', sprintf( esc_html__( 'No shipping options were found for %s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' ) ) );
			$calculator_text = esc_html__( 'Enter a different address', 'woocommerce' );
		endif;
		?>

		<?php if ( $show_package_details ) : ?>
			<?php echo '<p class="woocommerce-shipping-contents"><small>' . esc_html( $package_details ) . '</small></p>'; ?>
		<?php endif; ?>


		<?php if ( $show_shipping_calculator && $delivery_available && $icecream_conflict === false ) : ?>
			<?php woocommerce_shipping_calculator( $calculator_text ); ?>
		<?php endif; ?>
		<hr>

	</td>
</tr>
