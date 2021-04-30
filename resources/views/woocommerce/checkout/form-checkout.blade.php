<?php
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout.
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}

?>

<form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">

	<?php if ( $checkout->get_checkout_fields() ) : ?>
	<section>
		<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

		<div class="col2-set row" id="customer_details">
			<div class="col-md-6">
				<?php do_action( 'woocommerce_checkout_billing' ); ?>
			</div>

			<div class="col-md-6">
				<?php do_action( 'woocommerce_checkout_shipping' ); ?>
			</div>
		</div>

		<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>
	</section>
	<?php endif; ?>

	<h3 id="order_review_heading"><?php esc_html_e( 'Your order', 'woocommerce' ); ?></h3>

	<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>

	<div id="order_review" class="woocommerce-checkout-review-order">
		<?php do_action( 'woocommerce_checkout_order_review' ); ?>
	</div>

	<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>

</form>
@php
 date_default_timezone_set('MST');
	$today = date('d/m/Y');
	$currenthour = date('H');
	$cutoffhour = '15:00';
    $cutoff = date('H', strtotime($cutoffhour));
    $tomorrow = date("d/m/Y", strtotime('tomorrow'));
    $pickup_date 		= WC()->session->get('pickup_date_formatted');

    echo "<div style=\"display:none;\">Pickupdate: ".$pickup_date."</div>";
    echo "<div style=\"display:none;\">Today: ".$today."</div>";
    echo "<div style=\"display:none;\">Current Hour: ".$currenthour."</div>";
    echo "<div style=\"display:none;\">Cut off Hour: ".$cutoffhour."</div>";
    echo "<div style=\"display:none;\">Cut off: ".$cutoff."</div>";
    echo "<div style=\"display:none;\">Tomorrow: ".$tomorrow."</div>";


		if ($currenthour > $cutoff) {
        $post3pm = true;
        echo "<div style=\"display:none;\">Current hour IS after cutoff</div>";
      }
      elseif ($currenthour < $cutoff) {
        $post3pm = false;
				echo "<div style=\"display:none;\">Current hour is NOT after cutoff</div>";
      }
      else {
          //
      }
    
    if ($post3pm == true && $pickup_date <= $tomorrow || $pickup_date == $today) {
			echo "<div style=\"display:none;\">It's after 3 and the pickup day is equal to or less than tomorrow OR the pickup day is today</div>";
    }

		if ($pickup_date <= $tomorrow) {
			echo "<div style=\"display:none;\">pickup date is less than or equal to tomorrow</div>";
		}

		if ($pickup_date >= $tomorrow) {
			echo "<div style=\"display:none;\">pickup date is greater than or equal to tomorrow</div>";
		}


@endphp

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
