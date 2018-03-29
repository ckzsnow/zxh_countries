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
function findAddICButton() {
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'National identity card') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[0].children[6].children[0].children[1];
		}
	}
	return button;
}
var interval = setInterval(function(){
	if(document.querySelector('input[title=\"Family name\"]') != null 
		&& !isHidden(document.querySelector('input[title=\"Family name\"]'))
		&& document.querySelector('select[title=\"Country of passport\"]') != null
		&& document.querySelector('select[title=\"Country of passport\"]').querySelector('option[value=\"CHN\"]') !=null) {
		clearInterval(interval);
		document.querySelector('input[title=\"Family name\"]').value = data.family_name;
		document.querySelector('input[title=\"Given names\"]').value = data.given_name;
		document.querySelector('.ELP-F0570').querySelector('input[value=\"'+data.sex+'\"]').click();
		document.querySelector('input[title=\"Date of birth\"]').value = data.birth_date;
		document.querySelector('input[title=\"Passport number\"]').value = data.passport_number;
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Country of passport\"]').dispatchEvent(event);
		setTimeout(function() {
			document.querySelector('select[title=\"Country of passport\"]').querySelector('option[value=\"CHN\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Country of passport\"]').dispatchEvent(event);
			var intervalNOPH = setInterval(function(){
				if(document.querySelector('select[title=\"Nationality of passport holder\"]') != null 
					&& document.querySelector('select[title=\"Nationality of passport holder\"]').querySelector('option[value=\"CHN\"]') != null){
					clearInterval(intervalNOPH);
					var event = document.createEvent('HTMLEvents');
					event.initEvent("click", true, true);
					event.eventType = 'message';
					document.querySelector('select[title=\"Nationality of passport holder\"]').dispatchEvent(event);
					setTimeout(function(){
						document.querySelector('select[title=\"Nationality of passport holder\"]').querySelector('option[value=\"CHN\"]').selected=true;
						var event = document.createEvent('HTMLEvents');
						event.initEvent("change", true, true);
						event.eventType = 'message';
						document.querySelector('select[title=\"Nationality of passport holder\"]').dispatchEvent(event);
						document.querySelector('input[title=\"Date of issue\"]').value=data.issue_date;
						document.querySelector('input[title=\"Date of expiry\"]').value=data.expiry_date;
						var interval2 =setInterval(function(){
							if(!isHidden(document.querySelector('select[title=\"Place of issue\"]')) 
								&& document.querySelector('select[title=\"Place of issue\"]') != null
								&& document.querySelector('select[title=\"Place of issue\"]').querySelector('option[value=\"'+data.issue_place+'\"]') != null) {
								clearInterval(interval2);
								document.querySelector('select[title=\"Place of issue\"]').querySelector('option[value=\"'+data.issue_place+'\"]').selected = true;
								document.querySelector('.ELP-F3900').querySelector('input[value=\"'+data.has_identify_card+'\"]').click(); 
								if(data.has_identify_card == '1') {
									var button = findAddICButton();
									var interval3 = setInterval(function(){
										if(!isHidden(button)) {
											clearInterval(interval3);
											currentStepFinish(function(){button.click();});
										}
									}, 2000);
								} else {
									skipStep(function(){console.log('step3a skip');});
								}
							}
						}, 2000);
					}, 2000);
				}
			}, 2000);
		}, 2000);
	}
}, 2000);