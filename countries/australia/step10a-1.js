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
	if(document.querySelector('select[title=\"Relationship to the applicant\"]') != null && !isHidden(document.querySelector('select[title=\"Relationship to the applicant\"]'))) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Relationship to the applicant\"]').dispatchEvent(event);
		setTimeout(function(){
			document.querySelector('select[title=\"Relationship to the applicant\"]').querySelector('option[value=\"'+data.contacts[0].contacts_relationship+'\"]').selected = true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Relationship to the applicant\"]').dispatchEvent(event);
			setTimeout(function(){
				document.querySelector('input[title=\"Family name\"]').value = data.contacts[0].contacts_family_name;
				document.querySelector('input[title=\"Given names\"]').value = data.contacts[0].contacts_given_names;
				document.querySelector('.ELP-F0570').querySelector('input[value=\"'+data.contacts[0].contacts_sex+'\"]').click();
				document.querySelector('input[title=\"Date of birth\"]').value = data.contacts[0].contacts_birth_date;
				document.querySelector('input[title=\"Address\"]').value = data.contacts[0].contacts_address;
				document.querySelector('input[title=\"Address 2\"]').value = data.contacts[0].contacts_address_2;
				document.querySelector('input[title=\"Suburb / Town\"]').value = data.contacts[0].contacts_suburb_town;
				var event = document.createEvent('HTMLEvents');
				event.initEvent("click", true, true);
				event.eventType = 'message';
				document.querySelector('select[title=\"State / Territory\"]').dispatchEvent(event);
				setTimeout(function(){
					document.querySelector('select[title=\"State / Territory\"]').querySelector('option[value=\"'+data.contacts[0].contacts_state_territory+'\"]').selected=true;
					var event = document.createEvent('HTMLEvents');
					event.initEvent("change", true, true);
					event.eventType = 'message';
					document.querySelector('select[title=\"State / Territory\"]').dispatchEvent(event);
					setTimeout(function(){
						document.querySelector('input[title=\"Postcode\"]').value = data.contacts[0].contacts_postcode;
						document.querySelector('input[title=\"Home phone\"]').value = data.contacts[0].contacts_home_phone;
						document.querySelector('input[title=\"Business phone\"]').value = data.contacts[0].contacts_business_phone;
						document.querySelector('input[title=\"Mobile / Cell phone\"]').value = data.contacts[0].contacts_mobile_cell_phone;
						document.querySelector('input[title=\"Email address\"]').value = data.contacts[0].contacts_email_address;
						document.querySelector('select[title=\"Australian residency status\"]').querySelector('option[value=\"'+data.contacts[0].contacts_australian_residency_status+'\"]').selected=true;
						currentStepFinish(function(){document.querySelector('button[title=\"Save the current entry\"]').click();});
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
	}
}, 1000);