var vPort;
var mapPanel,legendPanel,modelPanel,tree;
var printExtent;
var printProvider;

function creaStruttura(map,toolBar) {
	
//EUROPA
//lon = 11.16;
//lat = 56.01;

//Lombardia
lon = 9.80;
lat = 45.00;

var lonlat = new OpenLayers.LonLat(lon, lat);	
lonlat.transform(P_4326,P_900913);

//The printProvider that connects us to the print service
printProvider = new GeoExt.data.PrintProvider({
	method : "GET", // "POST" recommended for production use
	capabilities : printCapabilities, // from the info.json script in the
	// html
	customParams : {
		mapTitle : "Printing Demo",
		comment : "This is a map printed from GeoExt."
	}
});


//The printExtent 
printExtent = new GeoExt.plugins.PrintExtent({
	printProvider : printProvider,
});


mapPanel = new GeoExt.MapPanel({
		id: "laMappaCentrale",
		border : true,
		region : "center",
		map : map,
		center:lonlat,
		//EUROPA
		//zoom: 4,
		//Lombardia
		zoom: 5,
		tbar: toolBar,
		plugins : [printExtent],
		items: [/*{
        	xtype: "gx_zoomslider",
        	aggressive: true,
        	vertical: true,
        	height: 100,
	       	x: 12,
    	    y: 60, 
    	    plugins: new GeoExt.ZoomSliderTip({
        		template: "Scale: 1 : {scale}<br>Zoom: {zoom}"
    		})
    	}*/]
});

printExtent.hide();

legendPanel = new GeoExt.LegendPanel({
	id		: "laLegendaLaterale",	
    defaults: {
        labelCls: 'mylabel',
        style: 'padding:5px'
    },
    bodyStyle: 'padding:5px',
    width: 350,
    autoScroll: true,
    region: 'east'
});


vport = new Ext.Viewport({
	layout : "border",	
	id: "vPortID",
	name: "vPortName",
	items : 
		[
		mapPanel, 
		westGeoserver,
    	spazioGrigliaSud,
    	intestazioneNord,
    	{
		region : "east",
		title : "Modelling, Legend and News",
		split: true,  
    	minSize: 125, 
    	maxSize: 300,
		width : 250,
		collapsible : true,
		titleCollapse : false,
		autoScroll: true,
		items : [{
			layout : "accordion",
			layoutConfig : {
				activeOnTop : false,
				animate : true,
				autoWidth : true,
				collapseFirst : false,
				fill : true,
				hideCollapseTool : false,
				titleCollapse : false
				},items:[{
					title : "Legend",
					autoHeight : true,
					items : [legendPanel]
					},{
					title : "Models",
					autoHeight : true,
					id : 'modelPanel',
					name : 'modelPanel',
					items : [MatlabPanel]
				},{
					title : "JRC News",
					autoHeight : true,
					id : 'JRCPanel',
					items : [RSSPanel]
				}/*,{
					title : "Interdependency Matrix",
					autoHeight : true,
					bodyCfg: {
			       	//tag: 'applet',
			       	//archive: 'java/IIMWeb.jar',
			       	//code: 'IIMatrixWeb.class'
					}
				}*/]
	}]
	}/*,tree*/]
});
	
westGeoserver.on('expand', function() {    
	distruggiPannelloGeoserver();
	leggiGeo();
});
	
return mapPanel;
};
