@php
/**
 * Cart Page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.8.0
 */

defined( 'ABSPATH' ) || exit;

	$post_id = get_the_ID();	
	do_action( 'woocommerce_before_cart' ); 
	$long_fermentation = "";
	$long_fermentation_in_cart = "";
	$giftcertificate_only_item_in_cart = false;
	$cart_count = 0;
	$gc_cart_count = 0;
	$conflict = false;

	$dateformat = "d/m/Y";
	date_default_timezone_set('MST');
	$currenthour = date('H');
	$cutoffhour = '15:00';
	$cutoff = date('H', strtotime($cutoffhour));	
	$tomorrow = new DateTime('tomorrow');
	$today = new DateTime('today');
	

	if ($currenthour > $cutoff) {
  	$post3pm = true;
	}
	elseif ($currenthour < $cutoff) {
  	$post3pm = false;
	}
	else {
		//
	}


	if ( isset($_POST['date']))  { // Save post data to session. Only use session data from here on in.
		$pickupdate = $_POST['date'];
		$pickuptimeslot = $_POST['timeslot'];

		$pickupdate = DateTime::createFromFormat($dateformat, $pickupdate);
		$pickup_date_formatted = $pickup_date->format('d/m/Y');


		WC()->session->set('pickup_date', $pickupdate);
		WC()->session->set('pickup_formatted', $pickup_date_formatted);
		WC()->session->set('pickup_timeslot', $pickuptimeslot);
	}

	$session_pickup_date = WC()->session->get('pickup_date');
	$session_timeslot = WC()->session->get('pickup_timeslot');

	$pickup_restriction_data = "";
	$pickup_restriction_end_data = "";
	$restricted_start_date = "";
	$restricted_end_date = "";
	
	if ($session_pickup_date) {
		// $session_pickup_date = DateTime::createFromFormat($dateformat, $session_pickup_date);
		$pickup_day_of_week = $session_pickup_date->format('l');
	}

	if ( !isset($session_pickup_date) || $session_pickup_date == "") {		
		$conflict = true;
	}

	$morning_selected = "";
	$midday_selected = "";
	$afternoon_selected = "";

	if ( isset($session_timeslot)) {
		if ( $session_timeslot === 'morning') {
			$morning_selected = "checked";
		}
		elseif ( $session_timeslot === 'midday') {
			$midday_selected = "checked";
		}
		elseif ( $session_timeslot === 'afternoon') {
			$afternoon_selected = "checked";
		}
	}
