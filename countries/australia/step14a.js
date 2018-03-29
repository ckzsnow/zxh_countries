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
function isHidden(obj) {var style = null;if(window.getComputedStyle){style = window.getComputedStyle(obj, null);} else {style = obj.currentStyle;}return (style.width=='auto');}
function findAddDetailsButton() {
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'Principal business activity in Australia') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[3].children[0].children[1];
		}
	}
	return button;
}
var interval = setInterval(function() {
	if(document.querySelector('select[title=\"Intended business activity\"]') != null &&
		document.querySelector('select[title=\"Intended business activity\"]').querySelector('option[value=\"'+data.business_activity_intend+'\"]') != null) {
		clearInterval(interval);
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Intended business activity\"]').dispatchEvent(event);
		setTimeout(function() {
			document.querySelector('select[title=\"Intended business activity\"]').querySelector('option[value=\"'+data.business_activity_intend+'\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Intended business activity\"]').dispatchEvent(event);
			setTimeout(function(){
				var button = findAddDetailsButton();
				var addDetailInterval = setInterval(function() {
					if(!isHidden(button)) {
						clearInterval(addDetailInterval);
						currentStepFinish(function(){button.click();});
					}
				}, 2000);
			}, 2000);
		}, 2000);
	}
}, 2000);