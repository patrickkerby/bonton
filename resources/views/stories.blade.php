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
            @if($item['story_link'])
              <a href="{{ $item['story_link'] }}" class="button btn">{{ $item['story_link_button_label'] }}</a>
            @endif
            @if($item['modal'])
              <a href="#storyModal{{ $loop->iteration }}" class="button btn" data-toggle="modal" data-target="#storyModal{{ $loop->iteration }}">{{ $item['story_link_button_label'] }}</a>
            @endif            
          </div>
        </div>
      </div> 
      @if($item['modal'])
              <div class="modal fade" id="storyModal{{ $loop->iteration }}" tabindex="-1" role="dialog" aria-labelledby="storyModalLabel{{ $loop->iteration }}" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      {!! $item['modal'] !!}
                    </div>                        
                  </div>
                </div>
              </div> 
            @endif     
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
        @if ($call_to_actions)
          <div class="cta row justify-content-center">
          @foreach ($call_to_actions as $cta)

            <div class="col-sm-5">
              <a href="{{ $cta['call_to_action']['url'] }}">{{ $cta['call_to_action']['title'] }}</a>
            </div>
          @endforeach
          </div>
        @endif
      </div>
    </section>
  @endwhile
@endsection
