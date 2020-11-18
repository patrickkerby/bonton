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


<div class="hero-slider row full-width no-gutters">
  <div class="col-sm-8">
    <div class="slider">
      <div id="carouselIndicators" class="carousel slide carousel-fade" data-ride="carousel" data-interval="6000">
        <ol class="carousel-indicators">
          @foreach ($background_image as $item)
            <li data-target="#carouselIndicators" data-slide-to="{{ $loop->index }}" class="@if ($loop->first)active @endif"></li>
          @endforeach
        </ol>
       <div class="carousel-inner">
          @foreach ($background_image as $item)
            <div class="carousel-item @if ($loop->first)active @endif">
              @php
                $image = $item->image->ID;
                $size = 'large'; // (thumbnail, medium, large, full or custom size)
                if( $image ) {
                    echo wp_get_attachment_image( $image, $size );
                }
              @endphp
            </div>    
          @endforeach
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="page-header">
      <h1 class="hero-headline">{!! App::title() !!}</h1>
    </div>
    <h3>{!! $sub_title !!}</h3>
  </div>
</div>


