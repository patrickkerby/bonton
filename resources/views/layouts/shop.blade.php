<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>
    @php do_action('get_header') @endphp
    @include('partials.header')

    <div class="wrap container" role="document">
      @if (App\display_sidebar())
        <main class="main row justify-content-center">
          <div class="sidebar col-sm-3">
            @include('partials.sidebar')
          </div>
         <div class="content col-sm-9">          
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
  </body>
</html>
