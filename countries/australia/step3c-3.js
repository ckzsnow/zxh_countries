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
	if(document.querySelector('button[title=\"Save the current entry\"]') != null
		&& !isHidden(document.querySelector('button[title=\"Save the current entry\"]'))
		&& document.querySelector('select[title=\"Type of document\"]') != null
		&& document.querySelector('select[title=\"Type of document\"]').querySelector('option[value=\"'+data.orther_document.orther_document_document_type+'\"]') != null
		&& document.querySelector('select[title=\"Country of issue\"]') != null
		&& document.querySelector('select[title=\"Country of issue\"]').querySelector('option[value=\"'+data.orther_document.orther_document_issue_country+'\"]') != null) {
		clearInterval(interval);
		document.querySelector('input[title=\"Family name\"]').value = data.orther_document.orther_document_family_name;
		document.querySelector('input[title=\"Given names\"]').value = data.orther_document.orther_document_given_names;
		document.querySelector('select[title=\"Type of document\"]').querySelector('option[value=\"'+data.orther_document.orther_document_document_type+'\"]').selected = true;
		document.querySelector('input[title=\"Identification number\"]').value = data.orther_document.orther_document_identification_number;
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Country of issue\"]').dispatchEvent(event);
		setTimeout(function(){
			document.querySelector('select[title=\"Country of issue\"]').querySelector('option[value=\"'+data.orther_document.orther_document_issue_country+'\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Country of issue\"]').dispatchEvent(event);
			setTimeout(function(){
				currentStepFinish(function(){document.querySelector('button[title=\"Save the current entry\"]').click();});
			},3000);
		}, 2000);
	}
}, 2000);