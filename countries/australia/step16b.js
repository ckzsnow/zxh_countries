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
	if(document.querySelector('.ELP-F0400') != null && !isHidden(document.querySelector('.ELP-F0400'))) {
		clearInterval(interval);
		document.querySelector('.ELP-F0400').querySelector('input[value=\"2\"]').click();
		document.querySelector('.ELP-F0410').querySelector('input[value=\"2\"]').click();
		document.querySelector('.ELP-F0430').querySelector('input[value=\"2\"]').click();
		document.querySelector('.ELP-F6105').querySelector('input[value=\"2\"]').click();
		document.querySelector('.ELP-F0443').querySelector('input[value=\"2\"]').click();
		currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
	}
}, 1000);