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

    // print("<pre>".print_r($prodlist,true)."</pre>");


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
            $product = wc_get_product($prod_id);
            $product_name = $product->get_name();
            $product_title = $product->get_title();
            $product_categories = wc_get_product_category_list($prod_id);
            $stock_status = $product->get_stock_status();

            $has_children = $product->get_children();

            if($product) {
              $status = $product->get_status();
            }

            if($item->post_type == "product_variation") {
              $variation_attributes = $product->get_attributes();
              $parent_prod_id = $product->get_parent_id();
              $variation_parent = wc_get_product($parent_prod_id);  
              $variation_categories = wc_get_product_category_list($parent_prod_id);    
              $status = $variation_parent->get_status();
              $parent_stock_status = $variation_parent->get_stock_status();
            }
            else {
              $variation_attributes = "";
              $parent_prod_id = "";
              $variation_parent = "";
              $variation_categories = "";
              $parent_stock_status = "";
            }

            if($has_children && $stock_status == 'outofstock') {
                $all_variations_oos_message = "All variations are out of stock.";
              }
            else {
              $all_variations_oos_message = "";
            }

            
                        
          @endphp
            @unless($status == 'draft' || $parent_stock_status == 'outofstock')
              <tr>                                
                <td>                  
                  <strong>{{ $product_title }}</strong>
                <br>
                  @if($item->post_type == "product_variation")
                    {!! $item->post_excerpt !!}<br>
                  @endif
                  {{ $all_variations_oos_message }}

                  {{-- @dump($item) --}}
                
                </td>
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

  </div>

@endsection