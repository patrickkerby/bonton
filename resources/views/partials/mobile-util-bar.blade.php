<div class="mobile-util-bar d-md-none" id="mobile-util-bar">
  <div class="mobile-util-bar__search mobile-util-bar__search--field">
    {!! do_shortcode('[wcas-search-form]') !!}
  </div>

  <div class="mobile-util-bar__actions">
    @include('partials.utility-account', [
      'modifier_class' => 'utility-account--mobile-bar',
      'show_label' => false,
      'show_caret' => true,
      'id_suffix' => '-mobile',
    ])

    @include('partials.cart-icon', ['extra_class' => 'mobile-util-bar__cart'])
  </div>
</div>
