<footer class="container-fluid">
  <div class="row">
    <div class="col-sm4">
      <div class="hours">
        @foreach ($acf_options->hours_of_operation as $item)
          <li>{{ $item->title }}: <span class="details">{{ $item->details }}</span></li>
        @endforeach
      </div>
      <span class="phone">{{ $acf_options->phone }}</span>
      <address>{{ $acf_options->address }}</address>
    </div>
    <div class="col-sm-4">
      <img src="@asset('images/bonton-logo-no-border.svg')" />
    </div>
    <div class="col-sm-4">
      @php dynamic_sidebar('sidebar-footer') @endphp
    </div>
  </div>
</footer>