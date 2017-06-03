var store,tree,panel;

function externalServer(){
	
	//NON RIESCE A FARLE FUNZIONARE
	panel = Ext.get('laMappaCentrale');
	tree = Ext.get('laLegendaLaterale');
	
	// create a new WMS capabilities store
    store = new GeoExt.data.WMSCapabilitiesStore({
        url: "data/geoserver-columbia.xml"
    });
    
    // load the store with records derived from the doc at the above url
    store.load();

    // create a grid to display records from the store
    var grid = new Ext.grid.GridPanel({
        //title: "NASA Columbia University Database",
        store: store,
        columns: [
            {header: "Title", dataIndex: "title", sortable: true},
            {header: "Name", dataIndex: "name", sortable: true},
            {header: "Queryable", dataIndex: "queryable", sortable: true, width: 70},
            {id: "description", header: "Description", dataIndex: "abstract"}
        ],
        autoExpandColumn: "description",        
        height: 350,
        width: 650,
        floating: true,
        x: 5,
        y: 5,
        bbar: ["->", {
            text: "Add Layer",
            handler: function() {
                var record = grid.getSelectionModel().getSelected();
                if(record) {
                    var copy = record.copy();
                    // Ext 3.X does not allow circular references in objects passed to record.set 
                    copy.data["layer"] = record.getLayer();
                    copy.getLayer().mergeNewParams({
                        format: "image/png",
                        transparent: "true"
                        ,srs: "EPSG:4326"
                    });
                    mapPanel.layers.add(copy);
                    //mapPanel.map.zoomToExtent(OpenLayers.Bounds.fromArray(copy.get("llbbox")));
                }
            }
        }],
        listeners: {
            rowdblclick: mapPreview
        }
    });
       
    var wGrid = new Ext.Window({
    	id:'rowbody-win'
    	,title: "NASA Columbia University Database"
    	,width:650
    	,height:350
    	,x:25
    	,y: 50    	
    	,plain:true
    	,layout:'fit'
    	,border:true
    	,closable:true
    	,items:[grid]
    	});
    wGrid.show();
    
    function mapPreview(grid, index) {
        var record = grid.getStore().getAt(index);
        var layer = record.getLayer().clone();
        
        var wPreview = new Ext.Window({
            title: "Preview: " + record.get("title"),
            width: 512,
            height: 256,
            layout: "fit",
            items: [{
                xtype: "gx_mappanel",
                layers: [layer],
                extent: record.get("llbbox")
            }]
        });
        wPreview.show();
    }
	
	
	
}