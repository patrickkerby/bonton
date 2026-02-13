{{-- Hidden div for passing PHP variables to cart.js --}}
<div id="pickup-details" style="display: none;">
  <div id="pickup_restriction_data">{{ $restricted_start_date_js }}</div>
  <div id="pickup_restriction_end_data">{{ $restricted_end_date_js }}</div>
  <div id="session_pickup_date">{{ $session_pickup_date_js }}</div>
  <div id="long_fermentation_in_cart">{{ $long_fermentation_in_cart ? '1' : '' }}</div>
  <div id="two_days_notice_in_cart">{{ $two_days_notice_in_cart ? '1' : '' }}</div>
  @if($all_available_dates)
    <div id="available_dates_in_cart">{!! json_encode($all_available_dates) !!}</div>
  @endif
</div>
