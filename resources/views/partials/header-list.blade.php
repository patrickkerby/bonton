@php
  $get_today = new DateTime('today');
  $today = $get_today->format('l, F j, Y');
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
      @elseif(is_page('inventory'))
        <h1>Inventory List</h1>
      @elseif(is_page('out-of-stock'))
        <h1>Out of Stock</h1>
        <h5>{{ $today }}</h5>
      @elseif(is_page('grocery-list'))
        <h1>Grocery Inventory</h1>
        <h5>{{ $today }}</h5>
      @endif
      
      @if(is_page('inventory'))
        @if (isset($date1_cal))
          <p>
            {{ $date1_cal }} to {{ $date2_cal }}
          </p>
        @else
          <p>Please select a date range.</p>
        @endif
          <h5><button class="btn d-print-none" type="button" data-toggle="collapse" data-target="#dateSelect" aria-expanded="false" aria-controls="collapseExample">
            Edit
          </button></h5>
      @elseif(is_page('out-of-stock') || is_page('grocery-list'))
          {{-- Display no date picker --}}
      @else
      <h5>        
          {{ $date_selector_date }} 
        
        <button class="btn d-print-none" type="button" data-toggle="collapse" data-target="#dateSelect" aria-expanded="false" aria-controls="collapseExample">
          Edit
        </button>
      </h5>
      @endif
      <div class="collapse" id="dateSelect">
        <div class="card card-body">
          <a class="" type="button" data-toggle="collapse" data-target="#dateSelect" aria-expanded="true" aria-controls="collapseExample">Close</a>
          @if(is_page('inventory'))
            <form method="post" class="acf-form">                  
              <label for="from">From</label>
              <input type="text" id="from" name="from" autocomplete="off">              
              <label for="to">to</label>
              <input type="text" id="to" name="to"  autocomplete="off">
              <input type="submit" class="acf-button button button-primary button-large" value="Set">
            </form>          
          @else
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
          @endif
        </div>
      </div>
    </div>
    <div class="col-sm-7 d-print-none">
      <ul class="nav nav-tabs d-print-none">
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('baking')) active @endif d-print-none" href="/lists/baking">Baking</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('inventory')) active @endif d-print-none" href="/lists/inventory">Inventory</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('grocery-inventory')) active @endif d-print-none" href="/lists/grocery-inventory">Groceries</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('out-of-stock')) active @endif d-print-none" href="/lists/out-of-stock">Out of Stock</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('packing-cooler')) active @endif d-print-none" href="/lists/packing-cooler">Packing (Cooler)</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('packing-shelf')) active @endif d-print-none" href="/lists/packing-shelf">Packing (Shelf)</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('pickup')) active @endif d-print-none" href="/lists/pickup">Pickup</a>
        </li>
      </ul>
    </div>
  </div>
</header>