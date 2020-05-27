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

@endphp

<header class="banner d-none d-sm-flex">
  <div class="util-nav">    	
    <div class="hours">@php echo do_shortcode('[mbhi location="Bon Ton Bakery"]'); @endphp</div>
    <div class="top-nav-row">
      @if (has_nav_menu('top_navigation'))
        {!! wp_nav_menu(['theme_location' => 'top_navigation', 'menu_class' => 'top-nav']) !!}
      @endif
    </div>
  </div>
  <div class="container-fluid">
    <nav class="nav-primary">
      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      @endif
    </nav>
  </div>
</header>

<header class="mobile-banner d-sm-none">
  <a href="{!! get_home_url() !!}" class="logo">Bon Ton Bakery &amp; Pâtisserie</a>
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

@if ($use_custom_header == TRUE && ! is_front_page() && ! is_page('stories') && 'product' != get_post_type())
  <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay }}), rgba(94,84,71,0.{{ $overlay }})), url('{{ $hero }}');">
    <div class="page-header">
      <h1 class="hero-headline">{!! App::title() !!}</h1>
    </div>
  </header>
  @if($sub_title)
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

@elseif ( is_shop() )
  <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay_shop }}), rgba(94,84,71,0.{{ $overlay_shop }})), url('{{ $hero_shop }}');">
    <h2>{!! $shop_title !!}</h2>
  </header>
  @if($shop_subtitle)
    <div class="intro">
      {!! $shop_subtitle !!}
    </div>
  @endif

  @elseif ( is_single() && 'product' != get_post_type() )
    <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay }}), rgba(94,84,71,0.{{ $overlay }})), url('{{ $hero }}');">
      <div class="page-header">
        <h1 class="hero-headline">{!! App::title() !!}</h1>
        @if($sub_title)
          {!! $sub_title !!}
        @endif
      </div>  
    </header>

  @elseif ( is_front_page() )
  @else
  {{-- Show no header --}}
@endif
