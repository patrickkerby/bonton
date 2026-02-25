<?php

namespace App\Controllers;

use Sober\Controller\Controller;
use DateTime;

class WoocommerceCart extends Controller
{
    const GIFT_CERTIFICATE_ID = 5317;
    const CUTOFF_HOUR = '15:00';
    const DATE_FORMAT = '!d/m/Y';
    const TIMEZONE = 'America/Edmonton';

    /**
     * Whether the current time is past the daily cutoff hour (3pm).
     */
    public function post3pm()
    {
        date_default_timezone_set(self::TIMEZONE);
        $currenthour = (int) date('H');
        $cutoff = (int) date('H', strtotime(self::CUTOFF_HOUR));

        return $currenthour > $cutoff;
    }

    private $_post_date_processed = false;
    private $_session_pickup_date_cached = null;
    private $_session_pickup_date_loaded = false;
    private $_cart_items_computed = false;
    private $_cart_items_result = [];

    // Cart-state properties (set by cartItemsData)
    private $_long_fermentation_in_cart = false;
    private $_two_days_notice_in_cart = false;
    private $_restricted_in_cart = false;
    private $_conflict = false;
    private $_giftcertificate_only_item_in_cart = false;
    private $_all_available_dates = [];
    private $_restricted_start_date = null;
    private $_restricted_end_date = null;
    private $_pickup_restriction_data = null;

    /**
     * Process and store the pickup date from POST data into the WC session.
     * This must run before any session reads.
     */
    protected function processPostDate()
    {
        if ($this->_post_date_processed) {
            return;
        }
        $this->_post_date_processed = true;

        if (isset($_POST['date'])) {
            $pickupdate = $_POST['date'];
            $pickupdate_object = DateTime::createFromFormat(self::DATE_FORMAT, $pickupdate);

            if ($pickupdate_object) {
                WC()->session->set('pickup_date', $pickupdate_object->format('l, F j, Y'));
                WC()->session->set('pickup_date_formatted', $pickupdate_object->format('Y-m-d'));
                WC()->session->set('pickup_date_object', $pickupdate_object);
            }
        }
    }

    /**
     * Human-readable pickup date string (e.g., "Monday, January 15, 2026"), or null.
     */
    public function sessionPickupDate()
    {
        if (!$this->_session_pickup_date_loaded) {
            $this->processPostDate();
            $this->_session_pickup_date_cached = WC()->session->get('pickup_date');
            $this->_session_pickup_date_loaded = true;
        }
        return $this->_session_pickup_date_cached;
    }

    /**
     * The DateTime object for the selected pickup date, or null.
     */
    public function sessionDateObject()
    {
        return WC()->session->get('pickup_date_object');
    }

    /**
     * The pickup date formatted as ISO Y-m-d for hidden form input and JS exchange.
     * Handles legacy d/m/Y format from existing sessions gracefully.
     */
    public function sessionFormatted()
    {
        $formatted = WC()->session->get('pickup_date_formatted');

        // Handle legacy d/m/Y format from pre-existing sessions
        if ($formatted && preg_match('#^\d{2}/\d{2}/\d{4}$#', $formatted)) {
            $legacy = DateTime::createFromFormat('!d/m/Y', $formatted);
            if ($legacy) {
                $formatted = $legacy->format('Y-m-d');
                WC()->session->set('pickup_date_formatted', $formatted);
            }
        }

        return $formatted;
    }

    /**
     * The day of the week for the selected pickup date (e.g., "Saturday"), or null.
     */
    public function pickupDayOfWeek()
    {
        $dateObj = $this->sessionDateObject();
        return $dateObj ? $dateObj->format('l') : null;
    }

    /**
     * Compute all per-cart-item data: availability, sold-out, restrictions, flags.
     * Returns an array of item data arrays that the view loops over.
     * Also sets internal state used by conflict() and other methods.
     */
    public function cartItemsData()
    {
        if ($this->_cart_items_computed) {
            return $this->_cart_items_result;
        }
        $this->_cart_items_computed = true;

        date_default_timezone_set(self::TIMEZONE);

        $session_pickup_date = $this->sessionPickupDate();
        $session_date_object = $this->sessionDateObject();
        $pickup_day_of_week = $this->pickupDayOfWeek();
        $today = new DateTime('today');

        $items = [];
        $this->_long_fermentation_in_cart = false;
        $this->_two_days_notice_in_cart = false;
        $this->_restricted_in_cart = false;
        $this->_conflict = false;
        $this->_giftcertificate_only_item_in_cart = false;
        $this->_all_available_dates = [];
        $this->_restricted_start_date = null;
        $this->_restricted_end_date = null;
        $this->_pickup_restriction_data = null;

        $cart_count = 0;
        $gc_cart_count = 0;
        $giftcertificate_in_cart = false;
        $last_availability_msg = '';

        // Set conflict if no date selected
        if (!$session_pickup_date || $session_pickup_date === '') {
            $this->_conflict = true;
        }

        // Check if session date is in the past
        if ($session_date_object) {
            $potential_old_date = new DateTime($session_pickup_date);
            if ($potential_old_date < $today) {
                $this->_conflict = true;
            }
        }

        $tomorrow = new DateTime('tomorrow');

        foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
            $cart_count++;

            $_product = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
            $product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);

