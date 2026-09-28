<?php

namespace App;

/**
 * Simplified checkout: cart owns pickup/delivery/timeslot/bags; checkout is
 * identity + confirmation; Moneris (or other gateways) open in a pay modal.
 */

add_filter('body_class', __NAMESPACE__ . '\\bonton_checkout_body_class');

function bonton_checkout_body_class($classes)
{
    if (function_exists('is_checkout') && is_checkout() && !is_wc_endpoint_url()) {
        $classes[] = 'bonton-checkout-simplified';
        if (bonton_checkout_is_delivery()) {
            $classes[] = 'bonton-checkout-delivery';
        } else {
            $classes[] = 'bonton-checkout-pickup';
        }
        if (bonton_is_gift_certificate_only_cart()) {
            $classes[] = 'giftcertificate-only';
        }
    }

    return $classes;
}

add_filter('wc_points_rewards_should_render_redeem_points_message', __NAMESPACE__ . '\\bonton_checkout_hide_plugin_points_notices');
add_filter('wc_points_rewards_should_render_earn_points_message', __NAMESPACE__ . '\\bonton_checkout_hide_plugin_points_notices');

function bonton_checkout_hide_plugin_points_notices($render)
{
    if (function_exists('is_checkout') && is_checkout() && !is_wc_endpoint_url()) {
        return false;
    }

    return $render;
}

add_action('woocommerce_before_checkout_form', __NAMESPACE__ . '\\bonton_checkout_unhook_inline_payment', 1);

function bonton_checkout_unhook_inline_payment()
{
    remove_action('woocommerce_checkout_order_review', 'woocommerce_checkout_payment', 20);
}

add_action('template_redirect', __NAMESPACE__ . '\\bonton_checkout_lock_intended_shipping', 20);

function bonton_checkout_lock_intended_shipping()
{
    if (!function_exists('WC') || !WC()->session) {
        return;
    }

    if (function_exists('is_cart') && is_cart()) {
        WC()->session->__unset('bonton_checkout_intended_shipping');

        return;
    }

    if (!function_exists('is_checkout') || !is_checkout() || is_wc_endpoint_url()) {
        return;
    }

    if (WC()->session->get('bonton_checkout_intended_shipping')) {
        return;
    }

    $chosen = WC()->session->get('chosen_shipping_methods');
    if (!empty($chosen[0]) && is_string($chosen[0])) {
        WC()->session->set('bonton_checkout_intended_shipping', $chosen[0]);
    }
}

add_filter('woocommerce_cart_needs_shipping_address', __NAMESPACE__ . '\\bonton_checkout_needs_shipping_address');

function bonton_checkout_needs_shipping_address($needs)
{
    if (!bonton_checkout_is_delivery()) {
        return false;
    }

    return $needs;
}

add_filter('woocommerce_ship_to_different_address_checked', '__return_false', 20);

add_action('woocommerce_checkout_process', __NAMESPACE__ . '\\bonton_checkout_reject_silent_pickup_switch', 5);

function bonton_checkout_reject_silent_pickup_switch()
{
    $intended = bonton_checkout_intended_shipping_method();
    if (!$intended || !bonton_is_delivery_shipping_method($intended)) {
        return;
    }

    $chosen = WC()->session ? WC()->session->get('chosen_shipping_methods') : [];
    if (!empty($chosen[0]) && bonton_is_delivery_shipping_method($chosen[0])) {
        return;
    }

    wc_add_notice(
        __('We cannot deliver to that address. Please enter a different address, or return to the cart to choose pickup.', 'sage'),
        'error'
    );
}

add_filter('woocommerce_checkout_fields', __NAMESPACE__ . '\\bonton_checkout_field_layout', 10010);

