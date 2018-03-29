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
	if($('a[onclick=\"verify()\"]') != null && $('a[onclick=\"verify()\"]')[0] != null){
		clearInterval(interval);
		currentStepFinish(function(){$('a[onclick=\"verify()\"]')[0].click();});
	}
},2000);