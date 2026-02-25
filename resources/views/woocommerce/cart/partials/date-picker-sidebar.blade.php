{{-- Date Picker Sidebar --}}
<div class='col-md-4 order-first'>
  <form method="post" class="acf-form">
    
    @unless($is_wholesale_user)
      <div class="points-coupons">
        <button type="button" class="btn btn-link" id="show-loyalty-points-btn">
          <i class="fa fa-user" aria-hidden="true" style="margin-right: 0.5em;"></i>Login for loyalty points
        </button>
        
        <button type="button" class="btn btn-link" id="show-coupon-btn">
          <i class="fa fa-gift" aria-hidden="true" style="margin-right: 0.5em;"></i>Redeem Coupon
        </button>
      </div>

      <div id="coupon-slidein" class="coupon">
        <label for="coupon_code">{{ __( '', 'woocommerce' ) }}</label>
        <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="{{ __( 'Coupon code', 'woocommerce' ) }}" />
        <button type="submit" class="button" name="apply_coupon" value="{{ __( 'Apply coupon', 'woocommerce' ) }}">{{ __( 'Apply', 'woocommerce' ) }}</button>
        @php do_action( 'woocommerce_cart_coupon' ) @endphp
      </div>
    @endunless

    <h4>Pickup / delivery date:</h4>
    
    <div class="calendar-container">
      <div class="acf-field acf-field-date-picker">
        <div class='input date acf-date-picker acf-input-wrap' id='datetimepicker1'>
          <div class="datepicker" id="datepicker">
            <input type='hidden' name="date" id="dateInput" value="{{ $session_formatted }}" />
          </div>

          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      </div>
      
      <p class="small">Home Delivery available on Saturdays <a href="" data-toggle="modal" data-target="#delivery" class="shipping-info shipping-info--mobile"><i class="fas fa-circle-info"></i></a></p>

      <div class="acf-form-submit">
        <input type="submit" class="acf-button button button-primary button-large" value="{{ $datetime_button_copy }}">
        <span class="acf-spinner"></span>
      </div>

      @if ($long_fermentation_in_cart)
        <div class="lf_notice">
          <strong>Why can't I choose tomorrow?</strong> <br>Next-day pickup is unavailable for Sourdough breads (They need 40 hours of fermentation).
        </div>
      @endif

      @if ($two_days_notice_in_cart)
        <div class="lf_notice">
          <strong>Why can't I choose tomorrow?</strong> <br>One or more products in your cart require at least two days notice for preparation.
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
