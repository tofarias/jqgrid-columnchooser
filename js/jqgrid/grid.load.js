$(function(){

	var $table = $('table#grid_columnchooser');
	var pagerId = '#grid_columnchooser_pager';

	$table.jqGrid(
			{
				recordtext: '',
				pgbuttons: false,
				pgtext: null,
				url:'js/jqgrid/data.json',
				datatype: "json",
				width: 1000,
				height: 250,
				pager: pagerId,
				colNames: ['State', 'Name', 'Country', 'City', 'E-mail', 'Phone', 'Zip-Code'],
				colModel:
					[
					 {
						 name : 'state',
						 index : 'state',
						 width : 40,
						 align : 'center'
					 },
					 { 
						 name:  'name',
						 index: 'name',
						 width: 40,
						 align: 'center'
					 },
					 {
						 name : 'country',
						 index : 'country',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'city',
						 index : 'city',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'email',
						 index : 'email',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'phone',
						 index : 'phone',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'zipcode',
						 index : 'zipcode',
						 width : 40,
						 align : 'center'
					 }
					 ]
			}).navGrid(pagerId,{ search: false, edit: false, add: false, del: false, view:false });

	$table.jqGrid('navButtonAdd',pagerId,{
		caption: "Colunas",
		buttonicon: 'ui-icon-carat-2-n-s',
		title: "Reordenar Colunas",
		onClickButton : function (){
			$table.columnChooser(null);
		}
	}); 

});