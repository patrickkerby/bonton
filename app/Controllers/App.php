<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class App extends Controller
{
    public function siteName()
    {
        return get_bloginfo('name');
    }

    public static function title()
    {
        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }
            return __('Latest Posts', 'sage');
        }
        if (is_archive()) {
            return get_the_archive_title();
        }
        if (is_search()) {
            return sprintf(__('Search Results for %s', 'sage'), get_search_query());
        }
        if (is_404()) {
            return __('Not Found', 'sage');
        }
        return get_the_title();
    }

    protected $acf = true;

    public function acfsage()
    {
        add_filter('sober/controller/acf/array', function () {
            return true;
        });
    }

    public function container()
    {
        $container = 'container';
        $container_fluid = 'container-fluid';

        if ( is_checkout() ) {
            return $container;
        }
        return $container_fluid;
    }

    public function is_wholesale_user()
    {
        if (in_array( 'wcwp_wholesale', (array) wp_get_current_user()->roles)) { 
            $is_wholesale_user = true;
        }
        else {
            // return array(); 
            $is_wholesale_user = false;
        }
        return $is_wholesale_user;
    }
}

