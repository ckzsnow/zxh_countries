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
	if(document.querySelectorAll('.wc-cell .wc-button') != null){
		clearInterval(interval);
		currentStepFinish(function(){console.log('logincontinue has call finish.');document.querySelectorAll('.wc-cell .wc-button')[0].click();});
	}
},1000);