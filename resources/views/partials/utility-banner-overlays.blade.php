@if(!$is_wholesale_user)
  {{-- Siblings of .utility-banner so scroll transforms do not trap position:fixed overlays --}}
  <div class="utility-banner__date-dropdown" id="global-date-dropdown" style="display:none;">
    <div class="utility-banner__date-picker-wrap">
      <div class="utility-banner__date-saving" id="utility-banner-date-saving" aria-hidden="true">
        <i class="fa fa-circle-notch fa-spin" aria-hidden="true"></i>
        <span>Saving date…</span>
      </div>
      {{-- selected-date is filled by AJAX hydration (common.js) so page cache cannot bake in another visitor's session date --}}
      <div id="global-datepicker" data-selected-date=""></div>
    </div>
    <p class="utility-banner__date-note">3&nbsp;PM cutoff for next-day pickup.<br>Home delivery available on Saturdays!</p>
  </div>

  <div class="utility-banner__popover" id="bulk-info-popover" style="display:none;">
    <div class="utility-banner__popover-content">
      <strong>Bulk Bread Discount</strong>
      <p>Buy more bread, buns & bagels to get automatic discounts:</p>
      <ul>
        <li><strong>5+ items</strong> &rarr; 10% off</li>
        <li><strong>10+ items</strong> &rarr; 20% off</li>
      </ul>
      <p class="utility-banner__popover-note">A half-dozen buns/bagels = 1 item, a dozen = 2 items, singles count as 1/6 each.</p>
    </div>
  </div>
@endif
