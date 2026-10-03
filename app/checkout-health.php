<?php

namespace App;

/**
 * Checkout failure measurement.
 *
 * Baseline + going-forward logger for whether the Oct 2026 checkout
 * redesign reduced failed place-order / AVS / address mismatches.
 *
 * Run on production:
 *   wp bonton checkout_health
 *   wp bonton checkout_health --format=json --output=/tmp/checkout-health.json
 */

const BONTON_CHECKOUT_HEALTH_SHIPPED = '2026-10-03 09:00:00';
const BONTON_CHECKOUT_HEALTH_TZ = 'America/Edmonton';
const BONTON_CHECKOUT_HEALTH_SOURCE = 'bonton-checkout-health';

/**
 * Record checkout-page error notices that fire during Place Order.
 * Woo's place-order-debug logs persist when validation fails; this
 * source keeps a classified, PII-light trail going forward.
 */
add_filter('woocommerce_add_error', function ($message) {
    if (!defined('WOOCOMMERCE_CHECKOUT') || !WOOCOMMERCE_CHECKOUT) {
        return $message;
    }
    if (!function_exists('wc_get_logger')) {
        return $message;
    }

    $text = wp_strip_all_tags((string) $message);
    if ($text === '') {
        return $message;
    }

    wc_get_logger()->warning($text, [
        'source' => BONTON_CHECKOUT_HEALTH_SOURCE,
        'class'  => bonton_checkout_health_classify_text($text),
    ]);

    return $message;
});

add_action('woocommerce_order_status_failed', function ($order_id) {
    $order = function_exists('wc_get_order') ? wc_get_order($order_id) : null;
    if (!$order || !function_exists('wc_get_logger')) {
        return;
    }

    $snippet = bonton_checkout_health_order_note_blob($order);
    wc_get_logger()->warning(
        'Order failed: #' . $order->get_id() . ' ' . $snippet,
        [
            'source'         => BONTON_CHECKOUT_HEALTH_SOURCE,
            'order_id'       => $order->get_id(),
            'payment_method' => $order->get_payment_method(),
            'class'          => bonton_checkout_health_classify_text($snippet),
        ]
    );
});

if (defined('WP_CLI') && WP_CLI) {
    \WP_CLI::add_command('bonton checkout_health', __NAMESPACE__ . '\\bonton_checkout_health_command');
}

function bonton_checkout_health_command($args, $assoc_args)
{
    if (!function_exists('wc_get_orders')) {
        \WP_CLI::error('WooCommerce is not available.');
    }

    $report = bonton_checkout_health_build_report($assoc_args);
    bonton_checkout_health_store_report($report);

    $tz      = new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ);
    $start   = new \DateTime($report['range']['start']);
    $end     = new \DateTime($report['range']['end']);
    $shipped = new \DateTime($report['shipped_at']);
    $start->setTimezone($tz);
    $end->setTimezone($tz);
    $shipped->setTimezone($tz);

    $format = isset($assoc_args['format']) ? $assoc_args['format'] : 'table';
    $before = $report['totals']['before'];
    $after  = $report['totals']['after'];
    $debug  = $report['place_order_debug'];

    \WP_CLI::log(sprintf(
        'Checkout health %s → %s (shipped %s %s)',
        $start->format('Y-m-d H:i'),
        $end->format('Y-m-d H:i'),
        $shipped->format('Y-m-d H:i'),
        BONTON_CHECKOUT_HEALTH_TZ
    ));

    \WP_CLI::log('');
    \WP_CLI::log('Before vs after (failed / (failed + paid))');
    \WP_CLI::log(sprintf(
        '  before: %d paid, %d failed, %d cancelled (%.1f%% fail rate) | debug attempts %d (%d validation)',
        $before['paid'],
        $before['failed'],
        $before['cancelled'],
        $before['fail_rate'],
        $debug['before']['count'],
        $debug['before']['validation']
    ));
    \WP_CLI::log(sprintf(
        '  after:  %d paid, %d failed, %d cancelled (%.1f%% fail rate) | debug attempts %d (%d validation)',
        $after['paid'],
        $after['failed'],
        $after['cancelled'],
        $after['fail_rate'],
        $debug['after']['count'],
        $debug['after']['validation']
    ));

    $rows = [];
    foreach ($report['weeks'] as $week) {
        $rows[] = [
            'week'        => $week['week'],
            'period'      => $week['period'],
            'paid'        => $week['paid'],
            'failed'      => $week['failed'],
            'cancelled'   => $week['cancelled'],
            'pending'     => $week['pending'],
            'fail_rate'   => $week['fail_rate'] . '%',
            'avs_address' => $week['avs_address'],
            'cvd'         => $week['cvd'],
            'debug'       => $week['place_order_debug'],
            'valid_dbg'   => $week['validation_debug'],
        ];
    }

    if ($format === 'json' || !empty($assoc_args['output'])) {
        $json = wp_json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        if (!empty($assoc_args['output'])) {
            $path = $assoc_args['output'];
            if (file_put_contents($path, $json) === false) {
                \WP_CLI::error("Could not write {$path}");
            }
            \WP_CLI::success("Wrote {$path}");
        } else {
            \WP_CLI::log($json);
        }
        return;
    }

    \WP_CLI::log('');
    \WP_CLI\Utils\format_items('table', $rows, [
        'week',
        'period',
        'paid',
        'failed',
        'cancelled',
        'pending',
        'fail_rate',
        'avs_address',
        'cvd',
        'debug',
        'valid_dbg',
    ]);

    if (!empty($report['place_order_debug']['by_last_step'])) {
        \WP_CLI::log('');
        \WP_CLI::log('Leftover place-order-debug last steps (Woo deletes these on success):');
        foreach ($report['place_order_debug']['by_last_step'] as $step => $count) {
            \WP_CLI::log(sprintf('  %4d  %s', $count, $step));
        }
    }

    \WP_CLI::success('Done. The dashboard widget uses this cached report.');
}

