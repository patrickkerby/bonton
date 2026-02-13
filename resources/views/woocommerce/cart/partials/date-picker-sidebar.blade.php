{{-- Date Picker Sidebar --}}
<div class='col-md-4 order-first'>
  <form method="post" class="acf-form">
    <div class="">
      <div class="acf-field acf-field-date-picker">
        <div class="acf-label">
          <label for="date">Confirm your pickup date:</label>
        </div>
        <div class='input date acf-date-picker acf-input-wrap' id='datetimepicker1'>
          <div class="datepicker" id="datepicker">
            <input type='hidden' name="date" id="dateInput" value="{{ $session_formatted }}" />
          </div>

          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      </div>

      @if ($long_fermentation_in_cart)
        <div class="lf_notice">
          <strong>Why can't I choose tomorrow?</strong> <br>Next-day pickup is unavailable for Sourdough breads (They need 40 hours of fermentation).
        </div><br>
      @endif

      @if ($two_days_notice_in_cart)
        <div class="lf_notice">
          <strong>Why can't I choose tomorrow?</strong> <br>One or more products in your cart require at least two days notice for preparation.
        </div><br>
      @endif

      @if ($restricted_in_cart)
        <div class="lf_notice">
          <strong>Notice!</strong> <br>You have selected a special product that is extremely limited, and <em>only</em> available on the day(s) listed above.
        </div>
      @endif

      <div class="acf-form-submit">
        <input type="submit" class="acf-button button button-primary button-large" value="{{ $datetime_button_copy }}">
        <span class="acf-spinner"></span>
      </div>

      @unless($is_wholesale_user)
        <div class="delivery-notice">
          <h5>Delivery is now available!</h5>
          <a href="" data-toggle="modal" data-target="#delivery">See more details here.</a>
        </div>
      @endunless

      <div class="delivery-notice">
        <h5>What's up with the bag fees?</h5>
        <a href="" data-toggle="modal" data-target="#bags">More info here.</a>
      </div>

    </div>
  </form>
</div>
