{{--
  Template Name: Out-of-stock List
--}}

@extends('layouts.lists')
@section('content')

@php
  $post_id = get_the_ID();
  $date_selector_date = get_field('list_date');

    $query_args = array(
      'post_type' => array('product_variation','product'),
      'posts_per_page' => -1,
      'post_status' => 'publish',
      'meta_query' => array(
        array(
          'key' => '_stock_status',
          'value' => 'outofstock',
        ),   
      ), 
    );

    // $query = new WP_Query($query_args);
    $prodlist = get_posts( $query_args );

    print("<pre>".print_r($array_data,true)."</pre>");


@endphp

  <div class="container">
    <div class="row no-gutters">
      <table id="lists" class="display">
        <thead>
          <tr>
            <th>Product</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          @foreach($prodlist as $item)

          @php              
            $loop_count = $loop->count;
            $prod_id = $item->ID;
            $variation = wc_get_product($prod_id);
            $parent_prod_id = $variation->get_parent_id();
            $product = wc_get_product( $parent_prod_id );
            $variation_categories = wc_get_product_category_list($parent_prod_id);
            $product_categories = wc_get_product_category_list($prod_id);

            if ($product) {
            $status = $product->get_status();
            }

          @endphp
            @unless($status == 'draft')
              <tr>                
                <td>{!! $item->post_title !!}</td>
                <td>
                  @if ($product_categories)
                    {!! $product_categories !!}</td>
                  @else
                    {!! $variation_categories !!}</td>
                  @endif
              </tr>
            @endunless
          @endforeach
        </tbody>
      </table>
    </div>
    <h5>Total items: {{ $loop_count }}</h5>

  </div>

@endsection