function bonton_checkout_health_build_report($assoc_args = [])
{
    $tz      = new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ);
    $shipped = !empty($assoc_args['shipped'])
        ? new \DateTime($assoc_args['shipped'], $tz)
        : new \DateTime(BONTON_CHECKOUT_HEALTH_SHIPPED, $tz);

    $end = !empty($assoc_args['before'])
        ? new \DateTime($assoc_args['before'], $tz)
        : new \DateTime('now', $tz);

    $start = !empty($assoc_args['since'])
        ? new \DateTime($assoc_args['since'], $tz)
        : (clone $shipped)->modify('-6 months');

    $detail_limit = isset($assoc_args['limit-details']) ? max(0, intval($assoc_args['limit-details'])) : 40;

    $weeks   = bonton_checkout_health_empty_weeks($start, $end, $shipped);
    $weeks   = bonton_checkout_health_fill_orders($weeks, $start, $end, $shipped, $detail_limit);
    $debug   = bonton_checkout_health_scan_place_order_logs($start, $end, $shipped);
    $moneris = bonton_checkout_health_scan_moneris_logs($start, $end, $shipped);
    $ours    = bonton_checkout_health_scan_named_logs(BONTON_CHECKOUT_HEALTH_SOURCE, $start, $end, $shipped);

    foreach ($debug['weekly'] as $week => $row) {
        if (!isset($weeks[$week])) {
            continue;
        }
        $weeks[$week]['place_order_debug'] = $row['count'];
        $weeks[$week]['validation_debug']  = $row['validation'];
        $weeks[$week]['payment_debug']     = $row['payment'];
    }

    $sample = isset($weeks['_sample']) ? $weeks['_sample'] : [];
    unset($weeks['_sample']);
    $week_rows = array_values($weeks);

    $now = new \DateTime('now', $tz);

    return [
        'generated_at'         => $now->format(DATE_ATOM),
        'shipped_at'           => $shipped->format(DATE_ATOM),
        'timezone'             => BONTON_CHECKOUT_HEALTH_TZ,
        'range'                => [
            'start' => $start->format(DATE_ATOM),
            'end'   => $end->format(DATE_ATOM),
        ],
        'weeks'                => $week_rows,
        'months'               => bonton_checkout_health_months_from_weeks($week_rows),
        'failed_order_sample'  => array_reverse($sample),
        'place_order_debug'    => [
            'attempts'     => $debug['total'],
            'by_last_step' => $debug['by_step'],
            'by_class'     => $debug['by_class'],
            'before'       => $debug['before'],
            'after'        => $debug['after'],
        ],
        'moneris_logs'         => $moneris,
        'checkout_health_logs' => $ours,
        'totals'               => [
            'before' => bonton_checkout_health_period_totals($week_rows, 'before'),
            'after'  => bonton_checkout_health_period_totals($week_rows, 'after'),
        ],
    ];
}

function bonton_checkout_health_store_report($report)
{
    update_option('bonton_checkout_health_report', $report, false);
}

function bonton_checkout_health_refresh()
{
    if (!function_exists('wc_get_orders')) {
        return false;
    }
    if (get_transient('bonton_checkout_health_lock')) {
        return false;
    }

    set_transient('bonton_checkout_health_lock', 1, 15 * MINUTE_IN_SECONDS);
    if (function_exists('set_time_limit')) {
        set_time_limit(180);
    }

    try {
        $report = bonton_checkout_health_build_report(['limit-details' => 40]);
        bonton_checkout_health_store_report($report);
    } finally {
        delete_transient('bonton_checkout_health_lock');
    }

    return true;
}

add_action('bonton_checkout_health_refresh', __NAMESPACE__ . '\\bonton_checkout_health_refresh');

add_action('init', function () {
    $hook = 'bonton_checkout_health_refresh';
    $next = (new \DateTime('tomorrow 06:15', new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ)))->getTimestamp();

    if (function_exists('as_schedule_recurring_action')) {
        $already = function_exists('as_has_scheduled_action')
            ? as_has_scheduled_action($hook)
            : (bool) as_next_scheduled_action($hook);
        if (!$already) {
            as_schedule_recurring_action($next, DAY_IN_SECONDS, $hook);
        }
        return;
    }

    if (!wp_next_scheduled($hook)) {
        wp_schedule_event($next, 'daily', $hook);
    }
});

