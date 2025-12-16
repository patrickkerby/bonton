{{--
  Template Name: Order Count Dashboard
  Description: Shows order counts for next 10 days with shelf order alerts
--}}

@php
  // Shelf order threshold
  $shelf_threshold = 150;
  $shelf_warning_threshold = 140;
  
  // Try to get cached dashboard data first (cache for 2 minutes)
  $cache_key = 'order_dashboard_data_v2';
  $next_10_days = wp_cache_get($cache_key);
  
  if (false === $next_10_days) {
    // Get shelf products (same logic as packing-list.blade.php)
    $shelf_cache_key = 'order_dashboard_shelf_products';
    $shelf_array = wp_cache_get($shelf_cache_key);
    
    if (false === $shelf_array) {
      $cooler_override_args = [
        'status' => 'publish',
        'cooler' => '1',
        'return' => 'ids',
        'limit'  => 100 // Limit to reduce load
      ];

      $shelf_override_args = [
        'status' => 'publish',
        'shelf' => '1',
        'return' => 'ids',
        'limit' => 100
      ];

      $shelf_list_slugs = array('buns-bagels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts', 'coffee-ice-cream', 'flours-flatbreads', 'preserves-spreads-honey', 'sauces-dressings', 'treats-and-ice-cream', 'general-grocery', 'baking-ingredients', 'savoury-treats');

      $cooler_overrides = wc_get_products( $cooler_override_args );
      $shelf_overrides = wc_get_products( $shelf_override_args );

      $shelf_args = array(
        'status' => 'publish', // Only published to reduce load
        'category' => $shelf_list_slugs,
        'limit' => 500, // Reasonable limit
        'return' => 'ids',
        'exclude' => $cooler_overrides
      );

      $shelf_array = wc_get_products( $shelf_args );
      $shelf_array = array_merge($shelf_array, $shelf_overrides);
      
      wp_cache_set($shelf_cache_key, $shelf_array, '', 600);
    }
    
    // Calculate next 10 business days (skip Sundays and Mondays - closed)
    // Stop at December 24 (closed until Jan 5)
    $today = new \DateTime('today', new \DateTimeZone('America/Edmonton'));
    $next_10_days = array();
    $christmas_cutoff = new \DateTime('2025-12-24', new \DateTimeZone('America/Edmonton'));
    
    $days_added = 0;
    $day_offset = 0;
    
    while ($days_added < 10) {
      $date = clone $today;
      $date->modify("+{$day_offset} days");
      $day_offset++;
      
      // Stop if we're past December 24, 2025
      if ($date > $christmas_cutoff) {
        break;
      }
      
      $day_of_week = (int)$date->format('w'); // 0 = Sunday, 1 = Monday
      
      // Skip Sundays (0) and Mondays (1)
      if ($day_of_week === 0 || $day_of_week === 1) {
        continue;
      }
      
      $date_key = $date->format('Y-m-d');
      $date_display = $date->format('D, M j');
      $date_formatted_dmy = $date->format('d/m/Y');
      
      // Simplified query - just get order IDs and minimal data
      $day_orders = wc_get_orders([
        'limit' => 150,
        'status' => ['processing', 'completed'],
        'return' => 'ids', // Just get IDs first
        'meta_query' => [
          [
            'key'     => 'pickup_date_sort',
            'value'   => $date_key,
            'compare' => '='
          ]
        ],
      ]);
      
      $total_orders = count($day_orders);
      $shelf_orders = 0;
      
      // Only count shelf orders if we have orders
      if ($total_orders > 0) {
        foreach ($day_orders as $order_id) {
          $order = wc_get_order($order_id);
          if (!$order) continue;
          
          // Skip delivery orders
          if ($order->has_shipping_method('flat_rate') || $order->has_shipping_method('free_shipping')) {
            continue;
          }
          
          // Check if order has shelf products
          $has_shelf = false;
          foreach ($order->get_items() as $item) {
            if (in_array($item->get_product_id(), $shelf_array)) {
              $has_shelf = true;
              break;
            }
          }
          
          if ($has_shelf) {
            $shelf_orders++;
          }
        }
      }
      
      $next_10_days[] = array(
        'date' => $date_key,
        'display' => $date_display,
        'total' => $total_orders,
        'shelf' => $shelf_orders,
        'status' => $shelf_orders >= $shelf_threshold ? 'exceeded' : ($shelf_orders >= $shelf_warning_threshold ? 'warning' : 'ok')
      );
      
      $days_added++;
    }
    
    // Cache the entire result for 2 minutes
    wp_cache_set($cache_key, $next_10_days, '', 120);
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

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Order Count Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #fff;
    }
    
    .back-link {
      position: fixed;
      top: 15px;
      left: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: #f5f5f5;
      border-radius: 6px;
      text-decoration: none;
      color: #333;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
      z-index: 100;
    }
    
    .back-link:hover {
      background: #e5e5e5;
    }
    
    .back-link svg {
      width: 16px;
      height: 16px;
    }
    
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
</head>
<body>
  <a href="/lists/" class="back-link">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    Back to Lists
  </a>

  <div class="order-dashboard">
    <div class="dashboard-header">
      <h1>Order Count Dashboard</h1>
      <div class="threshold">Shelf Order Limit: {{ $shelf_threshold }}</div>
      <div class="cache-note" style="font-size: 11px; color: #999; margin-top: 5px;">Next 10 business days</div>
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
      @php
        $edmonton_time = new \DateTime('now', new \DateTimeZone('America/Edmonton'));
      @endphp
      Last updated: {{ $edmonton_time->format('g:i A') }} — Auto-refreshes every 5 minutes
    </div>
  </div>
</body>
</html>

