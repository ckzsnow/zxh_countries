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
function isHidden(obj) {var style = null;if(window.getComputedStyle){style = window.getComputedStyle(obj, null);} else {style = obj.currentStyle;}return (style.width=='auto');}
var interval = setInterval(function() {
	if(document.querySelector('.ELP-F0110') != null && !isHidden(document.querySelector('.ELP-F0110'))) {
		clearInterval(interval);
		var radios = document.querySelectorAll('input[value=\"2\"]');
		for(var index=0; index<radios.length; index++) {
			radios[index].click();
		}
		currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
	}
}, 1000);