add_action('wp_dashboard_setup', function () {
    if (!current_user_can('manage_woocommerce')) {
        return;
    }
    wp_add_dashboard_widget(
        'bonton_checkout_health_widget',
        'Checkout health',
        __NAMESPACE__ . '\\bonton_checkout_health_widget'
    );
});

add_action('admin_menu', function () {
    add_submenu_page(
        'woocommerce',
        'Checkout health',
        'Checkout health',
        'manage_woocommerce',
        'bonton-checkout-health',
        __NAMESPACE__ . '\\bonton_checkout_health_admin_page'
    );
}, 64);

add_action('admin_post_bonton_checkout_health_refresh', function () {
    if (!current_user_can('manage_woocommerce')) {
        wp_die('Forbidden');
    }
    check_admin_referer('bonton_checkout_health_refresh');
    bonton_checkout_health_refresh();
    $redirect = wp_get_referer();
    if (!$redirect) {
        $redirect = admin_url('index.php');
    }
    wp_safe_redirect(add_query_arg('bonton_health_refreshed', '1', $redirect));
    exit;
});

function bonton_checkout_health_refresh_form()
{
    $action = admin_url('admin-post.php');
    ?>
    <form method="post" action="<?php echo esc_url($action); ?>" style="display:inline;">
        <?php wp_nonce_field('bonton_checkout_health_refresh'); ?>
        <input type="hidden" name="action" value="bonton_checkout_health_refresh">
        <button type="submit" class="button">Refresh report</button>
    </form>
    <?php
}

function bonton_checkout_health_widget()
{
    if (!empty($_GET['bonton_health_refreshed'])) {
        echo '<div class="notice notice-success inline"><p>Checkout health report updated.</p></div>';
    }

    $report = get_option('bonton_checkout_health_report');
    if (!is_array($report) || empty($report['totals'])) {
        echo '<p>No report yet. Click refresh once — after that it updates every morning.</p>';
        bonton_checkout_health_refresh_form();
        return;
    }

    $before = $report['totals']['before'];
    $after  = $report['totals']['after'];
    $page   = admin_url('admin.php?page=bonton-checkout-health');
    $tz     = new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ);
    $when   = !empty($report['generated_at']) ? new \DateTime($report['generated_at']) : null;
    if ($when) {
        $when->setTimezone($tz);
    }

    $after_ready = (intval($after['paid']) + intval($after['failed'])) > 0;

    echo '<p style="margin:0 0 10px;">Baseline is the six months before the 3 Oct 2026, 9am launch. Fail rate = failed ÷ (failed + paid).</p>';

    echo '<p style="margin:0 0 12px;font-size:1.35em;line-height:1.3;"><strong>' . esc_html(bonton_checkout_health_pct($before)) . '</strong> baseline fail rate';
    echo '<span style="display:block;font-size:13px;font-weight:normal;color:#646970;">' . intval($before['failed']) . ' failed · ' . intval($before['paid']) . ' paid';
    if (!empty($before['avs_address'])) {
        echo ' · ' . intval($before['avs_address']) . ' AVS/address';
    }
    echo '</span></p>';

    if (!$after_ready) {
        echo '<p style="margin:0 0 12px;padding:8px 10px;background:#f0f0f1;">Since launch: no paid or failed orders yet. This number stays as the baseline until the first ones land.</p>';
    } else {
        echo '<p style="margin:0 0 12px;">Since launch: <strong>' . esc_html(bonton_checkout_health_pct($after)) . '</strong> (' . intval($after['failed']) . ' failed / ' . intval($after['paid']) . ' paid).</p>';
    }

    $weeks = array_slice(array_reverse($report['weeks']), 0, 8);
    if ($weeks) {
        echo '<p style="margin:0 0 6px;"><strong>Last 8 weeks</strong></p>';
        echo '<table class="widefat striped"><thead><tr><th>Week of</th><th>Paid</th><th>Failed</th><th>Fail rate</th></tr></thead><tbody>';
        foreach ($weeks as $week) {
            echo '<tr>';
            echo '<td>' . esc_html($week['week_start']) . '</td>';
            echo '<td>' . intval($week['paid']) . '</td>';
            echo '<td>' . intval($week['failed']) . '</td>';
            echo '<td>' . bonton_checkout_health_fail_bar($week['fail_rate']) . esc_html(bonton_checkout_health_pct($week)) . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    }

    $recent = array_slice(isset($report['failed_order_sample']) ? $report['failed_order_sample'] : [], 0, 5);
    if ($recent) {
        echo '<p style="margin:12px 0 6px;"><strong>Recent failed orders</strong></p><ul style="margin:0;">';
        foreach ($recent as $row) {
            try {
                $dt = new \DateTime($row['date']);
                $dt->setTimezone($tz);
                $when_row = $dt->format('M j');
            } catch (\Exception $e) {
                $when_row = '';
            }
            $url = bonton_checkout_health_order_url($row['id']);
            echo '<li><a href="' . esc_url($url) . '">#' . intval($row['id']) . '</a> · ' . esc_html($when_row) . ' · ' . esc_html(bonton_checkout_health_class_label($row['class'])) . '</li>';
        }
        echo '</ul>';
    }

    echo '<p style="margin:12px 0 0;">';
    if ($when) {
        echo 'Updated ' . esc_html($when->format('D, M j g:ia')) . ' · ';
    }
    echo '<a href="' . esc_url($page) . '">Months, weeks, and all recent failures</a></p>';
    echo '<p style="margin:8px 0 0;">';
    bonton_checkout_health_refresh_form();
    echo '</p>';
}

