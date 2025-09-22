{{--
  Template Name: Bread Club Schedule
--}}

@extends('layouts.lists')

@php  


function getDatesInRange($dateFromString, $dateToString, $dayOfWeek)
{
  $dateFrom = new \DateTime($dateFromString);
  $dateTo = new \DateTime($dateToString);
  $dates = [];

  if ($dateFrom > $dateTo) {
      return $dates;
  }

  if (1 != $dateFrom->format('N')) {
      $dateFrom->modify($dayOfWeek);
  }

  while ($dateFrom <= $dateTo) {
      $dates[] = $dateFrom->format('M, d');
      $dateFrom->modify('+1 week');
  }

  return $dates;
}

  global $wpdb;
  $daily_order_number = 900;
  $date_selector_date = '';
  $pickup_day_list = array("Tuesday", "Thursday");

  $product_id = 18200; //TODO: have this set via ACF incase the product ever changes, or to build new programs.

  //Get all orders that contain specific product - HPOS OPTIMIZED
  // Check cache first to prevent repeated expensive queries
  $cache_key = "breadclub_schedule_orders_hpos_" . $product_id;
  $results = wp_cache_get($cache_key);
  
  if (false === $results) {
    // Use HPOS-compatible wc_get_orders() to find orders with breadclub product
    $all_orders = wc_get_orders([
      'limit' => 1000,
      'status' => ['processing', 'completed'],
      'orderby' => 'date',
      'order' => 'DESC'
    ]);
    
    $breadclub_order_ids = [];
    foreach ($all_orders as $order) {
      foreach ($order->get_items() as $item) {
        if ($item->get_product_id() == $product_id) {
          $breadclub_order_ids[] = $order->get_id();
          break; // Found the product, move to next order
        }
      }
    }
    
    $results = $breadclub_order_ids;
    
    // Cache for 2 minutes to balance performance with real-time order updates
    wp_cache_set($cache_key, $results, '', 120);
  }

  // Check schedule to see if program is current. Find current date and see which week lines up.
  date_default_timezone_set('MST');
  $program_loop = get_field('program_scheduler', 'option');
  //TODO: compare against current date to show appropriate week.

  

@endphp	

@section('content')

  <div class="row no-gutters justify-content-center">
    <div class="col-10">
      @if($program_loop)
        @foreach ($program_loop as $program)
          @php
            $program_title = $program['program_title'];
            $start_date = $program['start_date'];
            $startDateString = new \DateTime($start_date);
            $dayOfWeek = $startDateString->format('l');

            $end_date = $program['end_date'];
            $bc_program_products = $program['bc_program_products'];
            
            $weeks_schedule = getDatesInRange($start_date, $end_date, $dayOfWeek);
          @endphp

          <h3>{{ $program['program_title'] }}</h3>
          <strong>{{ $program['start_date'] }} - {{ $program['end_date'] }}</strong><br>
          <br>
          @if ($bc_program_products)
            <table id="lists-{{ $dayOfWeek }}">
              <thead>
                <tr>
                  <th>Week</th>
                @foreach ( $program['size_titles'] as $size )
                  <th>
                    {{ $size['size_title'] }}
                  </th>
                @endforeach
                <th>Addons:</th>
                </tr>
              </thead>
              @foreach ( $bc_program_products as $program_products )

            <tr>
              @php
                $products_size_1 = $program_products['products_size_1'];
                $products_size_2 = $program_products['products_size_2'];
                $products_size_3 = $program_products['products_size_3'];
                $products_size_4 = $program_products['products_size_4'];
                $addons = $program_products['addons'];
              @endphp        
              <th>
                <h4>{{ $loop->iteration }}</h4>
                <span class="date">{{ $weeks_schedule[$loop->index] }}</span>
              </th>
              @foreach ( $program['size_titles'] as $size )
              <td>
                <ul>
                  @if($loop->iteration == 1)
                    @if($products_size_1)
                      @foreach ($products_size_1 as $item1 )
                        <li>{!! $item1->post_title !!}</li>
                      @endforeach
                    @endif

                  @elseif($loop->iteration == 2)
                    @if($products_size_2)
                      @foreach ($products_size_2 as $item )
                        <li>{!! $item->post_title !!}</li>
                      @endforeach            
                    @endif                    

                  @elseif($loop->iteration == 3)
                    @if($products_size_3)
                      @foreach ($products_size_3 as $item )
                        <li>{!! $item->post_title !!}</li>
                      @endforeach
                    @endif

                  @elseif($loop->iteration == 4)
                    @if($products_size_4)
                      @foreach ($products_size_4 as $item )
                        <li>{!! $item->post_title !!}</li>
                      @endforeach
                    @endif
                  @endif
                </ul>
              </td>
              @endforeach
              @if($addons)
                <td>
                  <ul>
                    @foreach ($addons as $addon )
                      <li>
                        {!! $addon->post_title !!}
                      </li>
                    @endforeach
                  </ul>
                </td>  
              @endif 
            </tr>
            @endforeach
          @endif
            </table>
          <br><br><br>
        @endforeach
      @endif
    </div>
  </div>
@endsection