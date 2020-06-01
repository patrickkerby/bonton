<!doctype html>
<html {!! get_language_attributes() !!}>
  @php acf_form_head(); @endphp
  @include('partials.head-list')
<body @php body_class() @endphp>

@php do_action('get_header') @endphp
      @include('partials.header-list')
    <div class="wrap container-fluid" role="document">
      <div class="content">
        @if ( is_front_page() )
          <main class="main">
            @yield('content')
          </main>
        @else
          <main class="main justify-content-center">
            @yield('content')
          </main>        
        @endif
      </div>
    </div>
    @php do_action('get_footer') @endphp
    @php wp_footer() @endphp
  </body>
</html>
