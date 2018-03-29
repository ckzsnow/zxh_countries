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
	if(document.querySelector('input[title=\"Family name\"]') != null
		&& !isHidden(document.querySelector('input[title=\"Family name\"]'))
		&& document.querySelector('select[title=\"Reason for name change\"]') != null
		&& document.querySelector('select[title=\"Reason for name change\"]').querySelector('option[value=\"'+data.other_names.other_names_change_reason+'\"]') != null) {
		clearInterval(interval);
		document.querySelector('input[title=\"Family name\"]').value = data.other_names.other_names_family_name;
		document.querySelector('input[title=\"Given names\"]').value = data.other_names.other_namse_given_name;
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Reason for name change\"]').dispatchEvent(event);
		setTimeout(function() {
			document.querySelector('select[title=\"Reason for name change\"]').querySelector('option[value=\"'+data.other_names.other_names_change_reason+'\"]').selected = true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Reason for name change\"]').dispatchEvent(event);
			setTimeout(function(){
				if(data.other_names.other_names_change_reason == 'O') {
					var interval2 = setInterval(function(){
						if(!isHidden(document.querySelector('textarea[title=\"Give details\"]'))) {
							clearInterval(interval2);
							document.querySelector('textarea[title=\"Give details\"]').value = data.other_names.other_names_change_details;
							currentStepFinish(function(){document.querySelector('button[title=\"Save the current entry\"]').click();});
						}
					}, 2000);
				} else {
					document.querySelector('button[title=\"Save the current entry\"]').click();
					currentStepFinish(function(){});
				}
			}, 2000);
		}, 2000);
	}
}, 2000);