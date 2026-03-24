<?php

namespace App\Helpers;

use DateTime;

/**
 * Store vacation / closure dates (Y-m-d) from ACF options repeater pickup_vacation_dates.
 */
class PickupVacationDates
{
    /**
     * @return string[]
     */
    public static function getDates(): array
    {
        $dates = self::loadFromAcf();

        return apply_filters('bonton_pickup_vacation_dates', $dates);
    }

    /**
     * @return string[]
     */
    private static function loadFromAcf(): array
    {
        $dates = [];

        if (!function_exists('have_rows')) {
            return $dates;
        }

        if (have_rows('pickup_vacation_dates', 'option')) {
            while (have_rows('pickup_vacation_dates', 'option')) {
                the_row();
                $date = get_sub_field('vacation_date');
                $normalized = self::normalizeAcfDateToYmd($date);
                if ($normalized) {
                    $dates[] = $normalized;
                }
            }
        }

        return array_values(array_unique($dates));
    }

    /**
     * @param mixed $date Raw ACF date (Y-m-d, Ymd, or d/m/Y depending on field settings).
     */
    private static function normalizeAcfDateToYmd($date): ?string
    {
        if (!$date || !is_string($date)) {
            return null;
        }

        $date = trim($date);

        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            return $date;
        }

        if (preg_match('/^\d{8}$/', $date)) {
            return substr($date, 0, 4) . '-' . substr($date, 4, 2) . '-' . substr($date, 6, 2);
        }

        $parsed = DateTime::createFromFormat('d/m/Y', $date);
        if ($parsed) {
            return $parsed->format('Y-m-d');
        }

        return null;
    }
}
