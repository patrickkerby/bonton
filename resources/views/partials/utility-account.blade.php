@php
  $is_logged_in = is_user_logged_in();
  $account_url = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : home_url('/my-account/');
  $orders_url = function_exists('wc_get_endpoint_url') ? wc_get_endpoint_url('orders', '', $account_url) : $account_url;
  $edit_url = function_exists('wc_get_endpoint_url') ? wc_get_endpoint_url('edit-account', '', $account_url) : $account_url;
  $points_url = function_exists('wc_get_endpoint_url') ? wc_get_endpoint_url('points-and-rewards', '', $account_url) : $account_url;
  $logout_url = wp_logout_url(home_url('/'));
  $display_name = $utility_account_display_name ?? '';
  if ($is_logged_in && !$display_name) {
    $user = wp_get_current_user();
    if ($user->first_name) {
      $display_name = $user->first_name;
    } elseif ($user->display_name) {
      $display_name = $user->display_name;
    } else {
      $display_name = $user->user_login;
    }
  }
  $points = (int) ($utility_account_points ?? 0);
  $points_label = \App\bonton_points_rewards_points_label($points);
  $redirect = (is_ssl() ? 'https://' : 'http://') . ($_SERVER['HTTP_HOST'] ?? '') . ($_SERVER['REQUEST_URI'] ?? '/');
  $modifier = $modifier_class ?? '';
  $show_label = $show_label ?? true;
  $show_caret = $show_caret ?? true;
  $id_suffix = $id_suffix ?? '';
@endphp

<div class="utility-account {{ $modifier }}" id="utility-account{{ $id_suffix }}">
  <button
    type="button"
    class="utility-account__trigger"
    id="utility-account-btn{{ $id_suffix }}"
    aria-expanded="false"
    aria-controls="utility-account-panel{{ $id_suffix }}"
    aria-haspopup="true"
  >
    <i class="fa fa-user" aria-hidden="true"></i>
    @if($show_label)
      @if($is_logged_in)
        <span class="utility-account__label">Hi, {{ esc_html($display_name) }}</span>
      @else
        <span class="utility-account__label">Login</span>
      @endif
    @endif
    @if($show_caret)
      <i class="utility-account__chevron" aria-hidden="true"></i>
    @endif
  </button>

  <div class="utility-account__panel" id="utility-account-panel{{ $id_suffix }}" hidden aria-hidden="true">
    @if($is_logged_in)
      @if(class_exists('WC_Points_Rewards_Manager'))
        <a class="utility-account__points" href="{{ esc_url($points_url) }}">
          <i class="fa fa-star" aria-hidden="true"></i>
          <span>{{ number_format_i18n($points) }} {{ esc_html($points_label) }}</span>
        </a>
      @endif
      <nav class="utility-account__nav" aria-label="Account">
        <a class="utility-account__nav-link" href="{{ esc_url($orders_url) }}">Recent orders</a>
        <a class="utility-account__nav-link" href="{{ esc_url($edit_url) }}">Account details</a>
        <a class="utility-account__logout" href="{{ esc_url($logout_url) }}">
          <i class="fa fa-sign-out-alt" aria-hidden="true"></i>
          Log out
        </a>
      </nav>
    @else
      <div class="utility-account__login">
        <h5 class="utility-account__heading">Log in to earn &amp; redeem loyalty points!</h5>
        @php
          woocommerce_login_form([
            'redirect' => $redirect,
            'hidden'   => false,
          ]);
        @endphp
        @if('yes' === get_option('woocommerce_enable_myaccount_registration'))
          <p class="utility-account__register">
            New here? <a href="{{ esc_url($account_url) }}">Create an account</a>
          </p>
        @endif
      </div>
    @endif
  </div>
</div>
