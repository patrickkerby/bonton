@php 
  $images = get_sub_field('photos');
@endphp

@if( $images )
  <section class="row gallery no-gutters">
    @foreach ($images as $item)
      <div class="col-sm">
        <a href="{!! $item['url'] !!}" class="slick">
          <img src="{{ $item['sizes']['medium'] }}" alt="{{ $item['alt'] }}" />
        </a>
      </div>
    @endforeach
  </section>
@endif