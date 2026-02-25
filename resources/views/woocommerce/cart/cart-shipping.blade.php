{{--
  WooCommerce Cart Shipping Methods Display Template

  This Blade template customizes the display of shipping methods in the WooCommerce cart.
  It handles special business logic for delivery availability based on user type, cart contents,
  and selected pickup date.

  On the cart page, this outputs a div-based "Pickup / Delivery Options" section.
  On checkout, it outputs a table row for the review-order table.

  @see https://docs.woocommerce.com/document/template-structure/
  @package WooCommerce\Templates
  @version 3.6.0
--}}

@php
  defined( 'ABSPATH' ) || exit;

  $formatted_destination    = isset( $formatted_destination ) ? $formatted_destination : WC()->countries->get_formatted_address( $package['destination'], ', ' );
  $has_calculated_shipping  = ! empty( $has_calculated_shipping );
  $show_shipping_calculator = ! empty( $show_shipping_calculator );
  $calculator_text = '';
  $session_date_object = WC()->session->get('pickup_date_object');
  $delivery_available = false;
  $pickup_day_of_week = '';
  $pickup_date = '';
  $icecream_conflict = false;
  $delivery_message = '';
  $delivery_day = false;
  $delivery_override = false;

  if ($is_wholesale_user) {
    $delivery_available = true;
  }

  foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
    $cart_product_id = $cart_item['product_id'];
    $delivery_exclusion = get_field('delivery_exclusion', $cart_product_id);

    if ($delivery_exclusion) {
      $delivery_override = true;
    }

    if ($cart_product_id === 2045) {
      $icecream_conflict = true;
    }
  }

  if ($session_date_object) {
    $pickup_day_of_week = $session_date_object->format('l');
    $pickup_date = $session_date_object->format('Y-m-d');

    if ($pickup_day_of_week === 'Saturday') {
      $delivery_day = true;
    }

    // Delivery blackout dates -- add future dates here as needed
    // TODO: Move to ACF date picker for easier management
    $delivery_blackout_dates = [];

    if ($pickup_day_of_week === 'Saturday' && !in_array($pickup_date, $delivery_blackout_dates) && !$icecream_conflict && !$delivery_override) {
      $delivery_available = true;
    } elseif ($is_wholesale_user) {
      $delivery_available = true;
    } else {
      $delivery_available = false;
    }

    if (in_array($pickup_date, $delivery_blackout_dates)) {
      $delivery_message = "Sorry! We're at capacity for delivery on this date, but we'd love to see your face in the store!";
    } else {
      $delivery_message = '(Delivery is currently only available on Saturdays)';
    }
  }

  if ($icecream_conflict) {
    delete_user_meta( get_current_user_id(), 'shipping_method' );
    WC()->session->__unset( 'chosen_shipping_methods' );
  }
@endphp