function bonton_checkout_health_admin_page()
{
    if (!current_user_can('manage_woocommerce')) {
        return;
    }

    echo '<div class="wrap">';
    echo '<h1>Checkout health</h1>';

    if (!empty($_GET['bonton_health_refreshed'])) {
        echo '<div class="notice notice-success is-dismissible"><p>Report updated.</p></div>';
    }

    $report = get_option('bonton_checkout_health_report');
    echo '<p>Fail rate = failed orders ÷ (failed + paid). That is the number to watch as the new checkout accumulates orders. Incomplete checkouts that never created an order show up in <code>place-order-debug</code> (Woo deletes those logs on success).</p>';

    if (!is_array($report) || empty($report['weeks'])) {
        echo '<p>No cached report yet. This first run can take a minute.</p>';
        bonton_checkout_health_refresh_form();
        echo '</div>';
        return;
    }

    $tz   = new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ);
    $when = !empty($report['generated_at']) ? new \DateTime($report['generated_at']) : null;
    if ($when) {
        $when->setTimezone($tz);
        echo '<p>Last updated ' . esc_html($when->format('l, F j, Y g:ia T')) . '. Refreshes every morning around 6:15am Edmonton.</p>';
    }

    bonton_checkout_health_refresh_form();

    $before = $report['totals']['before'];
    $after  = $report['totals']['after'];
    $after_ready = (intval($after['paid']) + intval($after['failed'])) > 0;

    echo '<h2>Baseline (before 3 Oct 2026, 9am)</h2>';
    echo '<p style="font-size:1.5em;margin:0.25em 0 0.5em;"><strong>' . esc_html(bonton_checkout_health_pct($before)) . '</strong> of created orders failed</p>';
    echo '<p>' . intval($before['failed']) . ' failed · ' . intval($before['paid']) . ' paid · ' . intval($before['cancelled']) . ' cancelled · ' . intval($before['avs_address']) . ' tagged AVS/address · ' . intval($before['cvd']) . ' tagged CVD.</p>';

    echo '<h2>Since launch</h2>';
    if (!$after_ready) {
        echo '<p>No paid or failed orders yet. Keep this page open as a scoreboard — it will fill in as orders come through.</p>';
    } else {
        echo '<p><strong>' . esc_html(bonton_checkout_health_pct($after)) . '</strong> fail rate (' . intval($after['failed']) . ' failed / ' . intval($after['paid']) . ' paid). Compare that to the baseline above.</p>';
    }

    $months = isset($report['months']) ? $report['months'] : bonton_checkout_health_months_from_weeks($report['weeks']);
    if ($months) {
        echo '<h2>By month</h2>';
        echo '<table class="widefat striped" style="max-width:48rem;">';
        echo '<thead><tr><th>Month</th><th>Paid</th><th>Failed</th><th>Fail rate</th><th>AVS / address</th><th>CVD</th></tr></thead><tbody>';
        foreach (array_reverse($months) as $month) {
            $label = $month['month'];
            try {
                $md = new \DateTime($month['month'] . '-01', $tz);
                $label = $md->format('F Y');
            } catch (\Exception $e) {
                // keep Y-m
            }
            echo '<tr>';
            echo '<td>' . esc_html($label) . '</td>';
            echo '<td>' . intval($month['paid']) . '</td>';
            echo '<td>' . intval($month['failed']) . '</td>';
            echo '<td>' . bonton_checkout_health_fail_bar($month['fail_rate']) . esc_html(bonton_checkout_health_pct($month)) . '</td>';
            echo '<td>' . intval($month['avs_address']) . '</td>';
            echo '<td>' . intval($month['cvd']) . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    }

    echo '<h2>By week</h2>';
    echo '<table class="widefat striped">';
    echo '<thead><tr><th>Week of</th><th>Period</th><th>Paid</th><th>Failed</th><th>Cancelled</th><th>Fail rate</th><th>AVS / address</th><th>CVD</th><th>Incomplete checkouts</th></tr></thead><tbody>';
    foreach (array_reverse($report['weeks']) as $week) {
        echo '<tr>';
        echo '<td>' . esc_html($week['week_start']) . '</td>';
        echo '<td>' . esc_html($week['period']) . '</td>';
        echo '<td>' . intval($week['paid']) . '</td>';
        echo '<td>' . intval($week['failed']) . '</td>';
        echo '<td>' . intval($week['cancelled']) . '</td>';
        echo '<td>' . bonton_checkout_health_fail_bar($week['fail_rate']) . esc_html(bonton_checkout_health_pct($week)) . '</td>';
        echo '<td>' . intval($week['avs_address']) . '</td>';
        echo '<td>' . intval($week['cvd']) . '</td>';
        echo '<td>' . intval($week['place_order_debug']) . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table>';

    $sample = isset($report['failed_order_sample']) ? $report['failed_order_sample'] : [];
    if ($sample) {
        echo '<h2>Recent failed orders</h2>';
        echo '<p>Newest ' . count($sample) . ' failed orders (no customer details). Open one to read the Moneris/AVS note.</p>';
        echo '<table class="widefat striped">';
        echo '<thead><tr><th>Order</th><th>When</th><th>Likely cause</th><th>Gateway note</th></tr></thead><tbody>';
        foreach ($sample as $row) {
            try {
                $dt = new \DateTime($row['date']);
                $dt->setTimezone($tz);
                $when_row = $dt->format('M j, Y g:ia');
            } catch (\Exception $e) {
                $when_row = '';
            }
            $note = isset($row['note']) ? $row['note'] : '';
            if (strlen($note) > 160) {
                $note = substr($note, 0, 157) . '...';
            }
            echo '<tr>';
            echo '<td><a href="' . esc_url(bonton_checkout_health_order_url($row['id'])) . '">#' . intval($row['id']) . '</a></td>';
            echo '<td>' . esc_html($when_row) . '</td>';
            echo '<td>' . esc_html(bonton_checkout_health_class_label($row['class'])) . '</td>';
            echo '<td>' . esc_html($note) . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    }

    $debug = isset($report['place_order_debug']) ? $report['place_order_debug'] : [];
    if (!empty($debug['attempts'])) {
        echo '<h2>Incomplete Place Order attempts</h2>';
        echo '<p>Woo leftover <code>place-order-debug</code> files: <strong>' . intval($debug['attempts']) . '</strong>. These never became orders. Validation stops (address/fields) before launch: ' . intval($debug['before']['validation']) . '. After launch: ' . intval($debug['after']['validation']) . '.</p>';
        if (!empty($debug['by_last_step'])) {
            echo '<ul>';
            $i = 0;
            foreach ($debug['by_last_step'] as $step => $count) {
                if ($i++ > 8) {
                    break;
                }
                echo '<li>' . intval($count) . ' × ' . esc_html($step) . '</li>';
            }
            echo '</ul>';
        }
    }

    echo '</div>';
}

function bonton_checkout_health_empty_weeks(\DateTime $start, \DateTime $end, \DateTime $shipped)
{
    $weeks = [];
    $cursor = clone $start;
    $cursor->setTime(0, 0, 0);
    $cursor->modify('monday this week');

    while ($cursor <= $end) {
        $key = $cursor->format('o-\WW');
        $week_end = (clone $cursor)->modify('+6 days')->setTime(23, 59, 59);
        if ($week_end < $shipped) {
            $period = 'before';
        } elseif ($cursor >= $shipped) {
            $period = 'after';
        } else {
            $period = 'straddle';
        }

        $weeks[$key] = [
            'week'              => $key,
            'week_start'        => $cursor->format('Y-m-d'),
            'period'            => $period,
            'paid'              => 0,
            'failed'            => 0,
            'cancelled'         => 0,
            'pending'           => 0,
            'other'             => 0,
            'avs_address'       => 0,
            'cvd'               => 0,
            'other_decline'     => 0,
            'place_order_debug' => 0,
            'validation_debug'  => 0,
            'payment_debug'     => 0,
            'fail_rate'         => 0,
        ];
        $cursor->modify('+1 week');
    }

    return $weeks;
}

function bonton_checkout_health_fill_orders(array $weeks, \DateTime $start, \DateTime $end, \DateTime $shipped, $detail_limit)
{
    $tz            = new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ);
    $paid_statuses = ['processing', 'completed', 'ws-processing', 'ws-completed'];
    $fail_statuses = ['failed', 'cancelled', 'pending', 'on-hold', 'checkout-draft'];
    $sample        = [];

    $paged = 1;
    $batch = 100;
    do {
        $orders = wc_get_orders([
            'limit'        => $batch,
            'paged'        => $paged,
            'status'       => array_merge($paid_statuses, $fail_statuses),
            'date_created' => $start->format('Y-m-d H:i:s') . '...' . $end->format('Y-m-d H:i:s'),
            'orderby'      => 'date',
            'order'        => 'ASC',
            'return'       => 'objects',
        ]);

        foreach ($orders as $order) {
            $created = $order->get_date_created();
            if (!$created) {
                continue;
            }
            $local = clone $created;
            $local->setTimezone($tz);
            $week  = $local->format('o-\WW');
            if (!isset($weeks[$week])) {
                continue;
            }

            $status = $order->get_status();
            if (in_array($status, $paid_statuses, true)) {
                $weeks[$week]['paid']++;
                continue;
            }

            if ($status === 'failed') {
                $weeks[$week]['failed']++;
            } elseif ($status === 'cancelled') {
                $weeks[$week]['cancelled']++;
            } elseif (in_array($status, ['pending', 'checkout-draft'], true)) {
                $weeks[$week]['pending']++;
            } else {
                $weeks[$week]['other']++;
            }

            $blob  = bonton_checkout_health_order_note_blob($order);
            $class = bonton_checkout_health_classify_text($blob);
            if ($class === 'avs_address') {
                $weeks[$week]['avs_address']++;
            } elseif ($class === 'cvd') {
                $weeks[$week]['cvd']++;
            } elseif ($status === 'failed') {
                $weeks[$week]['other_decline']++;
            }

            if ($status === 'failed' && $detail_limit > 0) {
                $sample[] = [
                    'id'             => $order->get_id(),
                    'date'           => $local->format(DATE_ATOM),
                    'period'         => $created->getTimestamp() >= $shipped->getTimestamp() ? 'after' : 'before',
                    'status'         => $status,
                    'class'          => $class,
                    'payment_method' => $order->get_payment_method(),
                    'note'           => $blob,
                ];
                if (count($sample) > $detail_limit) {
                    $sample = array_slice($sample, -$detail_limit);
                }
            }
        }

        $paged++;
    } while (count($orders) === $batch);

    foreach ($weeks as $key => $week) {
        if ($key === '_sample') {
            continue;
        }
        $denom = $week['paid'] + $week['failed'];
        $weeks[$key]['fail_rate'] = $denom > 0 ? round(100 * $week['failed'] / $denom, 1) : 0;
    }

    $weeks['_sample'] = $sample;

    return $weeks;
}

function bonton_checkout_health_order_note_blob($order)
{
    $parts = [];
    if (function_exists('wc_get_order_notes')) {
        $notes = wc_get_order_notes([
            'order_id' => $order->get_id(),
            'type'     => 'internal',
            'limit'    => 8,
        ]);
        foreach ($notes as $note) {
            $parts[] = wp_strip_all_tags($note->content);
        }
    }

    foreach (['_moneris_avs_result', '_moneris_csc_result', '_avs_result', '_csc_result'] as $key) {
        $val = $order->get_meta($key, true);
        if ($val !== '' && $val !== null) {
            $parts[] = $key . '=' . (is_scalar($val) ? $val : wp_json_encode($val));
        }
    }

    $text = trim(implode(' | ', $parts));
    if (strlen($text) > 400) {
        $text = substr($text, 0, 397) . '...';
    }

    return $text;
}

function bonton_checkout_health_classify_text($text)
{
    $t = strtolower((string) $text);

    if (preg_match('/avs|address verification|postal code|postcode|zip code|zip match|locale no match|billing address/', $t)) {
        return 'avs_address';
    }
    if (preg_match('/\bcvd\b|\bcsc\b|\bcvv\b|card security/', $t)) {
        return 'cvd';
    }
    if (preg_match('/complete delivery address|cannot deliver to that address|city, province, and postal/', $t)) {
        return 'avs_address';
    }
    if (preg_match('/declin|do not honor|insufficient|hold card|expired card|timeout|communication/', $t)) {
        return 'decline';
    }
    if (preg_match('/validat|required field|is a required/', $t)) {
        return 'validation';
    }

    return 'other';
}

function bonton_checkout_health_log_dir()
{
    if (class_exists('\Automattic\WooCommerce\Utilities\LoggingUtil')) {
        return \Automattic\WooCommerce\Utilities\LoggingUtil::get_log_directory();
    }
    if (defined('WC_LOG_DIR')) {
        return WC_LOG_DIR;
    }
    $upload = wp_upload_dir(null, false);

    return trailingslashit($upload['basedir']) . 'wc-logs/';
}

function bonton_checkout_health_scan_place_order_logs(\DateTime $start, \DateTime $end, \DateTime $shipped)
{
    $out = [
        'total'    => 0,
        'by_step'  => [],
        'by_class' => [],
        'weekly'   => [],
        'before'   => ['count' => 0, 'validation' => 0, 'payment' => 0],
        'after'    => ['count' => 0, 'validation' => 0, 'payment' => 0],
    ];

    $files = bonton_checkout_health_glob_logs('place-order-debug');
    $tz    = new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ);

    foreach ($files as $file) {
        $parsed = bonton_checkout_health_parse_place_order_file($file);
        if (!$parsed) {
            continue;
        }
        if ($parsed['at'] < $start || $parsed['at'] > $end) {
            continue;
        }

        $week = $parsed['at']->setTimezone($tz)->format('o-\WW');
        if (!isset($out['weekly'][$week])) {
            $out['weekly'][$week] = ['count' => 0, 'validation' => 0, 'payment' => 0];
        }

        $out['total']++;
        $step = $parsed['last_step'];
        $out['by_step'][$step] = isset($out['by_step'][$step]) ? $out['by_step'][$step] + 1 : 1;

        $class = $parsed['class'];
        $out['by_class'][$class] = isset($out['by_class'][$class]) ? $out['by_class'][$class] + 1 : 1;
        $out['weekly'][$week]['count']++;
        if ($class === 'validation') {
            $out['weekly'][$week]['validation']++;
        }
        if ($class === 'payment') {
            $out['weekly'][$week]['payment']++;
        }

        $side = $parsed['at'] >= $shipped ? 'after' : 'before';
        $out[$side]['count']++;
        if ($class === 'validation') {
            $out[$side]['validation']++;
        }
        if ($class === 'payment') {
            $out[$side]['payment']++;
        }
    }

    arsort($out['by_step']);
    arsort($out['by_class']);

    $db = bonton_checkout_health_scan_db_logs('place-order-debug%', $start, $end, $shipped);
    if ($db['total'] > 0) {
        $out['total'] += $db['total'];
        $out['before']['count'] += $db['before'];
        $out['after']['count'] += $db['after'];
        $out['db_rows'] = $db['total'];
    }

    return $out;
}

