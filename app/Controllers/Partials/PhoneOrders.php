<?php

namespace App\Controllers\Partials;

trait PhoneOrders
{
  public function phonedata() 
	{
		$jsonDataArray = array();
		foreach (new \DirectoryIterator('app/uploads/pos') as $fileInfo) {
			if($fileInfo->isDot()) continue;
			
			$path = $fileInfo->getFilename();
			$jsonString = file_get_contents('app/uploads/pos/'.$path);            
			$jsonData = json_decode($jsonString, true);
									
			if($jsonData) {
				$jsonDataArray[] = json_decode($jsonString, true);              
			}              
		}
		$jsonDataArray = array_merge(...$jsonDataArray);

		return $jsonDataArray;
	}

  public static function itemquantity($package_size) {
    if($package_size == "Dozen"){
      return 12;
    } 
    elseif($package_size == "1/2 Dozen"){
      return 6;
    } 
    elseif($package_size == "6 Pack"){
      return 6;
    } 
    elseif($package_size == "Bag of 10"){
      return 10;
    } 
    elseif($package_size == "Pack of 8"){
      return 8;
    } 
    else{
      return 1;
    }
  }
}