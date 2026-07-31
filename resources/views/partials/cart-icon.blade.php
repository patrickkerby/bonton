@php
  $cart_count = isset($count) ? (int) $count : WC()->cart->get_cart_contents_count();
  $extra_class = $extra_class ?? '';
  $count_id = $count_id ?? '';
@endphp
<a
  class="cart-icon{{ $extra_class ? ' ' . $extra_class : '' }}"
  href="{{ esc_url(wc_get_cart_url()) }}"
  aria-label="{{ __('View cart', 'woocommerce') }}"
>
  <i class="fa fa-shopping-cart cart-icon__symbol" aria-hidden="true"></i>
  <span class="cart-icon__count" @if($count_id) id="{{ $count_id }}" @endif>{{ $cart_count }}</span>
</a>