function bonton_checkout_health_parse_place_order_file($file)
{
    $fh = fopen($file, 'r');
    if (!$fh) {
        return null;
    }

    $first_line = fgets($fh);
    $last_step  = '';
    $last_msg   = '';
    $at         = null;

    if (preg_match('/^(\d{4}-\d{2}-\d{2}T[^\s]+)/', (string) $first_line, $m)) {
        try {
            $at = new \DateTime($m[1]);
        } catch (\Exception $e) {
            $at = null;
        }
    }

    if (preg_match('/\[Shortcode #([^\]]+)\]\s*(.*?)(?:\sCONTEXT:|$)/', (string) $first_line, $m)) {
        $last_step = $m[1];
        $last_msg  = $m[2];
    }

    while (($line = fgets($fh)) !== false) {
        if (preg_match('/\[Shortcode #([^\]]+)\]\s*(.*?)(?:\sCONTEXT:|$)/', $line, $m)) {
            $last_step = $m[1];
            $last_msg  = $m[2];
        }
    }
    fclose($fh);

    if (!$at) {
        return null;
    }

    $class = 'other';
    if (stripos($last_step, 'EXPECTEDFAIL') !== false) {
        $class = bonton_checkout_health_classify_text($last_msg);
        if ($class === 'other') {
            $class = 'exception';
        }
    } elseif (in_array($last_step, ['1', '2'], true)) {
        $class = 'validation';
    } elseif (in_array($last_step, ['3'], true)) {
        $class = 'order_create';
    } elseif (in_array($last_step, ['4', '5'], true)) {
        $class = 'payment';
    }

    return [
        'at'        => $at,
        'last_step' => $last_step !== '' ? '#' . $last_step . ' ' . trim($last_msg) : 'unknown',
        'class'     => $class,
    ];
}

