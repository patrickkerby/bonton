{{--
  Template Name: Wholesale Full Shop
--}}
@php
$current_user = wp_get_current_user();
// $order_history = site_url( '/my-account/orders/', 'https' );
@endphp

@extends('layouts.app')
@section('content')
<section>
  @while(have_posts()) @php the_post() @endphp
    <div class="row justify-content-center">
      <div class="col-sm-10">
      
        <a href="../" class="btn button">Back to My Custom Products</a> <br><br>

        @include('partials.content-page')

        @php
          wc_the_product_table( array( 
            'rows_per_page' => 50,
            'lazy_load' => true,
            'variations' => true,
            'filters' => "categories",
            'exclude_category' => "wholesale",
            'cf' => "_stock_status:instock",
            'column_breakpoints' => "default,none,default,all"
          ) );
        @endphp
      </div>
    </div>
  @endwhile
</section>
@endsection
