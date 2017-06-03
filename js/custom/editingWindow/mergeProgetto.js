var winMergeProgetto;

function azioneMergeProgetto() {

var storeProgetti = new Ext.data.JsonStore({
	url 	: 'php/DB/DBgetSchemas.php',
	root	: 'radiceSchemi',
    fields	: ['nomeSchema']
	});
		
winMergeProgetto = new Ext.Window({
		title 		: 'Merge Project',
		id 			: 'winMergeProject',
		labelWidth	:130,
		width 		: 375,
		border 		: true,
		frame 		: true,
		closeAction : "hide",
		closable 	: false,
		resizable 	: false,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		layout : 'form',
		listeners : [{}],
		defaults : {
			margin : '5 5 5 5'
		},
		borders : false,
		x : 200,
		y : 300,
		items : [
		   {
			xtype 			: 'combo',
		   	fieldLabel 		: 'Base Project',	
		   	width 			: 220,
		   	name 			: 'baseProject',
		   	id 				: 'baseProject',
		   	emptyText 		: 'Select Existing Project',
		   	store 			: storeProgetti,
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
		   },
		   {
				xtype 			: 'combo',
			   	fieldLabel 		: 'Other Project',	
			   	width 			: 220,
			   	name 			: 'otherProject',
			   	id 				: 'otherProject',
			   	emptyText 		: 'Select Existing Project',
			   	store 			: storeProgetti,
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
				xtype 			: 'textfield',
				fieldLabel 		: 'New Name',
				width 			: 220,
				name 			: 'newNameProjectUnito',
				id 				: 'newNameProjectUnito',
				triggerAction 	: 'all',
				forceSelection 	: true
			}
		],
		tbar : [],
		fbar : [
				{
					text 	: '<b>Merge</b> project',
					handler : function() {
						progettoScelto1 	= Ext.getCmp('baseProject').value;
						progettoScelto2 	= Ext.getCmp('otherProject').value;
						nuovoNomeMerge 		= Ext.get('newNameProjectUnito').getValue();
						Ext.Ajax.request({
							method : 'POST',
							url : 'AGGIUNGERE PROCEDURA PHP PER MERGE',
							params : {
								primoSchema 	: progettoScelto1,
								secondoSchema 	: progettoScelto2,
								schemaInMerge 	: nuovoNomeMerge
							},
							success : function(response) {			
													
							Ext.Msg.show({ 
									title 	: 'Success',
									//msg : "New node ID :<b> '" + idAggiunto + "'</b> Description is <b> '" + newDesc + "'</b> and type is '<b>" + newTipo + "'</b>",
									msg : response.responseText,
									buttons : Ext.Msg.OK,
									fn: function(){}									
								});	
							},
							failure : function(response) {										
								winAdd.hide();
								Ext.Msg.show({ 
									title : 'Failure',
									msg : response.responseText,
									buttons : Ext.Msg.OK
								});
							},
							callback : function(response) {	}
						});	
					}
				},{
					text : 'Close',
					handler : function() {						
						winMergeProgetto.hide();
				}
				}]
	});

}
