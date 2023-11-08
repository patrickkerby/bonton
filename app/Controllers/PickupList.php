<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class PickupList extends Controller
{

	use Partials\PhoneOrders;

	protected $acf = true;

	public function acf()
	{
			add_filter('sober/controller/acf/array', function () {
					return true;
			});
	}
}
