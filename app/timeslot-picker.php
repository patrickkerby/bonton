<?php

namespace App;

/**
 * Delivery + pickup timeslot selects on cart/checkout (previously mu-plugins/timeslot-picker.php).
 * Pickup afternoon slot uses 2pm–5pm when session pickup date is Saturday (store closes at 5pm).
 */

/* -------------------------------------------------------------------------
 * Pickup date from WC session (same as cart / WoocommerceCart)
 * ------------------------------------------------------------------------- */

function bonton_session_pickup_date_object()
{
    if (!function_exists('WC') || !WC()->session) {
        return null;
    }

    $obj = WC()->session->get('pickup_date_object');
    if ($obj instanceof \DateTimeInterface) {
        return $obj;
    }

    $pickup = WC()->session->get('pickup_date');
    if (is_string($pickup) && $pickup !== '') {
        $parsed = \DateTime::createFromFormat(
            'l, F j, Y',
            $pickup,
            new \DateTimeZone('America/Edmonton')
        );
        if ($parsed) {
            return $parsed;
        }
    }

    return null;
}

function bonton_pickup_date_is_saturday()
{
    $obj = bonton_session_pickup_date_object();

    return $obj && $obj->format('l') === 'Saturday';
}

/* -------------------------------------------------------------------------
 * Gift certificate body class (fires on every shipping rate — legacy behavior)
 * ------------------------------------------------------------------------- */

add_action('woocommerce_after_shipping_rate', __NAMESPACE__ . '\\is_giftcertificate', 20, 2);

function is_giftcertificate()
{
    $giftcertificate_in_cart = false;
    $cart_count = 0;
    $gc_cart_count = 0;

    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
        $giftcertificate_in_cart = false;
        $cart_count++;

        $product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);

        if ($product_id == 5317 || $product_id == 18153 || $product_id == 18200) {
            $giftcertificate_in_cart = true;
            $gc_cart_count++;
        }
    }

    $cart_count = $cart_count - $gc_cart_count;

    if ($giftcertificate_in_cart && $cart_count < 1) {
        $giftcertificate_only_item_in_cart = true;
    } else {
        $giftcertificate_only_item_in_cart = false;
    }

    if ($giftcertificate_only_item_in_cart == true) {
        add_filter('body_class', function ($classes) {
            $classes[] = 'giftcertificate-only';

            return $classes;
        });
    }
}

/* -------------------------------------------------------------------------
 * Delivery timeslots
 * ------------------------------------------------------------------------- */

function timeslot_settings()
{
    return [
        'targeted_methods' => ['flat_rate:2', 'flat_rate:5', 'flat_rate:6', 'flat_rate:8', 'flat_rate:1', 'flat_rate:3', 'flat_rate:4', 'flat_rate:7'],
        'field_id'         => 'timeslot',
        'field_type'       => 'select',
        'field_label'      => '',
        'label_name'       => __('timeslot', 'woocommerce'),
        'field_options'    => [
            __('Choose a delivery time', 'woocommerce'),
            'Between 10 am &amp; 2 pm',
        ],
    ];
}

add_action('woocommerce_after_shipping_rate', __NAMESPACE__ . '\\timeslot_company_custom_select_field', 20, 2);

function timeslot_company_custom_select_field($method, $index)
{
    extract(timeslot_settings());

    $chosen = WC()->session->get('chosen_shipping_methods');
    $value = WC()->session->get($field_id);
    $value = WC()->session->__isset($field_id) ? $value : WC()->checkout->get_value('_' . $field_id);
    $options = [];

    if (!empty($chosen) && $method->id === $chosen[$index] && in_array($method->id, $targeted_methods)) {
        echo '<div class="custom-timeslot">';

        foreach ($field_options as $key => $option_value) {
            $option_key = $key == 0 ? '' : $key;
            $options[$option_key] = $option_value;
        }

        woocommerce_form_field($field_id, [
            'type'     => $field_type,
            'label'    => '',
            'class'    => ['form-row-wide ' . $field_id . '-' . $field_type],
            'required' => true,
            'options'  => $options,
        ], $value);

        echo '</div>';
    }
}

add_action('wp_footer', __NAMESPACE__ . '\\timeslot_company_script_js');

function timeslot_company_script_js()
{
    if (!(is_cart() || (is_checkout() && !is_wc_endpoint_url()))) {
        return;
    }

    extract(timeslot_settings());

    $js_variable = is_cart() ? 'wc_cart_params' : 'wc_checkout_params';
    ?>
    <script type="text/javascript">
    jQuery(function ($) {
        if (typeof <?php echo $js_variable; ?> === 'undefined') {
            return;
        }
        $(document.body).on('change', 'select#<?php echo esc_js($field_id); ?>', function () {
            var value = $(this).val();
            $.ajax({
                type: 'POST',
                url: <?php echo $js_variable; ?>.ajax_url,
                data: {
                    action: 'timeslot_name',
                    value: value
                }
            });
        });
    });
    </script>
    <?php
}