function bonton_checkout_field_layout($fields)
{
    if (isset($fields['billing']['billing_company'])) {
        $fields['billing']['billing_company']['class'][] = 'hidden';
    }

    if (isset($fields['billing']['billing_email'])) {
        $fields['billing']['billing_email']['priority'] = 4;
        $fields['billing']['billing_email']['class']    = ['form-row-wide'];
        $fields['billing']['billing_email']['label']    = __('Email Address', 'sage');
    }

    if (isset($fields['billing']['billing_first_name'])) {
        $fields['billing']['billing_first_name']['class'] = ['form-row-first'];
    }

    if (isset($fields['billing']['billing_last_name'])) {
        $fields['billing']['billing_last_name']['class'] = ['form-row-last'];
    }

    if (isset($fields['billing']['billing_address_1'])) {
        $fields['billing']['billing_address_1']['class']       = ['form-row-first', 'address-field', 'checkout-street-field'];
        $fields['billing']['billing_address_1']['placeholder'] = '';
        $fields['billing']['billing_address_1']['label']       = __('Street Address', 'sage');
    }

    if (isset($fields['billing']['billing_address_2'])) {
        $fields['billing']['billing_address_2']['class']       = ['form-row-last', 'address-field', 'checkout-apt-field'];
        $fields['billing']['billing_address_2']['label']       = __('Apt / suite', 'sage');
        $fields['billing']['billing_address_2']['label_class'] = [];
        $fields['billing']['billing_address_2']['placeholder'] = '';
        $fields['billing']['billing_address_2']['priority']    = 55;
    }

    if (isset($fields['billing']['billing_city'])) {
        $fields['billing']['billing_city']['class'] = ['form-row-first', 'address-field'];
        $fields['billing']['billing_city']['label'] = __('Town / City', 'sage');
    }

    if (isset($fields['billing']['billing_state'])) {
        $fields['billing']['billing_state']['class'] = ['form-row-last', 'address-field'];
        $fields['billing']['billing_state']['label'] = __('Province', 'sage');
    }

    if (isset($fields['billing']['billing_postcode'])) {
        $fields['billing']['billing_postcode']['class']    = ['form-row-first', 'address-field'];
        $fields['billing']['billing_postcode']['priority'] = 85;
    }

    if (isset($fields['billing']['billing_phone'])) {
        $fields['billing']['billing_phone']['class']    = ['form-row-last'];
        $fields['billing']['billing_phone']['priority'] = 90;
        $fields['billing']['billing_phone']['label']    = __('Phone', 'sage');
    }

    foreach (['shipping'] as $type) {
        if (isset($fields[$type]['shipping_first_name'])) {
            $fields[$type]['shipping_first_name']['class'] = ['form-row-first'];
        }
        if (isset($fields[$type]['shipping_last_name'])) {
            $fields[$type]['shipping_last_name']['class'] = ['form-row-last'];
        }
        if (isset($fields[$type]['shipping_address_1'])) {
            $fields[$type]['shipping_address_1']['class'] = ['form-row-first', 'address-field', 'checkout-street-field'];
            $fields[$type]['shipping_address_1']['label'] = __('Street Address', 'sage');
        }
        if (isset($fields[$type]['shipping_address_2'])) {
            $fields[$type]['shipping_address_2']['class']       = ['form-row-last', 'address-field', 'checkout-apt-field'];
            $fields[$type]['shipping_address_2']['label']       = __('Apt / suite', 'sage');
            $fields[$type]['shipping_address_2']['label_class'] = [];
            $fields[$type]['shipping_address_2']['placeholder'] = '';
        }
        if (isset($fields[$type]['shipping_city'])) {
            $fields[$type]['shipping_city']['class'] = ['form-row-first', 'address-field'];
        }
        if (isset($fields[$type]['shipping_state'])) {
            $fields[$type]['shipping_state']['class'] = ['form-row-last', 'address-field'];
        }
        if (isset($fields[$type]['shipping_postcode'])) {
            $fields[$type]['shipping_postcode']['class'] = ['form-row-first', 'address-field'];
        }
        if (isset($fields[$type]['shipping_phone'])) {
            $fields[$type]['shipping_phone']['class'] = ['form-row-last'];
        }
    }

    if (isset($fields['order']['order_comments'])) {
        $fields['order']['order_comments']['label']       = __('Order notes', 'sage');
        $fields['order']['order_comments']['placeholder'] = __('Notes about your order, e.g. special delivery instructions.', 'sage');
    }

    return $fields;
}

add_filter('woocommerce_get_country_locale', __NAMESPACE__ . '\\bonton_checkout_locale_layout', 10010);

function bonton_checkout_locale_layout($locales)
{
    $layout = [
        'address_1' => ['class' => ['form-row-first', 'address-field', 'checkout-street-field']],
        'address_2' => [
            'class'       => ['form-row-last', 'address-field', 'checkout-apt-field'],
            'label'       => __('Apt / suite', 'sage'),
            'placeholder' => '',
        ],
        'city'      => ['class' => ['form-row-first', 'address-field']],
        'state'     => ['class' => ['form-row-last', 'address-field']],
        'postcode'  => ['class' => ['form-row-first', 'address-field']],
    ];

    foreach ($locales as $country => $fields) {
        if (!is_array($fields)) {
            continue;
        }

        foreach ($layout as $key => $args) {
            $locales[$country][$key] = isset($locales[$country][$key]) && is_array($locales[$country][$key])
                ? array_merge($locales[$country][$key], $args)
                : $args;
        }
    }

    return $locales;
}

