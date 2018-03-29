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
function skipStep(callback){
	window.cefQuery({
		request: 'SkipStep:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
function findAddExpButton() {
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'Health declarations') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[2].children[0].children[1];
		}
	}
	return button;
}
var interval = setInterval(function() {
	if(document.querySelector('.ELP-F0390') != null && !isHidden(document.querySelector('.ELP-F0390'))) {
		clearInterval(interval);
		document.querySelector('.ELP-F0390').querySelector('input[value=\"'+data.has_visited_lived_outside+'\"]').click();
		var event = document.createEvent('HTMLEvents');
		event.initEvent("change", true, true);
		event.eventType = 'message';
		document.querySelector('.ELP-F0390').dispatchEvent(event);
		setTimeout(function(){
			if(data.has_visited_lived_outside == '1') {
				var button = findAddExpButton();
				var interval2 = setInterval(function(){
					if(!isHidden(button)) {
						clearInterval(interval2);
						currentStepFinish(function(){button.click();});
					}
				}, 1000);
			} else {
				skipStep(function(){console.log('step16a skip');});
			}
		}, 1000);
	}
}, 1000);