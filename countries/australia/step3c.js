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
function findAddDocButton() {
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'Other identity documents') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[0].children[3].children[0].children[1];
		}
	}
	return button;
}
function isHidden(obj) {var style = null;if(window.getComputedStyle){style = window.getComputedStyle(obj, null);} else {style = obj.currentStyle;}return (style.width=='auto');}
var interval = setInterval(function() {
	if(document.querySelector('.ELP-F0240') != null 
		&& !isHidden(document.querySelector('.ELP-F0240'))) {
		clearInterval(interval);
		document.querySelector('.ELP-F0240').querySelector('input[value=\"1\"]').click();
		document.querySelector('.ELP-F0790').querySelector('input[value=\"2\"]').click();
		document.querySelector('.ELP-F0480').querySelector('input[value=\"2\"]').click();
		document.querySelector('.ELP-F0850').querySelector('input[value=\"'+data.has_other_identify_document+'\"]').click();
		if(data.has_other_identify_document == '1') {
			var button = findAddDocButton();
			var interval2 = setInterval(function() {
				if(!isHidden(button)) {
					clearInterval(interval2);
					currentStepFinish(function(){console.log('step3c finish.');button.click();});
				}
			}, 2000);
		} else {
			skipStep(function(){console.log('step3c skip');});
		}
	}
}, 2000);