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
        '<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
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
  <td></td>
  <td class="product-meta" data-title="{{ __( 'Product', 'woocommerce' ) }}">
    {{-- Meta data --}}
    {!! wc_get_formatted_cart_item_data( $cart_item ) !!}

    {{-- Backorder notification --}}
    @if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) )
      {!! wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) ) !!}
    @endif

    {{-- Day-of-week availability --}}
    @if (!$item['is_bundled'])
      @if (in_array('Everyday', $item['days_available_array']))
        <span class="availability"><strong>Availability: </strong> All week!</span>
      @else
        <span class="availability"><strong>Availability: </strong>{{ $item['days_available_string'] }}</span>
      @endif
    @endif

    @if($item['long_fermentation'])
      <span class="availability"><strong>*Note:</strong> Not available for next-day pickup</span>
    @endif

    @if($item['two_days_notice'])
      <span class="availability"><strong>*Note:</strong> This product requires two days notice</span>
    @endif

    @if($item['special_availability_msg'])
      {!! $item['special_availability_msg'] !!}
    @endif

    {!! $item['sold_out_msg'] !!}

    @if (!$item['is_bundled'] && $item['pickup_restriction_data'])
      {!! $item['restriction_msg'] !!}
    @endif

    @if($item['delivery_exclusion'])
      <span class="availability"><br><strong>**</strong> Not available for delivery</span>
    @endif
  </td>

  <td class="product-price" data-title="{{ __( 'Price', 'woocommerce' ) }}">
    {!! apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ) !!}
  </td>

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

  <td class="product-subtotal" data-title="{{ __( 'Subtotal', 'woocommerce' ) }}">
    {!! apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ) !!}
  </td>
</tr>

@if($item['availability_msg'] || $item['sold_out_conflict'] === 'sold_out_conflict')
  <tr class="not-available">
    <td></td>
    <td colspan="5">{!! $item['availability_msg'] !!}</td>
  </tr>
@endif
