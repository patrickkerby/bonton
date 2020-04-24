<?php

namespace App\Controllers;

use Sober\Controller\Controller;
require '/Users/patrickkerby/Documents/sites/valet/bonton/web/app/themes/bonton/vendor/autoload.php';

class PickupList extends Controller
{

	protected $acf = true;

	public function acf()
	{
			add_filter('sober/controller/acf/array', function () {
					return true;
			});
	}
}
