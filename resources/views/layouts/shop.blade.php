<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>
    @php do_action('get_header') @endphp
    @include('partials.header')

    <div class="wrap container-fluid" role="document">
      @if (App\display_sidebar())
        <main class="main row justify-content-center">
          <button class="navbar-toggler mobile-filter collapsed" type="button" data-toggle="collapse" data-target="#mobileFilter" aria-controls="mobile-filter" aria-expanded="false" aria-label="Toggle navigation">Filter Products</button>
          <div id="mobileFilter" class="sidebar sidebar-mobile collapse">
            <button class="navbar-toggler mobile-filter" type="button" data-toggle="collapse" data-target="#mobileFilter" aria-controls="mobile-filter" aria-expanded="false" aria-label="Toggle navigation">Close</button>
            @include('partials.sidebar')
          </div>  
          <div class="sidebar typetura d-none d-sm-block col-sm-4 col-lg-3">
            @include('partials.sidebar')
          </div>
          <div class="content col-sm-8 col-lg-9">
            @php dynamic_sidebar('sidebar-shop') @endphp
            @yield('content')
          </div>
        </main>
      @else
        <main class="main row">
          <div class="content col-sm-11">
            @yield('content')
          </div>
        </main>
      @endif
    </div>
    @php do_action('get_footer') @endphp
    @include('partials.footer')
    @php wp_footer() @endphp
    <a href="#" class="close-product" onclick="return false;">close</a>
  </body>
</html>
