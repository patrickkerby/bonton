@php 
$hero = get_field('background_image');
$hero_news = get_field('background_image', get_option('page_for_posts'));
$hero_shop = get_field('background_image', get_option('woocommerce_shop_page_id'));

$overlay = get_field('overlay');	
$overlay_news = get_field('overlay', get_option('page_for_posts'));	
$overlay_shop = get_field('overlay', get_option('woocommerce_shop_page_id'));	

$shop_title = get_the_title( get_option('woocommerce_shop_page_id') );
$shop_subtitle = get_field('sub_title', get_option('woocommerce_shop_page_id'));

$news_title = get_the_title( get_option('page_for_posts', true) );
$hero_product = get_field('shop_header_image', 'option');
$sub_title = get_field('sub_title');

// $use_custom_header = false;


@endphp

<header class="banner d-none d-md-flex">
  <div class="util-nav">
    {{-- caching="false" = render hours in PHP (no extra AJAX / "checking…" placeholder). Enable caching in shortcode only if full-page cache would serve stale open/closed text. --}}
    <div class="hours">@php echo do_shortcode('[mbhi location="Bon Ton Bakery" caching="false"]'); @endphp</div>
    <div class="top-nav-row">
      @if (has_nav_menu('top_navigation'))
        {!! wp_nav_menu(['theme_location' => 'top_navigation', 'menu_class' => 'top-nav']) !!}
      @endif
      @include('partials.cart-icon', ['count_id' => 'header-cart-count'])
    </div>
  </div>
  <div class="container-fluid">
    <nav class="nav-primary">
      @if (has_nav_menu('primary_navigation') && !$is_wholesale_user)
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      @elseif (has_nav_menu('wholesale_navigation') && $is_wholesale_user)  
        {!! wp_nav_menu(['theme_location' => 'wholesale_navigation', 'menu_class' => 'nav']) !!}
      @endif
    </nav>
  </div>
</header>

<header class="mobile-banner d-md-none{{ is_cart() ? ' mobile-banner--minimal' : '' }}">
  @php
    $mobile_shop_url = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/shop/');
  @endphp

  @unless(is_cart())
    <a href="{{ esc_url($mobile_shop_url) }}" class="mobile-banner__shop" aria-label="{{ __('Shop', 'woocommerce') }}">
      <i class="fa fa-store" aria-hidden="true"></i>
      <span>SHOP</span>
    </a>
    <a href="{!! get_home_url() !!}" class="logo">Bon Ton Bakery &amp; Pâtisserie</a>
  @endunless

  <button class="navbar-toggler hamburger hamburger--arrow" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent1">
    <nav class="nav-mobile">
      @php 
      echo do_shortcode('[wcas-search-form]');
      @endphp      
      @if (has_nav_menu('mobile_navigation'))
        {!! wp_nav_menu(['theme_location' => 'mobile_navigation', 'menu_class' => 'mobile-nav']) !!}
      @endif
      <div class="mobile-util-nav">
        <a class="btn button" href="https://goo.gl/maps/yDgi2Hh8qSw6D7eq7" target="_blank">Get directions</a>
        <a class="btn button" href="tel:+1-780-489-7717">Call us!</a>
      </div>
    </nav>
</header>

@isset($use_custom_header)
  @if ($use_custom_header == TRUE && ! is_front_page() && ! is_page('stories') && 'product' != get_post_type())
    <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay }}), rgba(94,84,71,0.{{ $overlay }})), url('{{ $hero }}');">
      <div class="page-header">
        <h1 class="hero-headline">{!! App::title() !!}</h1>
      </div>
    </header>
    @if($sub_title && !(function_exists('is_checkout') && is_checkout() && function_exists('is_wc_endpoint_url') && is_wc_endpoint_url('order-received')))
      <div class="intro">
        {!! $sub_title !!}
      </div>
    @endif

  @elseif ($use_custom_header == TRUE && is_page('stories'))
  <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay }}), rgba(94,84,71,0.{{ $overlay }})), url('{{ $hero }}');">
    <div class="page-header">
      <h1 class="hero-headline">{!! App::title() !!}</h1>
      @if($sub_title)
        {!! $sub_title !!}
      @endif
    </div>
  </header>
  @else

  @endif
@endisset

@if ( is_shop() )
  <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay_shop }}), rgba(94,84,71,0.{{ $overlay_shop }})), url('{{ $hero_shop }}');">
    <h2>{!! $shop_title !!}</h2>
  </header>
  @if($shop_subtitle)
    <div class="intro">
      {!! $shop_subtitle !!}
    </div>
  @endif

@elseif ( is_front_page() )
@else
  {{-- Show no header --}}
@endif
