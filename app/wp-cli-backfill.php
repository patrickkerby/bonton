<?php
if ( defined( 'WP_CLI' ) && WP_CLI ) {
    WP_CLI::add_command('bonton backfill_pickup_date_sort', function($args, $assoc_args) {
        $batch = isset($assoc_args['batch']) ? intval($assoc_args['batch']) : 100;
        $dry_run = isset($assoc_args['dry-run']) ? true : false;
        $paged = 1;
        $total_updated = 0;
        $total_errors = 0;
        $total_skipped = 0;
        
        if ($dry_run) {
            WP_CLI::log("Running in DRY RUN mode - no changes will be made.");
        }
        
        do {
            $orders = wc_get_orders([
                'limit'  => $batch,
                'paged'  => $paged,
                'status' => ['processing', 'completed', 'ws-processing', 'ws-completed', 'on-hold', 'pending', 'cancelled', 'refunded'],
            ]);
            
            $updated = 0;
            $errors = 0;
            $skipped = 0;
            
            foreach ($orders as $order) {
                $pickup_date = $order->get_meta('pickup_date', true);
                $existing_sort_date = $order->get_meta('pickup_date_sort', true);
                
                // Skip if pickup_date is empty
                if (empty($pickup_date)) {
                    $skipped++;
                    continue;
                }
                
                // Skip if pickup_date_sort already exists (unless forced)
                if (!empty($existing_sort_date) && !isset($assoc_args['force'])) {
                    $skipped++;
                    continue;
                }
                
                // Try to parse the date using strtotime (handles various formats)
                $date_timestamp = strtotime($pickup_date);
                
                if ($date_timestamp === false) {
                    WP_CLI::warning("Order #{$order->get_id()}: Could not parse date '{$pickup_date}'");
                    $errors++;
                    continue;
                }
                
                $sortable_date = date('Y-m-d', $date_timestamp);
                
                if ($dry_run) {
                    WP_CLI::log("Order #{$order->get_id()}: '{$pickup_date}' -> '{$sortable_date}'");
                } else {
                    // Use order object method for HPOS compatibility
                    $order->update_meta_data('pickup_date_sort', $sortable_date);
                    $order->save();
                }
                
                $updated++;
            }
            
            $total_updated += $updated;
            $total_errors += $errors;
            $total_skipped += $skipped;
            
            WP_CLI::log("Processed page $paged: $updated updated, $skipped skipped, $errors errors.");
            $paged++;
            
        } while (count($orders) === $batch);
        
        WP_CLI::success("Done! Total: $total_updated updated, $total_skipped skipped, $total_errors errors");
        
        if ($dry_run) {
            WP_CLI::log("This was a dry run. Use --force to overwrite existing values, remove --dry-run to apply changes.");
        }
    });
}