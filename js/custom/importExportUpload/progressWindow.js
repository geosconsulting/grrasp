function progressWin(){
    
Ext.MessageBox.show({
  	id:'progressWin',
  	name:'progressWin',
    title: 'Please wait',
    msg: 'Matlab module calculating...',
    progressText: 'Initializing...',
    width:300,
    progress:true,
    closable:false
});

// this hideous block creates the bogus progress
var f = function(v){
    return function(){
    if(v == 15){
        Ext.MessageBox.hide();
    }else{
       var i = v/14;
       Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
       }
    };
};

	for(var i = 1; i < 13; i++){
		setTimeout(f(i), i*500);
	}
};   
  
