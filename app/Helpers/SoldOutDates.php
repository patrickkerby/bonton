<?php

namespace App\Helpers;

use DateTime;

/**
 * Pickup-date sold-out lists (not WooCommerce stock).
 *
 * Stored as comma-separated date strings on variation/simple post meta
 * and product category/tag term meta, using the same MultiDatesPicker as variations.
 */
class SoldOutDates
{
    /**
     * Normalized Y-m-d dates this cart line is unavailable, after subtracting
     * variation availability overrides. Includes variation, simple-product,
     * product-category (plus ancestor), and product-tag lists.
     *
     * @return string[]
     */
    public static function forCartItem(int $product_id, int $variation_id = 0): array
    {
        $dates = [];

        if ($variation_id > 0) {
            $dates = array_merge(
                $dates,
                self::parseStored((string) get_post_meta($variation_id, 'sold_out', true))
            );
        } else {
            $dates = array_merge(
                $dates,
                self::parseStored((string) get_post_meta($product_id, 'sold_out', true))
            );
        }

        $dates = array_merge($dates, self::forProductCategories($product_id));
        $dates = array_merge($dates, self::forProductTags($product_id));

        $override = [];
        if ($variation_id > 0) {
            $override = self::parseStored((string) get_post_meta($variation_id, 'available_override', true));
        }

        $dates = array_values(array_unique(array_diff($dates, $override)));
        sort($dates);

        return apply_filters('bonton_sold_out_dates', $dates, $product_id, $variation_id);
    }

    /**
     * Sold-out dates from assigned product categories and their ancestors.
     *
     * @return string[] Y-m-d
     */
    public static function forProductCategories(int $product_id): array
    {
        $dates = [];
        $terms = wp_get_post_terms($product_id, 'product_cat');

        if (is_wp_error($terms) || empty($terms)) {
            return $dates;
        }

        $seen = [];

        foreach ($terms as $term) {
            $current = $term;
            while ($current && !is_wp_error($current) && !empty($current->term_id)) {
                $term_id = (int) $current->term_id;
                if (isset($seen[$term_id])) {
                    break;
                }
                $seen[$term_id] = true;

                $dates = array_merge($dates, self::datesForTerm($term_id));

                if (empty($current->parent)) {
                    break;
                }
                $current = get_term((int) $current->parent, 'product_cat');
            }
        }

        return array_values(array_unique($dates));
    }

    /**
     * Sold-out dates from assigned product tags.
     *
     * @return string[] Y-m-d
     */
    public static function forProductTags(int $product_id): array
    {
        $dates = [];
        $terms = wp_get_post_terms($product_id, 'product_tag');

        if (is_wp_error($terms) || empty($terms)) {
            return $dates;
        }

        foreach ($terms as $term) {
            if (empty($term->term_id)) {
                continue;
            }
            $dates = array_merge($dates, self::datesForTerm((int) $term->term_id));
        }

        return array_values(array_unique($dates));
    }

    /**
     * @return string[] Y-m-d
     */
    public static function datesForTerm(int $term_id): array
    {
        if ($term_id <= 0) {
            return [];
        }

        return self::parseStored((string) get_term_meta($term_id, 'sold_out', true));
    }

    /**
     * @return string[] Y-m-d
     */
    public static function parseStored(string $raw): array
    {
        $raw = trim($raw);
        if ($raw === '') {
            return [];
        }

        $dates = [];
        foreach (preg_split('/\s*,\s*/', $raw) as $part) {
            $ymd = self::toYmd($part);
            if ($ymd) {
                $dates[] = $ymd;
            }
        }

        return array_values(array_unique($dates));
    }

    public static function toYmd(string $dateStr): ?string
    {
        $trimmed = trim($dateStr);
        if ($trimmed === '') {
            return null;
        }

        // Picker stores y-m-d without padding (e.g. 26-9-25). Also accept
        // ISO Y-m-d and compact Ymd.
        if (preg_match('/^(\d{2}|\d{4})-(\d{1,2})-(\d{1,2})$/', $trimmed, $parts)) {
            $year = (int) $parts[1];
            if ($year < 100) {
                $year += ($year >= 70) ? 1900 : 2000;
            }
            $month = (int) $parts[2];
            $day = (int) $parts[3];
            if (!checkdate($month, $day, $year)) {
                return null;
            }

            return sprintf('%04d-%02d-%02d', $year, $month, $day);
        }

        if (preg_match('/^\d{8}$/', $trimmed)) {
            $dt = DateTime::createFromFormat('!Ymd', $trimmed);
            return self::validYmd($dt);
        }

        return null;
    }

    private static function validYmd($dt): ?string
    {
        if (!$dt instanceof DateTime) {
            return null;
        }

        $errors = DateTime::getLastErrors();
        if (is_array($errors) && ($errors['warning_count'] > 0 || $errors['error_count'] > 0)) {
            return null;
        }

        return $dt->format('Y-m-d');
    }
}
