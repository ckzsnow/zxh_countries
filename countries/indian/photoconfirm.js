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
	if(document.querySelector('input[value=\"Save and Continue\"]') != null){
		clearInterval(interval);
		currentStepFinish(function(){document.querySelector('input[value=\"Save and Continue\"]').click();});
	}
},5000);