add_filter('woocommerce_create_account_default_checked', '__return_false');

add_action('wp_ajax_bonton_checkout_email_account', __NAMESPACE__ . '\\bonton_ajax_checkout_email_account');
add_action('wp_ajax_nopriv_bonton_checkout_email_account', __NAMESPACE__ . '\\bonton_ajax_checkout_email_account');
add_action('wp_ajax_nopriv_bonton_checkout_login', __NAMESPACE__ . '\\bonton_ajax_checkout_login');

function bonton_ajax_checkout_email_account()
{
    check_ajax_referer('bonton_nonce', 'nonce');

    if (is_user_logged_in()) {
        wp_send_json(['exists' => false]);
    }

    if (!bonton_checkout_email_ajax_allowed('bonton_email_chk_', 20, 5 * MINUTE_IN_SECONDS)) {
        wp_send_json(['exists' => false]);
    }

    $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    if (!$email || !is_email($email)) {
        wp_send_json(['exists' => false]);
    }

    wp_send_json(['exists' => (bool) email_exists($email)]);
}

function bonton_ajax_checkout_login()
{
    check_ajax_referer('bonton_nonce', 'nonce');

    if (is_user_logged_in()) {
        wp_send_json(['success' => true]);
    }

    if (!bonton_checkout_email_ajax_allowed('bonton_login_chk_', 8, 10 * MINUTE_IN_SECONDS)) {
        wp_send_json([
            'success' => false,
            'message' => __('Too many attempts. Please wait a few minutes and try again.', 'sage'),
        ]);
    }

    $email    = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    $password = isset($_POST['password']) ? (string) wp_unslash($_POST['password']) : '';

    if (!$email || !is_email($email) || $password === '' || !email_exists($email)) {
        wp_send_json([
            'success' => false,
            'message' => __('Invalid email or password.', 'sage'),
        ]);
    }

    $user = wp_signon(
        [
            'user_login'    => $email,
            'user_password' => $password,
            'remember'      => true,
        ],
        is_ssl()
    );

    if (is_wp_error($user)) {
        wp_send_json([
            'success' => false,
            'message' => __('Invalid email or password.', 'sage'),
        ]);
    }

    wp_send_json(['success' => true]);
}

function bonton_checkout_email_ajax_allowed($prefix, $max, $ttl)
{
    $ip    = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '0';
    $key   = $prefix . md5($ip);
    $count = (int) get_transient($key);
    if ($count >= $max) {
        return false;
    }
    set_transient($key, $count + 1, $ttl);

    return true;
}

add_action('wp_footer', __NAMESPACE__ . '\\bonton_checkout_ui_js', 32);

