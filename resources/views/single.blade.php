@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp

  {!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}

  @include('partials.content-single-'.get_post_type())

  @endwhile
@endsection
