{{--
  Template Name: Process + Stories
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp
    <section class="row justify-content-center intro">
      <div class="col-sm-8">
        {!! $intro !!}
      </div>
    </section>
    @foreach ($stories as $item)
      <div class="story row no-gutters">
        <div class="col-sm-5">
          @php
            $image = $item['image'];
            $size = 'large'; // (thumbnail, medium, large, full or custom size)
            if( $image ) {
                echo wp_get_attachment_image( $image, $size );
            }
          @endphp
        </div>
        <div class="col-sm-7">
          <h3>{{ $item['title'] }}</h3>
          <div class="excerpt">
            {!! $item['story_excerpt'] !!}
            <a href="{{ $item['story_link'] }}" class="button btn">Read our {{ $item['title'] }} Story</a>
          </div>
        </div>
      </div>        
    @endforeach
  @endwhile
@endsection
