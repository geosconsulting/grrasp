function logIn(){	
	Ext.Ajax.request({
		 method: 'GET',
         waitMsg: 'Please Wait',
         url: 'php/logInOut/readSession.php',
         params: {},
         success:function(utente){
        	 if (utente.responseText=="") {
        		 creaFinestraLogIn();		
 	    	} 			
         }
     });

};

function creaFinestraLogIn(){	
	
	var windowLogin;
	
	var login = new Ext.FormPanel({ 
	    labelWidth:80,
	    frame:true,     
	    defaultType:'textfield',
		monitorValid:true,	
	    items:[{ 
	        fieldLabel:'Username', 
	        name:'loginUsername', 
	        allowBlank:false 
	     },{ 
	       fieldLabel:'Password', 
	       name:'loginPassword', 
	       inputType:'password', 
	       allowBlank:false 
	     }],
	    buttons:[{ 
	    	text:'Login',
	        formBind: true,
	        handler:function(){ 
	        	login.getForm().submit({ 
	        		method:'POST',
	        		url:'php/logInOut/login.php',
	        		waitTitle:'Connecting', 
	        		waitMsg:'Sending data...',
	        		success:function(form,action){
	        			Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
		            		if (btn == 'ok'){	            			
		            			windowLogin.hide();	
		            			attiva(toolbarItems);
		            		}
	        			});
	        		},
	        		failure:function(form, action){ 
	        			if(action.failureType == 'server'){ 
	        				obj = Ext.util.JSON.decode(action.response.responseText); 
	        				Ext.Msg.alert('Login Failed!', obj.errors.reason); 
	        			}else{ 
	        				Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
	        			}		 
	        			login.getForm().reset(); 
	        		} 
	        	}); 
	     } 
	    },
	    {
	     text:'Cancel',
	     formBind: false,	 
	     // Function that fires when user clicks the button 
	     handler:function(){
	       	 windowLogin.hide();
	       }
	     }//fine bottone di uscita login
	   ] 
	});
	   
	windowLogin = new Ext.Window({
		 	title:'Please Login',
	    	closable: false,
	        layout:'fit',
	        width:260,
	        height:130,       
	        resizable: false,
	        plain: true,
	        border: false,
	        items: [login]
	});
	
	 windowLogin.show();
	
}


