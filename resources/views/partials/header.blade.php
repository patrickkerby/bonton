@php 
$hero = get_field('background_image');
$hero_news = get_field('background_image', get_option('page_for_posts'));
$hero_shop = get_field('background_image', get_option('woocommerce_shop_page_id'));

$overlay = get_field('overlay');	
$overlay_news = get_field('overlay', get_option('page_for_posts'));	
$overlay_shop = get_field('overlay', get_option('woocommerce_shop_page_id'));	

// $logo = get_field('logo');

$shop_title = get_the_title( get_option('woocommerce_shop_page_id') );
$news_title = get_the_title( get_option('page_for_posts', true) );

$hero_product = get_field('shop_header_image', 'option');

$sub_title = get_field('sub_title');

@endphp

<header class="banner">
  <div class="container-fluid">
    <nav class="nav-primary">
      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      @endif
    </nav>
  </div>
</header>
@if ( is_front_page() )
  <header class="hero" style="background-image: linear-gradient(rgba(45,51,55,0.{{ $overlay }}), rgba(45,51,55,0.{{ $overlay }})), url('{{ $hero }}');">
@elseif ( is_home() )
  <header class="hero" style="background-image: linear-gradient(rgba(45,51,55,0.{{ $overlay_news }}), rgba(45,51,55,0.{{ $overlay_news }})), url('{{ $hero_news }}');">
@elseif ( is_shop() )
  <header class="hero" style="background-image: linear-gradient(rgba(94,84,71,0.{{ $overlay_shop }}), rgba(94,84,71,0.{{ $overlay_shop }})), url('{{ $hero_shop }}');">
    <h2>{!! $shop_title !!}</h2>
  </header>
@elseif ( is_product() )
  <header class="hero" style="background-image: linear-gradient(rgba(45,51,55,0.{{ $overlay_shop }}), rgba(45,51,55,0.{{ $overlay_shop }})), url('{{ $hero_shop }}');">
@else
  <header class="hero" style="background-image: linear-gradient(rgba(45,51,55,0.{{ $overlay }}), rgba(45,51,55,0.{{ $overlay }})), url('{{ $hero }}');">
@endif
  </header>