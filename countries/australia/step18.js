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
function setRemainedInfo() {
	document.querySelector('.ELP-F2152').querySelector('input[value=\"2\"]').click();
	document.querySelector('.ELP-F2156').querySelector('input[value=\"'+data.has_had_a_refused_visa+'\"]').click();
	if(data.has_had_a_refused_visa == '1') {
		var event = document.createEvent('HTMLEvents');
		event.initEvent("change", true, true);
		event.eventType = 'message';
		document.querySelector('.ELP-F2156').dispatchEvent(event);
		setTimeout(function(){
			var interval = setInterval(function() {
				if(!isHidden(document.querySelector('.ELP-F1160_2 textarea'))) {
					clearInterval(interval);
					document.querySelector('.ELP-F1160_2 textarea').value = data.refused_details;
					currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
				}
			}, 1000);
		}, 1000);
	} else {
		currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
	}
}
var interval = setInterval(function() {
	if(document.querySelector('.ELP-F2159') != null
		&& document.querySelector('.ELP-F2159').querySelector('input[value=\"'+data.hold_visa_to_australia_other_country+'\"]') != null) {
		clearInterval(interval);
		document.querySelector('.ELP-F2159').querySelector('input[value=\"'+data.hold_visa_to_australia_other_country+'\"]').click();
		if(data.hold_visa_to_australia_other_country == '1') {
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('.ELP-F2159').dispatchEvent(event);
			setTimeout(function() {
				var interval2 = setInterval(function() {
					if(!isHidden(document.querySelector('.ELP-F1160 textarea'))) {
						clearInterval(interval2);
						document.querySelector('.ELP-F1160 textarea').value = data.hold_visa_detail;
						setRemainedInfo();
					}
				}, 1000);
			});
		} else {
			setRemainedInfo();
		}
	}
}, 1000);