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

<div class="landing-topbar">
  <a href="https://bonton.ca"><span class="arrow-left"></span>www.bonton.ca</a>
</div>

@isset($use_custom_header)

  <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay }}), rgba(94,84,71,0.{{ $overlay }})), url('{{ $hero }}');">
    <div class="page-header">
      <h1 class="hero-headline">{!! App::title() !!}</h1>
      @if($sub_title)
        {!! $sub_title !!}
      @endif
    </div>
  </header>

@endisset

