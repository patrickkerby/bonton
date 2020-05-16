<footer class="container-fluid">
  <div class="row">
    <div class="col-sm-4">
      <div class="hours">
        <ul>
        @foreach ($acf_options->hours_of_operation as $item)
          <li>{{ $item->title }}: <span class="details">{{ $item->details }}</span></li>
        @endforeach
        </ul>
      </div>
      <span class="phone">{{ $acf_options->phone }}</span>
      <address>{{ $acf_options->address }}</address>
    </div>
    <div class="col-sm-4">
      <img src="@asset('images/bonton-logo-no-border.svg')" />
    </div>
    <div class="col-sm-4">
      <nav class="nav-footer">
        @if (has_nav_menu('footer_navigation'))
          {!! wp_nav_menu(['theme_location' => 'footer_navigation', 'menu_class' => 'footer-nav']) !!}
        @endif
      </nav>
      @php dynamic_sidebar('sidebar-footer') @endphp

    </div>
  </div>
</footer>