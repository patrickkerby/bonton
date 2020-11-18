
<div class="landing-topbar">
  <a href="https://bonton.ca"><span class="arrow-left"></span>www.bonton.ca</a>
</div>
@code
    <div class="landing">
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
    </div> 


