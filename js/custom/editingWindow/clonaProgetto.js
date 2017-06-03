var winClonaProgetto;

function azioneCloneProgetto() {

var storeProgetti = new Ext.data.JsonStore({
	url 	: 'php/DB/DBgetSchemas.php',
	root	: 'radiceSchemi',
    fields	: ['nomeSchema']
	});
		
winClonaProgetto = new Ext.Window({
		title 		: 'Clone Project',
		id 			: 'winCloneProject',
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
		   	fieldLabel 		: 'Existing Projects',	
		   	width 			: 220,
		   	name 			: 'vecchioProgettodaClonare',
		   	id 				: 'vecchioProgettodaClonare',
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
				name 			: 'newNameProjectClonato',
				id 				: 'newNameProjectClonato',
				triggerAction 	: 'all',
				forceSelection 	: true
			}
		],
		tbar : [],
		fbar : [
				{
					text 	: '<b>Clone</b> project',
					handler : function() {
						progettoScelto 	= Ext.getCmp('vecchioProgettodaClonare').value;	
						nuovoNome 		= Ext.get('newNameProjectClonato').getValue();
						Ext.Ajax.request({
							method : 'POST',
							url : 'php/DB/DBClonazione.php',
							params : {
								schemaDaClonare 	: progettoScelto,
								schemaInClonazione 	: nuovoNome
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
						winClonaProgetto.hide();
				}
				}]
	});

}
