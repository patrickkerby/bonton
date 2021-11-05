{{--
  Template Name: FAQ
--}}

@extends('layouts.app')
@section('content')
<section>
  @while(have_posts()) @php the_post() @endphp
    @include('partials.content-page')

    @php

      $faq = get_field('faq');

      $faq_categories = get_terms( array(
        'taxonomy' => 'faq_categories',
        'hide_empty' => true,
      ) );   



    @endphp

    <div class="row justify-content-around faq-categories">    
      @foreach ($faq_categories as $faq_category)
        <div class="col">
          <a href="#{{ $faq_category->term_id }}">{{ $faq_category->name }}</a>          
        </div>
      @endforeach             
    </div>
    <div class="row justify-content-center">      
      <div class="col-md-8 faq">
    
        @if( $faq )        
          <div id="accordion1" class="accordion">
            @foreach ($faq_categories as $faq_category_single)
              @php
                $selected_category = $faq_category_single->term_id;
              @endphp

            <div id="{{ $selected_category }}">
              <h2>{{ $faq_category_single->name }}</h2>

              @php $count = 0; @endphp
              @foreach( $faq as $faq_row )
                @php
                  $faq_title = $faq_row['faq_title'];
                  $faq_content = $faq_row['faq_content'];
                  $faq_category_selected = $faq_row['faq_category']->name;
                  $faq_category_id = $faq_row['faq_category']->term_id;
                @endphp

                @if($faq_category_id == $selected_category)
                  @php
                      $faq_id = $count . '-' . $faq_category_id;
                  @endphp  

                  <a href="#" class="faq" data-toggle="collapse" data-target="#collapse-{{ $faq_id }}" aria-expanded="false" aria-controls="collapse-{{ $faq_id }}">{{ $faq_title }} </a>
                  <div id="collapse-{{ $faq_id }}" class="collapse" aria-labelledby="heading{{ $faq_id }}" data-parent="#accordion1">
                      {!! $faq_content !!}
                  </div>
                  <hr>

                  @php
                    $count++; 
                  @endphp

                @endif

                
              @endforeach
            @endforeach
          </div>
          </div>          
        @endif
      </div>
      
    </div>

  @endwhile
</section>
@endsection
