var intestazioneNord,westGeoserver,spazioGrigliaSud;

function creaComponentiViewPortNorthWestSouth(){	
	
intestazioneNord = new Ext.Panel({
	region : "north",
	id : "north",		
	collapsible : false,
	titleCollapse : false,
	height : 65,
	html:'<div style="width: 100%;overflow: hidden;">'+
			'<div style="width: 85%;float: left">'+
				'<img src="img/layout/header.jpg" alt="Header" />'+
				'<img src="img/layout/grrasp1.png" align="right" style="width: 160x;height: 65px;margin-top: 0px;margin-right: 25px" alt="grrasp" />'+	
			'</div>'+
			'<div style="width: 14%;float: right;">'+	
				'<img src="img/layout/ec-logo-st-pantone-web_en.jpg" align="right" style="width: 90px;height: 59px;margin-right: 25px" alt="EU" />'+	
			'</div>'+	
		'</div>'
});
	
westGeoserver = new Ext.Panel({
	id 				: "westId",	
	name 			: "westName",
	title 			: "Geoserver",
	collapsible 	: true,
	collapsed 		: true,
	titleCollapse 	: false,
	minSize			: 125,
    maxSize			: 200,
	width 			: 150,
	region 			: "west",
	listener:[{}]
})	;

/*gli scripts per la gestione dinamica della griglia sono:
 * WFSGrid.js
 * populateGrid.js
 * layerWindow.js
*/

spazioGrigliaSud = new Ext.Panel({
	title 			: 'Data View',
   	region 			: "south",
	id 				: "southId",
	name 			: "southName",
	collapsed 		: true,
	collapsible 	: true,
	titleCollapse 	: false,
	autoScroll		: true,
	split			: true,
	minSize			: 75,
	maxSize			: 250,
	height 			: 180//,
	//forceLayout:true
});

}