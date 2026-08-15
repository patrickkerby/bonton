@php
  // Always start at 0 in markup — full-page cache must not bake in another session's count.
  // A tiny inline script paints this tab's last known count from sessionStorage immediately
  // so we do not wait on slow admin-ajax. common.js still confirms with the server.
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
  <script>
    (function () {
      try {
        var n = sessionStorage.getItem('bonton_cart_count');
        if (n === null || n === '') {
          return;
        }
        var el = document.currentScript && document.currentScript.previousElementSibling;
        if (el && el.classList.contains('cart-icon__count')) {
          el.textContent = n;
        }
      } catch (e) {}
    })();
  </script>
</a>
