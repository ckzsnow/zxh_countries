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
	if(document.querySelectorAll('.wc-cell .wc-input input') != null){
		clearInterval(interval);
		document.querySelectorAll('.wc-cell .wc-input input')[0].value = data.login_username;
		document.querySelectorAll('.wc-cell .wc-input input')[1].value = data.login_password;
		currentStepFinish(function(){console.log('login has call finish.');document.querySelectorAll('.wc-cell .wc-button')[0].click();});
	}
}, 1000);