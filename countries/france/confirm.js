function allFinish(callback){
	window.cefQuery({
		request: 'AllFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
		}
	});
}
var interval = setInterval(function(){
	if(document.querySelector('a[class=\"butt download_document\"]') != null){
		clearInterval(interval);
		document.querySelector('input[type=\"button\"][value=\"Confirm\"]').click();
		var interval1 = setInterval(function(){
			if(document.querySelector('input[type=\"submit\"][value=\"Confirm\"]') != null){
				clearInterval(interval1);
				document.querySelector('input[type=\"submit\"][value=\"Confirm\"]').click();
				var interval2 = setInterval(function(){
					if(document.querySelector('a[class=\"butt download_document\"]') != null){
						clearInterval(interval2);
						allFinish(function(){});
					}
				},2000);
			}
		},2000);
	}
},2000);