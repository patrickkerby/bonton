@if(!$is_wholesale_user)
  {{--
    Session-specific UI (pickup date, bulk progress) must NOT be server-rendered into
    full-page cache HTML — WP Rocket serves the same markup to many visitors. Always
    start neutral and hydrate from the WC session via AJAX in common.js.
  --}}
  <div class="utility-banner" data-total-units="0">
    <div id="pickup_vacation_dates_global" class="d-none" aria-hidden="true">{!! json_encode($pickup_vacation_dates) !!}</div>
    <div class="utility-banner__inner">

      <div class="utility-banner__cluster">
      {{-- Pickup date selector --}}
      <div class="utility-banner__date">
        <button type="button" class="utility-banner__date-btn" id="global-date-picker-btn" aria-busy="true">
          <i class="fa fa-calendar-alt" aria-hidden="true"></i>
          <span class="utility-banner__date-label" data-pickup-date-label>Select pickup date</span>
          <i class="fa fa-caret-down utility-banner__date-caret" aria-hidden="true"></i>
        </button>
      </div>

      <span class="utility-banner__divider"></span>

      {{-- Bulk discount progress --}}
      <div class="utility-banner__bulk">
        <button type="button" class="utility-banner__bulk-trigger" id="bulk-info-btn" aria-label="Bulk discount info">
          <div class="utility-banner__progress">
            
            {{-- Tier 1: 5 dots --}}
            @for($i = 1; $i <= 5; $i++)
              <span class="utility-banner__dot"></span>
            @endfor
            <span class="utility-banner__milestone">10%</span>

            {{-- Tier 2: 5 dots --}}
            @for($i = 6; $i <= 10; $i++)
              <span class="utility-banner__dot"></span>
            @endfor
            <span class="utility-banner__milestone">20%</span>
          </div>

          <span class="utility-banner__bulk-label">Add bread for bulk savings</span>
        </button>
      </div>
      </div>

      <div class="utility-banner__account d-none d-md-flex">
        @include('partials.utility-account', [
          'modifier_class' => 'utility-account--banner',
          'show_label' => true,
          'show_caret' => true,
          'id_suffix' => '-banner',
        ])
      </div>
    </div>
  </div>
@endif