@if (is_cart())
{{-- CART PAGE: div-based Pickup / Delivery Options section --}}
<div class="shipping-options">
  <h4>Pickup / Delivery Options</h4>

  @if ( $available_methods )
    <ul id="shipping_method" class="woocommerce-shipping-methods">
      @foreach ( $available_methods as $method )
        @if($delivery_available)
          <li>
            @php
              if ( 1 < count( $available_methods ) ) {
                printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ) );
              } else {
                printf( '<input type="hidden" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ) );
              }
              printf( '<label for="shipping_method_%1$s_%2$s">%3$s</label>', $index, esc_attr( sanitize_title( $method->id ) ), wc_cart_totals_shipping_method_label( $method ) );
              do_action( 'woocommerce_after_shipping_rate', $method, $index );
            @endphp
          </li>
        @elseif($method->method_id === 'local_pickup')
          <li>
            @php
              if ( 1 < count( $available_methods ) ) {
                printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ) );
              } else {
                printf( '<input type="hidden" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ) );
              }
              printf( '<label for="shipping_method_%1$s_%2$s">%3$s</label>', $index, esc_attr( sanitize_title( $method->id ) ), wc_cart_totals_shipping_method_label( $method ) );
              do_action( 'woocommerce_after_shipping_rate', $method, $index );
            @endphp
          </li>
        @endif
      @endforeach
    </ul>

    @if ( $icecream_conflict)
      <p class="small">We do deliver on this day, however you have icecream in your cart! Please remove the icecream if you'd like delivery.</p>
    @elseif ( $delivery_override && $delivery_day)
      <p class="small">We do deliver on this day, however you have a product in your cart that's not available for delivery. Please remove the that item if you'd like delivery</p>
    @elseif ( $delivery_available )
      
      <p class="woocommerce-shipping-destination">
        @if ( $formatted_destination )
          {!! sprintf( esc_html__( '%s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' ) !!}
          @php $calculator_text = esc_html__( 'Change address', 'woocommerce' ) @endphp
        @else
          {!! wp_kses_post( apply_filters( 'woocommerce_shipping_estimate_html', __( '', 'woocommerce' ) ) ) !!}
        @endif
      </p>
    @else
      @if($delivery_message)
        <p class="delivery-message">{{ $delivery_message }}</p>
      @endif
    @endif

  @elseif ( ! $has_calculated_shipping || ! $formatted_destination )
    @if ( 'no' === get_option( 'woocommerce_enable_shipping_calc' ) )
      {!! wp_kses_post( apply_filters( 'woocommerce_shipping_not_enabled_on_cart_html', __( 'Shipping costs are calculated during checkout.', 'woocommerce' ) ) ) !!}
    @else
      {!! wp_kses_post( apply_filters( 'woocommerce_shipping_may_be_available_html', __( 'Enter your address to view shipping options.', 'woocommerce' ) ) ) !!}
    @endif
  @else
    {!! wp_kses_post( apply_filters( 'woocommerce_cart_no_shipping_available_html', sprintf( esc_html__( 'No shipping options were found for %s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' ) ) ) !!}
    @php $calculator_text = esc_html__( 'Enter a different address', 'woocommerce' ) @endphp
  @endif

  @if ( $show_package_details )
    <p class="woocommerce-shipping-contents"><small>{{ esc_html( $package_details ) }}</small></p>
  @endif

  @if ( $show_shipping_calculator && $delivery_available && !$icecream_conflict )
    @php woocommerce_shipping_calculator( $calculator_text ) @endphp
  @endif
</div>

@else
{{-- CHECKOUT PAGE: table row for review-order --}}
<tr class="woocommerce-shipping-totals shipping">
  <th>{!! wp_kses_post( $package_name ) !!}</th>
  <td data-title="{{ esc_attr( $package_name ) }}">

    @if ( $available_methods )
      <ul id="shipping_method" class="woocommerce-shipping-methods">
        @foreach ( $available_methods as $method )
          @if($delivery_available)
            <li>
              @php
                if ( 1 < count( $available_methods ) ) {
                  printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ) );
                } else {
                  printf( '<input type="hidden" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ) );
                }
                printf( '<label for="shipping_method_%1$s_%2$s">%3$s</label>', $index, esc_attr( sanitize_title( $method->id ) ), wc_cart_totals_shipping_method_label( $method ) );
                do_action( 'woocommerce_after_shipping_rate', $method, $index );
              @endphp
            </li>
          @elseif($method->method_id === 'local_pickup')
            <li>
              @php
                if ( 1 < count( $available_methods ) ) {
                  printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ) );
                } else {
                  printf( '<input type="hidden" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ) );
                }
                printf( '<label for="shipping_method_%1$s_%2$s">%3$s</label>', $index, esc_attr( sanitize_title( $method->id ) ), wc_cart_totals_shipping_method_label( $method ) );
                do_action( 'woocommerce_after_shipping_rate', $method, $index );
              @endphp
            </li>
          @endif
        @endforeach
      </ul>

      @if ( $icecream_conflict)
        <p class="small">We do deliver on this day, however you have icecream in your cart! Please remove the icecream if you'd like delivery.</p>
      @elseif ( $delivery_override && $delivery_day)
        <p class="small">We do deliver on this day, however you have a product in your cart that's not available for delivery. Please remove the that item if you'd like delivery</p>
      @elseif ( $delivery_available )
        <p class="woocommerce-shipping-destination">
          @if ( $formatted_destination )
            {!! sprintf( esc_html__( '%s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' ) !!}
            @php $calculator_text = esc_html__( 'Change address', 'woocommerce' ) @endphp
          @else
            {!! wp_kses_post( apply_filters( 'woocommerce_shipping_estimate_html', __( 'Set your location if you would like delivery!', 'woocommerce' ) ) ) !!}
          @endif
        </p>
      @else
        @if($delivery_message)
          <p class="small">{{ $delivery_message }}</p>
        @endif
      @endif

    @elseif ( ! $has_calculated_shipping || ! $formatted_destination )
      @if ( 'no' === get_option( 'woocommerce_enable_shipping_calc' ) )
        {!! wp_kses_post( apply_filters( 'woocommerce_shipping_not_enabled_on_cart_html', __( 'Shipping costs are calculated during checkout.', 'woocommerce' ) ) ) !!}
      @else
        {!! wp_kses_post( apply_filters( 'woocommerce_shipping_may_be_available_html', __( 'Enter your address to view shipping options.', 'woocommerce' ) ) ) !!}
      @endif
    @elseif ( ! is_cart() )
      {!! wp_kses_post( apply_filters( 'woocommerce_no_shipping_available_html', __( 'There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.', 'woocommerce' ) ) ) !!}
    @else
      {!! wp_kses_post( apply_filters( 'woocommerce_cart_no_shipping_available_html', sprintf( esc_html__( 'No shipping options were found for %s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' ) ) ) !!}
      @php $calculator_text = esc_html__( 'Enter a different address', 'woocommerce' ) @endphp
    @endif

    @if ( $show_package_details )
      <p class="woocommerce-shipping-contents"><small>{{ esc_html( $package_details ) }}</small></p>
    @endif

    @if ( $show_shipping_calculator && $delivery_available && !$icecream_conflict )
      @php woocommerce_shipping_calculator( $calculator_text ) @endphp
    @endif
    <hr>

  </td>
</tr>
@endif
