@php 
  $hero = get_field('background_image');
  $overlay = get_field('overlay');	
  $sub_title = get_field('sub_title');
@endphp

<header class="banner">
  <div class="container">
    <nav class="nav-primary">
      {{-- @if (has_nav_menu('list_navigation'))
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      @endif --}}
    </nav>
  </div>
</header>
  <header class="hero" style="background-image: linear-gradient(rgba(45,51,55,0.{{ $overlay }}), rgba(45,51,55,0.{{ $overlay }})), url('{{ $hero }}');">
  </header>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link @if(is_page('baking')) active @endif" href="/baking">Baking</a>
    </li>
    <li class="nav-item">
      <a class="nav-link @if(is_page('packing-cooler')) active @endif" href="/packing-cooler">Packing (Cooler)</a>
    </li>
    <li class="nav-item">
      <a class="nav-link @if(is_page('packing-shelf')) active @endif" href="/packing-shelf">Packing (Shelf)</a>
    </li>
    <li class="nav-item">
      <a class="nav-link @if(is_page('pickup')) active @endif" href="/pickup">Pickup</a>
    </li>
  </ul>
  