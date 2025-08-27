<?php
if ( defined( 'WP_CLI' ) && WP_CLI ) {
    WP_CLI::add_command('bonton delivery_export', function($args, $assoc_args) {
        
        // Parameters
        $filename = isset($assoc_args['output']) ? $assoc_args['output'] : 'delivery-orders-export.csv';
        $start_date = isset($assoc_args['start-date']) ? $assoc_args['start-date'] : '2025-01-01';
        $end_date = isset($assoc_args['end-date']) ? $assoc_args['end-date'] : date('Y-m-d');
        $batch_size = isset($assoc_args['batch']) ? intval($assoc_args['batch']) : 100;
        
        // Determine output file path
        if (strpos($filename, '/') === false) {
            // No path specified, try multiple writable directories
            $possible_dirs = [
                '/tmp/',
                sys_get_temp_dir() . '/',
                WP_CONTENT_DIR . '/',
                ABSPATH
            ];
            
            // Add uploads directory if it exists
            $upload_dir = wp_upload_dir();
            if (!empty($upload_dir['basedir'])) {
                array_unshift($possible_dirs, trailingslashit($upload_dir['basedir']));
            }
            
            $output_file = null;
            foreach ($possible_dirs as $dir) {
                if (is_writable($dir)) {
                    $output_file = $dir . $filename;
                    break;
                }
            }
            
            if (!$output_file) {
                WP_CLI::error("Could not find a writable directory. Please specify a full path with --output=/path/to/file.csv");
                return;
            }
        } else {
            // Full path specified
            $output_file = $filename;
        }
        
        WP_CLI::log("Exporting delivery orders from {$start_date} to {$end_date}");
        WP_CLI::log("Output file: {$output_file}");
        
        // Check if directory is writable
        $output_dir = dirname($output_file);
        if (!is_writable($output_dir)) {
            WP_CLI::error("Directory is not writable: {$output_dir}");
            WP_CLI::log("Try specifying a different path, such as:");
            WP_CLI::log("  --output=/tmp/{$filename}");
            WP_CLI::log("  --output=/home/yourusername/{$filename}");
            return;
        }
        
        // Prepare CSV file
        $file_handle = fopen($output_file, 'w');
        if (!$file_handle) {
            WP_CLI::error("Could not create output file: {$output_file}. Check file permissions.");
            return;
        }
        
        // CSV Headers
        $headers = [
            'Order ID',
            'Delivery Date',
            'Customer Name',
            'Order Value (ex GST)',
            'GST Amount',
            'Order Total (inc GST)',
            'Shipping Method',
            'Order Status',
            'Order Date'
        ];
        fputcsv($file_handle, $headers);
        
        $total_exported = 0;
        $total_processed = 0;
        $paged = 1;
        
        do {
            // Get orders in batches
            $orders = wc_get_orders([
                'limit' => $batch_size,
                'paged' => $paged,
                'status' => ['processing', 'completed', 'ws-processing', 'ws-completed', 'on-hold', 'pending'],
                'date_created' => $start_date . '...' . $end_date,
                'orderby' => 'date',
                'order' => 'ASC'
            ]);
            
            foreach ($orders as $order) {
                $total_processed++;
                
                // Check if this is a delivery order (has flat_rate or free_shipping)
                $is_delivery = $order->has_shipping_method('flat_rate') || $order->has_shipping_method('free_shipping');
                
                if (!$is_delivery) {
                    continue; // Skip non-delivery orders
                }
                
                // Get pickup/delivery date
                $pickup_date = $order->get_meta('pickup_date', true);
                if (empty($pickup_date)) {
                    $pickup_date = 'No date set';
                }
                
                // Get customer name
                $customer_name = trim($order->get_billing_first_name() . ' ' . $order->get_billing_last_name());
                if (empty($customer_name)) {
                    $customer_name = 'Guest Customer';
                }
                
                // Get order totals
                $order_total = $order->get_total(); // Total including tax
                $tax_total = $order->get_total_tax(); // GST/Tax amount
                $order_ex_tax = $order_total - $tax_total; // Order value excluding GST
                
                // Get shipping method details
                $shipping_methods = $order->get_shipping_methods();
                $shipping_method_name = '';
                foreach ($shipping_methods as $shipping_method) {
                    $shipping_method_name = $shipping_method->get_method_title();
                    break; // Get first shipping method
                }
                
                // Prepare CSV row
                $row = [
                    $order->get_id(),
                    $pickup_date,
                    $customer_name,
                    number_format($order_ex_tax, 2, '.', ''), // Order value ex GST
                    number_format($tax_total, 2, '.', ''), // GST amount
                    number_format($order_total, 2, '.', ''), // Total inc GST
                    $shipping_method_name,
                    $order->get_status(),
                    $order->get_date_created()->date('Y-m-d H:i:s')
                ];
                
                fputcsv($file_handle, $row);
                $total_exported++;
            }
            
            WP_CLI::log("Processed page {$paged}: {$total_exported} delivery orders exported so far...");
            $paged++;
            
        } while (count($orders) === $batch_size);
        
        fclose($file_handle);
        
        WP_CLI::success("Export complete!");
        WP_CLI::log("Total orders processed: {$total_processed}");
        WP_CLI::log("Total delivery orders exported: {$total_exported}");
        WP_CLI::log("File saved: {$output_file}");
        
        // Show file size
        if (file_exists($output_file)) {
            $file_size = filesize($output_file);
            WP_CLI::log("File size: " . number_format($file_size / 1024, 2) . " KB");
        }
    });
    
    // Add a separate command for testing/preview
    WP_CLI::add_command('bonton delivery_export_preview', function($args, $assoc_args) {
        $start_date = isset($assoc_args['start-date']) ? $assoc_args['start-date'] : '2025-01-01';
        $end_date = isset($assoc_args['end-date']) ? $assoc_args['end-date'] : date('Y-m-d');
        $limit = isset($assoc_args['limit']) ? intval($assoc_args['limit']) : 10;
        
        WP_CLI::log("Preview of delivery orders from {$start_date} to {$end_date} (showing first {$limit})");
        WP_CLI::log("");
        
        $orders = wc_get_orders([
            'limit' => $limit,
            'status' => ['processing', 'completed', 'ws-processing', 'ws-completed', 'on-hold', 'pending'],
            'date_created' => $start_date . '...' . $end_date,
            'orderby' => 'date',
            'order' => 'ASC'
        ]);
        
        $delivery_count = 0;
        
        foreach ($orders as $order) {
            $is_delivery = $order->has_shipping_method('flat_rate') || $order->has_shipping_method('free_shipping');
            
            if (!$is_delivery) {
                continue;
            }
            
            $delivery_count++;
            $pickup_date = $order->get_meta('pickup_date', true) ?: 'No date set';
            $customer_name = trim($order->get_billing_first_name() . ' ' . $order->get_billing_last_name()) ?: 'Guest Customer';
            $order_total = $order->get_total();
            $tax_total = $order->get_total_tax();
            $order_ex_tax = $order_total - $tax_total;
            
            WP_CLI::log("Order #{$order->get_id()}: {$customer_name} | {$pickup_date} | $" . number_format($order_ex_tax, 2) . " (ex GST)");
        }
        
        WP_CLI::log("");
        WP_CLI::success("Found {$delivery_count} delivery orders in preview");
    });
    
    // Add a helper command to check writable directories
    WP_CLI::add_command('bonton delivery_export_check', function($args, $assoc_args) {
        WP_CLI::log("Checking writable directories for CSV export...");
        WP_CLI::log("");
        
        $upload_dir = wp_upload_dir();
        $possible_dirs = [
            'Uploads Directory' => !empty($upload_dir['basedir']) ? $upload_dir['basedir'] : 'Not available',
            'Temp Directory (/tmp)' => '/tmp',
            'System Temp' => sys_get_temp_dir(),
            'WP Content Directory' => WP_CONTENT_DIR,
            'WordPress Root' => ABSPATH,
        ];
        
        $writable_found = false;
        
        foreach ($possible_dirs as $name => $dir) {
            if ($dir === 'Not available') {
                WP_CLI::log("❌ {$name}: Not available");
                continue;
            }
            
            if (is_dir($dir) && is_writable($dir)) {
                WP_CLI::log("✅ {$name}: {$dir} (WRITABLE)");
                $writable_found = true;
            } else {
                $status = !is_dir($dir) ? 'Does not exist' : 'Not writable';
                WP_CLI::log("❌ {$name}: {$dir} ({$status})");
            }
        }
        
        WP_CLI::log("");
        if ($writable_found) {
            WP_CLI::success("Found writable directories! You can run: wp bonton delivery_export");
        } else {
            WP_CLI::log("No automatically writable directories found. You can:");
            WP_CLI::log("1. Create a writable directory: mkdir ~/exports && chmod 755 ~/exports");
            WP_CLI::log("2. Use that directory: wp bonton delivery_export --output=~/exports/delivery-report.csv");
            WP_CLI::log("3. Or use /tmp: wp bonton delivery_export --output=/tmp/delivery-report.csv");
        }
        
        WP_CLI::log("");
        WP_CLI::log("Current user: " . get_current_user());
        WP_CLI::log("Current working directory: " . getcwd());
    });
}
