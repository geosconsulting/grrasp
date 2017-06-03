var bufferRadius;
var winAttiva;

function creaInterfaccia(){
	
btnSelezionaSingolo = new Ext.Button({
	//text: 'Select Node',
	iconCls:'selNodo',  
	id: 'selezionaNodoSingolo',
	enableToggle: true,
	toggleGroup : 'attributi',
	value: 'nodoSingolo',
	handler: function (btn) {},
	toggleHandler: function(btn, stato){
		if (layerAttivo!=undefined){
			if (stato == true) {			
				selezioni();
				selezFeatSingola.activate();                	   	
			}else{
				selezFeatSingola.deactivate(); 
				selezFeatSingola.unselectAll();
			}       
		} else {
			if(stato){				
				this.toggle();
			}
			disattivaTool(btn.id);	
		}		       
	}
}); 

btnSelezionaCerchio = new Ext.Button({
	//text: 'Select with Circle',
	iconCls:'selCerchio', 
	id: 'selezionaCerchio',
	enableToggle: true,
	toggleGroup : 'attributi',
	value: 'cerchioAttivo',
	handler: function (btn) {},
	toggleHandler: function(btn, stato){
		if (layerAttivo!=undefined){
			if (stato==true) {				
				bufferSizeWin.show();
				selezioni();
				SelectFeatureCircolare.unselectAll();
				clickCentroCerchio.activate();              	   	
			}else{         	            	
				vectorLayerCircle.removeAllFeatures();
				clickCentroCerchio.deactivate(); 
				SelectFeatureCircolare.unselectAll();
				bufferSizeWin.hide();
			}
		} else {			
			if(stato){				
				this.toggle();
			}
			disattivaTool(btn.id);	
		}
	}	
}); 

btnSelezionaRettangolo = new Ext.Button({
	//text: 'Select with Rectangle',
	iconCls:'selRettangolo', 
	id: 'selezionaRettangolo',
	enableToggle: true,
	toggleGroup : 'attributi',
	value: 'selezionaRettangolo',
	handler: function (btn) {},
	toggleHandler: function(btn, stato){
		if (layerAttivo!=undefined){
			if (stato==true) {
				selezioni();
				selezFeatMultiple.activate();                	   	
			}else{     
				selezFeatMultiple.deactivate();
				selezFeatMultiple.unselectAll();
			} 
		} else {
			if(stato){				
				this.toggle();
			}
			disattivaTool(btn.id);	
		}
	}	
}); 

btnSelezionaPoligono = new Ext.Button({
	//text: 'Select with Polygon',
	iconCls:'selPoligono', 
	id: 'selezionaPoligono',
	enableToggle: true,
	toggleGroup : 'attributi',
	value: 'selezionaPoligono',
	handler: function (btn) {},
	toggleHandler: function(btn, stato){
		if (layerAttivo!=undefined){
			if (stato==true) {
				selezioni();
				disegnoPoligono.activate();              	   	
			}else{         	            	
				disegnoPoligono.deactivate();
				layerPoligoni.removeAllFeatures();
				SelectFeaturePoligonale.unselectAll();
			}  
		} else {
			if(stato){				
				this.toggle();
			}
			disattivaTool(btn.id);	
		}
	}	
}); 

btnSelezionaRegione = new Ext.Button({
	iconCls:'selRegione', 
	id: 'selezionaRegione',
	enableToggle: true,
	toggleGroup : 'attributi',
	value: 'selezionaRegione',
	handler: function (btn) {},
	toggleHandler: function(btn, stato){
		if (stato==true) {
			selezioni();
			selezionaRegione.activate();            	   	
		}else{        
			selezionaRegione.deactivate(); 
			vectorLayerRegione.removeAllFeatures();
			SelectFeatureRegionale.unselectAll();			            	  	   
		}              
	}	
});

btnMappaPerMatlab = new Ext.Button({
	text: 'Format Data',
	id: 'mappaDati',
	enableToggle: false,	
	handler: function () {	
		creaMappatura();		
	}
});
  
selWin = new Ext.Window({
	layout: "fit",
	title: "Select Elements",
	closeAction: "hide",			
	width: 220,
	height: 65,
	x: 380,
	y: 120,
	items : [{
		id: "pannelloEdit",
		xtype : "panel",
		bodyStyle: 'padding: 2px;',
		//title : "Panel",		
		layout:'hbox',
		activeItem: 0, // index or id
		items : [
		   btnSelezionaSingolo,
		   btnSelezionaCerchio,
		   btnSelezionaRettangolo,
		   btnSelezionaPoligono,
		   btnSelezionaRegione,
		   btnMappaPerMatlab
		]
	}]
});	 

selWin.show();	
}

function disattivaTool(btnSelezionato){	
	Ext.MessageBox.show({
		title: 'Error',
		msg:   'Choose a Layer for selection',
		buttons: Ext.MessageBox.OK,				
		icon: Ext.MessageBox.ERROR,
		fn: function(){}
	});	
}

function creaFinestraBufferSize(){	
	
pannelloBuffer = new Ext.FormPanel({ 
	    labelWidth:80,
	    frame:true,     
	    defaultType:'textfield',
		monitorValid:true,	
	    items:[{ 
	        fieldLabel:'Radius', 
	        name:'radius', 
	        id:'radius',
	        allowBlank:false 
	     }],
	    buttons:[{ 
	    	text:'OK',
	        formBind: true,
	        handler:function(){
	        	vectorLayerCircle.removeAllFeatures();
	        	var winAttiva = Ext.WindowMgr.getActive();
	        	illo = Ext.getCmp('radius');
	        	buffer = illo.getValue();
	        	if (winAttiva) {	        		
	        		winAttiva.hide();	        		
	        	}	        	
	        } 
	    },
	    {
	     text:'Cancel',
	     formBind: false,
	     handler:function(){
	    	 Ext.getCmp('selezionaCerchio').toggle();
	    	 bufferSizeWin.hide();
	       }
	     }
	   ] 
	});
	   
bufferSizeWin = new Ext.Window({
		 	title:'Insert Buffer Radius',
	    	closable: false,
	        layout:'fit',
	        width:250,
	        height:100,       
	        resizable: false,
	        plain: true,
	        border: false,
	        items: [pannelloBuffer]
	});
	
}