function bonton_checkout_ui_js()
{
    if (!function_exists('is_checkout') || !is_checkout() || is_wc_endpoint_url()) {
        return;
    }

    $email_check = [
        'url'   => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('bonton_nonce'),
    ];
    ?>
    <script type="text/javascript">
    jQuery(function ($) {
        var $form = $('form.checkout');
        if (!$form.length) {
            return;
        }

        var $modal = $('.bonton-pay-modal');
        var $open = $('.bonton-pay-open');
        var $includePayment = $('#bonton_include_payment');
        var emailCheck = <?php echo wp_json_encode($email_check); ?>;

        var $email = $('#billing_email');
        var $welcome = $('.checkout-welcome-back');
        if ($email.length && $welcome.length) {
            var lastCheckedEmail = '';
            var knownExists = {};
            var dismissedAsGuest = {};
            var pendingCheck = null;
            var inputTimer = null;
            var $password = $('#bonton-welcome-password');
            var $welcomeError = $welcome.find('.checkout-welcome-back__error');
            var $loginBtn = $welcome.find('.checkout-welcome-back__login');

            function looksLikeEmail(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }

            function currentEmail() {
                return $.trim($email.val() || '').toLowerCase();
            }

            function setHasAccountEmail(hasAccount) {
                $('body').toggleClass('bonton-has-account-email', hasAccount);
                $('#createaccount').prop('checked', false).trigger('change');
            }

            function showWelcomeBack() {
                var alreadyOpen = !$welcome.prop('hidden');
                $welcome.prop('hidden', false);
                if (!alreadyOpen) {
                    $welcomeError.prop('hidden', true).text('');
                    $password.val('');
                }
                setHasAccountEmail(true);
            }

            function hideWelcomeBack() {
                $welcome.prop('hidden', true);
                $welcomeError.prop('hidden', true).text('');
                $password.val('');
            }

            function focusAfterEmail() {
                var $next = $('#billing_first_name');
                if ($next.length) {
                    $next.trigger('focus');
                }
            }

            function checkExistingAccount() {
                var email = currentEmail();
                var deferred = $.Deferred();
                if (!email || !looksLikeEmail(email)) {
                    hideWelcomeBack();
                    setHasAccountEmail(false);
                    lastCheckedEmail = '';
                    return deferred.resolve(false).promise();
                }
                if (Object.prototype.hasOwnProperty.call(knownExists, email)) {
                    lastCheckedEmail = email;
                    if (knownExists[email] && !dismissedAsGuest[email]) {
                        showWelcomeBack();
                        return deferred.resolve(true).promise();
                    }
                    hideWelcomeBack();
                    setHasAccountEmail(!!knownExists[email]);
                    return deferred.resolve(!!knownExists[email]).promise();
                }
                if (pendingCheck && lastCheckedEmail === email) {
                    return pendingCheck;
                }

                lastCheckedEmail = email;
                pendingCheck = deferred.promise();
                $.post(emailCheck.url, {
                    action: 'bonton_checkout_email_account',
                    nonce: emailCheck.nonce,
                    email: email
                }).done(function (res) {
                    var exists = !!(res && res.exists);
                    knownExists[email] = exists;
                    if (currentEmail() !== email) {
                        deferred.resolve(!!knownExists[currentEmail()]);
                        return;
                    }
                    if (exists && !dismissedAsGuest[email]) {
                        showWelcomeBack();
                    } else {
                        hideWelcomeBack();
                        setHasAccountEmail(exists);
                    }
                    deferred.resolve(exists);
                }).fail(function () {
                    deferred.resolve(false);
                }).always(function () {
                    pendingCheck = null;
                });

                return pendingCheck;
            }

            $email.on('input', function () {
                window.clearTimeout(inputTimer);
                inputTimer = window.setTimeout(checkExistingAccount, 400);
            });
            $email.on('blur change', checkExistingAccount);
            $email.on('keydown', function (e) {
                if (e.key !== 'Tab' || e.shiftKey) {
                    return;
                }
                var email = currentEmail();
                if (!looksLikeEmail(email)) {
                    return;
                }
                if (!$welcome.prop('hidden')) {
                    e.preventDefault();
                    $password.trigger('focus');
                    return;
                }
                e.preventDefault();
                checkExistingAccount().done(function (exists) {
                    if (exists && !dismissedAsGuest[email] && !$welcome.prop('hidden')) {
                        $password.trigger('focus');
                    } else {
                        focusAfterEmail();
                    }
                });
            });

            $welcome.on('click', '.checkout-welcome-back__guest', function () {
                var email = currentEmail();
                dismissedAsGuest[email] = true;
                hideWelcomeBack();
                setHasAccountEmail(true);
                focusAfterEmail();
            });

            $welcome.on('click', '.checkout-welcome-back__login', function () {
                var email = currentEmail();
                var password = $password.val();
                $welcomeError.prop('hidden', true).text('');
                if (!password) {
                    $welcomeError.text(<?php echo wp_json_encode(__('Enter your password to log in.', 'sage')); ?>).prop('hidden', false);
                    $password.trigger('focus');
                    return;
                }
                $loginBtn.prop('disabled', true);
                $.post(emailCheck.url, {
                    action: 'bonton_checkout_login',
                    nonce: emailCheck.nonce,
                    email: email,
                    password: password
                }).done(function (res) {
                    if (res && res.success) {
                        window.location.reload();
                        return;
                    }
                    $welcomeError.text((res && res.message) || <?php echo wp_json_encode(__('Invalid email or password.', 'sage')); ?>).prop('hidden', false);
                    $password.trigger('focus');
                }).fail(function () {
                    $welcomeError.text(<?php echo wp_json_encode(__('Could not log in. Please try again.', 'sage')); ?>).prop('hidden', false);
                }).always(function () {
                    $loginBtn.prop('disabled', false);
                });
            });

            $password.on('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    $loginBtn.trigger('click');
                }
            });

            window.setTimeout(checkExistingAccount, 400);
        }

        function checkoutHasVisibleErrors() {
            $form.find('.input-text, select, input:checkbox').trigger('validate');
            return $form.find('.woocommerce-invalid-required-field:visible, .woocommerce-invalid-email:visible').length > 0;
        }

        function scrollToFirstError() {
            var $invalid = $form.find('.woocommerce-invalid:visible').first();
            if (!$invalid.length) {
                return;
            }
            $('html, body').animate({
                scrollTop: Math.max(0, $invalid.offset().top - 120)
            }, 250);
        }

        function openPayModal() {
            if (!$modal.length) {
                return;
            }
            $modal.attr('hidden', false).addClass('is-open');
            $('body').addClass('bonton-pay-modal-open');
            $modal.find('.bonton-pay-modal__close').trigger('focus');
        }

        function closePayModal() {
            $modal.attr('hidden', true).removeClass('is-open');
            $('body').removeClass('bonton-pay-modal-open');
            $open.trigger('focus');
        }

        $open.on('click', function (e) {
            e.preventDefault();
            if ($(this).is('[disabled], .is-disabled')) {
                return;
            }
            if (checkoutHasVisibleErrors()) {
                scrollToFirstError();
                return;
            }

            var $methods = $('#payment input[name="payment_method"]');
            var chosen = $methods.filter(':checked').val();
            if (chosen === 'cod' && $methods.length <= 1) {
                $form.trigger('submit');
                return;
            }

            if ($includePayment.length) {
                $includePayment.val('1');
            }
            $(document.body).one('updated_checkout', function () {
                openPayModal();
            });
            $(document.body).trigger('update_checkout');
            window.setTimeout(function () {
                if (!$modal.hasClass('is-open')) {
                    openPayModal();
                }
            }, 1200);
        });

        $modal.on('click', '.bonton-pay-modal__close, .bonton-pay-modal__backdrop', function (e) {
            e.preventDefault();
            closePayModal();
        });

        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && $modal.hasClass('is-open')) {
                closePayModal();
            }
        });

        $form.on('click', '.checkout-notes-toggle', function (e) {
            e.preventDefault();
            var $panel = $('.checkout-notes-panel');
            var open = $panel.hasClass('is-open');
            $panel.toggleClass('is-open', !open).prop('hidden', open);
            $(this).attr('aria-expanded', open ? 'false' : 'true');
        });

        var $shipToggle = $('#ship-to-different-address-checkbox');
        if ($shipToggle.length) {
            $('.checkout-ship-different').on('click', function (e) {
                e.preventDefault();
                $shipToggle.prop('checked', !$shipToggle.prop('checked')).trigger('change');
                $(this).toggleClass('is-active', $shipToggle.is(':checked'));
            });
            $('.checkout-ship-different').toggleClass('is-active', $shipToggle.is(':checked'));
        }

        var $pointsForm = $('#bonton-checkout-points-form');
        var $pointsPill = $('.checkout-points-pill');
        if ($pointsForm.length && $pointsPill.length) {
            $pointsForm.on('submit', function () {
                $pointsPill.prop('disabled', true).addClass('is-applying');
            });
            $(document.body).on('updated_checkout', function () {
                if ($('.cart-discount').length) {
                    $pointsPill.remove();
                    $pointsForm.remove();
                } else {
                    $pointsPill.prop('disabled', false).removeClass('is-applying');
                }
            });
        }
    });
    </script>
    <?php
}

function bonton_checkout_hidden_shipping_option_fields()
{
    if (!function_exists('WC') || !WC()->session) {
        return;
    }

    foreach (['timeslot', 'timeslot_pickup', 'pickup_bag_fee'] as $field_id) {
        if (!WC()->session->__isset($field_id)) {
            continue;
        }

        $value = WC()->session->get($field_id);
        if ($value === '' || $value === null) {
            continue;
        }

        printf(
            '<input type="hidden" name="%1$s" id="%1$s" value="%2$s" />',
            esc_attr($field_id),
            esc_attr((string) $value)
        );
    }
}

add_filter('woocommerce_update_order_review_fragments', __NAMESPACE__ . '\\bonton_force_payment_fragment_when_requested', 90);

function bonton_force_payment_fragment_when_requested($fragments)
{
    $data = bonton_get_checkout_posted_form_data();
    if (empty($data['bonton_include_payment'])) {
        return $fragments;
    }

    if (function_exists('WC') && WC()->session) {
        WC()->session->__unset('bonton_checkout_payment_signature');
    }

    return $fragments;
}
