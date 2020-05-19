<footer class="container-fluid">
  <div class="row">
    <div class="col-sm-6 col-md-4 order-first">
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
    <div class="col-md-4 order-last order-md-2">
      <img src="@asset('images/bonton-logo-no-border.svg')" />
    </div>
    <div class="d-none d-sm-flex col-sm-6 col-md-4 order-md-last">
      <nav class="nav-footer">
        @if (has_nav_menu('footer_navigation'))
          {!! wp_nav_menu(['theme_location' => 'footer_navigation', 'menu_class' => 'footer-nav']) !!}
        @endif
      </nav>
    </div>
  </div>
</footer>
<div class="copyright">
  <p>Copyright © Bon Ton Bakery @php echo date("Y"); @endphp</p>
</div>