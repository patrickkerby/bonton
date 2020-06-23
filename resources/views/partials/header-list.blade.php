@php 

  $hero = get_field('background_image');
  $overlay = get_field('overlay');	
  $sub_title = get_field('sub_title');

@endphp

<header class="container-fluid lists-header">
  <div class="row justify-content-center">
    <div class="col-sm-5">
      @if(is_page('baking'))
        <h1>Baking List</h1>
      @elseif(is_page('packing-cooler'))
        <h1>Cooler List</h1>
      @elseif(is_page('packing-shelf'))
      <h1>Shelf List</h1>
      @elseif(is_page('pickup'))
      <h1>Pick-up List</h1>
      @endif
      <h5>
        {{ $date_selector_date }} 
        <button class="btn .d-print-none" type="button" data-toggle="collapse" data-target="#dateSelect" aria-expanded="false" aria-controls="collapseExample">
          Edit
        </button>
      </h5>
      <div class="collapse" id="dateSelect">
        <div class="card card-body">
          <a class="" type="button" data-toggle="collapse" data-target="#dateSelect" aria-expanded="true" aria-controls="collapseExample">Close</a>
          @php
          acf_form(array(
            'submit_value' => __('Choose Date', ''),
            'fields' => array(
                'list_date',
            ),
            'return' => '%post_url%',
            'updated_message' => false,
          ));
          @endphp
        </div>
      </div>
    </div>
    <div class="col-sm-7 .d-print-none">
      <ul class="nav nav-tabs .d-print-none">
        <li class="nav-item .d-print-none">
          <a class="nav-link @if(is_page('baking')) active @endif .d-print-none" href="/lists/baking">Baking</a>
        </li>
        <li class="nav-item .d-print-none">
          <a class="nav-link @if(is_page('packing-cooler')) active @endif .d-print-none" href="/lists/packing-cooler">Packing (Cooler)</a>
        </li>
        <li class="nav-item .d-print-none">
          <a class="nav-link @if(is_page('packing-shelf')) active @endif .d-print-none" href="/lists/packing-shelf">Packing (Shelf)</a>
        </li>
        <li class="nav-item .d-print-none">
          <a class="nav-link @if(is_page('pickup')) active @endif .d-print-none" href="/lists/pickup">Pickup</a>
        </li>
      </ul>
    </div>
  </div>
</header>