{{--
  Template Name: Order Count Dashboard
  Description: Shows order counts for next 10 days with shelf order alerts
--}}

@extends('layouts.app')

@php
  // Shelf order threshold
  $shelf_threshold = 150;
  $shelf_warning_threshold = 140;
  
  // Get shelf products (same logic as packing-list.blade.php)
  // Use caching to prevent repeated queries
  $cache_key = 'order_dashboard_shelf_products';
  $shelf_array = wp_cache_get($cache_key);
  
  if (false === $shelf_array) {
    // Product override arguments
    $cooler_override_args = [
      'status' => 'publish',
      'cooler' => '1',
      'return' => 'ids',
      'limit'  => '-1'
    ];

    $shelf_override_args = [
      'status' => 'publish',
      'shelf' => '1',
      'return' => 'ids',
      'limit' => '-1'
    ];

    $shelf_list_slugs = array('buns-bagels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'preserves-spreads-honey', 'sauces-dressings', 'treats-and-ice-cream', 'general-grocery', 'baking-ingredients', 'savoury-treats');

    $cooler_overrides = wc_get_products( $cooler_override_args );
    $shelf_overrides = wc_get_products( $shelf_override_args );

    $shelf_args = array(
      'status' => array('publish', 'draft'),
      'category' => $shelf_list_slugs,
      'limit' => -1,
      'return' => 'ids',
      'exclude' => $cooler_overrides
    );

    $shelf_array = wc_get_products( $shelf_args );
    $shelf_array = array_merge($shelf_array, $shelf_overrides);
    
    // Cache for 10 minutes
    wp_cache_set($cache_key, $shelf_array, '', 600);
  }
  
  // Calculate date range - only fetch orders for the next 10 days
  $today = new \DateTime('today', new \DateTimeZone('America/Edmonton'));
  $start_date = $today->format('Y-m-d');
  
  $end_date_obj = clone $today;
  $end_date_obj->modify('+10 days');
  $end_date = $end_date_obj->format('Y-m-d');
  
  // Initialize orders by date array
  $orders_by_date = array();
  
  // Query orders for each day individually to reduce memory usage
  for ($i = 0; $i < 10; $i++) {
    $date = clone $today;
    $date->modify("+{$i} days");
    $date_key = $date->format('Y-m-d');
    
    // Convert to DD/MM/YYYY format for the meta query (how pickup_date_formatted is stored)
    $date_formatted_dmy = $date->format('d/m/Y');
    
    // Query orders for this specific date only
    $day_orders = wc_get_orders([
      'limit' => 200, // Reasonable limit per day
      'status' => ['processing', 'completed'],
      'meta_query' => [
        'relation' => 'OR',
        [
          'key'     => 'pickup_date_sort',
          'value'   => $date_key,
          'compare' => '='
        ],
        [
          'key'     => 'pickup_date_formatted',
          'value'   => $date_formatted_dmy,
          'compare' => '='
        ]
      ],
    ]);
    
    $orders_by_date[$date_key] = $day_orders;
  }
  
  // Process orders and build next 10 days array
  $next_10_days = array();
  
  for ($i = 0; $i < 10; $i++) {
    $date = clone $today;
    $date->modify("+{$i} days");
    $date_key = $date->format('Y-m-d');
    $date_display = $date->format('D, M j');
    
    $day_orders = isset($orders_by_date[$date_key]) ? $orders_by_date[$date_key] : array();
    
    $total_orders = count($day_orders);
    $shelf_orders = 0;
    
    // Count shelf orders (pickup orders that contain shelf products)
    foreach ($day_orders as $order) {
      $is_delivery = $order->has_shipping_method('flat_rate') || $order->has_shipping_method('free_shipping');
      
      if ($is_delivery) {
        continue; // Skip delivery orders
      }
      
      // Check if order contains shelf products
      $has_shelf_product = false;
      foreach ($order->get_items() as $item) {
        $prod_id = $item->get_product_id();
        if (in_array($prod_id, $shelf_array)) {
          $has_shelf_product = true;
          break;
        }
      }
      
      if ($has_shelf_product) {
        $shelf_orders++;
      }
    }
    
    $next_10_days[] = array(
      'date' => $date_key,
      'display' => $date_display,
      'total' => $total_orders,
      'shelf' => $shelf_orders,
      'status' => $shelf_orders >= $shelf_threshold ? 'exceeded' : ($shelf_orders >= $shelf_warning_threshold ? 'warning' : 'ok')
    );
  }
  
  // Get dates that need blackout (shelf orders >= 150)
  $blackout_dates = array();
  foreach ($next_10_days as $day) {
    if ($day['status'] === 'exceeded' || $day['status'] === 'warning') {
      // Convert Y-m-d to YYYY-MM-DD format for cart.js
      $blackout_dates[] = $day['date'];
    }
  }
@endphp

@section('content')
  <style>
    .order-dashboard {
      max-width: 600px;
      margin: 20px auto;
      padding: 15px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    
    .dashboard-header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #333;
    }
    
    .dashboard-header h1 {
      font-size: 24px;
      margin: 0 0 5px 0;
    }
    
    .dashboard-header .threshold {
      font-size: 14px;
      color: #666;
    }
    
    .day-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 6px;
      border-left: 4px solid #ddd;
      background: #f9f9f9;
    }
    
    .day-row.status-ok {
      border-left-color: #28a745;
    }
    
    .day-row.status-warning {
      border-left-color: #ffc107;
      background: #fff8e1;
    }
    
    .day-row.status-exceeded {
      border-left-color: #dc3545;
      background: #ffebee;
    }
    
    .day-info {
      flex: 1;
    }
    
    .day-date {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 4px;
    }
    
    .day-counts {
      font-size: 13px;
      color: #666;
    }
    
    .day-counts .shelf-count {
      font-weight: 600;
      color: #333;
    }
    
    .day-counts .shelf-count.high {
      color: #ff6b00;
    }
    
    .day-counts .shelf-count.exceeded {
      color: #dc3545;
      font-weight: 700;
    }
    
    .alert-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      margin-left: 8px;
    }
    
    .alert-badge.warning {
      background: #ffc107;
      color: #000;
    }
    
    .alert-badge.exceeded {
      background: #dc3545;
      color: #fff;
    }
    
    .blackout-section {
      margin-top: 30px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 6px;
    }
    
    .blackout-section h2 {
      font-size: 18px;
      margin: 0 0 10px 0;
    }
    
    .blackout-dates {
      font-family: 'Courier New', monospace;
      font-size: 13px;
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
    
    .blackout-dates code {
      display: block;
      white-space: pre;
    }
    
    .refresh-note {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #999;
    }
    
    .refresh-button {
      display: block;
      width: 100%;
      max-width: 200px;
      margin: 20px auto;
      padding: 10px 20px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
    }
    
    .refresh-button:hover {
      background: #0056b3;
    }
  </style>
  
  <script>
    // Auto-refresh every 5 minutes
    setTimeout(function() {
      location.reload();
    }, 300000); // 5 minutes
  </script>

  <div class="order-dashboard">
    <div class="dashboard-header">
      <h1>Order Count Dashboard</h1>
      <div class="threshold">Shelf Order Limit: {{ $shelf_threshold }}</div>
    </div>
    
    @foreach ($next_10_days as $day)
      <div class="day-row status-{{ $day['status'] }}">
        <div class="day-info">
          <div class="day-date">{{ $day['display'] }}</div>
          <div class="day-counts">
            Total: {{ $day['total'] }} orders | 
            <span class="shelf-count {{ $day['status'] === 'exceeded' ? 'exceeded' : ($day['status'] === 'warning' ? 'high' : '') }}">
              Shelf: {{ $day['shelf'] }}
            </span>
            @if ($day['status'] === 'exceeded')
              <span class="alert-badge exceeded">EXCEEDED</span>
            @elseif ($day['status'] === 'warning')
              <span class="alert-badge warning">WARNING</span>
            @endif
          </div>
        </div>
      </div>
    @endforeach
    
    @if (count($blackout_dates) > 0)
      <div class="blackout-section">
        <h2>⚠️ Suggested Blackout Dates</h2>
        <p style="font-size: 13px; margin-bottom: 10px;">Add these dates to cart.js vacationDays array:</p>
        <div class="blackout-dates">
          <code>const vacationDays = [{{ implode(', ', array_map(function($date) { return "'" . $date . "'"; }, $blackout_dates)) }}];</code>
        </div>
      </div>
    @endif
    
    <a href="javascript:location.reload();" class="refresh-button">Refresh Now</a>
    
    <div class="refresh-note">
      Last updated: {{ date('g:i A') }} — Auto-refreshes every 5 minutes
    </div>
  </div>
@endsection

