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
          <div class="excerpt">
            <h3>{{ $item['title'] }}</h3>
            {!! $item['story_excerpt'] !!}
            <a href="{{ $item['story_link'] }}" class="button btn">{{ $item['story_link_button_label'] }}</a>
          </div>
        </div>
      </div>        
    @endforeach
    
    <section class="processes">
      <div class="container">
        @foreach ($our_process as $item)
          <div class="process row no-gutters justify-content-center">
            <h3 class="col-10 col-sm-9">{{ $item['title'] }}</h3>
            @if($item['image'])
              <div class="col-sm-4">
                {{ $item['image'] }}
              </div>
              <div class="col-sm-6">
                {!! $item['content'] !!}
              </div>
            @else
              <div class="col-11 text-only">
                {!! $item['content'] !!}
              </div>
            @endif
          </div>
        @endforeach
      </div>
    </section>
  @endwhile
@endsection
