<?php

namespace App;

/**
 * Condo welcome bonus: award a fixed points grant when the configured coupon is
 * used on a paid-path order. Uses WooCommerce Points & Rewards APIs so balances
 * and the points log stay in sync — do not write to *_wc_points_rewards_user_points
 * manually.
 *
 * Set **one** coupon code below (or use the `bonton_condo_welcome_coupon_code` filter).
 * In WooCommerce, edit that coupon and set **Usage limit per user** to 1 if you want
 * each account limited to a single redemption; sharing the code or extra accounts is
 * intentionally not blocked in this code.
 *
 * @link https://woocommerce.com/document/points-and-rewards-developer-documentation/
 */

/**
 * Coupon code that unlocks the welcome bonus (comparison is case-insensitive).
 * Leave empty to disable this feature.
 */
function bonton_condo_welcome_coupon_code_default(): string
{
    return '49west+bonton';
}

function bonton_condo_welcome_get_coupon_code(): string
{
    return trim(apply_filters('bonton_condo_welcome_coupon_code', bonton_condo_welcome_coupon_code_default()));
}

/**
 * Prevents double award when both processing and completed hooks run for the same order.
 */
const BONTON_CONDO_WELCOME_ORDER_META = '_bonton_condo_welcome_points_awarded';

/**
 * @param int|\WC_Order $order
 */
function bonton_condo_welcome_maybe_award_points($order): void
{
    if (!class_exists('\WC_Points_Rewards_Manager')) {
        return;
    }

    $code = strtolower(bonton_condo_welcome_get_coupon_code());
    if ($code === '') {
        return;
    }

    $order = $order instanceof \WC_Order ? $order : wc_get_order($order);
    if (!$order) {
        return;
    }

    if ($order->get_meta(BONTON_CONDO_WELCOME_ORDER_META) === 'yes') {
        return;
    }

    $userId = (int) $order->get_user_id();
    if ($userId < 1) {
        return;
    }

    $used = array_map('strtolower', $order->get_coupon_codes());
    if (!in_array($code, $used, true)) {
        return;
    }

    $points = (int) apply_filters('bonton_condo_welcome_points_amount', 1000);
    if ($points <= 0) {
        return;
    }

    $orderId = $order->get_id();
    $data = [
        'order_id' => $orderId,
        'coupon' => $code,
    ];

    \WC_Points_Rewards_Manager::increase_points(
        $userId,
        $points,
        'bonton-condo-welcome-coupon',
        $data
    );

    $order->update_meta_data(BONTON_CONDO_WELCOME_ORDER_META, 'yes');
    $order->save();
}

add_action('woocommerce_order_status_processing', function ($orderId) {
    bonton_condo_welcome_maybe_award_points((int) $orderId);
}, 20);

add_action('woocommerce_order_status_completed', function ($orderId) {
    bonton_condo_welcome_maybe_award_points((int) $orderId);
}, 20);

add_filter('wc_points_rewards_event_description', function ($description, $eventType, $event) {
    if ($eventType === 'bonton-condo-welcome-coupon') {
        $label = get_option('wc_points_rewards_points_label', __('Points', 'woocommerce-points-and-rewards'));
        return sprintf(
            __('%1$s: Condo welcome bonus (coupon)', 'sage'),
            $label
        );
    }
    return $description;
}, 10, 3);
