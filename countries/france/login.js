function noticeCurrentStepFinish(callback){
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
	if(document.querySelector('#email') != null){
		clearInterval(interval);
		document.querySelector('#email').value=data.login_username;
		document.querySelector('#pwd').value=data.login_userpwd;
		noticeCurrentStepFinish(function(){
			document.querySelector('input[type=\"submit\"]').click();
		});
	}
},1000);