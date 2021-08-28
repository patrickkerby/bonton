{{--
  Template Name: Grocery List
--}}

@extends('layouts.lists')
@section('content')

@php
  $post_id = get_the_ID();
  $category_names = array();
  $category_ids = array();

    $all_ids = get_posts( array(
      'post_type' => array('product'),
      'numberposts' => -1,
      'post_status' => 'publish',
      'fields' => 'ids',
      'tax_query' => array(
         array(
            'taxonomy' => 'product_cat',
            'field' => 'id',
            'terms' => '94',
            'operator' => 'IN',
         )
      ),
   ) );

@endphp

  <div class="container">
    <div class="row no-gutters">
      <div class="col-sm-12">    
        <table id="lists" class="display">
          <thead>
            <tr>
              <th>Product</th>
              <th>Variation</th>
              <th>Categories</th>
              <th>Stock Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            @foreach ( $all_ids as $prod_id )
              @php              
                $product = wc_get_product($prod_id);        
                $product_name = $product->get_name();
                $productStock = $product->get_stock_status();

                $variation_ids = $product->get_children();
                $cats_array = wp_get_post_terms( $prod_id, 'product_cat', array("fields" => "names") );

                $exclude = array('Grocery','picnic','date night','charcuterie','gift ideas');

                $filtered_cats = array_diff($cats_array, $exclude);

                $categories = implode(', ', $filtered_cats);                            
              @endphp              
            
            @if(!$variation_ids)
              <tr>
                <td><strong>{{ $product_name }}</strong></td>
                <td>{{ $product_name }}</td>
                <td class="categories">{!! $categories !!}</td>
                <td><span class="stock {{ $productStock }}">{{ $productStock }}</span></td>
                <td class="notes"><span>Notes</span></td>
                @endif
              </tr>
              @if($variation_ids)
                @foreach ($variation_ids as $variation_id)
                  <tr>
                    @php
                      $variation = new WC_Product_Variation($variation_id);
                      $variationName = $variation->get_name(); 
                      $variationStock = $variation->get_stock_status();                             
                    @endphp
                    <td><strong>{!! $product_name !!}</strong></td>
                    <td>{!! $variationName !!}</td>
                    <td class="categories">{!! $categories !!}</td>
                    <td><span class="stock {{ $variationStock }}">{{ $variationStock }}</span></td>
                    <td class="notes"><span>Notes</span></td>
                  </tr>
                @endforeach
              @endif            
            @endforeach
          </tbody>
        </table>     
      </div>
    </div>
  </div>
@endsection