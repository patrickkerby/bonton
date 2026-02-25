{{-- @if(isset($use_custom_header)) --}}
@isset($use_custom_header)
  @if ($use_custom_header == FALSE)
    <div class="page-header">
      @if(is_cart())
        <a href="#" class="back-link" onclick="history.back(); return false;">Back</a>
      @endif
      <h1 class="hero-headline">{!! App::title() !!}</h1>
    </div>
  @endif
  @endisset
{{-- @endif --}}