add_action('wp_ajax_timeslot_name', __NAMESPACE__ . '\\set_timeslot');
add_action('wp_ajax_nopriv_timeslot_name', __NAMESPACE__ . '\\set_timeslot');

function set_timeslot()
{
    if (!isset($_POST['value'])) {
        return;
    }

    extract(timeslot_settings());

    if (empty($_POST['value'])) {
        $value = 0;
        $label = 'Empty';
    } else {
        $value = $label = esc_attr(wp_unslash($_POST['value']));
    }

    WC()->session->set($field_id, $value);

    echo $label . ' | ' . $field_options[$value];
    wp_die();
}

function has_timeslot_field()
{
    $settings = timeslot_settings();
    $chosen_methods = WC()->session->get('chosen_shipping_methods');
    if (!is_array($chosen_methods)) {
        return false;
    }

    return array_intersect($chosen_methods, $settings['targeted_methods']);
}

add_action('woocommerce_checkout_process', __NAMESPACE__ . '\\timeslot_company_checkout_validation');

function timeslot_company_checkout_validation()
{
    extract(timeslot_settings());

    if (has_timeslot_field() && isset($_POST[$field_id]) && empty($_POST[$field_id])) {
        wc_add_notice(
            sprintf(
                __('Please select a %s as it is a required field.', 'woocommerce'),
                '<strong>' . $label_name . '</strong>'
            ),
            'error'
        );
    }
}

add_action('woocommerce_checkout_create_order', __NAMESPACE__ . '\\save_timeslot_company_as_order_meta', 30, 1);

function save_timeslot_company_as_order_meta($order)
{
    extract(timeslot_settings());

    if (has_timeslot_field() && isset($_POST[$field_id]) && !empty($_POST[$field_id])) {
        $order->update_meta_data('_' . $field_id, $field_options[esc_attr(wp_unslash($_POST[$field_id]))]);
        WC()->session->__unset($field_id);
    }
}

add_action('woocommerce_admin_order_data_after_order_details', __NAMESPACE__ . '\\admin_order_display_timeslot_company', 30, 1);

function admin_order_display_timeslot_company($order)
{
    extract(timeslot_settings());

    $timeslot = $order->get_meta('_' . $field_id);

    if (!empty($timeslot)) {
        echo '<p><strong>' . esc_html($label_name) . '</strong>: ' . esc_html($timeslot) . '</p>';
    }
}

add_filter('woocommerce_get_order_item_totals', __NAMESPACE__ . '\\display_timeslot_on_order_item_totals', 1000, 3);

function display_timeslot_on_order_item_totals($total_rows, $order, $tax_display)
{
    extract(timeslot_settings());

    $timeslot = $order->get_meta('_' . $field_id);

    if (!empty($timeslot)) {
        $new_total_rows = [];

        foreach ($total_rows as $key => $values) {
            $new_total_rows[$key] = $values;

            if ($key === 'shipping') {
                $new_total_rows[$field_id] = [
                    'label' => $label_name,
                    'value' => $timeslot,
                ];
            }
        }

        return $new_total_rows;
    }

    return $total_rows;
}

/* -------------------------------------------------------------------------
 * Pickup timeslots
 * ------------------------------------------------------------------------- */

function timeslot_pickup_settings()
{
    $afternoon_label = bonton_pickup_date_is_saturday() ? '2pm - 5pm' : '2pm - 6pm';

    return [
        'targeted_methods' => ['local_pickup:3', 'local_pickup:4', 'local_pickup:7', 'local_pickup:9', 'local_pickup:1', 'local_pickup:2', 'local_pickup:5', 'local_pickup:6'],
        'field_id'         => 'timeslot_pickup',
        'field_type'       => 'select',
        'field_label'      => '',
        'label_name'       => __('timeslot_pickup', 'woocommerce'),
        'field_options'    => [
            __('Choose a time slot', 'woocommerce'),
            '9am - 11am',
            '11am - 2pm',
            $afternoon_label,
        ],
    ];
}

add_action('woocommerce_after_shipping_rate', __NAMESPACE__ . '\\timeslot_pickup_company_custom_select_field', 20, 2);

