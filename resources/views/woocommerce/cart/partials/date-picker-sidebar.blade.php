{{-- Date Picker Sidebar --}}
<div class='col-md-4 order-first'>

  @unless($is_wholesale_user)
    {{-- Loyalty modal lives outside <form> to avoid nested-form issues (woocommerce_login_form generates its own <form>) --}}
    <div id="loyalty-points-slidein" class="loyalty-modal">
      <button type="button" class="close-loyalty-modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="loyalty-modal__content">
        @if(is_user_logged_in())
          @php
            $discount_applied = WC_Points_Rewards_Cart_Checkout::is_discount_applied();
            $discount_available = WC_Points_Rewards_Cart_Checkout::get_discount_for_redeeming_points( false, null, true );
            $points_for_discount = $discount_available ? WC_Points_Rewards_Manager::calculate_points_for_discount( $discount_available ) : 0;
          @endphp

          @if($discount_applied)
            <p class="loyalty-modal__applied">Points discount applied!</p>
          @elseif($discount_available > 0)
            <p>Use <strong>{{ number_format_i18n( $points_for_discount ) }} Points</strong> for a <strong>{!! wc_price( $discount_available ) !!}</strong> discount on this order!</p>
            <form class="wc_points_rewards_apply_discount" action="{{ esc_url( wc_get_cart_url() ) }}" method="post">
              <input type="hidden" name="wc_points_rewards_apply_discount_amount" class="wc_points_rewards_apply_discount_amount" />
              <input type="submit" class="button" name="wc_points_rewards_apply_discount" value="{{ __( 'Apply Discount', 'woocommerce-points-and-rewards' ) }}" />
            </form>
          @else
            <p>You don't have enough points for a discount yet. Keep shopping!</p>
          @endif
        @else
          <h5 class="mb-3">Log in to earn &amp; redeem loyalty points!</h5>
          @php
            $current_url = ( is_ssl() ? "https://" : "http://" ) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            ob_start();
            woocommerce_login_form([
              'redirect' => $current_url,
              'hidden'   => false
            ]);
            echo ob_get_clean();
          @endphp
        @endif
      </div>
    </div>
  @endunless

  <form method="post" class="acf-form">
    
    @unless($is_wholesale_user)
      <div class="points-coupons d-flex d-md-none">
        @if(is_user_logged_in())
          @php
            $user_points = WC_Points_Rewards_Manager::get_users_points( get_current_user_id() );
          @endphp
          <button type="button" class="btn btn-link js-show-loyalty-points-btn" id="show-loyalty-points-btn-mobile">
            <i class="fa fa-star" aria-hidden="true"></i>Points: {{ number_format_i18n( $user_points ) }}
          </button>
        @else
          <button type="button" class="btn btn-link js-show-loyalty-points-btn" id="show-loyalty-points-btn-mobile">
            <i class="fa fa-user" aria-hidden="true"></i>Login for loyalty points
          </button>
        @endif
        
        <button type="button" class="btn btn-link js-show-coupon-btn" id="show-coupon-btn-mobile">
          <i class="fa fa-gift" aria-hidden="true"></i>Redeem Coupon
        </button>
      </div>

      <div id="coupon-slidein" class="coupon">
        <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="{{ __( 'Coupon code', 'woocommerce' ) }}" />
        <button type="submit" class="button" name="apply_coupon" value="{{ __( 'Apply coupon', 'woocommerce' ) }}">{{ __( 'Apply', 'woocommerce' ) }}</button>
        @php do_action( 'woocommerce_cart_coupon' ) @endphp
      </div>
    @endunless

    <h4 class="d-flex d-md-none">Pickup / delivery date:</h4>
    
    <div class="calendar-container">
      <div class="acf-field acf-field-date-picker">
        <div class='input date acf-date-picker acf-input-wrap' id='datetimepicker1'>
          <div class="cart-pickup-calendar" id="cart-pickup-calendar">
            <div class="datepicker" id="datepicker">
              <input type='hidden' name="date" id="dateInput" value="{{ $session_formatted }}" />
            </div>
          </div>

          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      </div>
      
      @php
        $cart_delivery_note = \App\bonton_delivery_note_for_pickup_date($session_formatted ?? null);
      @endphp
      <p class="small cart-delivery-note cart-delivery-note--{{ $cart_delivery_note['variant'] }}">
        {{ $cart_delivery_note['html'] }}
        <a href="" data-toggle="modal" data-target="#delivery" class="shipping-info shipping-info--mobile"><i class="fas fa-circle-info"></i></a>
      </p>

      <div class="acf-form-submit">
        <input type="submit" name="bonton_set_pickup_date" class="acf-button button button-primary button-large" value="{{ $datetime_button_copy }}">
        <span class="acf-spinner"></span>
      </div>

      @if ($long_fermentation_in_cart || $two_days_notice_in_cart)
        <div class="lf_notice lf_notice--lead-time">
          <strong>About pickup dates</strong><br>
          @if ($long_fermentation_in_cart && $two_days_notice_in_cart)
            Sourdough breads need about 40 hours of fermentation. Other items in your cart also require at least two days notice for preparation.
          @elseif ($long_fermentation_in_cart)
            Sourdough breads need about 40 hours of fermentation (roughly two days notice).
          @else
            One or more products in your cart require at least two days notice for preparation.
          @endif
          Orders placed after 3&nbsp;PM may need an extra day before your earliest pickup date is available.
        </div>
      @endif

      @if ($restricted_in_cart)
        <div class="lf_notice">
          <strong>Notice!</strong> <br>You have selected a special product that is extremely limited, and <em>only</em> available on the day(s) listed above.
        </div>
      @endif
    </div>
  </form>

  @unless($is_wholesale_user)
    <div class="delivery-notice d-none d-md-block">
      <h5>Delivery is now available!</h5>
      <a href="" data-toggle="modal" data-target="#delivery">See more details here.</a>
    </div>

    <div class="delivery-notice d-none d-md-block">
      <h5>What's up with the bag fees?</h5>
      <a href="" data-toggle="modal" data-target="#bags">More info here.</a>
    </div>
  @endunless
</div>
