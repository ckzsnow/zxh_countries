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
	if(document.querySelector('button[title=\"Go to the next page\"]') != null && !isHidden(document.querySelector('button[title=\"Go to the next page\"]'))) {
		clearInterval(interval);
		console.log('step22, click button Go to the next page');
		currentStepFinish(function(){document.querySelector('button[title=\"Go to the next page\"]').click();});
	}
}, 3000);