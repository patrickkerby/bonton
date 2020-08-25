<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>
  <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WFXR55C"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  
    @php do_action('get_header') @endphp
      @include('partials.header')

    <div class="wrap {{ $container }}" role="document">
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
    @include('partials.footer')
    @php wp_footer() @endphp
    <a href="#" class="close-product" onclick="return false;">close</a>
  </body>
</html>
