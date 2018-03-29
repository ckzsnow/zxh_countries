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
	if(document.querySelector('.ELP-F0070') != null && !isHidden(document.querySelector('.ELP-F0070'))) {
		clearInterval(interval);
		document.querySelector('.ELP-F0070').querySelector('input[value=\"NO\"]').click();
		var interval2 = setInterval(function(){
			if(!isHidden(document.querySelector('input[title=\"Email address\"]'))){
				clearInterval(interval2);
				document.querySelector('input[title=\"Email address\"]').value = '2508406908@qq.com';
				currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
			}
		}, 1000);
	}
}, 1000);