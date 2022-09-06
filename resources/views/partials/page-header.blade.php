{{-- @if(isset($use_custom_header)) --}}
@isset($use_custom_header)
  @if ($use_custom_header == FALSE)
    <div class="page-header">
      <h1 class="hero-headline">{!! App::title() !!}</h1>
    </div>
  @endif
  @endisset
{{-- @endif --}}

