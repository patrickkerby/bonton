@if(!$is_wholesale_user)
  @php
    $progress = $bulk_discount_progress;
    $has_progress = $progress && $progress['enabled'];
    $total_units = $has_progress ? $progress['total_units'] : 0;
    $current_tier = $has_progress ? $progress['current_tier'] : 0;
    $next_tier = $has_progress ? $progress['next_tier'] : 10;
    $units_to_next = $has_progress ? $progress['units_to_next'] : 5;
    $next_target = $has_progress ? $progress['next_tier_target'] : 5;
  @endphp

  <div class="utility-banner" data-total-units="{{ $total_units }}">
    <div id="pickup_vacation_dates_global" class="d-none" aria-hidden="true">{!! json_encode($pickup_vacation_dates) !!}</div>
    <div class="utility-banner__inner">

      <div class="utility-banner__cluster">
      {{-- Pickup date selector --}}
      <div class="utility-banner__date">
        <button type="button" class="utility-banner__date-btn" id="global-date-picker-btn">
          <i class="fa fa-calendar-alt" aria-hidden="true"></i>
          <span class="utility-banner__date-label">
            @if($global_pickup_date_short)
              {{ $global_pickup_date_short }}
            @else
              Select pickup date
            @endif
          </span>
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
              <span class="utility-banner__dot {{ $total_units >= $i ? 'filled' : '' }} {{ $current_tier >= 10 ? 'tier-reached' : '' }}"></span>
            @endfor
            <span class="utility-banner__milestone {{ $current_tier >= 10 ? 'reached' : '' }}">10%</span>

            {{-- Tier 2: 5 dots --}}
            @for($i = 6; $i <= 10; $i++)
              <span class="utility-banner__dot {{ $total_units >= $i ? 'filled' : '' }} {{ $current_tier >= 20 ? 'tier-reached' : '' }}"></span>
            @endfor
            <span class="utility-banner__milestone {{ $current_tier >= 20 ? 'reached' : '' }}">20%</span>
          </div>

          <span class="utility-banner__bulk-label">
            @if($current_tier >= 20)
              20% off bread!
            @elseif($current_tier >= 10)
              10% off! {{ ceil($units_to_next) }} more for 20%
            @elseif($total_units > 0)
              {{ ceil($units_to_next) }} more for 10% off bread
            @else
              Add bread for bulk savings
            @endif
          </span>
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
