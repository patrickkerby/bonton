<?php
/**
 * Checkout billing information form
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 * @global WC_Checkout $checkout
 */

defined( 'ABSPATH' ) || exit;

$fields = $checkout->get_checkout_fields( 'billing' );
$email_field = isset( $fields['billing_email'] ) ? $fields['billing_email'] : null;
unset( $fields['billing_email'] );
?>
<div class="woocommerce-billing-fields">
	<?php if ( $email_field ) : ?>
		<div class="checkout-email-row">
			<?php woocommerce_form_field( 'billing_email', $email_field, $checkout->get_value( 'billing_email' ) ); ?>
			<?php if ( ! is_user_logged_in() && 'yes' === get_option( 'woocommerce_enable_checkout_login_reminder' ) ) : ?>
				<div class="checkout-welcome-back" hidden>
					<p class="checkout-welcome-back__title"><?php esc_html_e( 'Welcome back', 'sage' ); ?></p>
					<p class="checkout-welcome-back__copy"><?php esc_html_e( 'This email already has an account. Login for faster checkout & loyalty points.', 'sage' ); ?></p>
					<p class="checkout-welcome-back__error" hidden role="alert"></p>
					<div class="checkout-welcome-back__row">
						<p class="form-row checkout-welcome-back__password">
							<label for="bonton-welcome-password"><?php esc_html_e( 'Password', 'sage' ); ?></label>
							<span class="woocommerce-input-wrapper">
								<input type="password" class="input-text" id="bonton-welcome-password" name="bonton_welcome_password" autocomplete="current-password" />
							</span>
						</p>
						<button type="button" class="checkout-welcome-back__login">
							<i class="fa fa-user" aria-hidden="true"></i>
							<?php esc_html_e( 'Login', 'sage' ); ?>
						</button>
					</div>
					<a class="checkout-welcome-back__lost" href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php esc_html_e( 'Forgot password?', 'sage' ); ?></a>
					<hr class="checkout-welcome-back__divider" />
					<p class="checkout-welcome-back__guest-line">
						<?php esc_html_e( 'Or,', 'sage' ); ?>
						<button type="button" class="checkout-welcome-back__guest"><?php esc_html_e( 'continue as a guest', 'sage' ); ?></button>
					</p>
				</div>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<?php if ( ! is_user_logged_in() && $checkout->is_registration_enabled() ) : ?>
		<div class="woocommerce-account-fields">
			<?php if ( ! $checkout->is_registration_required() ) : ?>
				<p class="form-row form-row-wide create-account">
					<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
						<input class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" id="createaccount" <?php checked( ( true === $checkout->get_value( 'createaccount' ) || ( true === apply_filters( 'woocommerce_create_account_default_checked', false ) ) ), true ); ?> type="checkbox" name="createaccount" value="1" />
						<span><?php esc_html_e( 'Create an account (earn loyalty points)?', 'sage' ); ?></span>
					</label>
				</p>
			<?php endif; ?>

			<?php do_action( 'woocommerce_before_checkout_registration_form', $checkout ); ?>

			<?php if ( $checkout->get_checkout_fields( 'account' ) ) : ?>
				<div class="create-account">
					<?php foreach ( $checkout->get_checkout_fields( 'account' ) as $key => $field ) : ?>
						<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
					<?php endforeach; ?>
					<div class="clear"></div>
				</div>
			<?php endif; ?>

			<?php do_action( 'woocommerce_after_checkout_registration_form', $checkout ); ?>
		</div>
	<?php endif; ?>

	<h3><?php esc_html_e( 'Billing Address', 'sage' ); ?></h3>

	<?php do_action( 'woocommerce_before_checkout_billing_form', $checkout ); ?>

	<div class="woocommerce-billing-fields__field-wrapper">
		<?php
		foreach ( $fields as $key => $field ) {
			woocommerce_form_field( $key, $field, $checkout->get_value( $key ) );
		}
		?>
	</div>

	<?php if ( \App\bonton_checkout_is_delivery() ) : ?>
		{{-- <p class="checkout-delivery-hint"><?php esc_html_e( 'We’ll deliver here unless you choose a different address.', 'sage' ); ?></p> --}}
	<?php endif; ?>

	<?php do_action( 'woocommerce_after_checkout_billing_form', $checkout ); ?>
</div>
