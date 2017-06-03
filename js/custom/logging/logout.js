function logOut(){
	
	Ext.Ajax.request({
        waitMsg: 'Please Wait',
        url: 'php/logInOut/logout.php',
        params: {},
        error: {},
        success:function(utente){
       		if (layerwin.rendered) {
				layerwin.hide();					
			}	
       		disattiva(toolbarItems);
			Ext.Msg.alert('Status', 'You are now logged out.');
	    }       
    });

};