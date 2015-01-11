<?php

	class JqGrid {
		
		public function __construct(){}
		
		public function saveColumnsPosition()
		{
			$field = $_POST['field'];
			$columns = $_POST['cols'];
			
			$sort = '';
			$jsonEncode = Array();
			foreach ($values as $key => $value) {
				$jsonEncode[] = json_encode($value);
			}
			$sort = implode(';', $jsonEncode);
			
			$jqgrid = new JqGridModel();
			$jqgrid->setColumnsPosition = $sort;
			$jqgrid->save();
		}
		
		public function loadColumnsPosition()
		{
			$valuesTrim = trim($value);
			$jsonDecode = Array();
			if( !empty($valuesTrim) ){
			
				$valuesExplode = explode(';', $values);
				foreach ($valuesExplode as $key => $value) {
					$jsonDecode[] = json_decode($value, true);
				}
			}
			
			return json_encode(['columns_position' => $jsonDecode]);
		}
	}