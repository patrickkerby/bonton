@php
  $content = get_sub_field('content');
@endphp

<section class="row content-row justify-content-center">
  <div class="col-9 col-sm-8">
   {!! $content !!}
  </div>
</section>