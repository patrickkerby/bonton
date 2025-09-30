<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>
  @php if ( function_exists( 'gtm4wp_the_gtm_tag' ) ) { gtm4wp_the_gtm_tag(); } @endphp
    @php do_action('get_header') @endphp
      @if(isset($landing_page) && $landing_page == TRUE)
        @include('partials.header-landing')
      {{-- @elseif(is_page_template( 'views/faq.blade.php' ) && !$is_wholesale_user)
        @include('partials.header-faq') --}}
      @else
        @include('partials.header')
      @endif
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
    @php do_action('get_footer')@endphp
    @include('partials.footer')
    @php wp_footer() @endphp
    <a href="#" class="close-product" onclick="return false;">close</a>
  </body>

  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HTCXG3J87J"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HTCXG3J87J');
</script>
</html>
