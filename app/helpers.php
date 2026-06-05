<?php

namespace App;

use Roots\Sage\Container;

/**
 * Get the sage container.
 *
 * @param string $abstract
 * @param array  $parameters
 * @param Container $container
 * @return Container|mixed
 */
function sage($abstract = null, $parameters = [], Container $container = null)
{
    $container = $container ?: Container::getInstance();
    if (!$abstract) {
        return $container;
    }
    return $container->bound($abstract)
        ? $container->makeWith($abstract, $parameters)
        : $container->makeWith("sage.{$abstract}", $parameters);
}

/**
 * Get / set the specified configuration value.
 *
 * If an array is passed as the key, we will assume you want to set an array of values.
 *
 * @param array|string $key
 * @param mixed $default
 * @return mixed|\Roots\Sage\Config
 * @copyright Taylor Otwell
 * @link https://github.com/laravel/framework/blob/c0970285/src/Illuminate/Foundation/helpers.php#L254-L265
 */
function config($key = null, $default = null)
{
    if (is_null($key)) {
        return sage('config');
    }
    if (is_array($key)) {
        return sage('config')->set($key);
    }
    return sage('config')->get($key, $default);
}

/**
 * @param string $file
 * @param array $data
 * @return string
 */
function template($file, $data = [])
{
    return sage('blade')->render($file, $data);
}

/**
 * Retrieve path to a compiled blade view
 * @param $file
 * @param array $data
 * @return string
 */
function template_path($file, $data = [])
{
    return sage('blade')->compiledPath($file, $data);
}

/**
 * @param $asset
 * @return string
 */
function asset_path($asset)
{
    return sage('assets')->getUri($asset);
}

/**
 * @param string|string[] $templates Possible template files
 * @return array
 */
function filter_templates($templates)
{
    $paths = apply_filters('sage/filter_templates/paths', [
        'views',
        'resources/views'
    ]);
    $paths_pattern = "#^(" . implode('|', $paths) . ")/#";

    return collect($templates)
        ->map(function ($template) use ($paths_pattern) {
            /** Remove .blade.php/.blade/.php from template names */
            $template = preg_replace('#\.(blade\.?)?(php)?$#', '', ltrim($template));

            /** Remove partial $paths from the beginning of template names */
            if (strpos($template, '/')) {
                $template = preg_replace($paths_pattern, '', $template);
            }

            return $template;
        })
        ->flatMap(function ($template) use ($paths) {
            return collect($paths)
                ->flatMap(function ($path) use ($template) {
                    return [
                        "{$path}/{$template}.blade.php",
                        "{$path}/{$template}.php",
                    ];
                })
                ->concat([
                    "{$template}.blade.php",
                    "{$template}.php",
                ]);
        })
        ->filter()
        ->unique()
        ->all();
}

/**
 * @param string|string[] $templates Relative path to possible template files
 * @return string Location of the template
 */
function locate_template($templates)
{
    return \locate_template(filter_templates($templates));
}

/**
 * Determine whether to show the sidebar
 * @return bool
 */
function display_sidebar()
{
    static $display;
    isset($display) || $display = apply_filters('sage/display_sidebar', false);
    return $display;
}

/**
 * Check whether a product_cat term (or any of its ancestors) lives
 * inside the "collections" category tree.
 *
 * @param  \WP_Term $term
 * @param  int      $collections_term_id  The term_id of the root "collections" term.
 * @return bool
 */
function is_in_collections($term, $collections_term_id)
{
    if (!$term || !$collections_term_id) {
        return false;
    }

    if ((int) $term->term_id === $collections_term_id) {
        return true;
    }

    // Walk up the parent chain to see if any ancestor is "collections".
    $parent_id = $term->parent;
    while ($parent_id) {
        if ((int) $parent_id === $collections_term_id) {
            return true;
        }
        $parent = get_term($parent_id, 'product_cat');
        if (is_wp_error($parent) || !$parent) {
            break;
        }
        $parent_id = $parent->parent;
    }

    return false;
}

