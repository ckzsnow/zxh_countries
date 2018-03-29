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
		&& document.querySelector('select[title=\"Name\"]') != null
		&& document.querySelector('select[title=\"Name\"]').querySelector('option[value=\"2"]') != null
		&& document.querySelector('select[title=\"Country\"]') != null
		&& document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"'+data.visit_outside_history[0].visit_other_countries_country+'"]') != null) {
		clearInterval(interval);
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Name\"]').dispatchEvent(event);
		setTimeout(function() {
			document.querySelector('select[title=\"Name\"]').querySelector('option[value=\"2"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Name\"]').dispatchEvent(event);
			setTimeout(function(){
				document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"'+data.visit_outside_history[0].visit_other_countries_country+'"]').selected=true;
				document.querySelector('input[title=\"Date from\"]').value = data.visit_outside_history[0].visit_other_countries_from_date;
				document.querySelector('input[title=\"Date to\"]').value = data.visit_outside_history[0].visit_other_countries_to_date;
				currentStepFinish(function(){document.querySelector('button[title=\"Save the current entry\"]').click();});
			}, 1000);
		}, 1000);
	}
}, 1000);