@endphp
	<div class="row justify-content-center">	
		<div class="col-md-8">
			<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
				<?php do_action( 'woocommerce_before_cart_table' ); ?>
				<table class="shop_table cart woocommerce-cart-form__contents" cellspacing="0">
					<thead>
						<tr>
							<th class="product-remove">&nbsp;</th>
							<th class="product-name"><?php esc_html_e( 'Product', 'woocommerce' ); ?></th>
							<th class="product-price"><?php esc_html_e( 'Price', 'woocommerce' ); ?></th>
							<th class="product-quantity"><?php esc_html_e( 'Quantity', 'woocommerce' ); ?></th>
							<th class="product-subtotal"><?php esc_html_e( 'Subtotal', 'woocommerce' ); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php do_action( 'woocommerce_before_cart_contents' ); ?>

						<?php

						foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
							$long_fermentation = "";
							$giftcertificate_in_cart = false;
							$cart_count++;

							$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
							$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

							if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
								$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
							?>

							<?php
								// Check availability
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

								//Pickup Restriction!!

								$pickup_restriction_data = get_field('restricted_pickup', $product_id);
								$pickup_restriction_end_data = get_field('restricted_pickup_end', $product_id);
								

								if($pickup_restriction_data) {
									$restricted_start_date = DateTime::createFromFormat($dateformat, $pickup_restriction_data);
									$restricted_end_date = DateTime::createFromFormat($dateformat, $pickup_restriction_end_data);
									$restricted_start_date_js = $restricted_start_date->format('d/m/Y');
									$restricted_end_date_js = $restricted_end_date->format('d/m/Y');
									$restriction_msg = '<span class="restricted_notice">Only available '. $restricted_start_date->format('D, M j') . ' to ' . $restricted_end_date->format('D, M j') . '</span>';
								}								

								//Is the product available on the day selected? 
								if(isset($session_pickup_date) && !in_array($pickup_day_of_week, $days_available)){
									$availability_status = "not-available";
									$availability_msg = '<span class="not-available-message">This product is not available on your selected pickup date!<br> Please remove, or select different pickup date.</span>';
								}								
								else {
									$availability_msg = "";
									$availability_status = "available";
								}

								//Check if requires long fermentation lead time
								if ( has_term( array('long-fermentation'), 'product_tag', $product_id ) ){
									$long_fermentation = "yes";
									$long_fermentation_in_cart = True;
								}

								//Check if product is gift certificate
								if ( $product_id == 5317) {
									$giftcertificate_in_cart = true;
									$gc_cart_count++;
								}

							?>
							<tr class="<?php echo $availability_status; ?> title woocommerce-cart-form__cart-item <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">
								<td class="product-remove">
									<?php
										echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
											'woocommerce_cart_item_remove_link',
											sprintf(
												'<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
												esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
												esc_html__( 'Remove this item', 'woocommerce' ),
												esc_attr( $product_id ),
												esc_attr( $_product->get_sku() )
											),
											$cart_item_key
										);
									?>
								</td>	
								<td class="product-name" colspan="4" data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>">
									@php
									if ( ! $product_permalink ) {
										echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key ) . '&nbsp;' );
									} else {
										echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $_product->get_name() ), $cart_item, $cart_item_key ) );
									}

									do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key );								

									@endphp
								</td>
							</tr>
							
							<tr class="<?php echo $availability_status; ?> woocommerce-cart-form__cart-item <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">
								<td></td>
								<td class="product-meta" data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>">
									<?php
									// Meta data.
									echo wc_get_formatted_cart_item_data( $cart_item ); // PHPCS: XSS ok.

									// Backorder notification.
									if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) ) {
										echo wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) );
									}
									?>

									<?php
										if (in_array('Everyday', $days_available)) {
											echo '<span class="availability"><strong>Availability: </strong> All week!</span>';
										}
										else {
												$days = implode(', ', $days_available);
												echo '<span class="availability"><strong>Availability: </strong>' . $days . '</span>';
										}
									?>
									@if($long_fermentation === 'yes')
										<span class="availability"><strong>*Note:</strong> Not available for next-day pickup</span>										
									@endif
									
									@if($pickup_restriction_data)
									{!! $restriction_msg !!}
									@endif
																		
									</td>

									<td class="product-price" data-title="<?php esc_attr_e( 'Price', 'woocommerce' ); ?>">
										<?php
											echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
										?>
									</td>

									<td class="product-quantity" data-title="<?php esc_attr_e( 'Quantity', 'woocommerce' ); ?>">
									<?php
									if ( $_product->is_sold_individually() ) {
										$product_quantity = sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key );
									} else {
										$product_quantity = woocommerce_quantity_input(
											array(
												'input_name'   => "cart[{$cart_item_key}][qty]",
												'input_value'  => $cart_item['quantity'],
												'max_value'    => $_product->get_max_purchase_quantity(),
												'min_value'    => '0',
												'product_name' => $_product->get_name(),
											),
											$_product,
											false
										);
									}

									echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ); // PHPCS: XSS ok.
									?>
									</td>

									<td class="product-subtotal" data-title="<?php esc_attr_e( 'Subtotal', 'woocommerce' ); ?>">
										<?php
											echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
										?>
									</td>
								</tr>
								@if($availability_msg)
									<tr class="not-available">
										<td colspan="5">{!! $availability_msg !!}</td>
									</tr>
								@endif

								@php
										
								if ($pickup_restriction_data) {
									$pickup_restriction_check = true;
									$restricted_in_cart = true;									
								}
								else {
									$pickup_restriction_check = false;
									$restricted_in_cart = false;									
								}
								
								if ($pickup_restriction_end_data) {
									$pickup_restriction_end_check = true;
								}
								else {
									$pickup_restriction_end_check = false;
								}

								// Prevent cart from proceeding with old session data selected. Force a new date selection according to restrictions
								// Except if the previously chosen date is within the restricted range, then leave it as is.
								
								if ($pickup_restriction_data) {
									if ($session_pickup_date < $restricted_start_date || $session_pickup_date > $restricted_end_date){
										$conflict = true;
									}	
								}

								// Check to see if session date is from an old session. Is the session date older than 33 hrs from now?
								if ($post3pm == true && $session_pickup_date <= $tomorrow || $session_pickup_date == $today) {
									$session_pickup_date = null;	
									$conflict = true;		
								}
								else {
									//
								}
								// This check MUST occur in the loop. Otherwise, it won't catch
								if ($availability_msg == TRUE) {
									$conflict = true;
								}
							}
						}
						
						// Conflict check for number of items in the cart. this is needed incase someone puts multiple GC products into the cart.								
						$cart_count = $cart_count - $gc_cart_count;

						if ( $giftcertificate_in_cart && $cart_count < 1) {
							$giftcertificate_only_item_in_cart = true;
							$conflict = false;
						}

						if ($availability_msg == TRUE) {
								$conflict = true;
						}

					@endphp

						<?php do_action( 'woocommerce_cart_contents' ); ?>

						<tr>
							<td colspan="6" class="actions">

								<?php if ( wc_coupons_enabled() ) { ?>
									<div class="coupon">
										<label for="coupon_code"><?php esc_html_e( 'Coupon:', 'woocommerce' ); ?></label> <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" /> <button type="submit" class="button" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>"><?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?></button>
										<?php do_action( 'woocommerce_cart_coupon' ); ?>
									</div>
								<?php } ?>

								<button type="submit" class="button" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php esc_html_e( 'Update cart', 'woocommerce' ); ?></button>

								<?php do_action( 'woocommerce_cart_actions' ); ?>

								<?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
							</td>
						</tr>

						<?php do_action( 'woocommerce_after_cart_contents' ); ?>
					</tbody>
				</table>
				<?php do_action( 'woocommerce_after_cart_table' ); ?>
			</form>
			<?php do_action( 'woocommerce_before_cart_collaterals' ); ?>

				<div class="cart-collaterals @if($conflict === true) conflict @endif col-sm-12">
					<?php
						/**
						* Cart collaterals hook.
						*
						* @hooked woocommerce_cross_sell_display
						* @hooked woocommerce_cart_totals - 10
						*/
						do_action( 'woocommerce_cart_collaterals' );
					?>
				</div>

		<?php do_action( 'woocommerce_after_cart' ); ?>
		</div>
		@unless($giftcertificate_only_item_in_cart == true)

			<div class='col-md-4 order-first'>
				<form method="post" class="acf-form">
					<div class="">
						<div class="acf-field acf-field-date-picker">
							<div class="acf-label">
								<label for="date">Confirm your pickup date:</label>
							</div>
							<div class='input date acf-date-picker acf-input-wrap' id='datetimepicker1'>
								<div class="datepicker" id="datepicker">
									{{-- <input type='text' name="date" id="datepicker" value="{{ $session_pickup_date }}" autocomplete="off" /> --}}
									<input type='hidden' name="date" id="dateInput" value="{{ $session_pickup_date }}" />
								</div>
								
								<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>
						</div>
						<div class="acf-field acf-field-radio" data-name="timeslot" data-type="radio">
							<div class="acf-label">
								<label>Timeslot</label>
							</div>
							<div class="acf-input">      
								<div class="form-check">
									<input class="form-check-input" type="radio" name="timeslot" id="morning" value="morning" {{ $morning_selected }}>
									<label class="form-check-label" for="morning">
										9am - 11am
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="timeslot" id="midday" value="midday" {{ $midday_selected }}>
									<label class="form-check-label" for="midday">
										11am - 2pm
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="timeslot" id="afternoon" value="afternoon" {{ $afternoon_selected }}>
									<label class="form-check-label" for="afternoon">
										2pm - 5pm
									</label>
								</div>
							</div>
						</div>

						<div class="acf-form-submit">
							<input type="submit" class="acf-button button button-primary button-large" value="Confirm date to continue">
							<span class="acf-spinner"></span>
						</div>
					</div>
				</form>
					@if ( $long_fermentation_in_cart == True)
						<div class="lf_notice"> 
							<strong>Why can't I choose tomorrow?</strong> <br>Next-day pickup is unavailable for Sourdough breads (They need 40 hours of fermentation).
						</div><br>
					@endif
					@if ( $restricted_in_cart == True)
					<div class="lf_notice"> 
						<strong>Notice!</strong> <br>You have selected a special product that is extremely limited, and <em>only</em> available on the day(s) listed above.
					</div>
				@endif
			</div>
		@endunless
	</div>

	<div id="pickup-details" style="display: none;">
		<div id="pickup_restriction_data">@if($restricted_start_date)@php echo htmlspecialchars($restricted_start_date_js); @endphp@endif</div>			
		<div id="pickup_restriction_end_data">@if($restricted_end_date)@php echo htmlspecialchars($restricted_end_date_js); @endphp@endif</div>		
		<div id="session_pickup_date">@if($session_pickup_date)@php echo htmlspecialchars($session_pickup_date->format('d/m/Y')); @endphp@endif</div>
		<div id="session_pickup_date_object">@php var_dump($session_pickup_date); @endphp</div>
		<div id="long_fermentation_in_cart">@php echo htmlspecialchars($long_fermentation_in_cart); @endphp</div>
	</div>

	@php 	
		

@endphp