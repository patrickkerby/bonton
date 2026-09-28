<?php
/**
 * Checkout Form
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 9.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

date_default_timezone_set('America/Edmonton');
$pickup_date = WC()->session->get('pickup_date');
$session_date_object = WC()->session->get('pickup_date_object');
$conflict = false;
$pickup_day_of_week = '';
$giftcertificate_only_item_in_cart = \App\bonton_is_gift_certificate_only_cart();
$is_delivery = \App\bonton_checkout_is_delivery();
$fulfillment = \App\bonton_checkout_fulfillment_summary();
$pay_label = \App\bonton_checkout_pay_button_label();
$points_offer = \App\bonton_checkout_points_offer();

foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
	if ($pickup_date && $session_date_object) {
		$pickup_day_of_week = $session_date_object->format('l');
	}
	$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
	$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

	$availability = get_field('availability', $product_id );
	$prefix = $days_available = '';
	if (is_array($availability) || is_object($availability)) {
		foreach ($availability as $term) {
			$days = $term->name;
			$days_available .= $prefix . '' . $days . '';
			$prefix = ', ';
		}
	}
	$days_available = explode(", ",$days_available);

	if(isset($pickup_date) && !empty($pickup_day_of_week) && !in_array($pickup_day_of_week, $days_available)){
		$conflict = true;
	}

	$is_lf = has_term(['long-fermentation'], 'product_tag', $product_id);
	$is_2dn = get_field('requires_two_days_notice', $product_id);
	if (($is_lf || $is_2dn) && $session_date_object) {
		$now_tz = new DateTime('now', new DateTimeZone('America/Edmonton'));
		$min_pickup = clone $now_tz;
		$min_pickup->modify('+57 hours');
		$min_pickup_date = DateTime::createFromFormat('!Y-m-d', $min_pickup->format('Y-m-d'));
		if ($session_date_object < $min_pickup_date) {
			$conflict = true;
		}
	}
}

do_action( 'woocommerce_before_checkout_form', $checkout );

if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}
?>

<form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" aria-label="<?php echo esc_attr__( 'Checkout', 'woocommerce' ); ?>">
	<input type="hidden" name="bonton_include_payment" id="bonton_include_payment" value="0" />

	<div class="checkout-layout">
		<div class="checkout-main">
			<?php if ( $checkout->get_checkout_fields() ) : ?>
				<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>
				<div id="customer_details">
					<?php do_action( 'woocommerce_checkout_billing' ); ?>
					<?php do_action( 'woocommerce_checkout_shipping' ); ?>
				</div>
				<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>
			<?php endif; ?>

			<?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>
			<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>

			@if ($giftcertificate_only_item_in_cart == false && ($pickup_date == "" || $pickup_date == null || $conflict == true))
				<div id="warning_takeover">
					<h3>Oops, something went wrong</h3>
					<p>Please re-enter your pickup date</p>
					<a href="/cart" class="button">Return to cart</a>
				</div>
			@else
				<div class="checkout-summary-card">
					@if ($points_offer)
						<button type="submit" class="checkout-points-pill" form="bonton-checkout-points-form">
							<i class="fa fa-star" aria-hidden="true"></i>
							{{ sprintf(__('Use %s points for %s discount?', 'sage'), number_format_i18n($points_offer['points']), $points_offer['discount']) }}
						</button>
					@endif
					<h2 class="checkout-summary-title"><?php esc_html_e( 'Your Items', 'sage' ); ?></h2>
					<div id="order_review" class="woocommerce-checkout-review-order">
						@php do_action( 'woocommerce_checkout_order_review' ); @endphp
					</div>
				</div>

				<div class="checkout-pay-actions">
					<button type="button" class="button bonton-pay-open" id="bonton-pay-open">
						{{ $pay_label }}
					</button>
				</div>
			@endif
		</div>

		<?php if ( $checkout->get_checkout_fields() ) : ?>
		<aside class="checkout-aside" aria-label="<?php echo esc_attr__('Order details', 'sage'); ?>">
			@if (!$giftcertificate_only_item_in_cart && $fulfillment['date'])
			<div class="checkout-fulfillment-card">
				<p class="checkout-fulfillment-card__label">{{ $fulfillment['title'] }}:</p>
				<p class="checkout-fulfillment-card__value">
					<strong>{{ $fulfillment['date'] }}</strong>
					@if ($fulfillment['time'])
						<span>{{ $fulfillment['time'] }}</span>
					@endif
					<a class="checkout-fulfillment-card__edit" href="{{ esc_url($fulfillment['change_url']) }}" aria-label="{{ esc_attr__('Change in cart', 'sage') }}">
						<i class="fa fa-pencil" aria-hidden="true"></i>
					</a>
				</p>
			</div>
			@endif

			<div class="checkout-heads-up">
				<p><strong>{{ __('Heads up:', 'sage') }}</strong> {{ __('Mastercard and Visa sometimes ask for two-factor authentication (2FA). This is standard procedure in maintaining online security. Please make sure you’re using an accurate email address or phone number that is able to receive texts when prompted for 2FA.', 'sage') }}</p>
				<p><strong>{{ __('Also:', 'sage') }}</strong>
					@if ($is_delivery)
						{{ __('We’ll deliver to this billing address unless you choose a different one. For credit card verification, your billing postal code must match the postal code associated with your credit card.', 'sage') }}
					@else
						{{ __('For credit card verification purposes, your billing postal code must match the postal code associated with your credit card.', 'sage') }}
					@endif
				</p>
			</div>
		</aside>
		<?php endif; ?>
	</div>

	<div class="bonton-pay-modal" hidden>
		<div class="bonton-pay-modal__backdrop" tabindex="-1"></div>
		<div class="bonton-pay-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="bonton-pay-modal-title">
			<button type="button" class="bonton-pay-modal__close" aria-label="<?php esc_attr_e('Close payment', 'sage'); ?>">&times;</button>
			<h2 id="bonton-pay-modal-title" class="bonton-pay-modal__title"><?php esc_html_e('Payment', 'sage'); ?></h2>
			<?php woocommerce_checkout_payment(); ?>
		</div>
	</div>

	@php do_action( 'woocommerce_checkout_after_order_review' ); @endphp
</form>

@if (!empty($points_offer))
<form id="bonton-checkout-points-form" class="wc_points_rewards_apply_discount" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" method="post" hidden>
	<input type="hidden" name="wc_points_rewards_apply_discount_amount" class="wc_points_rewards_apply_discount_amount" />
	<input type="submit" class="wc_points_rewards_apply_discount" name="wc_points_rewards_apply_discount" value="<?php echo esc_attr__( 'Apply Discount', 'woocommerce-points-and-rewards' ); ?>" />
</form>
@endif

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