function bonton_checkout_health_scan_moneris_logs(\DateTime $start, \DateTime $end, \DateTime $shipped)
{
    $hits = [
        'files'  => 0,
        'avs'    => 0,
        'cvd'    => 0,
        'declined' => 0,
        'before' => 0,
        'after'  => 0,
    ];

    foreach (bonton_checkout_health_glob_logs('moneris') as $file) {
        $hits['files']++;
        $fh = fopen($file, 'r');
        if (!$fh) {
            continue;
        }
        while (($line = fgets($fh)) !== false) {
            if (!preg_match('/^(\d{4}-\d{2}-\d{2}T[^\s]+)/', $line, $m)) {
                continue;
            }
            try {
                $at = new \DateTime($m[1]);
            } catch (\Exception $e) {
                continue;
            }
            if ($at < $start || $at > $end) {
                continue;
            }
            $side = $at >= $shipped ? 'after' : 'before';
            if (preg_match('/AvsResultCode|AVS /i', $line)) {
                $hits['avs']++;
                $hits[$side]++;
            }
            if (preg_match('/\bCVD\b|\bCSC\b|CvdResultCode/i', $line)) {
                $hits['cvd']++;
            }
            if (preg_match('/declin/i', $line)) {
                $hits['declined']++;
            }
        }
        fclose($fh);
    }

    return $hits;
}

