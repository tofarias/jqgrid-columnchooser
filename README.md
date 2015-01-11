# jqgrid-columnchooser
Save and load the columns positions from database.

* Here is where the magic happens:

First: on save the columns positions
```javascript
$table.jqGrid('navButtonAdd',pagerId,{
        caption: "Select Columns",
        buttonicon: 'ui-icon-carat-2-n-s',
        title: "Reorder Columns",
        onClickButton : function (){
            $table.columnChooser(
                    {
                        done: function(perm){
                            
                            if( (typeof (perm) !== "undefined") ){
                                
                                $table.jqGrid("remapColumns", perm, true);
                                
                                var colModels = $table.jqGrid('getGridParam', 'colModel');                                          
                                var columns = new Array();

                                $.each(perm, function(i, columnIndex){
                                    
                                    columns.push({
                                        field: colModels[i].index,
                                        isHidden: colModels[i].hidden,
                                        pos: columnIndex
                                    });
                                });
                                
                                $.post('save-columns-position',
                                        {
                                            cols: columns,
                                            field: 'columns_position' // the field name in the table
                                        }, null);
                            }
                        }
                    });
        }
    }); 
```

Second: on load the columns positions when the grid is complete.
```javascript
gridComplete: function(){
                    
                    $.post('load-columns-position', null, function($response){
                        
                        if( $response ){
                            
                            var colModels = $table.jqGrid('getGridParam', 'colModel');
                            var $responseCols = $response.columns_position;
                            var columns = [];
                            
                            if( $responseCols.length > 0 ){
                                
                                columns[0] = 0;
                                
                                $.each($responseCols, function(icol, columnIndex){
                                    
                                    if( icol > 0 ){
                                        
                                        var pos = columnIndex.index;
                                        var field = columnIndex.field;
                                        
                                        $.each(colModels, function(i, colModel){
                                            
                                            var colModelIndex = colModel.index;
                                            
                                            if( field == colModelIndex ){
                                                
                                                columns[icol] = i;
                                                
                                                if( $.parseJSON( columnIndex.isHidden ) ){
                                                    $grid.jqGrid('hideCol', [field]);
                                                }
                                            }
                                        });
                                    }
                                });
                                
                                $table.jqGrid("remapColumns", columns, true);
                                
                            }else{
                                                                    
                                $.each(colModels, function(i, colModel){
                                    
                                    columns.push({
                                        field: colModel.index,
                                        isHidden: colModel.hidden,
                                        pos: i
                                    });
                                });
                                
                                $.post('save-columns-position',
                                        {
                                            cols: columns,
                                            field: 'columns_position' // the field name in the table
                                        }, null);
                            }
                        }
                    });
                }
```