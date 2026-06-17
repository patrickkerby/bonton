@unless($is_wholesale_user)
  <div class="site-header-utility" id="site-header-utility">
    @include('partials.utility-banner')
    @include('partials.mobile-util-bar')
  </div>
@endunless
