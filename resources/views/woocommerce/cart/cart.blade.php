{{--
  Cart Page

  This template can be overridden by copying it to yourtheme/woocommerce/cart/cart.php.

  @see     https://docs.woocommerce.com/document/template-structure/
  @package WooCommerce/Templates
  @version 3.8.0
--}}

@php
  defined( 'ABSPATH' ) || exit;
  do_action( 'woocommerce_before_cart' );
@endphp

<div class="row justify-content-center">
  <div class="col-sm-10 col-md-8">
    @unless($is_wholesale_user)
      <div class="points-coupons d-none d-md-flex">
        @if(is_user_logged_in())
          @php
            $user_points = WC_Points_Rewards_Manager::get_users_points( get_current_user_id() );
          @endphp
          <button type="button" class="btn btn-link" id="show-loyalty-points-btn">
            <i class="fa fa-star" aria-hidden="true"></i>Points: {{ number_format_i18n( $user_points ) }}
          </button>
        @else
          <button type="button" class="btn btn-link" id="show-loyalty-points-btn">
            <i class="fa fa-user" aria-hidden="true"></i>Login for loyalty points
          </button>
        @endif
        
        <button type="button" class="btn btn-link" id="show-coupon-btn">
          <i class="fa fa-gift" aria-hidden="true"></i>Redeem Coupon
        </button>
      </div>

      <div id="coupon-slidein" class="coupon">
        <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="{{ __( 'Coupon code', 'woocommerce' ) }}" />
        <button type="submit" class="button" name="apply_coupon" value="{{ __( 'Apply coupon', 'woocommerce' ) }}">{{ __( 'Apply', 'woocommerce' ) }}</button>
        @php do_action( 'woocommerce_cart_coupon' ) @endphp
      </div>
    @endunless

    <h4>Your Items:</h4>
    <form class="woocommerce-cart-form" action="{{ esc_url( wc_get_cart_url() ) }}" method="post">
      @php do_action( 'woocommerce_before_cart_table' ) @endphp

      <table class="shop_table cart woocommerce-cart-form__contents" cellspacing="0">
        <thead>
          <tr>
            <th class="product-remove">&nbsp;</th>
            <th class="product-name">{{ __( 'Product', 'woocommerce' ) }}</th>
            {{-- <th class="product-price">{{ __( 'Price', 'woocommerce' ) }}</th> --}}
            <th class="product-quantity">{{ __( 'Quantity', 'woocommerce' ) }}</th>
            <th class="product-subtotal">{{ __( 'Subtotal', 'woocommerce' ) }}</th>
          </tr>
        </thead>
        <tbody>
          @php do_action( 'woocommerce_before_cart_contents' ) @endphp

          @foreach ($cart_items_data as $item)
            @include('woocommerce.cart.partials.cart-item-row', ['item' => $item])
          @endforeach

          @php do_action( 'woocommerce_cart_contents' ) @endphp

          @php do_action( 'woocommerce_after_cart_contents' ) @endphp
        </tbody>
      </table>
      <button type="submit" class="button" name="update_cart" value="{{ __( 'Update cart', 'woocommerce' ) }}">{{ __( 'Update cart', 'woocommerce' ) }}</button>

              @php do_action( 'woocommerce_cart_actions' ) @endphp
              @php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ) @endphp

      @php do_action( 'woocommerce_after_cart_table' ) @endphp
    </form>

    @php do_action( 'woocommerce_before_cart_collaterals' ) @endphp

    <div class="cart-collaterals @if($conflict) conflict @endif col-sm-12 @if($giftcertificate_only_item_in_cart) giftcertificate @endif">
      @php
        /**
         * Cart collaterals hook.
         *
         * @hooked woocommerce_cross_sell_display
         * @hooked woocommerce_cart_totals - 10
         */
        do_action( 'woocommerce_cart_collaterals' );
      @endphp
    </div>

    @php do_action( 'woocommerce_after_cart' ) @endphp

  </div>

  @unless($giftcertificate_only_item_in_cart)
    @include('woocommerce.cart.partials.date-picker-sidebar')
  @endunless
</div>

@include('woocommerce.cart.partials.modal-delivery')
@include('woocommerce.cart.partials.modal-bags')

{{-- Validation messages --}}
@if ($conflict && $session_pickup_date)
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <div class="alert-danger">
      <strong>Whoops! </strong> It looks like product(s) you have selected aren't available on your chosen pickup date. Please remove the product(s) or select a different pickup date.
    </div>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
@endif

@include('woocommerce.cart.partials.js-pickup-data')
