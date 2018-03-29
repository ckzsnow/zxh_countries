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
	if(document.querySelector('input[title=\"Family name\"]') != null) {
		clearInterval(interval);
		document.querySelector('input[title=\"Family name\"]').value = data.addition_family_name;
		document.querySelector('input[title=\"Given names\"]').value = data.addition_given_names;
		document.querySelector('.ELP-F0570').querySelector('input[value=\"'+data.addition_sex+'\"]').click();
		document.querySelector('input[title=\"Date of birth\"]').value = data.addition_birth_date;
		document.querySelector('input[title=\"Passport number\"]').value = data.addition_ppt_num;
		var countryInterval = setInterval(function(){
			if(document.querySelector('select[title=\"Country of passport\"]') != null &&
				document.querySelector('select[title=\"Country of passport\"]').querySelector('option[value=\"'+data.addition_ppt_country+'\"]') != null) {
				clearInterval(countryInterval);
				var event = document.createEvent('HTMLEvents');
				event.initEvent("click", true, true);
				event.eventType = 'message';
				document.querySelector('select[title=\"Country of passport\"]').dispatchEvent(event);
				setTimeout(function(){
					document.querySelector('select[title=\"Country of passport\"]').querySelector('option[value=\"'+data.addition_ppt_country+'\"]').selected=true;
					var event = document.createEvent('HTMLEvents');
					event.initEvent("change", true, true);
					event.eventType = 'message';
					document.querySelector('select[title=\"Country of passport\"]').dispatchEvent(event);
					setTimeout(function(){
						document.querySelector('select[title=\"Nationality of passport holder\"]').querySelector('option[value=\"'+data.addition_nationality+'\"]').selected = true;
						document.querySelector('input[title=\"Date of issue\"]').value = data.addition_issue_date;
						document.querySelector('input[title=\"Date of expiry\"]').value = data.addition_expiry_date;
						var placeInterval = setInterval(function(){
							if(document.querySelector('select[title=\"Place of issue\"]') != null &&
								document.querySelector('select[title=\"Place of issue\"]').querySelector('option[value=\"'+data.addition_issue_place+'\"]') != null) {
								clearInterval(placeInterval);
								document.querySelector('select[title=\"Place of issue\"]').querySelector('option[value=\"'+data.addition_issue_place+'\"]').selected = true;
								currentStepFinish(function(){document.querySelector('button[title=\"Save the current entry\"]').click();});
							}
						}, 2000);
					}, 2000);
				}, 2000);
			}
		}, 2000);
	}
}, 2000);