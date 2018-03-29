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
var interval = setInterval(function(){
	if(document.querySelector('.ELP-F2020') != null && !isHidden(document.querySelector('.ELP-F2020'))) {
		clearInterval(interval);
		document.querySelector('.ELP-F2020').querySelector('input[value=\"1\"]').click();
		currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
	}
}, 2000);