/**
 * Get the most appropriate display category for a WooCommerce product.
 *
 * Selection rules (in priority order):
 *  1. Yoast SEO primary category – if set, valid, is a subcategory, and
 *     is NOT inside the "collections" tree.
 *  2. First subcategory term that is NOT inside the "collections" tree.
 *  3. Empty string when only top-level or "collections" terms remain
 *     (we intentionally hide top-level category names).
 *
 * @param  int    $product_id  WooCommerce product (post) ID.
 * @return string  The category name to display, or empty string.
 */
function get_product_display_category($product_id)
{
    $terms = get_the_terms($product_id, 'product_cat');

    if (!$terms || is_wp_error($terms) || !count($terms)) {
        return '';
    }

    // Resolve the root "collections" term once.
    $collections_root    = get_term_by('slug', 'collections', 'product_cat');
    $collections_term_id = $collections_root ? (int) $collections_root->term_id : 0;

    // --- 1. Try Yoast SEO primary category --------------------------------
    $selected_term = null;

    if (class_exists('WPSEO_Primary_Term')) {
        try {
            $wpseo = new \WPSEO_Primary_Term('product_cat', $product_id);
            $primary_cat_id = $wpseo->get_primary_term();

            if ($primary_cat_id && !is_wp_error($primary_cat_id)) {
                foreach ($terms as $term) {
                    if ((int) $term->term_id === (int) $primary_cat_id) {
                        $selected_term = $term;
                        break;
                    }
                }
            }
        } catch (\Throwable $e) {
            $selected_term = null;
        }
    }

    // Fallback: use the first term.
    if (!$selected_term && isset($terms[0])) {
        $selected_term = $terms[0];
    }

    // --- 2. Prefer the selected term if it's a valid subcategory ----------
    if (
        $selected_term
        && $selected_term->parent != 0
        && !is_in_collections($selected_term, $collections_term_id)
    ) {
        return $selected_term->name;
    }

    // --- 3. Pick any other non-top-level term not in "collections" --------
    foreach ($terms as $term) {
        if ($term->parent != 0 && !is_in_collections($term, $collections_term_id)) {
            return $term->name;
        }
    }

    // --- 4. Nothing suitable – intentionally return empty -----------------
    return '';
}

/**
 * Single category for inventory/list tables: Yoast primary when set on the product,
 * otherwise the first category in the same order as WooCommerce's category list
 * (get_the_terms / get_the_term_list).
 *
 * @param  int    $product_id  WooCommerce product ID.
 * @return array{html: string, parent: string} Linked category HTML and parent term ID.
 */
function get_product_inventory_category_row($product_id)
{
    $empty = ['html' => '', 'parent' => ''];
    $terms = get_the_terms($product_id, 'product_cat');

    if (!$terms || is_wp_error($terms) || !count($terms)) {
        return $empty;
    }

    $selected = null;

    if (class_exists('WPSEO_Primary_Term')) {
        try {
            $wpseo          = new \WPSEO_Primary_Term('product_cat', $product_id);
            $primary_cat_id = $wpseo->get_primary_term();

            if ($primary_cat_id && !is_wp_error($primary_cat_id)) {
                foreach ($terms as $term) {
                    if ((int) $term->term_id === (int) $primary_cat_id) {
                        $selected = $term;
                        break;
                    }
                }
            }
        } catch (\Throwable $e) {
            $selected = null;
        }
    }

    if (!$selected) {
        $selected = $terms[0];
    }

    $link = get_term_link($selected, 'product_cat');

    if (is_wp_error($link)) {
        $html = esc_html($selected->name);
    } else {
        $html = sprintf(
            '<a href="%s" rel="tag">%s</a>',
            esc_url($link),
            esc_html($selected->name)
        );
    }

    return [
        'html'    => $html,
        'parent'  => (string) (int) $selected->parent,
    ];
}

/**
 * Fetch the most popular WooCommerce products by total sales.
 *
 * @param  int   $count  Number of products to return.
 * @return array Array of WP_Post objects.
 */
function get_most_popular_products($count = 6)
{
    return get_posts([
        'post_type'      => 'product',
        'post_status'    => 'publish',
        'posts_per_page' => $count,
        'meta_key'       => 'total_sales',
        'orderby'        => 'meta_value_num',
        'order'          => 'DESC',
    ]);
}

/**
 * Fetch the newest WooCommerce products by publish date.
 *
 * @param  int   $count  Number of products to return.
 * @return array Array of WP_Post objects.
 */
