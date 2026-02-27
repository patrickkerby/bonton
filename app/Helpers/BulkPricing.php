<?php

namespace App\Helpers;

class BulkPricing
{
    const TIER_1_THRESHOLD = 5;
    const TIER_2_THRESHOLD = 10;
    const TIER_1_DISCOUNT = 0.10;
    const TIER_2_DISCOUNT = 0.20;

    private static $excluded_products = [
        899, 963, 1087, 1119, 1164, 1988, 1158, 1168, 1177,
        2098, 8703, 8516, 10167, 10144, 10036, 10028, 11723,
    ];

    /**
     * Product categories eligible for bulk pricing: Bread (52), Buns & Bagels (91)
     */
    public static function get_bulk_terms()
    {
        return [91, 52];
    }

    /**
     * Check whether the bulk discount feature is currently enabled,
     * accounting for ACF toggle and blackout dates.
     */
    public static function is_enabled()
    {
        $enabled = get_field('bulk_discount', 'option');
        if (!$enabled) {
            return false;
        }

        $blackout_dates = get_field('bulk_discount_blackout_dates', 'option');
        if ($blackout_dates) {
            $blackout_array = array_map(function ($b) {
                return $b['date'];
            }, $blackout_dates);

            $session_date = WC()->session ? WC()->session->get('pickup_date_formatted') : null;
            if ($session_date && in_array($session_date, $blackout_array)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check whether a specific product ID is eligible for bulk pricing.
     */
    public static function is_product_eligible($product_id)
    {
        if (in_array($product_id, self::$excluded_products)) {
            return false;
        }

        $exclusion_set = get_field('bulk_discount_exclusion', $product_id);
        if ($exclusion_set === true) {
            return false;
        }

        return has_term(self::get_bulk_terms(), 'product_cat', $product_id);
    }

    /**
     * Convert a cart item's raw quantity to "units" based on package size.
     * 1 unit = 1 half-dozen (6 individual items).
     */
    public static function quantity_to_units($cart_item)
    {
        $quantity = $cart_item['quantity'];
        $attributes = $cart_item['data']->get_attributes();

        if (!isset($attributes['pa_package-size'])) {
            return $quantity;
        }

        $size = $attributes['pa_package-size'];

        switch ($size) {
            case 'single':
                return $quantity * (1 / 6);
            case 'dozen':
                return $quantity * 2;
            case 'half-dozen':
            case '6-pack':
            default:
                return $quantity;
        }
    }

    /**
     * Calculate the discount amount for a single cart item,
     * accounting for singles rounding (only multiples of 6).
     *
     * @param array $cart_item WooCommerce cart item array
     * @param float $discount_rate e.g. 0.10 for 10%
     * @return float The savings amount for this item
     */
    public static function get_item_discount($cart_item, $discount_rate)
    {
        if ($discount_rate <= 0) {
            return 0;
        }

        $price = $cart_item['data']->get_price();
        $quantity = $cart_item['quantity'];
        $attributes = $cart_item['data']->get_attributes();
        $size = isset($attributes['pa_package-size']) ? $attributes['pa_package-size'] : '';

        if ($size === 'single') {
            $discountable_qty = $quantity - ($quantity % 6);
            return $price * $discount_rate * $discountable_qty;
        }

        return $price * $discount_rate * $quantity;
    }

    /**
     * Read-only calculation of current bulk discount progress.
     * Does NOT modify any cart prices.
     *
     * @return array {
     *   enabled: bool,
     *   total_units: float,
     *   current_tier: int (0, 10, or 20),
     *   current_discount: float (0, 0.10, or 0.20),
     *   next_tier: int|null (10, 20, or null),
     *   next_tier_target: int (5 or 10),
     *   units_to_next: float,
     *   savings: float,
     *   eligible_product_ids: int[],
     * }
     */
    public static function get_progress()
    {
        $default = [
            'enabled'              => false,
            'total_units'          => 0,
            'current_tier'         => 0,
            'current_discount'     => 0,
            'next_tier'            => 10,
            'next_tier_target'     => self::TIER_1_THRESHOLD,
            'units_to_next'        => (float) self::TIER_1_THRESHOLD,
            'savings'              => 0,
            'eligible_product_ids' => [],
        ];

        if (!function_exists('WC') || !WC()->cart) {
            return $default;
        }

        if (!self::is_enabled()) {
            return $default;
        }

        $roles = is_user_logged_in()
            ? (array) wp_get_current_user()->roles
            : [];

        if (in_array('wcwp_wholesale', $roles)) {
            return $default;
        }

        $total_units = 0;
        $eligible_ids = [];
        $savings = 0;

        foreach (WC()->cart->get_cart() as $cart_item) {
            $product_id = $cart_item['product_id'];

            if (!self::is_product_eligible($product_id)) {
                continue;
            }

            $eligible_ids[] = $product_id;
            $total_units += self::quantity_to_units($cart_item);
        }

        // Determine current tier
        $current_tier = 0;
        $current_discount = 0;
        $next_tier = 10;
        $next_tier_target = self::TIER_1_THRESHOLD;

        if ($total_units >= self::TIER_2_THRESHOLD) {
            $current_tier = 20;
            $current_discount = self::TIER_2_DISCOUNT;
            $next_tier = null;
            $next_tier_target = self::TIER_2_THRESHOLD;
        } elseif ($total_units >= self::TIER_1_THRESHOLD) {
            $current_tier = 10;
            $current_discount = self::TIER_1_DISCOUNT;
            $next_tier = 20;
            $next_tier_target = self::TIER_2_THRESHOLD;
        }

        $units_to_next = $next_tier !== null
            ? max(0, $next_tier_target - $total_units)
            : 0;

        if ($current_discount > 0) {
            foreach (WC()->cart->get_cart() as $cart_item) {
                if (!self::is_product_eligible($cart_item['product_id'])) {
                    continue;
                }
                $savings += self::get_item_discount($cart_item, $current_discount);
            }
        }

        return [
            'enabled'              => true,
            'total_units'          => $total_units,
            'current_tier'         => $current_tier,
            'current_discount'     => $current_discount,
            'next_tier'            => $next_tier,
            'next_tier_target'     => $next_tier_target,
            'units_to_next'        => $units_to_next,
            'savings'              => $savings,
            'eligible_product_ids' => array_unique($eligible_ids),
        ];
    }
}