function bonton_checkout_health_scan_named_logs($source, \DateTime $start, \DateTime $end, \DateTime $shipped)
{
    $out = ['files' => 0, 'lines' => 0, 'before' => 0, 'after' => 0, 'by_class' => []];

    foreach (bonton_checkout_health_glob_logs($source) as $file) {
        $out['files']++;
        $fh = fopen($file, 'r');
        if (!$fh) {
            continue;
        }
        while (($line = fgets($fh)) !== false) {
            if (!preg_match('/^(\d{4}-\d{2}-\d{2}T[^\s]+)\s+\w+\s+(.*)$/', $line, $m)) {
                continue;
            }
            try {
                $at = new \DateTime($m[1]);
            } catch (\Exception $e) {
                continue;
            }
            if ($at < $start || $at > $end) {
                continue;
            }
            $out['lines']++;
            $side = $at >= $shipped ? 'after' : 'before';
            $out[$side]++;
            $class = bonton_checkout_health_classify_text($m[2]);
            $out['by_class'][$class] = isset($out['by_class'][$class]) ? $out['by_class'][$class] + 1 : 1;
        }
        fclose($fh);
    }

    $db = bonton_checkout_health_scan_db_logs($source . '%', $start, $end, $shipped);
    $out['db_rows'] = $db['total'];
    $out['before'] += $db['before'];
    $out['after'] += $db['after'];

    return $out;
}

