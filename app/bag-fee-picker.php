<?php

namespace App;

/**
 * Pickup bag option select + cart fee (migrated from mu-plugins/bag-fee-picker.php).
 */

function pickup_bag_fee_settings()
{
    return [
        'targeted_methods' => ['local_pickup:3', 'local_pickup:4', 'local_pickup:7', 'local_pickup:9', 'local_pickup:1', 'local_pickup:2', 'local_pickup:5', 'local_pickup:6'],
        'field_id'         => 'pickup_bag_fee',
        'field_type'       => 'select',
        'field_label'      => '',
        'label_name'       => __('pickup_bag_fee', 'woocommerce'),
        'field_options'    => [
            __('Choose your bag option', 'woocommerce'),
            'Paper Shopping Bag(s) - $0.50',
            'Reusable Shopping Bag - $2.50',
            'Reusable Shopping Bag x2 - $5.00',
            'Reusable Shopping Bag x3 - $7.50',
            'No Bags Required - $0',
        ],
    ];
}

function has_pickup_bag_fee_field()
{
    $settings = pickup_bag_fee_settings();
    $chosen_methods = WC()->session->get('chosen_shipping_methods');
    if (!is_array($chosen_methods)) {
        return false;
    }

    return (bool) array_intersect($chosen_methods, $settings['targeted_methods']);
}

function pickup_bag_fee_price_by_option_key()
{
    extract(pickup_bag_fee_settings());
    $prices = [];

    foreach ($field_options as $key => $option_value) {
        $option_key = $key == 0 ? '' : $key;
        $needle = '$';
        $price = strstr($option_value, $needle);
        $prices[$option_key] = $price !== false ? (float) ltrim($price, $needle) : 0.0;
    }

    return $prices;
}

add_action('woocommerce_after_shipping_rate', __NAMESPACE__ . '\\pickup_bag_fee_custom_select_field', 40, 2);

function pickup_bag_fee_custom_select_field($method, $index)
{
    extract(pickup_bag_fee_settings());

    $chosen = WC()->session->get('chosen_shipping_methods');
    $value = WC()->session->get($field_id);
    $value = WC()->session->__isset($field_id) ? $value : WC()->checkout->get_value('_' . $field_id);
    $options = [];

    if (!empty($chosen) && $method->id === $chosen[$index] && in_array($method->id, $targeted_methods, true)) {
        echo '<div class="custom-pickup_bag_fee">';

        foreach ($field_options as $key => $option_value) {
            $option_key = $key == 0 ? '' : $key;
            $options[$option_key] = $option_value;
        }

        woocommerce_form_field($field_id, [
            'type'     => $field_type,
            'label'    => __('Bag option', 'woocommerce'),
            'class'    => ['form-row-wide pickup_options ' . $field_id . '-' . $field_type],
            'required' => true,
            'options'  => $options,
        ], $value);

        echo '</div>';
    }
}

add_action('wp_footer', __NAMESPACE__ . '\\pickup_bag_fee_script_js');

function pickup_bag_fee_script_js()
{
    if (!(is_cart() || (is_checkout() && !is_wc_endpoint_url()))) {
        return;
    }

    extract(pickup_bag_fee_settings());

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
                    action: 'pickup_bag_fee_name',
                    value: value
                },
                success: function () {
                    $('body').trigger('update_checkout');
                    var $update = $('body').find('[name="update_cart"]');
                    if ($update.length) {
                        $(document.body).data('bontonReloadCartAfterTotals', true);
                        $update.prop('disabled', false).trigger('click');
                    }
                }
            });
        });
    });
    </script>
    <?php
}

add_action('wp_ajax_pickup_bag_fee_name', __NAMESPACE__ . '\\set_pickup_bag_fee_name');
add_action('wp_ajax_nopriv_pickup_bag_fee_name', __NAMESPACE__ . '\\set_pickup_bag_fee_name');

