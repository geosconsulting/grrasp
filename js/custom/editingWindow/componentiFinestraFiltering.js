var comboCategorieLayer,comboLayersFiltrabili, btnFiltroNodi, btnLegendaNodi,layerFiltrabiliStore,categoriaElementoStore;

function creaComponentiFiltering(){		
	
layerFiltrabiliStore = [
    ['no','Nodes'],
	['li','Links']
];

comboLayersFiltrabili = new Ext.form.ComboBox({
    id:'tipoLayerDaFiltrare',
    labelWidth: 70,
    width: 200,		
	fieldLabel: 'Data',
	tooltip : 'Selected the type of elemento you want to be filtered',
	typeAhead: true,
    forceSelection:true,
	emptyText: 'Select a dataset...',	
	displayField:'tipoNodo',
	valueField:'nodeId',
	store: new Ext.data.SimpleStore({
        	fields:['nodeId', 'tipoNodo']
       	,data:layerFiltrabiliStore
	})
   ,triggerAction:'all'
   ,mode:'local'
   ,listeners:{select:{fn:function(combo, value) {	   
       var comboCategorie = Ext.getCmp('comboCategorie');        
       comboCategorie.clearValue();
       comboCategorie.setDisabled(false);
       comboCategorie.store.filter('nodeId', combo.getValue());
       }}
   }
});	

categoriaElementoStore = [
        [1, 'no', 'Node Type 1']
       ,[2, 'no', 'Node Type 2']
       ,[3, 'no', 'Node Type 3']
       ,[4, 'no', 'Node Type 4']
       ,[5, 'li', 'Physical']
       ,[6, 'li', 'Functional']
       ,[7, 'li', 'Logical']
];

comboCategorieLayer = new Ext.form.ComboBox({
     id:'comboCategorie',
     labelWidth: 70,
     width: 200,
     hiddenName: 'filtro',
     fieldLabel: 'Filter',
     tooltip : 'Selected the type to be displayed',
     typeAhead: true,      
     forceSelection:true,    
     displayField:'categoria',
     disabled : true,    
     //emptyText: 'Select a dataset above...',
     valueField:'categoriaId'	
     ,store: new Ext.data.SimpleStore({
     fields:['categoriaId', 'nodeId', 'categoria']
     	,data:categoriaElementoStore
     })
     ,triggerAction:'all'
     ,mode:'local'
     ,lastQuery:''
});

btnFiltroNodi = new Ext.Button({
	  text: 'Apply Filter',	 
	  width: 120,
	  enableToggle: false,
	  handler: function () {
	  var layerDaFiltrare = Ext.getCmp('tipoLayerDaFiltrare').value;
	  var filtro = Ext.getCmp('comboCategorie').value;	  
	  	if (wfs_layer_point.getVisibility()==true) {
	  		applicaFiltro(filtro);
		} else {
			Ext.MessageBox.alert('Check layer', 'Nodes not visible');
			Ext.get('finestraAlberoLayers').frame('ff0000', 3);
		}
	  	
		}
}); 

btnLegendaNodi = new Ext.Button({
		text: 'Show All',
		enableToggle: false,
		width: 118,		
		handler: function () {			
			applicaLegendaNodiUnique();
		}	       
});

}

