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
function isHidden(obj) {
	var style = null;
	if (window.getComputedStyle) {
		style = window.getComputedStyle(obj, null);
	} else { 
		style = obj.currentStyle;
	}
	return (style.width=='auto');
}
function skipPageStep(callback, steps){
	window.cefQuery({
		request: 'SkipPageStep:' + steps,
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
var interval = setInterval(function(){
	if(document.querySelector('button[title=\"Go to next page\"]') != null){
		clearInterval(interval);
		if(data.applying_stream == '30') {
			currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
		} else {
			skipPageStep(function(){console.log('step10 skip');document.querySelector('button[title=\"Go to next page\"]').click();}, 1);
		}
	}
}, 1000);