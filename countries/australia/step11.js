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
function isHidden(obj) {
	var style = null;
	if (window.getComputedStyle) {
		style = window.getComputedStyle(obj, null);
	} else { 
		style = obj.currentStyle;
	}
	return (style.width=='auto');
}
function setRemainedInfo() {
	document.querySelector('input[title=\"Address\"]').value = data.sponsor_res_address;
	document.querySelector('input[title=\"Address 2\"]').value = data.sponsor_res_address_2;
	document.querySelector('input[title=\"Suburb / Town\"]').value = data.sponsor_res_suburb_town;
	document.querySelector('select[title=\"State / Territory\"]').querySelector('option[value=\"'+data.sponsor_res_state+'\"]').selected = true;
	document.querySelector('input[title=\"Postcode\"]').value = data.sponsor_postal_code;
	document.querySelector('input[title=\"Home phone\"]').value = data.sponsor_home_phone;
	document.querySelector('input[title=\"Business phone\"]').value = data.sponsor_business_phone;
	document.querySelector('input[title=\"Mobile / Cell phone\"]').value = data.sponsor_cell_phone;
	currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
}
var interval = setInterval(function() {
	console.log('enter step11 interval.....');
	if(document.querySelector('body').getAttribute('data-wc-domready') != null && 
		document.querySelector('body').getAttribute('data-wc-domready') == 'true' &&
		document.querySelector('select[title=\"Sponsor\'s relationship to the applicant\"]') != null && 
		document.querySelector('select[title=\"Sponsor\'s relationship to the applicant\"]').querySelector('option[value=\"'+data.sponsor_relationship_code+'\"]') != null) {
		clearInterval(interval);
		console.log('clear interval.....');
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Sponsor\'s relationship to the applicant\"]').dispatchEvent(event);
		setTimeout(function(){
			document.querySelector('select[title=\"Sponsor\'s relationship to the applicant\"]').querySelector('option[value=\"'+data.sponsor_relationship_code+'\"]').selected = true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Sponsor\'s relationship to the applicant\"]').dispatchEvent(event);
			setTimeout(function(){
				document.querySelector('input[title=\"Family name\"]').value = data.sponsor_family_name;
				document.querySelector('input[title=\"Given names\"]').value = data.sponsor_given_names;
				document.querySelector('.ELP-F0570').querySelector('input[value=\"'+data.sponsor_sex+'\"]').click();
				document.querySelector('input[title=\"Date of birth\"]').value = data.sponsor_birth_date;
				document.querySelector('.ELP-F0695').querySelector('input[value=\"'+data.sponsor_has_passport+'\"]').click();
				var event = document.createEvent('HTMLEvents');
				event.initEvent("change", true, true);
				event.eventType = 'message';
				document.querySelector('.ELP-F0695').dispatchEvent(event);
				setTimeout(function(){
					if(data.sponsor_has_passport == '1') {
						var interval2 = setInterval(function() {
							if(!isHidden(document.querySelector('input[title=\"Passport number\"]'))) {
								clearInterval(interval2);
								document.querySelector('input[title=\"Passport number\"]').value = data.sponsor_ppt_num;
								var event = document.createEvent('HTMLEvents');
								event.initEvent("click", true, true);
								event.eventType = 'message';
								document.querySelector('select[title=\"Country of passport\"]').dispatchEvent(event);
								setTimeout(function(){
									document.querySelector('select[title=\"Country of passport\"]').querySelector('option[value=\"'+data.sponsor_ppt_country+'\"]').selected = true;
									var event = document.createEvent('HTMLEvents');
									event.initEvent("change", true, true);
									event.eventType = 'message';
									document.querySelector('select[title=\"Country of passport\"]').dispatchEvent(event);
									setTimeout(function(){
										document.querySelector('select[title=\"Nationality of passport holder\"]').querySelector('option[value=\"'+data.sponsor_nationality+'\"]').selected = true;
										document.querySelector('input[title=\"Date of issue\"]').value = data.sponsor_issue_date;
										document.querySelector('input[title=\"Date of expiry\"]').value = data.sponsor_expiry_date;
										var interval3 = setInterval(function() {
											if(document.querySelector('select[title=\"Place of issue\"]') != null &&
												document.querySelector('select[title=\"Place of issue\"]').querySelector('option[value=\"'+data.sponsor_issue_place+'\"]') != null) {
												clearInterval(interval3);
												document.querySelector('select[title=\"Place of issue\"]').querySelector('option[value=\"'+data.sponsor_issue_place+'\"]').selected = true;
												setRemainedInfo();
											}
										}, 1000);
									}, 1000);
								}, 1000)
							}
						}, 1000);
					} else {
						setRemainedInfo();
					}
				}, 2000);
			}, 1000);
			
		}, 1000);
	}
}, 1000);