function set_pickup_bag_fee_name()
{
    if (!isset($_POST['value'])) {
        wp_die();
    }

    extract(pickup_bag_fee_settings());

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

add_action('woocommerce_cart_calculate_fees', __NAMESPACE__ . '\\pickup_bag_fee');

function pickup_bag_fee()
{
    if (is_admin() && !defined('DOING_AJAX')) {
        return;
    }

    extract(pickup_bag_fee_settings());

    $chosen = WC()->session->get('chosen_shipping_methods');
    if (!is_array($chosen) || !array_intersect($chosen, $targeted_methods)) {
        return;
    }

    if (bonton_shipping_select_is_empty($field_id)) {
        return;
    }

    $prices = pickup_bag_fee_price_by_option_key();
    $selected_key = WC()->session->get($field_id);

    if (!isset($prices[$selected_key])) {
        return;
    }

    WC()->cart->add_fee(__('Bag Fee', 'woocommerce'), $prices[$selected_key], true);
}

add_action('woocommerce_checkout_create_order', __NAMESPACE__ . '\\save_pickup_bag_fee_as_order_meta', 30, 1);

function save_pickup_bag_fee_as_order_meta($order)
{
    extract(pickup_bag_fee_settings());

    if (has_pickup_bag_fee_field() && isset($_POST[$field_id]) && !empty($_POST[$field_id])) {
        $order->update_meta_data('_' . $field_id, $field_options[esc_attr(wp_unslash($_POST[$field_id]))]);
        WC()->session->__unset($field_id);
    }
}

/* -------------------------------------------------------------------------
 * Required shipping selects (timeslot + bag; cart and checkout)
 * ------------------------------------------------------------------------- */

add_action('woocommerce_check_cart_items', __NAMESPACE__ . '\\bonton_validate_required_shipping_selects');
add_action('woocommerce_checkout_process', __NAMESPACE__ . '\\bonton_validate_required_shipping_selects');

function bonton_validate_required_shipping_selects()
{
    foreach (bonton_missing_shipping_options() as $label) {
        wc_add_notice(
            sprintf(
                __('Please choose a %s before continuing.', 'woocommerce'),
                '<strong>' . esc_html($label) . '</strong>'
            ),
            'error'
        );
    }
}

add_action('template_redirect', __NAMESPACE__ . '\\bonton_redirect_checkout_when_shipping_options_incomplete', 5);

function bonton_redirect_checkout_when_shipping_options_incomplete()
{
    if (!function_exists('is_checkout') || !is_checkout() || is_wc_endpoint_url()) {
        return;
    }

    $missing = bonton_missing_shipping_options();
    if ($missing === []) {
        return;
    }

    wc_clear_notices();
    bonton_validate_required_shipping_selects();
    wp_safe_redirect(wc_get_cart_url());
    exit;
}

add_action('wp_footer', __NAMESPACE__ . '\\bonton_shipping_options_cart_ui_js', 25);

function bonton_shipping_options_cart_ui_js()
{
    if (!is_cart()) {
        return;
    }
    ?>
    <script type="text/javascript">
    jQuery(function ($) {
        var $collaterals = $('.cart-collaterals');
        var $selects = $('select#timeslot_pickup, select#pickup_bag_fee, select#timeslot');

        function shippingSelectIncomplete($select) {
            if (!$select.length) {
                return false;
            }
            var val = $select.val();
            return val === '' || val === null || val === '0';
        }

        function updateShippingOptionsUi() {
            if ($('body').hasClass('giftcertificate-only')) {
                $collaterals.removeClass('shipping-options-incomplete');
                $selects.removeClass('woocommerce-invalid');
                return;
            }

            var incomplete = false;
            $selects.each(function () {
                var $el = $(this);
                var fieldIncomplete = shippingSelectIncomplete($el);
                $el.toggleClass('woocommerce-invalid', fieldIncomplete);
                if (fieldIncomplete) {
                    incomplete = true;
                }
            });

            $collaterals.toggleClass('shipping-options-incomplete', incomplete);
        }

        updateShippingOptionsUi();
        $selects.on('change', updateShippingOptionsUi);
        $(document.body).on('updated_cart_totals', updateShippingOptionsUi);

        $(document).on('click', '.cart-collaterals.shipping-options-incomplete a.checkout-button', function (e) {
            e.preventDefault();
        });
    });
    </script>
    <?php
}
