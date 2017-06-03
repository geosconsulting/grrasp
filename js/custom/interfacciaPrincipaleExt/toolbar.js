var ctrl, toolbarItems = [], action, actions = {};

function creaToolbar(map) { 

//LOGIN
action = new Ext.Toolbar.Button({
	id: 'logIn',				
	tooltip: 'Login',
	iconCls: 'login',				
	handler: logIn
   });
actions["logIn"] = action;
toolbarItems.push(action);		
	
//LOGOUT
action = new Ext.Toolbar.Button({
	id: 'logOut',				
	tooltip: 'Logout',
	iconCls: 'logout',				
	handler: logOut
    });
actions["logOut"] = action;
toolbarItems.push(action);	
toolbarItems.push("-");  
    
//APERTURA LAYERS
action = new Ext.Toolbar.Button({				
	tooltip: 'Open list of <b>layers</b> available on server',
	id: 'tbLayer',
	iconCls: 'layerWin',				
	//handler: apriFinestraLayers
	handler: function(login){
 		apriFinestraLayers();
	}
 	});
actions["open"] = action;
toolbarItems.push(action);

//refresh
action = new Ext.Toolbar.Button({				
	tooltip: 'refresh',
	iconCls: 'refresh',
	//text: 'Help',
	handler: function(){
		location.reload(true);
}    		   		
});
actions["refresh"] = action;
toolbarItems.push(action);

//info popup
action = new Ext.Toolbar.Button({    	
	iconCls:'info',
   	enableToggle: true,
    allowDepress: true,
    pressed: false,
	toggleGroup: "tools",
	tooltip: "Get Info",    	
    toggleHandler: function(btn, pressed){              
       var stato=pressed;                
       if (stato==true) {   
    	   infoPopup(map);
    	   infopopup.activate();                	
       }else{
    	   infopopup.deactivate();            	   
       }               
    }
    });
actions["infopopup"] = action;
toolbarItems.push(action);
    

//Inizio IOM MOdel
action = new Ext.Toolbar.Button({    	
	iconCls:'iom',
   	enableToggle: true,
   	toggleGroup: "tools",
   	group: "tools",
    allowDepress: true,
    pressed: false,
	tooltip: "Calculate Economic Impact - <b>Input Output Model</b>",    	
    toggleHandler: function(btn, pressed){              
       var stato=pressed;                
       if (stato==true) { 
    	   infoPopupWMS(map);
           infoPopUPControl.activate();                	
       }else{
	       	infoPopUPControl.deactivate();            	   
       }               
    }
    });
actions["select"] = action;
toolbarItems.push(action);


//SelectFeature control, a "toggle" control
action = new Ext.Toolbar.Button({
    //text: "select",
 	tooltip: "Create new networks and edit data",
  	iconCls:'map_edit',    	
    handler: function(apriEditAtt){
      	interdependenciesWin = Ext.getCmp('winInterdependencies');	
      	interdependenciesWin.show();
	}
});
actions["edit"] = action;
toolbarItems.push(action);

// SelectFeature control, a "toggle" control
action = new Ext.Toolbar.Button({
    //text: "select",
 	tooltip: "Select elements of a networks",
  	iconCls:'select',    	
    handler: function(apriEditAtt){
      	//editWin = Ext.getCmp('editingWin');	
		//editWin.show();
		creaInterfaccia();
	}
});
actions["edit"] = action;
toolbarItems.push(action);
toolbarItems.push("-");  

    
// Build Scenarios control, a "toggle" control
action = new Ext.Toolbar.Button({
     //text: "select",
   	tooltip: "Create scenarios",
   	iconCls:'scenario_edit',    	
    handler: function(apriScenari){
	   	scenarioWin = Ext.getCmp('scenarioWin');	
		scenarioWin.show();
	}
});
actions["scenarios"] = action;
toolbarItems.push(action);

//Risk Simulation
action = new Ext.Toolbar.Button({
  //text: "risk",
 tooltip: "Simulate Risk Scenarios",
 iconCls:'risk_sim',    	
 handler: function(apriRishio){
 	map.addLayer(WFSEconomicImpact);
   	riskWin = Ext.getCmp('riskWin');	
	riskWin.show();	
	}
});
actions["risks"] = action;
toolbarItems.push(action);
toolbarItems.push("-");
       
/*PAN ZOOM WINDOW IN OUT*/
action = new GeoExt.Action({
   //text: "nav",
 	iconCls: 'pan',
   	control: new OpenLayers.Control.Navigation(),
    map: map,
    // button options
    toggleGroup: "tools",
    group: "tools",
    allowDepress: true,
    pressed: true,
    tooltip: "Pan the map"        
});
actions["nav"] = action;
toolbarItems.push(action);
    
    
action = new GeoExt.Action({       
   	control: new OpenLayers.Control.ZoomBox({alwaysZoom:true}),
    map: map,
    toggleGroup: "tools",
    group: "tools",
    iconCls: 'zoomin',
    tooltip: "<b>Zoom In</b> drawing a rectangle on the map"
});  
actions["zoomin"] = action;
toolbarItems.push(action);   
    
action = new GeoExt.Action({       
 	control: new OpenLayers.Control.ZoomBox({out: true}),    	
    map: map,
    toggleGroup: "tools",
    group: "tools",
    iconCls: 'zoomout',
    tooltip: "<b>Zoom Out</b> drawing a rectangle on the map"
});  
actions["zoomout"] = action;
toolbarItems.push(action); 

// Navigation history - two "button" controls
ctrl = new OpenLayers.Control.NavigationHistory();
map.addControl(ctrl);

action = new GeoExt.Action({
    //text: "previous",
 	iconCls:'back',
    control: ctrl.previous,
    disabled: true,
    tooltip: "Go to <b>previous</b> view/zoom"
});
actions["previous"] = action;
toolbarItems.push(action);

action = new GeoExt.Action({
    //text: "next",
 	iconCls:'next',
    control: ctrl.next,
    disabled: true,
   	tooltip: "Go to <b>next</b> view/zoom"
});    
actions["next"] = action;
toolbarItems.push(action);
    
// ZoomToMaxExtent control, a "button" control
action = new GeoExt.Action({
   control: new OpenLayers.Control.ZoomToMaxExtent(),
   map: map,
   iconCls: 'zoomfull',
   //text: "max extent",
    tooltip: "Zoom to maximum extent"
});
actions["max_extent"] = action;
toolbarItems.push(action);
toolbarItems.push("-");    
    
    
//APERTURA EXPORT
action = new Ext.Toolbar.Button({				
	tooltip: 'Export data in GIS/CSV format',
 	iconCls: 'export', 				
 	handler: function(login){
 			apriFinestraExport();
 	}
});
actions["openExport"] = action;
toolbarItems.push(action);   
   
//SERVER ESTERNO
action = new Ext.Toolbar.Button({				
	tooltip: 'SEDAC NASA External Server',
	iconCls: 'externalServer',				
   	handler: function(openExtServerWin){
   			externalServer();
   	}//,
   	//text: 'Layer Window',
   	//enableToggle: false,
   	//toggleHandler: onItemToggle,
   	//pressed: false
});
actions["openExtServer"] = action;
toolbarItems.push(action);      
      
//SERVER Locale
action = new Ext.Toolbar.Button({				
	tooltip: 'Upload a file to the server',
	iconCls: 'fileServerUpload',				
    handler: function(openFileServerWin){
    	createFileUploadWin();
    }     				
});
actions["openFileServer"] = action;
toolbarItems.push(action);      
        
//NAVIGA SERVER  
action = new Ext.Toolbar.Button({				
	tooltip: 'Files stored on Server',
	iconCls: 'server',
 	handler: function(naviga){
 			var win = new Ext.Window({
  			title: 'FileBrowser',
  			layout: 'fit',
  			width: 800,
  			height: 600,
  			items: [{
    			xtype: 'ux-filebrowserpanel'
  				}]
			});
	win.show();
 	} 	
});
actions["openLocalServer"] = action;
toolbarItems.push(action);       
    
//GEOMAGNETIC
action = new Ext.Toolbar.Button({				
	tooltip: 'Geomagnetic Induced Currents',
	iconCls: 'geomagnetic',
	//text: 'Help',
	handler: function(help){
      		createGeomagneticSimulatorWindow();
			geoMagneticWin.show();
}    		   		
});
actions["openGeomagnetic"] = action;
toolbarItems.push(action);

//SYSTEM
action = new Ext.Toolbar.Button({	
	iconCls:'sysConstruction',
	enableToggle: true,
   	toggleGroup: "tools",
   	group: "tools",
    allowDepress: true,
    pressed: false,
    enabled: false,
	tooltip: 'System Failure Simulation',
	handler: {},
	toggleHandler: function(btn, pressed){              
       var stato=pressed;                
       if (stato==true) {           	
           	infoNodeInterdependency.activate();                	
       }else{
	       	infoNodeInterdependency.deactivate();            	   
       }               
    }    		   		
});
//actions["openSystemSimulation"] = action;
//toolbarItems.push(action);

//LOCATE ME
action = new Ext.Toolbar.Button({				
	tooltip: 'Locate Me',
	iconCls: 'locate_me',				
	handler:function(locate){
		vectorLayerCircle.removeAllFeatures();
    	geolocate.deactivate();    
    	geolocate.watch = false;
    	firstGeolocation = true;
    	geolocate.activate();
	}
    });
actions["locateMe"] = action;
toolbarItems.push(action);	

toolbarItems.push("->");


//HELP
action = new Ext.Toolbar.Button({				
	tooltip: 'Help',
	iconCls: 'help',
	//text: 'Help',
	handler: function(help){		
      	helpwin = Ext.getCmp('helpWin');
		helpwin.show();
}    		   		
});
actions["openHelp"] = action;
toolbarItems.push(action);


//printalo
action = new Ext.Toolbar.Button({				
	tooltip: 'Print',
	iconCls: 'stampa',				
	handler:function(){				
		//Ext.MessageBox.alert('Under Development', 'Still beating around the bushes.......');		
		createPrintWindow();
		printWin.show();
	}
    });
actions["print"] = action;
toolbarItems.push(action);	

return toolbarItems;        
};


