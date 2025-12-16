{{--
  Template Name: Order Count Dashboard (Simple)
  Description: Lightweight version - shows order counts for next 10 days
--}}

@extends('layouts.app')

@php
  // Shelf order threshold
  $shelf_threshold = 150;
  $shelf_warning_threshold = 140;
  
  // Cache for 2 minutes
  $cache_key = 'order_dashboard_simple_v1';
  $next_10_days = get_transient($cache_key);
  
  if (false === $next_10_days) {
    global $wpdb;
    
    // Calculate next 10 days
    $today = new \DateTime('today', new \DateTimeZone('America/Edmonton'));
    $next_10_days = array();
    
    // Get shelf product IDs (simplified - just the main categories)
    $shelf_term_slugs = array('buns-bagels', 'bread', 'cookies', 'sweet-buns', 'granola-crackers-nuts');
    $shelf_products = array();
    
    foreach ($shelf_term_slugs as $slug) {
      $term = get_term_by('slug', $slug, 'product_cat');
      if ($term) {
        $args = array(
          'post_type' => 'product',
          'posts_per_page' => 100,
          'tax_query' => array(
            array(
              'taxonomy' => 'product_cat',
              'field' => 'slug',
              'terms' => $slug
            )
          ),
          'fields' => 'ids'
        );
        $products = get_posts($args);
        $shelf_products = array_merge($shelf_products, $products);
      }
    }
    $shelf_products = array_unique($shelf_products);
    
    // Process next business days (skip Sundays and Mondays - closed)
    $days_added = 0;
    $day_offset = 0;
    
    while ($days_added < 10) {
      $date = clone $today;
      $date->modify("+{$day_offset} days");
      $day_offset++;
      
      $day_of_week = (int)$date->format('w'); // 0 = Sunday, 1 = Monday
      
      // Skip Sundays (0) and Mondays (1)
      if ($day_of_week === 0 || $day_of_week === 1) {
        continue;
      }
      
      $date_key = $date->format('Y-m-d');
      $date_display = $date->format('D, M j');
      
      // Direct database query for speed
      // Count orders with this pickup date
      $order_count_query = "
        SELECT COUNT(DISTINCT p.ID) 
        FROM {$wpdb->posts} p
        INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
        WHERE p.post_type = 'shop_order'
        AND p.post_status IN ('wc-processing', 'wc-completed')
        AND pm.meta_key = 'pickup_date_sort'
        AND pm.meta_value = %s
      ";
      
      $total_orders = $wpdb->get_var($wpdb->prepare($order_count_query, $date_key));
      $total_orders = $total_orders ? intval($total_orders) : 0;
      
      // For shelf orders, we need to check order items
      // This is a simplified count - counts pickup orders only
      $shelf_orders = 0;
      
      if ($total_orders > 0 && !empty($shelf_products)) {
        // Get order IDs for this date
        $order_ids_query = "
          SELECT DISTINCT p.ID 
          FROM {$wpdb->posts} p
          INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
          WHERE p.post_type = 'shop_order'
          AND p.post_status IN ('wc-processing', 'wc-completed')
          AND pm.meta_key = 'pickup_date_sort'
          AND pm.meta_value = %s
          LIMIT 150
        ";
        
        $order_ids = $wpdb->get_col($wpdb->prepare($order_ids_query, $date_key));
        
        foreach ($order_ids as $order_id) {
          $order = wc_get_order($order_id);
          if (!$order) continue;
          
          // Skip delivery
          if ($order->has_shipping_method('flat_rate') || $order->has_shipping_method('free_shipping')) {
            continue;
          }
          
          // Check for shelf products (simplified check)
          foreach ($order->get_items() as $item) {
            if (in_array($item->get_product_id(), $shelf_products)) {
              $shelf_orders++;
              break;
            }
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
    
    // Cache for 2 minutes
    set_transient($cache_key, $next_10_days, 120);
  }
  
  // Get dates that need blackout
  $blackout_dates = array();
  foreach ($next_10_days as $day) {
    if ($day['status'] === 'exceeded' || $day['status'] === 'warning') {
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
    
    .refresh-note {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #999;
    }
    
    .cache-note {
      text-align: center;
      font-size: 11px;
      color: #999;
      margin-top: 5px;
    }
  </style>
  
  <script>
    // Auto-refresh every 5 minutes
    setTimeout(function() {
      location.reload();
    }, 300000);
  </script>

  <div class="order-dashboard">
    <div class="dashboard-header">
      <h1>📦 Order Count Dashboard</h1>
      <div class="threshold">Shelf Order Limit: {{ $shelf_threshold }}</div>
      <div class="cache-note">Next 10 business days (Closed Sun/Mon) • Edmonton Time</div>
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
          <code>{{ implode(', ', array_map(function($date) { return "'" . $date . "'"; }, $blackout_dates)) }}</code>
        </div>
      </div>
    @endif
    
    <a href="javascript:location.reload();" class="refresh-button">🔄 Refresh Now</a>
    
    <div class="refresh-note">
      @php
        $edmonton_time = new \DateTime('now', new \DateTimeZone('America/Edmonton'));
      @endphp
      Last updated: {{ $edmonton_time->format('g:i A') }} — Auto-refreshes every 5 minutes
    </div>
  </div>
@endsection

