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
		&& document.querySelector('select[title=\"Country of issue\"]') != null
		&& document.querySelector('select[title=\"Country of issue\"]').querySelector('option[value=\"PRCH\"]') != null) {
		clearInterval(interval);
		document.querySelector('input[title=\"Family name\"]').value = data.identify_card_details.identify_card_family_name;
		document.querySelector('input[title=\"Given names\"]').value = data.identify_card_details.identify_card_given_names;
		document.querySelector('input[title=\"Identification number\"]').value = data.identify_card_details.identify_card_identification_num;
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Country of issue\"]').dispatchEvent(event);
		setTimeout(function(){
			document.querySelector('select[title=\"Country of issue\"]').querySelector('option[value=\"PRCH\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Country of issue\"]').dispatchEvent(event);
			document.querySelector('input[title=\"Date of issue\"]').value = data.identify_card_details.identify_card_issue_date;
			document.querySelector('input[title=\"Date of expiry\"]').value = data.identify_card_details.identify_card_expiry_date;
			currentStepFinish(function(){console.log('step3a-1 finish');document.querySelector('button[title=\"Save the current entry\"]').click();});
		}, 1000);
	}
}, 1000);

