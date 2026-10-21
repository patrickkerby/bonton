<?php

namespace App\Helpers;

use DateTime;

/**
 * Options-page limited menu: a date range + product category allowlist.
 *
 * On those pickup dates, products outside the category are unavailable
 * (cart conflict, not Woo stock). Products in the category skip weekday
 * rules. Lead time and sold-out dates still apply.
 */
class LimitedMenu
{
    const GIFT_CERTIFICATE_ID = 5317;

    private static $periods = null;

    /**
     * @return array<int, array<string, mixed>>
     */
    public static function getPeriods(): array
    {
        if (self::$periods !== null) {
            return self::$periods;
        }

        self::$periods = [];

        if (!function_exists('have_rows') || !have_rows('limited_menu_periods', 'option')) {
            return self::$periods;
        }

        while (have_rows('limited_menu_periods', 'option')) {
            the_row();

            if (!get_sub_field('enabled')) {
                continue;
            }

            $start = self::normalizeDate(get_sub_field('start_date'));
            $end = self::normalizeDate(get_sub_field('end_date'));
            $category_id = self::termIdFromField(get_sub_field('menu_category'));

            if (!$start || !$end || $end < $start || $category_id <= 0) {
                continue;
            }

            $term = get_term($category_id, 'product_cat');
            if (!$term || is_wp_error($term)) {
                continue;
            }

            $url = self::shopCategoryFilterUrl($term);

            $title = trim((string) get_sub_field('title'));
            if ($title === '') {
                $title = $term->name;
            }

            $message = trim((string) get_sub_field('message'));
            if ($message === '') {
                $message = 'This pickup date has a limited menu. Only items on that menu can be ordered.';
            }

            self::$periods[] = [
                'title' => $title,
                'message' => $message,
                'start' => $start,
                'end' => $end,
                'category_id' => $category_id,
                'category_name' => $term->name,
                'url' => $url,
                'link_label' => 'View ' . $term->name,
            ];
        }

        return self::$periods;
    }

    /**
     * Cache-safe payload for banners / datepickers (not session-specific).
     *
     * @return array<int, array<string, mixed>>
     */
    public static function publicPeriods(): array
    {
        $out = [];
        foreach (self::getPeriods() as $period) {
            $out[] = [
                'title' => $period['title'],
                'message' => $period['message'],
                'start' => $period['start'],
                'end' => $period['end'],
                'url' => $period['url'],
                'link_label' => $period['link_label'],
            ];
        }

        return $out;
    }

    /**
     * Every Y-m-d in every active limited-menu range.
     *
     * @return string[]
     */
    public static function allDates(): array
    {
        $dates = [];
        foreach (self::getPeriods() as $period) {
            $dates = array_merge($dates, self::datesInRange($period['start'], $period['end']));
        }

        return array_values(array_unique($dates));
    }

    public static function periodForDate(?string $ymd): ?array
    {
        $ymd = self::normalizeDate($ymd);
        if (!$ymd) {
            return null;
        }

        foreach (self::getPeriods() as $period) {
            if ($ymd >= $period['start'] && $ymd <= $period['end']) {
                return $period;
            }
        }

        return null;
    }

    public static function isActiveDate(?string $ymd): bool
    {
        return self::periodForDate($ymd) !== null;
    }

    public static function noticeForDate(?string $ymd): ?array
    {
        $period = self::periodForDate($ymd);
        if (!$period) {
            return null;
        }

        return [
            'active' => true,
            'title' => $period['title'],
            'message' => $period['message'],
            'url' => $period['url'],
            'link_label' => $period['link_label'],
        ];
    }

    public static function productIsAllowed(int $product_id, array $period): bool
    {
        if ($product_id <= 0 || empty($period['category_id'])) {
            return false;
        }

        if (self::isGiftCertificate($product_id)) {
            return true;
        }

        $category_ids = self::categoryAndChildren((int) $period['category_id']);

        return $category_ids && has_term($category_ids, 'product_cat', $product_id);
    }

    /**
     * True when this product must not be sold on the pickup date.
     */
    public static function blocksProduct(int $product_id, ?string $ymd): bool
    {
        if (self::isWholesale()) {
            return false;
        }

        $period = self::periodForDate($ymd);
        if (!$period) {
            return false;
        }

        return !self::productIsAllowed($product_id, $period);
    }

    /**
     * Allowlisted (or gift certificate) items skip weekday availability on these dates.
     */
    public static function skipsWeekdayRules(int $product_id, ?string $ymd): bool
    {
        if (self::isWholesale()) {
            return false;
        }

        $period = self::periodForDate($ymd);
        if (!$period) {
            return false;
        }

        return self::productIsAllowed($product_id, $period);
    }

    /**
     * Limited-menu days stay selectable even if they were also listed as vacation.
     *
     * @param string[] $vacation_dates
     * @return string[]
     */
    public static function openVacationDates(array $vacation_dates): array
    {
        $open = self::allDates();
        if (!$open) {
            return $vacation_dates;
        }

        return array_values(array_diff($vacation_dates, $open));
    }

    /**
     * @return int[]
     */
    private static function categoryAndChildren(int $category_id): array
    {
        $ids = [$category_id];
        $children = get_term_children($category_id, 'product_cat');
        if (!is_wp_error($children) && $children) {
            $ids = array_merge($ids, array_map('intval', $children));
        }

        return array_values(array_unique($ids));
    }

    /**
     * @return string[]
     */
    private static function datesInRange(string $start, string $end): array
    {
        $dates = [];
        $current = DateTime::createFromFormat('!Y-m-d', $start);
        $last = DateTime::createFromFormat('!Y-m-d', $end);
        if (!$current || !$last) {
            return $dates;
        }

        while ($current <= $last) {
            $dates[] = $current->format('Y-m-d');
            $current->modify('+1 day');
        }

        return $dates;
    }

    private static function normalizeDate($date): ?string
    {
        if ($date instanceof DateTime) {
            return $date->format('Y-m-d');
        }

        if (!is_string($date) || trim($date) === '') {
            return null;
        }

        return SoldOutDates::toYmd($date);
    }

    /**
     * Shop page filtered to a category (WPF), not the unused product-category archive.
     */
    private static function shopCategoryFilterUrl($term): string
    {
        $shop = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : '';
        if (!$shop) {
            $shop = home_url('/products/');
        }

        return add_query_arg(
            [
                'wpf_page' => '1',
                'id' => 'catalogue',
                'wpf' => '1',
                'wpf_wpf_cat' => $term->slug,
            ],
            $shop
        );
    }

    private static function termIdFromField($value): int
    {
        if (is_object($value) && isset($value->term_id)) {
            return (int) $value->term_id;
        }
        if (is_array($value) && isset($value['term_id'])) {
            return (int) $value['term_id'];
        }

        return (int) $value;
    }

    private static function isGiftCertificate(int $product_id): bool
    {
        $ids = function_exists('\\App\\bonton_gift_certificate_product_ids')
            ? \App\bonton_gift_certificate_product_ids()
            : [self::GIFT_CERTIFICATE_ID];

        return in_array($product_id, $ids, true);
    }

    private static function isWholesale(): bool
    {
        return function_exists('\\App\\bonton_is_wholesale_user') && \App\bonton_is_wholesale_user();
    }
}
