var bottoniVivi = new Array(1,3,4,5,6,7,8,10,11,20,21,22,23,24,25,27);

function disattiva(toolbar){
	for (var i =0; i < bottoniVivi.length; i++) {
  		toolbarItems[bottoniVivi[i]].setDisabled(true);
	};	
}

function attiva(toolbar){
	for (var i =0; i < bottoniVivi.length; i++) {
  		toolbarItems[bottoniVivi[i]].enable(true);
	};	
}