            if (!$_product || !$_product->exists() || $cart_item['quantity'] <= 0 || !apply_filters('woocommerce_cart_item_visible', true, $cart_item, $cart_item_key)) {
                continue;
            }

            $product_permalink = apply_filters('woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink($cart_item) : '', $cart_item, $cart_item_key);
            $delivery_exclusion = get_field('delivery_exclusion', $product_id);

            // Check availability (day-of-week)
            $availability = get_field('availability', $product_id);
            $days_available_array = [];
            $days_available_string = '';

            if (is_array($availability) && !empty($availability)) {
                usort($availability, function ($a, $b) {
                    return strcmp($a->term_id, $b->term_id);
                });
                $days_available_string = join(', ', wp_list_pluck($availability, 'name'));
                foreach ($availability as $term) {
                    $days_available_array[] = $term->name;
                }
            }

            // Pickup restriction
            $pickup_restriction_data = null;
            $pickup_restriction_end_data = null;
            $restricted_start_date = null;
            $restricted_end_date = null;
            $restriction_msg = '';

            if (!wc_pb_is_bundled_cart_item($cart_item)) {
                $pickup_restriction_data = get_field('restricted_pickup', $product_id);
                $pickup_restriction_end_data = get_field('restricted_pickup_end', $product_id);

                if ($pickup_restriction_data) {
                    $restricted_start_date = DateTime::createFromFormat(self::DATE_FORMAT, $pickup_restriction_data);
                    $restricted_end_date = DateTime::createFromFormat(self::DATE_FORMAT, $pickup_restriction_end_data);

                    if ($restricted_start_date && $restricted_end_date) {
                        $restriction_msg = '<span class="restricted_notice">Only available ' . $restricted_start_date->format('D, M j') . ' - ' . $restricted_end_date->format('D, M j') . '</span>';
                    }

                    $this->_pickup_restriction_data = $pickup_restriction_data;
                    $this->_restricted_start_date = $restricted_start_date;
                    $this->_restricted_end_date = $restricted_end_date;
                    $this->_restricted_in_cart = true;
                }
            }

            // Day-of-week availability check
            $availability_status = 'available';
            $availability_msg = '';

            if ($session_pickup_date && $pickup_day_of_week && !in_array($pickup_day_of_week, $days_available_array)) {
                $availability_status = 'not-available';
                $availability_msg = '<span class="not-available-message">Not available on your selected pickup date!<br> Please remove, or select a different date.</span>';
            }

            // Long fermentation check
            $long_fermentation = false;
            if (has_term(['long-fermentation'], 'product_tag', $product_id)) {
                $long_fermentation = true;
                $this->_long_fermentation_in_cart = true;
            }

            // Two days notice check
            $two_days_notice = false;
            if (get_field('requires_two_days_notice', $product_id)) {
                $two_days_notice = true;
                $this->_two_days_notice_in_cart = true;
            }

            // Gift certificate check
            if ($product_id == self::GIFT_CERTIFICATE_ID) {
                $giftcertificate_in_cart = true;
                $gc_cart_count++;
            }

            // Sold out override
            $variation_id = $cart_item['variation_id'];
            $sold_out_raw = get_post_meta($variation_id, 'sold_out', true);
            $sold_out_strings = $sold_out_raw ? explode(', ', $sold_out_raw) : [];
            $availability_override_raw = get_post_meta($variation_id, 'available_override', true);
            $availability_override_strings = $availability_override_raw ? explode(', ', $availability_override_raw) : [];

            $sold_out_conflict = '';
            $sold_out_strings = array_diff($sold_out_strings, $availability_override_strings);

            // Parse sold-out dates (stored as Y-m-d)
            $sold_out_dates_display = [];
            foreach ($sold_out_strings as $dateStr) {
                $sold_out_day = DateTime::createFromFormat('Y-m-d', trim($dateStr));
                if ($sold_out_day && $sold_out_day > $today) {
                    $sold_out_dates_display[] = $sold_out_day->format('M j');

                    if ($session_date_object && $session_date_object->format('Y-m-d') === $sold_out_day->format('Y-m-d')) {
                        $this->_conflict = true;
                        $sold_out_conflict = 'sold_out_conflict';
                        $availability_status = 'not-available';
                        $availability_msg = '<span class="not-available-message">This product is not available on your selected pickup date!<br> Please remove, or select different pickup date.</span>';
                    }
                }
            }

            $sold_out_msg = '';
            if ($sold_out_dates_display) {
                sort($sold_out_dates_display);
                $sold_out_msg = '<span class="special-availability sold-out ' . $sold_out_conflict . '"><strong>Sold out: </strong> ' . implode(', ', $sold_out_dates_display) . '</span><br>';
            }

            // Availability override dates
            $available_dates = [];
            $available_dates_shortened = [];
            $special_availability_msg = '';

            foreach ($availability_override_strings as $dateStr) {
                $trimmed = trim($dateStr);
                if (!$trimmed) continue;

                // Try 4-digit year first, fall back to 2-digit year for legacy data
                $available_day = DateTime::createFromFormat('Y-m-d', $trimmed);
                if (!$available_day) {
                    $available_day = DateTime::createFromFormat('y-m-d', $trimmed);
                }

                if ($available_day) {
                    $available_dates_shortened[] = $available_day->format('M j');
                    $available_dates[] = $available_day->format('l, F j, Y');
                    $this->_all_available_dates[] = $available_day->format('Y-m-d');
                }
            }

            // Check if session date matches an availability override
            if ($session_pickup_date && in_array($session_pickup_date, $available_dates)) {
                $availability_msg = '';
                $availability_status = 'available';
                $this->_conflict = false;
            }

            if ($available_dates_shortened) {
                $special_availability_msg = '<span class="special-availability available"><strong>Special Availability: </strong> ' . implode(', ', $available_dates_shortened) . '</span><br>';
            }

            // Pickup restriction conflict checks
            if ($pickup_restriction_data && $restricted_start_date && $restricted_end_date) {
                if ($session_date_object && ($session_date_object < $restricted_start_date || $session_date_object > $restricted_end_date)) {
                    $this->_conflict = true;
                }
                if ($session_pickup_date && in_array($session_pickup_date, $available_dates)) {
                    $this->_conflict = false;
                }
            }

            // Stale session date check
            if ($this->post3pm() && $session_date_object && $session_date_object <= $tomorrow || $session_date_object && $session_date_object == $today) {
                $this->_conflict = true;
            }

            // Availability message conflict (must occur in loop)
            if (!empty($availability_msg)) {
                $this->_conflict = true;
                $last_availability_msg = $availability_msg;
            }

            $items[] = [
                'cart_item_key' => $cart_item_key,
                'cart_item' => $cart_item,
                'product' => $_product,
                'product_id' => $product_id,
                'product_permalink' => $product_permalink,
                'delivery_exclusion' => $delivery_exclusion,
                'days_available_array' => $days_available_array,
                'days_available_string' => $days_available_string,
                'is_bundled' => wc_pb_is_bundled_cart_item($cart_item),
                'availability_status' => $availability_status,
                'availability_msg' => $availability_msg,
                'long_fermentation' => $long_fermentation,
                'two_days_notice' => $two_days_notice,
                'sold_out_msg' => $sold_out_msg,
                'sold_out_conflict' => $sold_out_conflict,
                'special_availability_msg' => $special_availability_msg,
                'pickup_restriction_data' => $pickup_restriction_data,
                'restriction_msg' => $restriction_msg,
                'restricted_start_date' => $restricted_start_date,
                'restricted_end_date' => $restricted_end_date,
            ];
        }

