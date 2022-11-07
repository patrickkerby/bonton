{{--
  Template Name: Wholesale
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
      <div class="col-sm-8">
        <h4>Hi {{ $current_user->display_name }}!</h4>
        <p>Thanks for being one of our valued wholesale partners. Set quantities below for any products you're in need of, then continue to your cart in order to select a pickup or delivery day.</p>
        <p>Please remember that products are only available on certain days of the week. You will have an opportunity in the cart to ensure availability.</p>
        <p>Thanks!</p>

        @include('partials.content-page')

      </div>
      <div class="col-sm-10">
        @php
          $userid = get_current_user_id();

          $userid_var = 'user_'.$userid;
          $customer_products = get_field('customer_special_products', $userid_var);

        @endphp

        @if($customer_products)
          <h3>Custom products</h3>
          @php
          $customer_products = implode(', ', $customer_products);

          wc_the_product_table( array( 
            // 'category' => 'wholesale',
            'rows_per_page' => 50,
            'variations' => true,
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
        @else
          <hr>
          <h4>Custom Products</h4>
          <p>We don't have any products that we've created custom for you. In need of something unique? Give us a call!</p>
        @endif

        @if(is_user_logged_in())
        <h3>Frequently ordered</h3>

        @php
          wc_the_product_table( array( 
            // 'category' => 'wholesale',
            'rows_per_page' => 50,
            'variations' => 'separate',
            'search_box' => false,
            'totals' => false,
            'filters' => false,
            'reset_button' => false,
            'pagination' => false,
            'show_footer' => false,
            'page_length' => false,
            'user_products' => true,
            'columns' => "image,name,price,buy",
            'cache' => false
          ) );        
        @endphp
      @endif
      <p><a href="https://bonton.ca/my-account/orders/" target="_blank">Visit this page for a complete list of your Order History</a></p>

        <h3>The Whole Dang Shebang</h3>
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
