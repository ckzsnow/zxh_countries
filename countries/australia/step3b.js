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
function findAddOtherNameButton() {
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'Other names / spellings') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[0].children[3].children[0].children[1];
		}
	}
	return button;
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
var interval = setInterval(function(){
	if(document.querySelector('input[title=\"Town / City\"]') != null 
		&& !isHidden(document.querySelector('input[title=\"Town / City\"]'))
		&& document.querySelector('select[title=\"Country of birth\"]') != null
		&& document.querySelector('select[title=\"Country of birth\"]').querySelector('option[value=\"'+data.birth_country+'\"]') != null
		&& document.querySelectorAll('select[title=\"Relationship status\"]') != null
		&& document.querySelectorAll('select[title=\"Relationship status\"]').length >= 1
		&& document.querySelectorAll('select[title=\"Relationship status\"]')[0].querySelector('option[value=\"'+data.relationship_status+'\"]') != null) {
		clearInterval(interval);
		document.querySelector('input[title=\"Town / City\"]').value = data.birth_town_city;
		document.querySelector('input[title=\"State / Province\"]').value = data.birth_state_province;
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Country of birth\"]').dispatchEvent(event);
		setTimeout(function() {
			document.querySelector('select[title=\"Country of birth\"]').querySelector('option[value=\"'+data.birth_country+'\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Country of birth\"]').dispatchEvent(event);
			setTimeout(function(){
				var mstatusNodes = document.querySelectorAll('select[title=\"Relationship status\"]');
				if(mstatusNodes.length>1){
					document.querySelectorAll('select[title=\"Relationship status\"]')[1].querySelector('option[value=\"'+data.relationship_status+'\"]').selected=true;
				} else {
					document.querySelectorAll('select[title=\"Relationship status\"]')[0].querySelector('option[value=\"'+data.relationship_status+'\"]').selected=true;
				}
				document.querySelector('.ELP-F0760').querySelector('input[value=\"'+data.has_other_names+'\"]').click();
				if(data.has_other_names == '1') {
					var button = findAddOtherNameButton();
					var interval2 = setInterval(function() {
						if(!isHidden(button)) {
							clearInterval(interval2);
							currentStepFinish(function(){button.click();});
						}
					}, 1000);
				} else {
					skipStep(function(){console.log('step3b skip');});
				}
			}, 2000);
		}, 2000);
	}
}, 2000);