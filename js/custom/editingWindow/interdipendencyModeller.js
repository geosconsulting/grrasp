var winInterdependencies;
var menu;

function modelInterdependencies() {

var storeSchemas = new Ext.data.JsonStore({
	url 	: 'php/DB/DBgetSchemas.php',
	root	: 'radiceSchemi',
    fields	: ['nomeSchema']
	});
	
menu = new Ext.menu.Menu({
    id: 'mainMenu',
    style: {
        overflow: 'visible'     // For the Combo popup
    },
    items: [        
        '<b class="menu-title">Choose a Task</b>',
         {
           text: '<b>Start</b> new project',
           id: 'start',
           checked: true,
           group: 'theme',
           handler: function(){
        	    
        	   var locationLayer = new OpenLayers.Layer.Vector("Location", {
        	        styleMap: new OpenLayers.Style({
        	            externalGraphic: "http://openlayers.org/api/img/marker.png",
        	            graphicYOffset: -25,
        	            graphicHeight: 25,
        	            graphicTitle: "${name}"
        	        })
        	    });
        	   
        	   var mappaProgetto = new Ext.Window({
        		    title: "New Project",
        		    height: 280, 
        		    width: 450, 
        		    layout: "fit",
        		    items: [{
        		        xtype: "gx_mappanel",
        		        projection : P_900913,
        		        layers: [
        		            new OpenLayers.Layer.WMS(
        		            "Global Imagery", "http://maps.opengeo.org/geowebcache/service/wms",
        		            {layers: "bluemarble"}
        		        )],
        		        zoom: 1
        		    }],
        		    tbar: [{
        	            xtype: "gx_geocodercombo",
        	            hideTrigger: true,
        	            layer: locationLayer,
        	            map : mappaProgetto,
        	            // To restrict the search to a bounding box, uncomment the following line and change 
        	            //the viewboxlbrt parameter to a left, bottom, right, top bounds in EPSG:4326: 
        	            //url: "http://nominatim.openstreetmap.org/search?format=json&viewboxlbrt=15,47,17,49",
        	            width: 200
        	        }]
        		});
        	   
        	   mappaProgetto.show();
        	   
           }
         },{
           text: '<b>Merge</b> two projects',
           id: 'merge',
           checked: false,
           group: 'theme',
           handler: function(){

              if(winMergeProgetto){
            	   winMergeProgetto.show();   
               }else{
            	   azioneMergeProgetto();
            	   winMergeProgetto.show();
               }  		
        	   
           }
          },{
           text: '<b>Clone</b> a project',
           id: 'clone',
           checked: false,
           group: 'theme',
           handler: function(){      
         
           if(winClonaProgetto){
        	   winClonaProgetto.show();   
           }else{
        	   azioneCloneProgetto();
        	   winClonaProgetto.show();
           }  		   
        	   
           }
           }
      ]
});
		
winInterdependencies = new Ext.Window({
		title 		: 'Interdependencies Modeller',
		id 			: 'winInterdependencies',
		labelWidth	: 130,
		width 		: 375,
		border 		: true,
		frame 		: true,
		closeAction : "hide",
		closable 	: false,
		resizable 	: false,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		layout 		: 'form',
		listeners 	: [{}],
		defaults 	: {
			margin : '5 5 5 5'
		},
		borders 	: false,
		x 			: 100,
		y 			: 200,
		items : [
		   {
			xtype 			: 'combo',
		   	fieldLabel 		: 'Existing Projects',	
		   	width 			: 220,
		   	name 			: 'vecchiProgetti',
		   	id 				: 'vecchiProgetti',
		   	emptyText 		: 'Select Existing Project',
		   	store 			: storeSchemas,
		   	displayField	: 'nomeSchema',
		   	triggerAction 	: 'all',
		   	forceSelection 	: true,
		   	listeners : {
		       	focus : function(){		       		
		       		this.store.load({		        			
		       			  params: {}
		       		});	        		
		       	}
		    }									   
		   },{
				xtype : 'combo',
				fieldLabel 		: 'Type of Node to Edit',
				width 			: 220,
				name 			: 'layerType',
				id 				: 'layerType',
				emptyText 		: 'Select Type',
				store 			: [['pu', 'Points'], 
				      			   ['li', 'Lines'],
				      			   ['po', 'Poligons']],
				value 			: 'pu',
				triggerAction 	: 'all',
				forceSelection 	: true
			}
		         ],
		tbar : [
		    {
            text:'Manage Projects',            
            menu: menu
            }		
		],
		fbar : [
				{
					text : '<b>Edit</b> project',
					handler : function() {
					progettoScelto = Ext.getCmp('vecchiProgetti').value;
					if(Ext.getCmp('layerType').value=='pu'){
						addVectorLayerInEditing("punti","nodes_" + progettoScelto,saveStrategyPoint);
						winAttributesNodesEditing.show();
					}
					else if(Ext.getCmp('layerType').value=='li'){
						addVectorLayerInEditing("linee","lines_" + progettoScelto,saveStrategyLine);
						winAttributesLinksEditing.show();
					}
					else{
						addVectorLayerInEditing("poligoni","polys_" + progettoScelto,saveStrategyPoly);
						winAttributesPolygonEditing.show();
					};
						
					}
				},{
					text : 'Close',
					handler : function() {
						this.ownerCt.ownerCt.hide();
				}
				}]
	});
}

