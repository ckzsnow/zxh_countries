function currentStepFinish(callback){
	window.cefQuery({
		request: 'CurrentStepFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}

var interval = setInterval(function(){
	console.log("newapplication interval enter.");
	if(document.querySelector('#btn_newapp') != null){
		console.log("newapplication find btn_newapp");
		clearInterval(interval);
		currentStepFinish(function(){console.log('newapplication has call finish.');document.querySelector('#btn_newapp').click();});
		/*currentStepFinish(function(){console.log('newapplication has call finish.');document.querySelector('#defaultActionPanel_1_0').click();});*/
	}
},1000);