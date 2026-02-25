{{--
  Cart totals

  This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-totals.php.

  @see     https://docs.woocommerce.com/document/template-structure/
  @package WooCommerce\Templates
  @version 2.3.6
--}}

@php defined( 'ABSPATH' ) || exit @endphp

<div class="cart_totals {{ WC()->customer->has_calculated_shipping() ? 'calculated_shipping' : '' }}">

  @php do_action( 'woocommerce_before_cart_totals' ) @endphp

  {{-- Shipping options section (rendered as a div on cart page by cart-shipping.blade.php) --}}
  @if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() )
    @php do_action( 'woocommerce_cart_totals_before_shipping' ) @endphp
    @php wc_cart_totals_shipping_html() @endphp
    @php do_action( 'woocommerce_cart_totals_after_shipping' ) @endphp
  @endif

  <div class="cart-totals-container">
    <h4>{{ __( 'Cart totals', 'woocommerce' ) }}</h4>
    <table cellspacing="0" class="shop_table shop_table_responsive">

      @php
        $chosen_methods = WC()->session->get('chosen_shipping_methods');
        $is_delivery = $chosen_methods && isset($chosen_methods[0]) && strpos($chosen_methods[0], 'flat_rate') !== false;
        $date_label = $is_delivery ? 'Delivery date:' : 'Pickup date:';
      @endphp

      @if ($session_pickup_date)
        <tr class="cart-subtotal">
          <th>{{ $date_label }}</th>
          <td data-title="{{ $date_label }}">{{ $session_pickup_date }}</td>
        </tr>
      @endif

      <tr class="cart-subtotal">
        <th>{{ __( 'Subtotal', 'woocommerce' ) }}</th>
        <td data-title="{{ __( 'Subtotal', 'woocommerce' ) }}">@php wc_cart_totals_subtotal_html() @endphp</td>
      </tr>

      @foreach ( WC()->cart->get_coupons() as $code => $coupon )
        <tr class="cart-discount coupon-{{ esc_attr( sanitize_title( $code ) ) }}">
          <th>@php wc_cart_totals_coupon_label( $coupon ) @endphp</th>
          <td data-title="{{ esc_attr( wc_cart_totals_coupon_label( $coupon, false ) ) }}">@php wc_cart_totals_coupon_html( $coupon ) @endphp</td>
        </tr>
      @endforeach

      @if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() )
        <tr class="shipping-cost">
          <th>
            {{ __( 'Shipping', 'woocommerce' ) }}
            <a href="" data-toggle="modal" data-target="#delivery" class="shipping-info shipping-info--desktop"><i class="fas fa-circle-info"></i></a>
          </th>
          <td data-title="{{ __( 'Shipping', 'woocommerce' ) }}">
            {!! wc_price( WC()->cart->get_shipping_total() ) !!}
            <a href="" data-toggle="modal" data-target="#delivery" class="shipping-info shipping-info--mobile"><i class="fas fa-circle-info"></i></a>
          </td>
        </tr>
        @unless($giftcertificate_only_item_in_cart)
      @elseif ( WC()->cart->needs_shipping() && 'yes' === get_option( 'woocommerce_enable_shipping_calc' ) )

        <tr class="shipping">
          <th>{{ __( 'Shipping', 'woocommerce' ) }}</th>
          <td data-title="{{ __( 'Shipping', 'woocommerce' ) }}">@php woocommerce_shipping_calculator() @endphp</td>
        </tr>

      @endif
        @endunless

      @foreach ( WC()->cart->get_fees() as $fee )
        <tr class="fee">
          <th>
            {{ esc_html( $fee->name ) }}
            @if (stripos($fee->name, 'Bag Fee') !== false)
              <a href="" data-toggle="modal" data-target="#bags" class="bag-fee-info bag-fee-info--desktop"><i class="fas fa-circle-info"></i></a>
            @endif
          </th>
          <td data-title="{{ esc_attr( $fee->name ) }}">
            @php wc_cart_totals_fee_html( $fee ) @endphp
            @if (stripos($fee->name, 'Bag Fee') !== false)
              <a href="" data-toggle="modal" data-target="#bags" class="bag-fee-info bag-fee-info--mobile"><i class="fas fa-circle-info"></i></a>
            @endif
          </td>
        </tr>
      @endforeach

      @php
        if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) {
          $taxable_address = WC()->customer->get_taxable_address();
          $estimated_text  = '';

          if ( WC()->customer->is_customer_outside_base() && ! WC()->customer->has_calculated_shipping() ) {
            $estimated_text = sprintf( ' <small>' . esc_html__( '(estimated for %s)', 'woocommerce' ) . '</small>', WC()->countries->estimated_for_prefix( $taxable_address[0] ) . WC()->countries->countries[ $taxable_address[0] ] );
          }

          if ( 'itemized' === get_option( 'woocommerce_tax_total_display' ) ) {
            foreach ( WC()->cart->get_tax_totals() as $code => $tax ) {
              echo '<tr class="tax-rate tax-rate-' . esc_attr( sanitize_title( $code ) ) . '">';
              echo '<th>' . esc_html( $tax->label ) . $estimated_text . '</th>';
              echo '<td data-title="' . esc_attr( $tax->label ) . '">' . wp_kses_post( $tax->formatted_amount ) . '</td>';
              echo '</tr>';
            }
          } else {
            echo '<tr class="tax-total">';
            echo '<th>' . esc_html( WC()->countries->tax_or_vat() ) . $estimated_text . '</th>';
            echo '<td data-title="' . esc_attr( WC()->countries->tax_or_vat() ) . '">';
            wc_cart_totals_taxes_total_html();
            echo '</td></tr>';
          }
        }
      @endphp

      @php do_action( 'woocommerce_cart_totals_before_order_total' ) @endphp

      <tr class="order-total">
        <th>{{ __( 'Total', 'woocommerce' ) }}</th>
        <td data-title="{{ __( 'Total', 'woocommerce' ) }}">@php wc_cart_totals_order_total_html() @endphp</td>
      </tr>

      @php do_action( 'woocommerce_cart_totals_after_order_total' ) @endphp

    </table>
  </div>

  <div class="wc-proceed-to-checkout">
    @php do_action( 'woocommerce_proceed_to_checkout' ) @endphp
  </div>

  @php do_action( 'woocommerce_after_cart_totals' ) @endphp

</div>