        // Gift certificate only check (post-loop)
        $cart_count = $cart_count - $gc_cart_count;
        if ($giftcertificate_in_cart && $cart_count < 1) {
            $this->_giftcertificate_only_item_in_cart = true;
            $this->_conflict = false;
        }

        // Final availability message check (post-loop)
        if (!empty($last_availability_msg)) {
            $this->_conflict = true;
        }

        $this->_cart_items_result = $items;
        return $items;
    }

    /**
     * Whether there is a date/availability conflict preventing checkout.
     */
    public function conflict()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_conflict;
    }

    /**
     * Whether the cart contains only gift certificates (no pickup date needed).
     */
    public function giftcertificateOnlyItemInCart()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_giftcertificate_only_item_in_cart;
    }

    /**
     * Whether any item in the cart requires long fermentation lead time.
     */
    public function longFermentationInCart()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_long_fermentation_in_cart;
    }

    /**
     * Whether any item in the cart requires two days notice.
     */
    public function twoDaysNoticeInCart()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_two_days_notice_in_cart;
    }

    /**
     * Whether any item in the cart has a restricted pickup date range.
     */
    public function restrictedInCart()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_restricted_in_cart;
    }

    /**
     * The button copy for the date picker submit button.
     */
    public function datetimeButtonCopy()
    {
        return $this->sessionPickupDate() ? 'Update' : 'Select date to continue';
    }

    /**
     * All available override dates (accumulated across all cart items) as Y-m-d strings.
     */
    public function allAvailableDates()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_all_available_dates;
    }

    /**
     * Restricted pickup start date formatted as Y-m-d for JS, or null.
     */
    public function restrictedStartDateJs()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_restricted_start_date ? $this->_restricted_start_date->format('Y-m-d') : null;
    }

    /**
     * Restricted pickup end date formatted as Y-m-d for JS, or null.
     */
    public function restrictedEndDateJs()
    {
        if (!$this->_cart_items_computed) {
            $this->cartItemsData();
        }
        return $this->_restricted_end_date ? $this->_restricted_end_date->format('Y-m-d') : null;
    }

    /**
     * Session pickup date formatted as Y-m-d for JS, or null.
     */
    public function sessionPickupDateJs()
    {
        $dateObj = $this->sessionDateObject();
        return $dateObj ? $dateObj->format('Y-m-d') : null;
    }
}
