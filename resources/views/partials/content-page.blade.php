@php the_content() @endphp
@php
  // This loop requires a /partials template that is named exactly the same as the layout title in ACF flexible content page builder
  $id = get_the_ID();
  if ( have_rows( 'story_builder', $id ) ) :
    // loop through the selected ACF layouts and display the matching partial
    while ( have_rows( 'story_builder', $id ) ) : the_row();
      $layout = get_row_layout();
@endphp
      @include( "partials.{$layout}")
@php
    endwhile;
  elseif ( get_the_content() ) :
  endif;
@endphp
{!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}