function get_newest_products($count = 6)
{
    return get_posts([
        'post_type'      => 'product',
        'post_status'    => 'publish',
        'posts_per_page' => $count,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);
}

/**
 * Gift certificate product IDs (digital-only carts skip pickup/bag/timeslot requirements).
 *
 * @return int[]
 */
function bonton_gift_certificate_product_ids()
{
    return [5317, 18153, 18200];
}

/**
 * Whether the cart contains only gift certificate line items.
 */
function bonton_is_gift_certificate_only_cart()
{
    if (!function_exists('WC') || !WC()->cart || WC()->cart->is_empty()) {
        return false;
    }

    $cart_count = 0;
    $gc_count = 0;
    $gc_ids = bonton_gift_certificate_product_ids();

    foreach (WC()->cart->get_cart() as $cart_item) {
        $cart_count++;
        $product_id = (int) apply_filters(
            'woocommerce_cart_item_product_id',
            $cart_item['product_id'],
            $cart_item,
            $cart_item['key'] ?? ''
        );

        if (in_array($product_id, $gc_ids, true)) {
            $gc_count++;
        }
    }

    return $gc_count > 0 && ($cart_count - $gc_count) < 1;
}

/**
 * Whether a shipping-option select (session / POST) has no real choice yet.
 */
function bonton_shipping_select_is_empty($field_id)
{
    if (isset($_POST[$field_id])) {
        return $_POST[$field_id] === '' || $_POST[$field_id] === '0';
    }

    if (!function_exists('WC') || !WC()->session || !WC()->session->__isset($field_id)) {
        return true;
    }

    $value = WC()->session->get($field_id);

    return $value === '' || $value === null || $value === 0 || $value === '0';
}

/**
 * Human-readable labels for required shipping selects that are still empty.
 *
 * @return string[]
 */
function bonton_missing_shipping_options()
{
    if (bonton_is_gift_certificate_only_cart()) {
        return [];
    }

    $missing = [];

    if (has_timeslot_field() && bonton_shipping_select_is_empty('timeslot')) {
        $missing[] = __('delivery time', 'woocommerce');
    }

    if (has_timeslot_pickup_field() && bonton_shipping_select_is_empty('timeslot_pickup')) {
        $missing[] = __('pickup time slot', 'woocommerce');
    }

    if (has_pickup_bag_fee_field() && bonton_shipping_select_is_empty('pickup_bag_fee')) {
        $missing[] = __('bag option', 'woocommerce');
    }

    return $missing;
}

/**
 * Whether all required pickup/delivery selects have been chosen.
 */
function bonton_cart_shipping_options_complete()
{
    return bonton_missing_shipping_options() === [];
}

/**
 * Delivery blackout dates (Y-m-d) from ACF options.
 *
 * @return string[]
 */
function bonton_delivery_blackout_dates_ymd()
{
    static $cache = null;

    if ($cache !== null) {
        return $cache;
    }

    $cache = [];

    if (!function_exists('have_rows') || !have_rows('delivery_blackout_dates', 'option')) {
        return $cache;
    }

    while (have_rows('delivery_blackout_dates', 'option')) {
        the_row();
        $date = get_sub_field('blackout_date');
        if (!$date) {
            continue;
        }

        $normalized = bonton_normalize_date_to_ymd($date);
        if ($normalized) {
            $cache[] = $normalized;
        }
    }

    return $cache;
}

/**
 * Normalize ACF / session date strings to Y-m-d.
 */
function bonton_normalize_date_to_ymd($date)
{
    $date = trim((string) $date);
    if ($date === '') {
        return null;
    }

    foreach (['!Y-m-d', '!Ymd', '!d/m/Y'] as $format) {
        $parsed = \DateTime::createFromFormat($format, $date);
        if ($parsed) {
            return $parsed->format('Y-m-d');
        }
    }

    $timestamp = strtotime($date);

    return $timestamp ? date('Y-m-d', $timestamp) : null;
}

/**
 * Delivery messaging for a selected pickup date.
 *
 * @param string|null $pickup_ymd Selected pickup date (Y-m-d), or null if none.
 * @return array{variant: string, html: string, toast: string}
 */
function bonton_delivery_note_for_pickup_date($pickup_ymd = null)
{
    $default_html = __('Home delivery available on Saturdays!', 'sage');
    $result = [
        'variant' => 'default',
        'html'    => $default_html,
        'toast'   => '',
    ];

    if (!$pickup_ymd) {
        return $result;
    }

    $pickup_ymd = bonton_normalize_date_to_ymd($pickup_ymd);
    if (!$pickup_ymd) {
        return $result;
    }

    $tz = new \DateTimeZone('America/Edmonton');
    $pickup = \DateTime::createFromFormat('!Y-m-d', $pickup_ymd, $tz);
    if (!$pickup) {
        return $result;
    }

    $blackouts = bonton_delivery_blackout_dates_ymd();
    $day = $pickup->format('l');
    $human = $pickup->format('l, F j');

    if ($day === 'Saturday' && in_array($pickup_ymd, $blackouts, true)) {
        $line = sprintf(
            __('FYI: Home delivery is not available on %s. In-store pickup is still available.', 'sage'),
            $human
        );

        return [
            'variant' => 'warning',
            'html'    => $line,
            'toast'   => $line,
        ];
    }

    if ($day === 'Saturday') {
        return [
            'variant' => 'default',
            'html'    => __('Home delivery is available on your selected Saturday!', 'sage'),
            'toast'   => '',
        ];
    }

    // Weekday pickup: keep the same FYI as before (don't imply they wanted delivery today).
    return $result;
}

/**
 * Shipping address parts for staff lists / exports.
 *
 * Legacy orders (third-party delivery layout) stored house # + street in address_1/2
 * and unit in billing_unitno/shipping_unitno meta. New orders use standard WooCommerce
 * address_1 (street) and address_2 (apartment, when provided).
 *
 * @return array{unit: string, street: string}
 */
function bonton_order_shipping_address_for_lists(\WC_Order $order)
{
    $legacy_unit = trim((string) $order->get_meta('shipping_unitno', true));
    if ($legacy_unit === '') {
        $legacy_unit = trim((string) $order->get_meta('billing_unitno', true));
    }

    $line1 = trim((string) $order->get_shipping_address_1());
    $line2 = trim((string) $order->get_shipping_address_2());

    if ($legacy_unit !== '') {
        return [
            'unit'   => $legacy_unit,
            'street' => trim($line1 . ' ' . $line2),
        ];
    }

    return [
        'unit'   => $line2,
        'street' => $line1,
    ];
}

/**
 * Whether the customer has entered enough of a shipping address to show on the cart
 * (city or postcode). Country/state defaults alone should not count.
 *
 * @param array<string, string> $destination WooCommerce package destination.
 */
function bonton_has_meaningful_shipping_destination($destination)
{
    $city = isset($destination['city']) ? trim((string) $destination['city']) : '';
    $postcode = isset($destination['postcode']) ? trim((string) $destination['postcode']) : '';

    return $city !== '' || $postcode !== '';
}

/**
 * Whether the current user is a wholesale account.
 */
function bonton_is_wholesale_user()
{
    if (!is_user_logged_in()) {
        return false;
    }

    return in_array('wcwp_wholesale', (array) wp_get_current_user()->roles, true);
}

/**
 * Whether the cart contains ice cream (product 2045), which disables delivery.
 */
function bonton_cart_has_icecream()
{
    if (!function_exists('WC') || !WC()->cart) {
        return false;
    }

    foreach (WC()->cart->get_cart() as $cart_item) {
        if ((int) $cart_item['product_id'] === 2045) {
            return true;
        }
    }

    return false;
}

/**
 * Whether any cart line has ACF delivery_exclusion.
 */
function bonton_cart_has_delivery_exclusion_product()
{
    if (!function_exists('WC') || !WC()->cart) {
        return false;
    }

    foreach (WC()->cart->get_cart() as $cart_item) {
        if (get_field('delivery_exclusion', $cart_item['product_id'])) {
            return true;
        }
    }

    return false;
}

/**
 * Saturday / blackout / cart rules for showing the delivery shipping option.
 * Does not check WooCommerce zone coverage — use bonton_shipping_rates_include_delivery().
 */
function bonton_cart_delivery_eligible_by_date_rules()
{
    if (bonton_cart_has_icecream()) {
        return false;
    }

    if (bonton_is_wholesale_user()) {
        return true;
    }

    if (!function_exists('WC') || !WC()->session) {
        return false;
    }

    $session_date_object = WC()->session->get('pickup_date_object');
    if (!$session_date_object instanceof \DateTime) {
        return false;
    }

    $pickup_date = $session_date_object->format('Y-m-d');

    if ($session_date_object->format('l') !== 'Saturday') {
        return false;
    }

    if (in_array($pickup_date, bonton_delivery_blackout_dates_ymd(), true)) {
        return false;
    }

    if (bonton_cart_has_delivery_exclusion_product()) {
        return false;
    }

    return true;
}

/**
 * Whether a WooCommerce shipping method ID is home delivery (not pickup).
 */
function bonton_is_delivery_shipping_method($method_id)
{
    $method_id = (string) $method_id;

    return str_contains($method_id, 'flat_rate') || str_contains($method_id, 'alg_wc_shipping');
}

/**
 * Whether calculated shipping packages include a delivery rate for the current destination.
 *
 * @param array<int, array<string, mixed>>|null $packages
 */
function bonton_shipping_rates_include_delivery($packages = null)
{
    if ($packages === null && function_exists('WC') && WC()->shipping()) {
        $packages = WC()->shipping()->get_packages();
    }

    if (empty($packages[0]['rates']) || !is_array($packages[0]['rates'])) {
        return false;
    }

    foreach ($packages[0]['rates'] as $rate) {
        if ($rate instanceof \WC_Shipping_Rate && bonton_is_delivery_shipping_method($rate->get_id())) {
            return true;
        }
    }

    return false;
}

/**
 * Parsed checkout form data from update_order_review AJAX (post_data) or [] when unavailable.
 *
 * @return array<string, string>
 */
function bonton_get_checkout_posted_form_data()
{
    if (!empty($_POST['post_data'])) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
        $parsed = [];
        parse_str(wp_unslash($_POST['post_data']), $parsed); // phpcs:ignore WordPress.Security.NonceVerification.Missing

        return is_array($parsed) ? $parsed : [];
    }

    if (!empty($_POST['woocommerce-process-checkout-nonce'])) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
        $posted = [];
        foreach ($_POST as $key => $value) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
            if (is_string($key) && is_scalar($value)) {
                $posted[ $key ] = (string) $value;
            }
        }

        return $posted;
    }

    return [];
}

