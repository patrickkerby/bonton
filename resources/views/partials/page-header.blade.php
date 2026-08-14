{{-- @if(isset($use_custom_header)) --}}
@isset($use_custom_header)
  @if ($use_custom_header == FALSE)
    <div class="page-header">
      @if(is_cart())
        {{--
          Never history.back(): after add-to-cart the previous history entry is often the
          POST itself. Confirming Chrome's resubmit warning replays add-to-cart and
          increments qty. Shop is a GET and matches "browse some more."
        --}}
        <a href="{{ esc_url( wc_get_page_permalink('shop') ?: home_url('/') ) }}" class="back-link d-block d-md-none">Back</a>
      @endif
      <h1 class="hero-headline">{!! App::title() !!}</h1>
    </div>
  @endif
  @endisset
{{-- @endif --}}

