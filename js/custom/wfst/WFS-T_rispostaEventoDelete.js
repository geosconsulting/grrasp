function showMsg(szMessage) {
 	Ext.Msg.alert('Status', szMessage);;
}

function showSuccessMsg(){
 	showMsg("Transaction successfully completed");
 };
 
function showIniziatoMsg(){
 	showMsg("Transaction successfully initiated");
 };

function showFailureMsg(){
 	showMsg("An error occured while operating the transaction");
};

 