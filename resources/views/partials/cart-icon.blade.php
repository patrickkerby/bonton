@php
  // Always start at 0 in markup — full-page cache must not bake in another session's count.
  // common.js + wc-cart-fragments hydrate the real count from the visitor's cart.
  $extra_class = $extra_class ?? '';
  $count_id = $count_id ?? '';
@endphp
<a
  class="cart-icon{{ $extra_class ? ' ' . $extra_class : '' }}"
  href="{{ esc_url(wc_get_cart_url()) }}"
  aria-label="{{ __('View cart', 'woocommerce') }}"
>
  <i class="fa fa-shopping-cart cart-icon__symbol" aria-hidden="true"></i>
  <span class="cart-icon__count" @if($count_id) id="{{ $count_id }}" @endif>0</span>
</a>