/**
 * Build a WooCommerce package destination from checkout billing or shipping fields.
 *
 * @param array<string, string> $data Posted checkout form values.
 * @return array<string, string>
 */
function bonton_checkout_destination_from_post($data)
{
    $ship_elsewhere = !empty($data['ship_to_different_address']) && !wc_ship_to_billing_address_only();
    $prefix         = $ship_elsewhere ? 'shipping' : 'billing';
    $destination    = [];

    foreach (['country', 'state', 'postcode', 'city', 'address_1', 'address_2'] as $field) {
        $key = $prefix . '_' . $field;
        if (!empty($data[ $key ])) {
            $destination[ $field ] = wc_clean(wp_unslash($data[ $key ]));
        }
    }

    if (!empty($destination['address_1'])) {
        $destination['address'] = $destination['address_1'];
    }

    if (empty($destination['country'])) {
        $destination['country'] = 'CA';
    }

    return $destination;
}

/**
 * Persist shipping destination on the customer record (for rates + order review).
 *
 * @param array<string, string> $destination
 */
function bonton_apply_customer_shipping_destination($destination)
{
    if (!function_exists('WC') || !WC()->customer) {
        return;
    }

    $customer = WC()->customer;
    $map      = [
        'country'   => 'set_shipping_country',
        'state'     => 'set_shipping_state',
        'postcode'  => 'set_shipping_postcode',
        'city'      => 'set_shipping_city',
        'address_1' => 'set_shipping_address_1',
        'address_2' => 'set_shipping_address_2',
    ];

    foreach ($map as $field => $setter) {
        if (isset($destination[ $field ]) && is_callable([$customer, $setter])) {
            $customer->{$setter}($destination[ $field ]);
        }
    }

    $customer->set_calculated_shipping(true);
    $customer->save();
}

