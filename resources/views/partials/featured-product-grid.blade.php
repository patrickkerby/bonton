{{--
  Featured Product Grid
  Displays a grid of product cards with title, thumbnail, and display category.
  Clicking a card opens the Quick View popover.

  @param  \WP_Post[]  $products  Array of WP_Post product objects.
--}}
@if ($products && count($products))
  <div class="featured-product-grid">
    @foreach ($products as $product_item)
      <div class="card">
        <a class="inside-thumb quick-view-button manual" data-product_id="{{ $product_item->ID }}" href="#">
          @php
            $thumb = get_post_thumbnail_id($product_item->ID);
          @endphp
          @if ($thumb)
              {!! wp_get_attachment_image($thumb, 'medium', false, ['class' => 'card-img']) !!}
          @endif
          <div class="card-body">
            <h3>{!! $product_item->post_title !!}</h3>
            @php $category_to_show = App\get_product_display_category($product_item->ID); @endphp
            @if ($category_to_show)
              <h4 class="product-category">{!! $category_to_show !!}</h4>
            @endif
          </div>
        </a>
      </div>
    @endforeach
  </div>
@endif
