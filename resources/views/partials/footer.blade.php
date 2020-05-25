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

{{-- Global Modals --}}
<div class="modal fade" id="schedule" tabindex="-1" role="dialog" aria-labelledby="bontonBreadSchedule" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="{{ $acf_options->schedule_chart }}" alt="Bon Ton Bakery Bread Schedule" />
      </div>
    </div>
  </div>
</div>