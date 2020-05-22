@php
  $image = get_sub_field('full_width_photo');
  $size = 'large'; // (thumbnail, medium, large, full or custom size)

  if( $image ) {
      echo wp_get_attachment_image( $image, $size );
  }
@endphp

<section class="row no-gutters full-width-photo">
  <div class="col-12">
    <img src="{{ $image }}" />
  </div>
</section>