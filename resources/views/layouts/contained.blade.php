<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>
    @php if ( function_exists( 'gtm4wp_the_gtm_tag' ) ) { gtm4wp_the_gtm_tag(); } @endphp
    @php do_action('get_header') @endphp
    @if(isset($landing_page) && $landing_page == TRUE)
      @include('partials.header-landing')
    @else
      @include('partials.header')
    @endif

    <div class="wrap container" role="document">
      <main class="main row justify-content-center">
        <div class="col-sm-12">
          @yield('content')
        </div>
      </main>
    </div>
    @php do_action('get_footer') @endphp
    @include('partials.footer')
    @php wp_footer() @endphp
    <a href="#" class="close-product" onclick="return false;">close</a>
  </body>
</html>
