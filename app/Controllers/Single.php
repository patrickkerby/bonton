<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Single extends Controller
{

	protected $acf = true;

	public function acf()
	{
			add_filter('sober/controller/acf/array', function () {
					return true;
			});
	}
}
