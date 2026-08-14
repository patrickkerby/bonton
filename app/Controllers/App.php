<?php

namespace App\Controllers;

use App\Helpers\PickupVacationDates;
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
        if (function_exists('is_wc_endpoint_url') && is_checkout() && is_wc_endpoint_url('order-received')) {
            return __('Thank you!', 'sage');
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

    /**
     * Pickup vacation / closure dates (Y-m-d) for utility banner datepicker — same source as cart.
     *
     * Pickup date, cart count, and bulk progress are hydrated via AJAX so Sage
     * does not load the Woo session/cart on every cached storefront page.
     *
     * @return string[]
     */
    public function pickupVacationDates()
    {
        return PickupVacationDates::getDates();
    }

  /**
   * Display name for the utility bar account menu (first name, else display name).
   */
  public function utilityAccountDisplayName()
  {
    if (!is_user_logged_in()) {
      return '';
    }
    $user = wp_get_current_user();
    if ($user->first_name) {
      return $user->first_name;
    }
    if ($user->display_name) {
      return $user->display_name;
    }
    return $user->user_login;
  }

  /**
   * Loyalty points balance for the utility bar account menu.
   */
  public function utilityAccountPoints()
  {
    if (!is_user_logged_in() || !class_exists('\WC_Points_Rewards_Manager')) {
      return 0;
    }
    return (int) \WC_Points_Rewards_Manager::get_users_points(get_current_user_id());
  }

}

