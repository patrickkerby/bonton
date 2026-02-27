{{-- Cart Item Row Partial --}}
@php
  $_product = $item['product'];
  $cart_item = $item['cart_item'];
  $cart_item_key = $item['cart_item_key'];
  $product_id = $item['product_id'];
  $product_permalink = $item['product_permalink'];
@endphp

<tr class="{{ $item['availability_status'] }} title woocommerce-cart-form__cart-item {{ esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ) }}">
  <td class="product-remove">
    {!! apply_filters(
      'woocommerce_cart_item_remove_link',
      sprintf(
        '<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s"><i class="fas fa-regular fa-trash-alt" aria-hidden="true"></i></a>',
        esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
        esc_html__( 'Remove this item', 'woocommerce' ),
        esc_attr( $product_id ),
        esc_attr( $_product->get_sku() )
      ),
      $cart_item_key
    ) !!}
  </td>
  <td class="product-name" colspan="4" data-title="{{ __( 'Product', 'woocommerce' ) }}">
    @if ( ! $product_permalink )
      {!! wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key ) . '&nbsp;' ) !!}
    @else
      {!! wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $_product->get_name() ), $cart_item, $cart_item_key ) ) !!}
    @endif
    @php do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key ) @endphp
  </td>
</tr>

<tr class="{{ $item['availability_status'] }} woocommerce-cart-form__cart-item {{ esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ) }}">
  <td class="d-none d-sm-block"></td>
  <td class="product-meta" data-title="{{ __( 'Product', 'woocommerce' ) }}">
 
    {{-- Day-of-week availability badges --}}
    @if (!$item['is_bundled'] && !empty($item['days_available_array']))
      @php
        $all_days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        $letters  = ['S','M','T','W','T','F','S'];
        $is_everyday = in_array('Everyday', $item['days_available_array']);
        $everyday_days = ['Tuesday','Wednesday','Thursday','Friday','Saturday'];
      @endphp
      <span class="day-badges" title="{{ $is_everyday ? 'All week!' : $item['days_available_string'] }}">
        @foreach ($all_days as $i => $day)
          <span class="day-badge {{ ($is_everyday && in_array($day, $everyday_days)) || in_array($day, $item['days_available_array']) ? 'active' : '' }}">{{ $letters[$i] }}</span>
        @endforeach
      </span>
    @endif

    @if($item['bulk_eligible'])
      <span class="bulk-label"><i class="fa fa-dollar-sign" aria-hidden="true"></i> Bulk discount eligible</span>
    @endif
    
    @if($item['long_fermentation'] || $item['two_days_notice'] || $item['sold_out_msg'] || $item['special_availability_msg'] || $item['delivery_exclusion'])
      <div class="special-notes-container">
        {{-- Meta data --}}
        {!! wc_get_formatted_cart_item_data( $cart_item ) !!}

        {{-- Backorder notification --}}
        @if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) )
          {!! wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) ) !!}
        @endif

        @if($item['long_fermentation'] || $item['two_days_notice'])
          <span class="availability"><span class="availability-icon"><i class="fa-regular fa-clock"></i></span> 2 days notice req.</span>
        @endif
        
        {!! $item['sold_out_msg'] !!}

        @if($item['special_availability_msg'])
          {!! $item['special_availability_msg'] !!}
        @endif
        
        @if($item['delivery_exclusion'])
        <span class="availability"><br><strong>**</strong> Not available for delivery</span>
        @endif
      </div>
    @endif
  </td>

  {{-- <td class="product-price" data-title="{{ __( 'Price', 'woocommerce' ) }}">
    {!! apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ) !!}
  </td> --}}

  <td class="product-quantity" data-title="{{ __( 'Quantity', 'woocommerce' ) }}">
    @if ( $_product->is_sold_individually() )
      {!! sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key ) !!}
    @else
      @php
        $product_quantity = woocommerce_quantity_input([
          'input_name'   => "cart[{$cart_item_key}][qty]",
          'input_value'  => $cart_item['quantity'],
          'max_value'    => $_product->get_max_purchase_quantity(),
          'min_value'    => '0',
          'product_name' => $_product->get_name(),
        ], $_product, false);
      @endphp
      {!! apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ) !!}
    @endif
  </td>

  <td class="product-subtotal{{ $item['bulk_discount_amount'] > 0 ? ' product-subtotal--discounted' : '' }}" data-title="{{ __( 'Subtotal', 'woocommerce' ) }}">
    @if($item['bulk_discount_amount'] > 0)
      @php
        $original_subtotal = $_product->get_price() * $cart_item['quantity'];
        $discounted_subtotal = $original_subtotal - $item['bulk_discount_amount'];
      @endphp
      <del>{!! wc_price( $original_subtotal ) !!}</del>
      <ins>{!! wc_price( $discounted_subtotal ) !!}</ins>
    @else
      {!! apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ) !!}
    @endif
  </td>
</tr>

@if (!$item['is_bundled'] && $item['pickup_restriction_data'])
  <tr>
    <td colspan="5">{!! $item['restriction_msg'] !!}</td>
  </tr>
@endif

@if($item['availability_msg'] || $item['sold_out_conflict'] === 'sold_out_conflict')
  <tr class="not-available">
    <td colspan="5">{!! $item['availability_msg'] !!}</td>
  </tr>
@endif
