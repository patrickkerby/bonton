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