/**
 * Top-level WooCommerce category IDs for six+ GST zero-rating (not bulk discount).
 *
 * 83 = Bakery, 84 = Pâtisserie (child categories such as Sweet Buns are included
 * via bonton_gst_all_category_term_ids()).
 *
 * @return int[]
 */
function bonton_gst_bakery_category_ids()
{
    return [83, 84];
}

/**
 * Parent GST categories plus all descendant product_cat term IDs.
 *
 * @return int[]
 */
function bonton_gst_all_category_term_ids()
{
    static $cached = null;

    if ($cached !== null) {
        return $cached;
    }

    $cached = array_map('intval', bonton_gst_bakery_category_ids());

    foreach (bonton_gst_bakery_category_ids() as $parent_id) {
        $children = get_term_children($parent_id, 'product_cat');

        if (is_wp_error($children) || empty($children)) {
            continue;
        }

        foreach ($children as $child_id) {
            $cached[] = (int) $child_id;
        }
    }

    $cached = array_values(array_unique($cached));

    return $cached;
}

/**
 * Whether a product is in Bakery, Pâtisserie, or any of their subcategories.
 *
 * @param int $product_id
 */
function bonton_product_in_gst_tax_categories($product_id)
{
    return has_term(bonton_gst_all_category_term_ids(), 'product_cat', $product_id);
}

