function currentStepFinish(callback){
	window.cefQuery({
		request: 'CurrentStepFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
		}
	});
};
var interval = setInterval(function(){
	if(document.querySelector('input[value=\"Verified and Continue\"]') != null){
		clearInterval(interval);
		currentStepFinish(function(){document.querySelector('input[value=\"Verified and Continue\"]').click();});
	}
},5000);