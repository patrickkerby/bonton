{{--
  Template Name: Home Page
--}}
@extends('layouts.app')
@php global $product; @endphp
@section('content')
  @while(have_posts()) @php the_post() @endphp
      <div class="hero-slider row full-width no-gutters">
        <div class="col-sm-7">
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
        <div class="col-sm-5">
          <div class="page-header">
            <h1 class="hero-headline">{!! App::title() !!}</h1>
          </div>
          <h3>{!! $sub_title !!}</h3>
        </div>
      </div>
      <div class="container-fluid intro">
        <img class="illustration" src="{{ $intro->intro_image }}" />
        <div class="row no-gutters justify-content-center">
          <div class="col-sm-5">
            {!! $intro->column_1 !!}
          </div>
          <div class="col-sm-5 offset-sm-1">
            {!! $intro->column_2 !!}
          </div>
        </div>
      </div>
      <div class="container-fluid featured-products">
        <div class="row justify-content-center">
          <div class="col-10 col-sm-6 feature-intro">
            <h2>{{ $featured_products->heading }}</h2>
            <p>{{ $featured_products->sub_heading }}</p>
            <a href="/products" class="button btn">View all products</a>
          </div>
        </div>
        <div class="row justify-content-center no-gutters">
          <div class="col-sm-11">
            <div id="featuredProducts1" class="carousel slide carousel-fade row no-gutters" data-ride="carousel" data-interval="4000">
              <div class="d-none d-sm-block col-sm-2">
                <ul class="carousel-indicators">
                  @foreach ($featured_products->featured_row_1->product as $item)                                      
                    <li data-target="#featuredProducts1" data-slide-to="{{ $loop->index }}" @if ($loop->first) class="active" @endif>{{ $item->product->post_title }}</li>
                  @endforeach
                </ul>
              </div>
              <div class="carousel-inner col-sm-10">
                @foreach ($featured_products->featured_row_1->product as $item)                                      
                  <div class="carousel-item @if ($loop->first) active @endif">                      
                    @php
                      $post_id = $item->product->ID;
                      $prod_img = get_the_post_thumbnail_url($post_id);
                      $url = get_permalink( $post_id );
                    @endphp                  

                    <img class="featured-product" src="{{ $prod_img }}" alt="{{ $item->product->post_title }}" />
                    <div class="carousel-caption">
                      <h4>{{ $item->product->post_title }}</h4>
                      @if ($item->description_override)
                        <p>{{ $item->description_override }}</p>
                      @else
                        <p>{!! $item->product->post_excerpt !!}</p>
                      @endif
                      <div class="meta">
                        <a href="#" title="{{ $item->product->post_title }}" data-product_id="{{ $post_id }}" class="quick-view-button inside-thumb product-link"><span>More Info / Add to Cart</span></a>
                      </div>
                    </div> 
                  </div>                                                       
                @endforeach                             
              </div>
            </div>  
          </div>
        </div>
        <div class="row justify-content-center no-gutters">
          <div class="col-sm-11">
            <div id="featuredProducts2" class="carousel slide carousel-fade row no-gutters" data-ride="carousel" data-interval="6000">
              <div class="carousel-inner col-sm-10">
                @foreach ($featured_products->featured_row_1->product_2 as $item)                                      
                  <div class="carousel-item @if ($loop->first)active @endif left">                      
                    @php
                      $post_id = $item->product->ID;
                      $prod_img = get_the_post_thumbnail_url($post_id);
                    @endphp                  
                    <img class="featured-product" src="{{ $prod_img }}" alt="{{ $item->product->post_title }}" />
                    <div class="carousel-caption left">
                      <h4>{{ $item->product->post_title }}</h4>
                      @if ($item->description_override)
                        <p>{{ $item->description_override }}</p>
                      @else
                        <p>{!! $item->product->post_excerpt !!}</p>
                      @endif
                      <div class="meta">
                        <a href="#" title="{{ $item->product->post_title }}" data-product_id="{{ $post_id }}" class="quick-view-button inside-thumb product-link"><span>Learn More / Add to Cart</span></a>
                      </div>
                    </div> 
                  </div>                                                       
                @endforeach                             
              </div>              
              <div class="d-none d-sm-block col-sm-2">
                <ul class="carousel-indicators right">
                  @foreach ($featured_products->featured_row_1->product_2 as $item)                                      
                    <li data-target="#featuredProducts2" data-slide-to="{{ $loop->index }}" @if ($loop->first) class="active" @endif>{{ $item->product->post_title }}</li>
                  @endforeach
                </ul>
              </div>
            </div>  
          </div>
        </div>
      </div>
      <div class="container-fluid videos">
        <div class="row justify-content-center no-gutters">
          <div class="col-sm-8 process">
            <h2>Our Story &amp;<br>Our Process define us.</h2>
            <div class="row">
              <p class="col-sm-6">We know every ingredient that goes into our products because they're all made on site by our incredible team who use slow and steady traditional baking techniques. </p>
              <p class="col-sm-6">We don't use trans  fat at all and keep our ingredient list simple so you can understand and enjoy what you're eating.</p>
            </div>
            <a href="/stories" class="button btn">Learn more about us</a>
          </div>
        </div>
        <div class="row justify-content-center thumbs">
          @foreach ($story_process as $item)
            <div class="col-sm-5 thumb">
              <a href="{{ $item->link }}">
                <h3>{{ $item->title }}</h3>
                <img src="{{ $item->image }}" />
              </a>
            </div>
          @endforeach
        </div>
      </div>
      <section class="social container-fluid">
        <div class="row no-gutters">
          <div class="col-md-6 col-lg-8">
            @php dynamic_sidebar('sidebar-footer') @endphp
          </div>
          <div class="col-md-6 col-lg-4 cta">
            <h5 class="d-none d-lg-block">Stay informed:</h5>
            <h2>The latest Bon Ton News &amp; Offers</h2>
            <a href="http://eepurl.com/gsxWP9" class="button btn full" target="_blank">Newsletter Signup</a>
            <div class="feeds">
              <a href="https://twitter.com/bontonbakery" target="_blank" class="icon twitter"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>
              <a href="https://instagram.com/bontonbakery" target="_blank" class="icon instagram"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
              <a href="https://www.facebook.com/bontonbakery" target="_blank" class="icon facebook"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" class="svg-inline--fa fa-facebook-f fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a>
            </div>
          </div>
        </div>
      </section>
      
  @endwhile
@endsection
