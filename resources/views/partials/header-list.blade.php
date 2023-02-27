@php
  $get_today = new DateTime('today');
  $today = $get_today->format('l, F j, Y');
@endphp
<header class="mobile-banner">    
  <button class="navbar-toggler hamburger hamburger--arrow" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent1">
    
    <nav class="nav-mobile">
      <ul class="d-print-none">    
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('pickup')) active @endif d-print-none" href="/lists/pickup">Pickup</a>
        </li>    
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('packing-shelf')) active @endif d-print-none" href="/lists/packing-shelf">Packing: Shelf</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('packing-cooler')) active @endif d-print-none" href="/lists/packing-cooler">Packing: Cooler</a>  
        </li>
      </ul>
      <hr>
      <ul>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('baking')) active @endif d-print-none" href="/lists/baking">Baking</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('inventory')) active @endif d-print-none" href="/lists/inventory">Inventory</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('grocery-inventory')) active @endif d-print-none" href="/lists/grocery-list">Groceries</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('out-of-stock')) active @endif d-print-none" href="/lists/out-of-stock">Out of Stock</a>
        </li>
      </ul>
      <hr>
      <ul>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('bread-club-schedule')) active @endif d-print-none" href="/lists/bread-club-schedule">Bread Club Schedule</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('bread-club-list')) active @endif d-print-none" href="/lists/bread-club-list">Bread Club Packing List</a>
        </li>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('delivery')) active @endif d-print-none" href="/lists/storetodoor">Delivery Export</a>
        </li>
      </ul>  
      <hr>
      <ul>
        <li class="nav-item d-print-none">
          <a class="nav-link @if(is_page('wholesale-pickup')) active @endif d-print-none" href="/lists/wholesale-pickup">Wholesale Pickup</a>
          <a class="nav-link @if(is_page('wholesale-packing-shelf')) active @endif d-print-none" href="/lists/wholesale-packing-shelf">Wholesale Packing (Shelf)</a>
          <a class="nav-link @if(is_page('wholesale-packing-cooler')) active @endif d-print-none" href="/lists/wholesale-packing-cooler">Wholesale Packing (Cooler)</a>
        </li>
      </ul>   
    </nav>
</header>
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
      @elseif(is_page('bread-club-list'))
        <h1>Bread Club List</h1>
        <h5>{{ $today }}</h5>
      @elseif(is_page('bread-club-schedule'))
        <h1>Bread Club Schedule</h1>
        <h5>{{ $today }}</h5> 
      @elseif(is_page('delivery'))
        <h1>Delivery Export</h1>
      @elseif(is_page('wholesale-pickup'))
        <h1>Wholesale Pickup</h1>
      @elseif(is_page('wholesale-packing-shelf'))
        <h1>Wholesale Packing (Shelf)</h1>
      @elseif(is_page('wholesale-packing-cooler'))
        <h1>Wholesale Packing (Cooler)</h1>
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
      @elseif(is_page('out-of-stock') || is_page('grocery-list') || is_page('bread-club-list') || is_page('bread-club-schedule'))
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
      
    </div>

    
  </div>
</header>