/**
 * Minimum number of single-serving equivalents in the cart before the theme
 * applies zero-rate to eligible bread/bun lines (CRA: more than five = six or more).
 */
function bonton_gst_six_plus_serving_threshold()
{
    return 6;
}

/**
 * Count GST "single serving" equivalents for Bakery / Pâtisserie category items in the cart.
 * Used for paragraph 1(m)-style quantity relief on multi-serving bakery orders.
 *
 * @param \WC_Cart $cart
 */
function bonton_gst_cart_serving_count($cart)
{
    $total = 0;

    foreach ($cart->get_cart() as $cart_item) {
        if (!bonton_product_in_gst_tax_categories($cart_item['product_id'])) {
            continue;
        }

        $product = $cart_item['data'];
        if (!$product || !is_a($product, \WC_Product::class)) {
            continue;
        }

        if ($product->get_tax_status() !== 'taxable') {
            continue;
        }

        $quantity = (int) $cart_item['quantity'];
        $attributes = $product->get_attributes();

        if (isset($attributes['pa_package-size'])) {
            $size = $attributes['pa_package-size'];

            if ($size === 'half-dozen' || $size === '6-pack') {
                $quantity *= 6;
            } elseif ($size === 'dozen') {
                $quantity *= 12;
            }
        }

        $total += $quantity;
    }

    return $total;
}

/**
 * When the cart has six or more Bakery/Pâtisserie servings (see bonton_gst_cart_serving_count),
 * set zero-rate on taxable lines in those categories for checkout.
 *
 * @param \WC_Cart $cart
 */
function bonton_apply_gst_cart_zero_rate($cart)
{
    if (is_admin() && !defined('DOING_AJAX')) {
        return;
    }

    if (did_action('woocommerce_before_calculate_totals') >= 2) {
        return;
    }

    if (bonton_gst_cart_serving_count($cart) < bonton_gst_six_plus_serving_threshold()) {
        return;
    }

    foreach ($cart->get_cart() as $cart_item) {
        if (isset($cart_item['price_excl_tax'])) {
            $cart_item['data']->set_price($cart_item['price_excl_tax']);
        }

        if (!bonton_product_in_gst_tax_categories($cart_item['product_id'])) {
            continue;
        }

        $cart_item['data']->set_tax_class('zero-rate');
    }
}

/**
 * Bulk discount is a non-tax promotional fee; prevent WooCommerce from spreading
 * negative fee tax across other taxable cart lines.
 *
 * @param array  $fee_taxes
 * @param object $fee
 * @return array
 */
function bonton_zero_bulk_discount_fee_taxes($fee_taxes, $fee)
{
    if (!empty($fee->object->name) && stripos($fee->object->name, 'Bulk discount') !== false) {
        return [];
    }

    return $fee_taxes;
}