function bonton_checkout_health_glob_logs($source_prefix)
{
    $dir = bonton_checkout_health_log_dir();
    if (!is_dir($dir)) {
        return [];
    }

    $matches = glob(trailingslashit($dir) . $source_prefix . '*.log') ?: [];

    return $matches;
}

function bonton_checkout_health_scan_db_logs($source_like, \DateTime $start, \DateTime $end, \DateTime $shipped)
{
    global $wpdb;

    $out = ['total' => 0, 'before' => 0, 'after' => 0];
    $table = $wpdb->prefix . 'woocommerce_log';
    $found = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table));
    if ($found !== $table) {
        return $out;
    }

    $start_gmt = (clone $start)->setTimezone(new \DateTimeZone('UTC'))->format('Y-m-d H:i:s');
    $end_gmt   = (clone $end)->setTimezone(new \DateTimeZone('UTC'))->format('Y-m-d H:i:s');

    // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
    $rows = $wpdb->get_results($wpdb->prepare(
        "SELECT timestamp FROM {$table} WHERE source LIKE %s AND timestamp BETWEEN %s AND %s",
        $source_like,
        $start_gmt,
        $end_gmt
    ));

    $tz = new \DateTimeZone(BONTON_CHECKOUT_HEALTH_TZ);
    foreach ($rows as $row) {
        $out['total']++;
        try {
            $at = new \DateTime($row->timestamp, new \DateTimeZone('UTC'));
            $at->setTimezone($tz);
        } catch (\Exception $e) {
            continue;
        }
        if ($at >= $shipped) {
            $out['after']++;
        } else {
            $out['before']++;
        }
    }

    return $out;
}

function bonton_checkout_health_months_from_weeks(array $weeks)
{
    $months = [];
    foreach ($weeks as $week) {
        if (empty($week['week_start'])) {
            continue;
        }
        $key = substr($week['week_start'], 0, 7);
        if (!isset($months[$key])) {
            $months[$key] = [
                'month'       => $key,
                'paid'        => 0,
                'failed'      => 0,
                'cancelled'   => 0,
                'avs_address' => 0,
                'cvd'         => 0,
                'fail_rate'   => 0,
            ];
        }
        $months[$key]['paid']        += $week['paid'];
        $months[$key]['failed']      += $week['failed'];
        $months[$key]['cancelled']   += $week['cancelled'];
        $months[$key]['avs_address'] += $week['avs_address'];
        $months[$key]['cvd']         += $week['cvd'];
    }

    foreach ($months as $key => $month) {
        $denom = $month['paid'] + $month['failed'];
        $months[$key]['fail_rate'] = $denom > 0 ? round(100 * $month['failed'] / $denom, 1) : 0;
    }

    return array_values($months);
}

function bonton_checkout_health_pct($row)
{
    $paid   = isset($row['paid']) ? intval($row['paid']) : 0;
    $failed = isset($row['failed']) ? intval($row['failed']) : 0;
    if ($paid + $failed === 0) {
        return '—';
    }
    $rate = isset($row['fail_rate']) ? $row['fail_rate'] : 0;

    return $rate . '%';
}

function bonton_checkout_health_class_label($class)
{
    $map = [
        'avs_address'  => 'AVS / address',
        'cvd'          => 'CVD / card code',
        'decline'      => 'Card declined',
        'validation'   => 'Checkout validation',
        'exception'    => 'Checkout exception',
        'payment'      => 'Payment',
        'order_create' => 'Could not create order',
        'other'        => 'Other / unknown',
    ];

    return isset($map[$class]) ? $map[$class] : $class;
}

function bonton_checkout_health_order_url($order_id)
{
    if (function_exists('wc_get_order')) {
        $order = wc_get_order($order_id);
        if ($order && is_callable([$order, 'get_edit_order_url'])) {
            return $order->get_edit_order_url();
        }
    }

    return admin_url('post.php?post=' . intval($order_id) . '&action=edit');
}

function bonton_checkout_health_fail_bar($rate)
{
    $width = max(0, min(100, floatval($rate)));

    return '<span style="display:inline-block;width:72px;height:8px;background:#dcdcde;vertical-align:middle;margin-right:6px;"><span style="display:block;height:8px;width:' . esc_attr($width) . '%;background:#b32d2e;"></span></span>';
}

function bonton_checkout_health_period_totals(array $weeks, $period)
{
    $paid = $failed = $cancelled = $pending = $avs = $cvd = 0;
    foreach ($weeks as $week) {
        if ($week['period'] !== $period) {
            continue;
        }
        $paid      += $week['paid'];
        $failed    += $week['failed'];
        $cancelled += $week['cancelled'];
        $pending   += $week['pending'];
        $avs       += $week['avs_address'];
        $cvd       += $week['cvd'];
    }
    $denom = $paid + $failed;

    return [
        'paid'        => $paid,
        'failed'      => $failed,
        'cancelled'   => $cancelled,
        'pending'     => $pending,
        'avs_address' => $avs,
        'cvd'         => $cvd,
        'fail_rate'   => $denom > 0 ? round(100 * $failed / $denom, 1) : 0,
    ];
}
