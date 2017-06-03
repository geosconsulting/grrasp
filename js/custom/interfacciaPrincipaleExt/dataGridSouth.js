var gridFeatureSelected;
var storeData,colModel,selModel,gridView;

function writeGridToSouth(layerSel){
	
//TUTTO VUOTO PER CREARE SOLO LA GRIGLIA
storeData	= new GeoExt.data.FeatureStore({});		
colModel 	= new Ext.grid.ColumnModel([]);
//selModel 	= new GeoExt.grid.FeatureSelectionModel({});
selModel 	= new GeoExt.grid.FeatureSelectionModel({
	singleSelect: true,
	listeners: {
		rowselect: {
			fn: function(sm,index,record) {				
				var str = record.data.feature.fid;
				var n=str.split(".");
				var tabAttiva=n[0];
				var fidAttiva = n[1];
				//console.log (tabAttiva + fidAttiva);
				Ext.Ajax.request({
					url : 'php/DB/bboxFeature.php' , 
					params : { 
						tabAttiva : tabAttiva,
						fidAttiva : fidAttiva
						},
					method: 'POST',
					success: function (result,request) { 	
						
						var str = result.responseText;
						//console.log("Risposta dal SERVER " + str)
						
						var inizio 		= str.indexOf('(');
						var fine 		= str.indexOf(')');
						var coords		= str.substr(inizio+1,fine-inizio-1);
						var coords		= coords.replace(","," ");
						var coordsPaese = coords.split(" ");
						
						var coords = new OpenLayers.Bounds(coordsPaese[0],coordsPaese[1],coordsPaese[2],coordsPaese[3]);																
						//console.log("Coords : " + coords);												
												
						var bounds = coords.transform(P_2077, P_900913);	
						//console.log("Bounds : " + bounds);						
						//map.zoomToExtent(bounds);
						
					},
					failure: function ( result, request) { 
						Ext.MessageBox.alert('Failed', result.responseText); 
					} 
				});
			}
		}
	}
});

gridView = new Ext.grid.GridView();
laLarghezzaDellaGriglia = vport.items.items[2].lastSize.width;

gridFeatureSelected = new Ext.grid.EditorGridPanel({
    ref			: "featureGrid",
	id			: 'gridDataID',
	name		: 'gridDataName', 
	autoScroll	: true,
    //autoHeight 	: true,
    //autoWidth 	: true,
	height 		: 180,
    width 		: laLarghezzaDellaGriglia,
    stripeRows	: true, 
    loadMask	: true,
    store      	: storeData, 
    view       	: gridView,                                 
    colModel   	: colModel,                                       
    selModel   	: selModel,
    bbar: []
});

spazioGrigliaSud.add(gridFeatureSelected);
spazioGrigliaSud.doLayout();

}
