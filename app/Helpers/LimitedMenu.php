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
    const GENERATED_CATEGORY_META = 'bonton_limited_menu';

    private static $periods = null;
    private static $generated_category_ids = null;
    private static $loading_generated_ids = false;
    private static $syncing_categories = false;

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

        return self::productIsInPeriodCategory($product_id, $period);
    }

    /**
     * Enabled, not-yet-ended periods this product is actually in (category allowlist).
     * Gift certificates that are only allowed as an exception are omitted.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function periodsForProduct(int $product_id): array
    {
        return self::upcomingPeriodsForProduct($product_id, true);
    }

    /**
     * Enabled, not-yet-ended periods this product cannot be ordered on.
     * Gift certificates stay purchasable, so they are not listed here.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function periodsExcludingProduct(int $product_id): array
    {
        return self::upcomingPeriodsForProduct($product_id, false);
    }

    public static function productHasMenuNotes(int $product_id): bool
    {
        return self::productFlagLabels($product_id) || self::productExclusionLabels($product_id);
    }

    /**
     * Date labels for upcoming/active periods this product is on.
     *
     * @return string[]
     */
    public static function productFlagLabels(int $product_id): array
    {
        return self::dateLabelsForPeriods(self::periodsForProduct($product_id));
    }

    /**
     * Date labels for upcoming/active periods this product is off.
     *
     * @return string[]
     */
    public static function productExclusionLabels(int $product_id): array
    {
        return self::dateLabelsForPeriods(self::periodsExcludingProduct($product_id));
    }

    /**
     * Sidebar items for periods this product is on, and periods it is not.
     */
    public static function echoProductFlagListItems(int $product_id): void
    {
        self::echoFlagItem(
            'Limited menu',
            self::productFlagLabels($product_id),
            'Shorter menu on these pickup dates. This item is included, in addition to the days above.'
        );
        self::echoFlagItem(
            'Not on the limited menu',
            self::productExclusionLabels($product_id),
            'Shorter menu on these pickup dates. This item isn’t included.'
        );
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
     * @param bool $included True for allowlisted periods, false for periods that block the product.
     * @return array<int, array<string, mixed>>
     */
    private static function upcomingPeriodsForProduct(int $product_id, bool $included): array
    {
        if ($product_id <= 0 || self::isWholesale()) {
            return [];
        }

        $today = (new DateTime('today', new \DateTimeZone('America/Edmonton')))->format('Y-m-d');
        $out = [];

        foreach (self::getPeriods() as $period) {
            if ($period['end'] < $today) {
                continue;
            }

            $on_menu = self::productIsAllowed($product_id, $period);
            if ($included) {
                // Gift certificates can be ordered without being on the menu. Don't claim they are.
                if (!self::productIsInPeriodCategory($product_id, $period)) {
                    continue;
                }
            } elseif ($on_menu) {
                continue;
            }

            $out[] = $period;
        }

        usort($out, function ($a, $b) {
            return strcmp($a['start'], $b['start']);
        });

        return $out;
    }

    /**
     * @param array<int, array<string, mixed>> $periods
     * @return string[]
     */
    private static function dateLabelsForPeriods(array $periods): array
    {
        $labels = [];
        foreach ($periods as $period) {
            $label = self::formatPeriodFlagLabel($period);
            if ($label !== '') {
                $labels[] = $label;
            }
        }

        return $labels;
    }

    /**
     * @param string[] $labels
     */
    private static function echoFlagItem(string $title, array $labels, string $hint): void
    {
        if (!$labels) {
            return;
        }

        echo '<li class="limited-menu-flag">' . esc_html($title);
        foreach ($labels as $label) {
            echo '<span class="limited-menu-flag__dates">' . esc_html($label) . '</span>';
        }
        echo '<span class="limited-menu-flag__hint">' . esc_html($hint) . '</span>';
        echo '</li>';
    }

    private static function productIsInPeriodCategory(int $product_id, array $period): bool
    {
        if ($product_id <= 0 || empty($period['category_id'])) {
            return false;
        }

        $category_ids = self::categoryAndChildren((int) $period['category_id']);

        return $category_ids && has_term($category_ids, 'product_cat', $product_id);
    }

    private static function formatPeriodFlagLabel(array $period): string
    {
        $tz = new \DateTimeZone('America/Edmonton');
        $start = DateTime::createFromFormat('!Y-m-d', $period['start'], $tz);
        $end = DateTime::createFromFormat('!Y-m-d', $period['end'], $tz);
        if (!$start || !$end) {
            return '';
        }

        $this_year = (new DateTime('today', $tz))->format('Y');
        $needs_year = $start->format('Y') !== $this_year
            || $end->format('Y') !== $this_year
            || $start->format('Y') !== $end->format('Y');

        if ($start->format('Y-m-d') === $end->format('Y-m-d')) {
            return self::formatFlagDate($start, $needs_year);
        }

        if ($start->format('Y-m') === $end->format('Y-m')) {
            $right = $end->format('j');
            if ($needs_year) {
                $right .= $end->format(', Y');
            }

            return self::formatFlagDate($start, false) . '–' . $right;
        }

        return self::formatFlagDate($start, $needs_year) . ' – ' . self::formatFlagDate($end, $needs_year);
    }

    private static function formatFlagDate(DateTime $date, bool $include_year): string
    {
        $label = $date->format('M. j');
        if ($include_year) {
            $label .= $date->format(', Y');
        }

        return $label;
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

    public static function register(): void
    {
        add_action('acf/save_post', [self::class, 'syncGeneratedCategories'], 20);
        add_action('pre_get_terms', [self::class, 'hideGeneratedFromTermQueries']);
        add_filter('get_the_terms', [self::class, 'hideGeneratedFromPostTerms'], 20, 3);
    }

    /**
     * Blank menu category: create one named from the title.
     * A category chosen by hand (Bakery, and so on) is left alone.
     * Renaming the title renames a generated category. It is not deleted when the dates pass.
     *
     * @param mixed $post_id
     */
    public static function syncGeneratedCategories($post_id): void
    {
        if (self::$syncing_categories || ($post_id !== 'options' && $post_id !== 'option')) {
            return;
        }
        if (!function_exists('get_field') || !function_exists('update_field')) {
            return;
        }

        $rows = get_field('limited_menu_periods', 'option');
        if (!is_array($rows)) {
            return;
        }

        $changed = false;
        foreach ($rows as $index => $row) {
            if (!is_array($row)) {
                continue;
            }

            $name = self::categoryNameForRow($row);
            $category_id = self::termIdFromField($row['menu_category'] ?? 0);
            $term = $category_id > 0 ? get_term($category_id, 'product_cat') : null;
            if (!$term || is_wp_error($term)) {
                $category_id = 0;
                $term = null;
            }

            if ($category_id > 0) {
                if ($name !== '' && self::isGeneratedCategory($category_id) && $term->name !== $name) {
                    wp_update_term($category_id, 'product_cat', [
                        'name' => $name,
                        'description' => self::generatedCategoryDescription(),
                    ]);
                    self::$generated_category_ids = null;
                }
                continue;
            }

            if ($name === '') {
                continue;
            }

            $created_id = self::createGeneratedCategory($name);
            if ($created_id <= 0) {
                continue;
            }

            $rows[$index]['menu_category'] = $created_id;
            $changed = true;
        }

        if (!$changed) {
            return;
        }

        self::$syncing_categories = true;
        update_field('limited_menu_periods', $rows, 'option');
        self::$syncing_categories = false;
        self::$periods = null;
    }

    public static function isGeneratedCategory(int $category_id): bool
    {
        if ($category_id <= 0) {
            return false;
        }

        return get_term_meta($category_id, self::GENERATED_CATEGORY_META, true) === '1';
    }

    /**
     * @return int[]
     */
    public static function generatedCategoryIds(): array
    {
        if (self::$generated_category_ids !== null) {
            return self::$generated_category_ids;
        }
        if (self::$loading_generated_ids) {
            return [];
        }

        self::$loading_generated_ids = true;
        $ids = get_terms([
            'taxonomy' => 'product_cat',
            'hide_empty' => false,
            'fields' => 'ids',
            'meta_query' => [
                [
                    'key' => self::GENERATED_CATEGORY_META,
                    'value' => '1',
                ],
            ],
        ]);
        self::$loading_generated_ids = false;

        self::$generated_category_ids = array_map('intval', is_array($ids) ? $ids : []);

        return self::$generated_category_ids;
    }

    /**
     * @param \WP_Term_Query $query
     */
    public static function hideGeneratedFromTermQueries($query): void
    {
        if (self::$loading_generated_ids || !self::hidingGeneratedCategories() || !is_object($query)) {
            return;
        }

        $taxonomies = $query->query_vars['taxonomy'] ?? null;
        if (!$taxonomies || !in_array('product_cat', (array) $taxonomies, true)) {
            return;
        }

        foreach (['slug', 'name', 'include', 'term_taxonomy_id', 'object_ids'] as $lookup) {
            if (!empty($query->query_vars[$lookup])) {
                return;
            }
        }

        $ids = self::generatedCategoryIds();
        if (!$ids) {
            return;
        }

        $exclude = array_map('intval', (array) ($query->query_vars['exclude'] ?? []));
        $query->query_vars['exclude'] = array_values(array_unique(array_merge($exclude, $ids)));
    }

    /**
     * @param mixed $terms
     * @param mixed $post_id
     * @param mixed $taxonomy
     * @return mixed
     */
    public static function hideGeneratedFromPostTerms($terms, $post_id, $taxonomy)
    {
        if ($taxonomy !== 'product_cat' || !is_array($terms)) {
            return $terms;
        }

        return array_values(array_filter($terms, function ($term) {
            return !is_object($term) || !self::isGeneratedCategory((int) $term->term_id);
        }));
    }

    private static function categoryNameForRow(array $row): string
    {
        $title = trim((string) ($row['title'] ?? ''));
        if ($title !== '') {
            return $title;
        }

        $start = self::normalizeDate($row['start_date'] ?? null);
        $end = self::normalizeDate($row['end_date'] ?? null);
        if (!$start || !$end) {
            return '';
        }

        $label = self::formatPeriodFlagLabel([
            'start' => $start,
            'end' => $end,
        ]);

        return $label !== '' ? 'Limited menu ' . $label : '';
    }

    private static function createGeneratedCategory(string $name): int
    {
        $name = function_exists('mb_substr') ? mb_substr($name, 0, 200) : substr($name, 0, 200);
        $slug = self::uniqueCategorySlug($name);
        $created = wp_insert_term($name, 'product_cat', [
            'slug' => $slug,
            'description' => self::generatedCategoryDescription(),
        ]);

        if (is_wp_error($created) || empty($created['term_id'])) {
            return 0;
        }

        $category_id = (int) $created['term_id'];
        update_term_meta($category_id, self::GENERATED_CATEGORY_META, '1');
        self::$generated_category_ids = null;

        return $category_id;
    }

    private static function uniqueCategorySlug(string $name): string
    {
        $base = 'limited-menu-' . sanitize_title($name);
        if ($base === 'limited-menu-') {
            $base = 'limited-menu';
        }

        $slug = $base;
        $suffix = 2;
        while (term_exists($slug, 'product_cat')) {
            $slug = $base . '-' . $suffix;
            $suffix++;
        }

        return $slug;
    }

    private static function generatedCategoryDescription(): string
    {
        return 'Allowlist for a limited menu. Hidden from the shop category filters.';
    }

    private static function hidingGeneratedCategories(): bool
    {
        if (!is_admin()) {
            return true;
        }
        if (!wp_doing_ajax()) {
            return false;
        }

        $referer = wp_get_referer();

        return !$referer || strpos($referer, admin_url()) !== 0;
    }
}
