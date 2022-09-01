{{--
  Template Name: Wholesale
--}}

@extends('layouts.app')
@section('content')
<section>
  @while(have_posts()) @php the_post() @endphp
    @include('partials.content-page')

    
  <h2>Custom Products for Wholesale Customer X</h2>
    @endwhile
  @php

    $userid = get_current_user_id();

    $userid_var = 'user_'.$userid;
    $customer_products = get_field('customer_special_products', $userid_var);

    $customer_products = implode(', ', $customer_products);

    var_dump($customer_products);

    wc_the_product_table( array( 
      // 'category' => 'wholesale',
      'rows_per_page' => 50,
      // 'variations' => true,
      'search_box' => false,
      'totals' => false,
      'filters' => false,
      'reset_button' => false,
      'pagination' => false,
      'show_footer' => false,
      'page_length' => false,
      'include' => $customer_products,
      'columns' => "image,name,price,buy"
    ) );
    @endphp

  <h3>Frequently ordered</h3>
  @php
  wc_the_product_table( array( 
    // 'category' => 'wholesale',
    'rows_per_page' => 50,
    // 'variations' => true,
    'search_box' => false,
    'totals' => false,
    'filters' => false,
    'reset_button' => false,
    'pagination' => false,
    'show_footer' => false,
    'page_length' => false,
    'user_products' => true,
    'columns' => "image,name,price,buy"
  ) );
  @endphp

<h3>The Whole Dang Shebang</h3>
@php
wc_the_product_table( array( 
  'rows_per_page' => 100,
  'lazy_load' => true,
  'variations' => false,
  'filters' => "categories, tags"
) );
@endphp
</section>
@endsection
