var MatlabPanel;
var model;

var msg = function(title, msg){
    Ext.Msg.show({
        title: title,
        msg: msg,
        minWidth: 200,
        modal: true,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK
    });
};

var storeFiles = new Ext.data.JsonStore({
    url: 'php/listaFilesJson.php',
    root: 'archivos',
    fields: ['nomeFile']/*,
    baseParams: {
        modello: 'modello'     
    }*/
});

modello = 'xls';

MatlabPanel = new Ext.Panel({
	id : "areaModuliMatlab",
	layout : 'form',
	items : [
	    {
		xtype : "fieldset",
		id : 'fieldset',
		name : 'fieldset',
		title : "Parameters",
		autoHeight : true,
		width : 240,
		style : 'padding: 0 0px 5px 0px',
		items : [{
			xtype : "combo",
			fieldLabel : "Select Model",
			id : "modelType",
			name : "modelType",
			hiddenName : "combovalue",
			width : 130,
			emptyText : 'Select Model',
			store : [//['sc', 'System Construction'],
					 //['ss', 'System Simulation'],
					 //['rn', 'Random Numbers'], 
					 ['me', 'Metrics'],
					 //['io', 'Input-Output Model'],
					 //['ma', 'Test Matrice']
					 ],
			value : 'me',
			triggerAction : 'all',
			listeners : {
				select : function(){	        		
	        		tipoModello = this.value;
	        		if(tipoModello == 'io'){
	        			modello = 'mat';
	        			var illo = Ext.getCmp('chbPath');
	        			illo.setVisible(false);
	        		}else if(tipoModello == 'ma') {
	        			modello = 'txt';
	        			var illo = Ext.getCmp('chbPath');
	        			illo.setVisible(false);
	        		}else{
	        			modello = 'xls';
	        			illo = Ext.getCmp('ckbPath');
	        			var illo = Ext.getCmp('chbPath');
	        			illo.setVisible(true);
	        		}
	        		//console.log(model);
	        	}
			}
		},{
			xtype : "combo",
			disabled : false,
			fieldLabel : "Input File",
			emptyText : 'Select Input File',
			id : "nomeFile",
			name : "nomeFile",
			width : 130,
			triggerAction: 'all',
	        store: storeFiles,
	        displayField: 'nomeFile',
	        listeners : {
	        	focus : function(){	        		
	        		this.store.load({
	        			  params: {
	        				  model: modello
	        			  }
	        		});	        		
	        	}
	        }
		},{
			xtype : "checkbox",
			id : "chbPath",
			inputValue : "pathSiNo",
			labelSeparator : '',
			hideLabel : true,
			boxLabel : 'Calculate Critical Path?',
			fieldLabel : 'Calculate Critical Path?',
			listeners : {
				check : function(cb, value) {
					if (value) {
						illo = Ext.getCmp('sNode');
						illo.setDisabled(false);
						illo = Ext.getCmp('eNode');
						illo.setDisabled(false);
					} else {
						illo = Ext.getCmp('sNode');
						illo.setDisabled(true);
						illo = Ext.getCmp('eNode');
						illo.setDisabled(true);
					}
				}
			}
		},{
			xtype : "numberfield",
			disabled : true,
			fieldLabel : "Start node",
			id : "sNode",
			name : "sNode",
			width : 40
		},{
			xtype : "numberfield",
			disabled : true,
			fieldLabel : "End node",
			id : "eNode",
			name : "eNode",
			width : 40
		}, {
			xtype : "button",
			text : "Run Model",
			id : "run",
			name : "run",
			width : 80,
			handler : function() {				
				
				var model = Ext.get("modelType").getValue();							
				var fileAttivo;
				var fileNameText = Ext.get('nomeFile').getValue();
				//console.log(fileNameText);				
				if (model == 'Random Numbers') {
					if (fileNameText!=''){
						fileAttivo = fileNameText + '.txt';
						var urlFileAttivo = ' ';
						var risposta = ' ';
						Ext.Ajax.request({
							method : 'POST',
							url : 'php/matlabCalls/callMatlabM.php',
							params : {
								fileName : fileAttivo								
							},
							success : function(response) {							
								urlFileAttivo = response.responseText;							
								Ext.Msg.alert("Info", "File created in \n" + urlFileAttivo);
								//Ext.Msg.alert("Info", "File created");																
							},failure :function(response) {
								Ext.Msg.alert("Info", "Problems in creating the file");						
							},
							callback : function(response){
									
							}
						});					
					}else{
						alert("nome valido nel File name");
					}
				}
				else if (model == 'Input-Output Model') {
					var fileVal  	= Ext.get('nomeFile').getValue();
					progressWin();
					Ext.Ajax.request({
						method : 'POST',
						dataType : 'json',
						url : 'php/matlabCalls/callMatlabMOlaf.php',
						params : {
							//fileName : fileAttivo							
						},
						success : function(response) {
							Ext.Msg.alert("Info", "Charts successfully created");
						},
						failure : function(response) {	
							console.log(response);
							Ext.Msg.alert("Info","The server returned the following message <b>'" + response.statusText + "</b>");
						},
						callback : function(response) {
							//Ext.Msg.alert("Info", "Files created");
						}
					});
				}				
				else if (model == 'Metrics') {
						var fileVal  	= Ext.get('nomeFile').getValue();
						var path  		= Ext.getCmp('chbPath').checked;
						var sNodeVal 	= Ext.get('sNode').getValue();
						var eNodeVal 	= Ext.get('eNode').getValue();	
						progressWin();						
						Ext.Ajax.request({
							method : 'POST',
							dataType : 'json',
							url : 'php/matlabCalls/callCompiledMetrics.php',
							params : {
								fileCalcolo : fileVal,
								pathCritico : path,
								nodoEntrata : sNodeVal,
								nodoUscita : eNodeVal
							},
							success : function(response) {
								console.log(response.responseText);
								console.log(response.statusText);
								Ext.Msg.alert("Info", "Files successfully created. <br /> Use server file browser to download them");
							},
							failure : function(response) {	
								console.log(response);
								Ext.Msg.alert("Info","The server returned the following message <b>'" + response.statusText + "'</b><br />Files could have been created" + 
															" use the server file browser to download them");
							},
							callback : function(response) {
								//Ext.Msg.alert("Info", "Files created");
							}
						});
					} 
					else if (model == 'System Construction') {
						progressWin();
						Ext.Ajax.request({
							method : 'POST',
							dataType : 'json',
							url : 'php/matlabCalls/callMatlabMSystemConstruction.php',
							params : {
								//fileName : fileAttivo							
							},
							success : function(response) {
								Ext.Msg.alert("Info", "Success");
							},
							failure : function(response) {	
								console.log(response);
								Ext.Msg.alert("Info","The server returned the following message <b>'" + response.statusText + "</b>");
							},
							callback : function(response) {
								//Ext.Msg.alert("Info", "Files created");
							}
						});
					}					
					else if (model == 'Test Matrice') {
						//progressWin();
						//Ext.Msg.alert('Modello', 'Test Matrice');
						fileAttivo = fileNameText + '.txt';
						var urlFileAttivo = ' ';
						var risposta = ' ';
						Ext.Ajax.request({
							method : 'POST',
							url : 'php/matlabCalls/callMatlabMProvaMa.php',
							success : function(response) {							
								matriceDiRitorno = response.responseText;							
								Ext.Msg.alert("Info", matriceDiRitorno);																
							},failure :function(response) {
								Ext.Msg.alert("Info", "Nessuna Matrice");						
							},
							callback : function(response){
								
							}
						});
					}
					else {
						Ext.Msg.alert("Info", "Model not implemented yet");
					}			
			}
		}]
	}]
});