function timeslot_pickup_company_custom_select_field($method, $index)
{
    extract(timeslot_pickup_settings());

    $chosen = WC()->session->get('chosen_shipping_methods');
    $value = WC()->session->get($field_id);
    $value = WC()->session->__isset($field_id) ? $value : WC()->checkout->get_value('_' . $field_id);
    $options = [];

    if (!empty($chosen) && $method->id === $chosen[$index] && in_array($method->id, $targeted_methods)) {
        echo '<div class="custom-timeslot_pickup">';
        echo '<h6><strong>Pickup Timeslot:</strong></h6>';

        foreach ($field_options as $key => $option_value) {
            $option_key = $key == 0 ? '' : $key;
            $options[$option_key] = $option_value;
        }

        woocommerce_form_field($field_id, [
            'type'     => $field_type,
            'label'    => '',
            'class'    => ['form-row-wide pickup_options ' . $field_id . '-' . $field_type],
            'required' => true,
            'options'  => $options,
        ], $value);

        echo '</div>';
    }
}

add_action('wp_footer', __NAMESPACE__ . '\\timeslot_pickup_company_script_js');

function timeslot_pickup_company_script_js()
{
    if (!(is_cart() || (is_checkout() && !is_wc_endpoint_url()))) {
        return;
    }

    extract(timeslot_pickup_settings());

    $js_variable = is_cart() ? 'wc_cart_params' : 'wc_checkout_params';
    ?>
    <script type="text/javascript">
    jQuery(function ($) {
        if (typeof <?php echo $js_variable; ?> === 'undefined') {
            return;
        }
        $(document.body).on('change', 'select#<?php echo esc_js($field_id); ?>', function () {
            var value = $(this).val();
            $.ajax({
                type: 'POST',
                url: <?php echo $js_variable; ?>.ajax_url,
                data: {
                    action: 'timeslot_pickup_name',
                    value: value
                }
            });
        });
    });
    </script>
    <?php
}

add_action('wp_ajax_timeslot_pickup_name', __NAMESPACE__ . '\\set_timeslot_pickup_company_name');
add_action('wp_ajax_nopriv_timeslot_pickup_name', __NAMESPACE__ . '\\set_timeslot_pickup_company_name');

function set_timeslot_pickup_company_name()
{
    if (!isset($_POST['value'])) {
        return;
    }

    extract(timeslot_pickup_settings());

    if (empty($_POST['value'])) {
        $value = 0;
        $label = 'Empty';
    } else {
        $value = $label = esc_attr(wp_unslash($_POST['value']));
    }

    WC()->session->set($field_id, $value);

    echo $label . ' | ' . $field_options[$value];
    wp_die();
}

function has_timeslot_pickup_field()
{
    $settings = timeslot_pickup_settings();
    $chosen_methods = WC()->session->get('chosen_shipping_methods');
    if (!is_array($chosen_methods)) {
        return false;
    }

    return array_intersect($chosen_methods, $settings['targeted_methods']);
}

add_action('woocommerce_checkout_process', __NAMESPACE__ . '\\timeslot_pickup_company_checkout_validation');

function timeslot_pickup_company_checkout_validation()
{
    extract(timeslot_pickup_settings());

    if (has_timeslot_pickup_field() && isset($_POST[$field_id]) && empty($_POST[$field_id])) {
        // Intentionally no notice (legacy).
    }
}

add_action('woocommerce_checkout_create_order', __NAMESPACE__ . '\\save_timeslot_pickup_company_as_order_meta', 30, 1);

function save_timeslot_pickup_company_as_order_meta($order)
{
    extract(timeslot_pickup_settings());

    if (has_timeslot_pickup_field() && isset($_POST[$field_id]) && !empty($_POST[$field_id])) {
        $order->update_meta_data('_' . $field_id, $field_options[esc_attr(wp_unslash($_POST[$field_id]))]);
        WC()->session->__unset($field_id);
    }
}

add_action('woocommerce_admin_order_data_after_order_details', __NAMESPACE__ . '\\admin_order_display_timeslot_pickup_company', 30, 1);

function admin_order_display_timeslot_pickup_company($order)
{
    extract(timeslot_pickup_settings());

    $timeslot_pickup = $order->get_meta('_' . $field_id);

    if (!empty($timeslot_pickup)) {
        echo '<p><strong>' . esc_html($label_name) . '</strong>: ' . esc_html($timeslot_pickup) . '</p>';
    }
}

add_filter('woocommerce_get_order_item_totals', __NAMESPACE__ . '\\display_timeslot_pickup_company_on_order_item_totals', 1000, 3);

function display_timeslot_pickup_company_on_order_item_totals($total_rows, $order, $tax_display)
{
    extract(timeslot_pickup_settings());

    $timeslot_pickup = $order->get_meta('_' . $field_id);

    if (!empty($timeslot_pickup)) {
        $new_total_rows = [];

        foreach ($total_rows as $key => $values) {
            $new_total_rows[$key] = $values;

            if ($key === 'shipping') {
                $new_total_rows[$field_id] = [
                    'label' => $label_name,
                    'value' => $timeslot_pickup,
                ];
            }
        }

        return $new_total_rows;
    }

    return $total_rows;
}
