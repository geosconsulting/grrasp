var winFile;
var myuploadform;
var msgUpload;

function createFileUploadWin(){	
		
winFile = new Ext.Window({
	title: "Upload file to server",
	id: 'winFile',	
	width: 400,
    items:[
       myuploadform= new Ext.FormPanel({
       html: 'Only <b>ZIP files</b> containing GIS (shapefiles) data will be uploaded. <br />Any other file format will be discarded',
       fileUpload: true,
       width: 390,
       autoHeight: true,
       bodyStyle: 'padding: 10px 10px 10px 10px;',
       labelWidth: 60,
       defaults: {
         anchor: '95%',
         allowBlank: false,
         msgTarget: 'side'
       },
       items:[
         //{
         //  xtype:"combo",
         //  fieldLabel:"Projection",
         //  name:"cmbProiezione",
         //  hiddenName:"cmbProiezione"
  		//},
         {
	       xtype: 'fileuploadfield',
	       id: 'upload',
	       name: 'upload',          
	       emptyText: 'Select a document to upload...',
	       fieldLabel: 'File',
	       buttonText: 'Browse'
          }
        ],
          buttons: [
          	{
            text: 'Upload',
            type : 'submit',
            handler: function(){
             if(myuploadform.getForm().isValid()){
            	myuploadform.getForm().submit({            			 
            		method: 'POST',
            		url: 'php/publiSHP.php',            		 	 
            		waitMsg: 'Uploading file...',
            		success: function(myuploadform,fileUp){	  	            	
            			FileSHPAttivo = fileUp.result.file;
            			msgUpload('Processed successfully', FileSHPAttivo + " uploaded to server");            			
            		},
            		failure: function(){
	            	 	msgUpload('Not Processed', 'File error');
            		}
            	});
            }
           }
          },{
            text: 'Cancel',
            handler: function(){
            	  winFile.close();
              }
         	}
         ]
         })
    ]});
	winFile.show();
}
    
msgUpload = function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    };
	