function addVectorLayerInEditing(tipo,layerName,saveStrategy){ 
    
var strat_bbox = [new OpenLayers.Strategy.BBOX()];
var strat_cluster = [new OpenLayers.Strategy.Cluster({distance: 75})];
	    
layerAttivoWFS = new OpenLayers.Layer.Vector("Nodes in Editing", {
	    	strategies: [
	    	     new OpenLayers.Strategy.BBOX(), 
	    	     saveStrategy
	    	],    	 
	    	//projection: P_900913,
	    	protocol: new OpenLayers.Protocol.WFS({
	    	//version: "1.1.0",    		
	    	url: "/geoserver/wfs",    		         
	        featureNS: "www.gisplatform.it",
	        featureType: layerName,
	        //maxExtent: mapextent,    		
	    	geometryName: "the_geom"
	    	,schema: "/geoserver/wfs?service=wfs&version=1.1.0&request=DescribeFeatureType&typeName=gislatform:" + layerName
	     	}),
	        styleMap: styles,
	     	displayInLayerSwitcher: false
	     });
map.addLayer(layerAttivoWFS);

controlloCheAttivaLaPossibilitaDiSelezione = new OpenLayers.Control.SelectFeature(
			layerAttivoWFS,
		{
			multiple: false,
			toggle:true,				
			hover:false
		}
	);
map.addControl(controlloCheAttivaLaPossibilitaDiSelezione);

if(tipo=="punti"){
	createNodesManagingWin(layerAttivoWFS,controlloCheAttivaLaPossibilitaDiSelezione);
	layerAttivoWFS.events.on({		
		'featureselected': function(feature) {  		
			raccogliInformazioniNodoSelezionatoPunto(feature);
		},
		'featureunselected': function(feature) {
			rilasciaInformazioniNodoSelezionatoPunto();
		}
	});		
}else if(tipo=="linee"){
	createLinksManagingWin(layerAttivoWFS,controlloCheAttivaLaPossibilitaDiSelezione);
	layerAttivoWFS.events.on({		
		'featureselected': function(feature) {  		
			raccogliInformazioniNodoSelezionatoLinea(feature);
		},
		'featureunselected': function(feature) {
			rilasciaInformazioniNodoSelezionatoLinea();
		}
	});	
}else{
	createPolygonManagingWin(layerAttivoWFS,controlloCheAttivaLaPossibilitaDiSelezione);
	layerAttivoWFS.events.on({		
		'featureselected': function(feature) {  		
			raccogliInformazioniNodoSelezionatoPoly(feature);
		},
		'featureunselected': function(feature) {
			rilasciaInformazioniNodoSelezionatoPoly();
		}
	});	
}

}