@if ($landing_page == TRUE)
     <div class="hero-slider row full-width no-gutters">
        <div class="col-sm-8">
          <div class="slider">
            <div id="carouselIndicators" class="carousel slide carousel-fade" data-ride="carousel" data-interval="6000">
              <ol class="carousel-indicators">
                @foreach ($background_image as $item)
                  <li data-target="#carouselIndicators" data-slide-to="{{ $loop->index }}" class="@if ($loop->first)active @endif"></li>
                @endforeach
              </ol>
             <div class="carousel-inner">
                @foreach ($background_image as $item)
                  <div class="carousel-item @if ($loop->first)active @endif">
                    @php
                      $image = $item->image->ID;
                      $size = 'large'; // (thumbnail, medium, large, full or custom size)
                      if( $image ) {
                          echo wp_get_attachment_image( $image, $size );
                      }
                    @endphp
                  </div>    
                @endforeach
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="page-header">
            <h1 class="hero-headline">{!! App::title() !!}</h1>
          </div>
          <h3>{!! $sub_title !!}</h3>
        </div>
      </div>
@endif
<article @php post_class() @endphp>
  <div class="entry-content">
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
  </div>
  <footer>
    {!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}
  </footer>
  @php comments_template('/partials/comments.blade.php') @endphp
</article>
