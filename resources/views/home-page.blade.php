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
            <img src="{{$background_image}}" />
          </div>
        </div>
        <div class="col-sm-5">
          @include('partials.page-header')
          <h3>{!! $sub_title !!}</h3>
        </div>
      </div>
      <div class="container-fluid intro">
        <img class="illustration" src="{{ $intro->intro_image }}" />
        <div class="row justify-content-center">
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
          <div class="col-sm-6 feature-intro">
            <h2>{{ $featured_products->heading }}</h2>
            <p>{{ $featured_products->sub_heading }}</p>
            <a href="/products" class="button btn">View all products</a>
          </div>
        </div>
        <div class="row justify-content-center no-gutters">
          <div class="col-sm-11">
            <div id="featuredProducts1" class="carousel slide row no-gutters" data-ride="carousel" data-interval="4000">
              <div class="col-sm-2">
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
                    @endphp                  

                    <img class="featured-product" src="{{ $prod_img }}" alt="{{ $item->product->post_title }}" />
                    <div class="carousel-caption d-none d-md-block">
                      <h4>{{ $item->product->post_title }}</h4>
                      <p>{!! $item->product->post_excerpt !!}</p>
                      <div class="meta">
                        <a href="">More info</a>
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
            <div id="featuredProducts2" class="carousel slide row no-gutters" data-ride="carousel" data-interval="6000">
              <div class="carousel-inner col-sm-10">
                @foreach ($featured_products->featured_row_1->product_2 as $item)                                      
                  <div class="carousel-item @if ($loop->first)active @endif left">                      
                    @php
                      $post_id = $item->product->ID;
                      $prod_img = get_the_post_thumbnail_url($post_id);
                    @endphp                  
                    <img class="featured-product" src="{{ $prod_img }}" alt="{{ $item->product->post_title }}" />
                    <div class="carousel-caption left d-none d-md-block">
                      <h4>{{ $item->product->post_title }}</h4>
                      <p>{!! $item->product->post_excerpt !!}</p>
                      <div class="meta">
                        <a href="">More info</a>
                      </div>
                    </div> 
                  </div>                                                       
                @endforeach                             
              </div>              
              <div class="col-sm-2">
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
    
      
  @endwhile
@endsection
