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
	var intervalCountry = setInterval(function(){
		if(document.querySelector('select[title=\"Country\"]') != null
			&& document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"'+data.employed_organisation_country+'\"]') !=null
			&& !isHidden(document.querySelector('select[title=\"Country\"]'))) {
			clearInterval(intervalCountry);
			document.querySelector('input[title=\"Organisation\"]').value = data.employed_organisation;
			document.querySelector('input[title=\"Start date with current employer\"]').value = data.employed_start_date;
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent("click", true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
			document.querySelector('select[title=\"Country\"]').dispatchEvent(event);
			console.log('setRemainedInfo tigger click Country select');
			setTimeout(function() {
				document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"'+data.employed_organisation_country+'\"]').selected = true;
				var event = document.createEvent('HTMLEvents');
				event.initEvent("change", true, true);
				event.eventType = 'message';
				document.querySelector('select[title=\"Country\"]').dispatchEvent(event);
				console.log('setRemainedInfo tigger change Country select');
				setTimeout(function() {
					document.querySelector('input[title=\"Address\"]').value = data.employed_organisation_address;
					document.querySelector('input[title=\"Address 2\"]').value = data.employed_organisation_address_2;
					document.querySelectorAll('.ELP-F0028 input[title=\"Suburb / Town\"]')[1].value = data.employed_organisation_suburb_town;
					console.log('setRemainedInfo enter interval');
					var interval = setInterval(function() {
						if(document.querySelector('select[title=\"State or Province\"]') != null
							&& document.querySelector('select[title=\"State or Province\"]').querySelector('option[value=\"'+data.employed_organisation_state_province+'\"]') != null) {
							clearInterval(interval);
							console.log('setRemainedInfo clear interval');
							document.querySelector('select[title=\"State or Province\"]').querySelector('option[value=\"'+data.employed_organisation_state_province+'\"]').selected = true;
							document.querySelector('input[title=\"Postal code\"]').value = data.employed_organisation_postcode;
							document.querySelector('input[title=\"Business phone\"]').value = data.employed_organisation_business_phone;
							document.querySelector('input[title=\"Mobile / Cell phone\"]').value = data.employed_organisation_cell_phone;
							document.querySelector('input[title=\"Email address\"]').value = data.employed_organisation_email_address;
							currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
						}
					}, 2000);
				}, 2000);
			}, 2000);
		}
	}, 2000);
}
function setRemainedInfo2() {
	var intervalCountry = setInterval(function(){
		if(document.querySelector('select[title=\"Country\"]') != null
			&& document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"'+data.self_employed_organisation_country+'\"]') !=null
			&& !isHidden(document.querySelector('select[title=\"Country\"]'))) {
			clearInterval(intervalCountry);
			document.querySelector('input[title=\"Organisation\"]').value = data.self_employed_organisation;
			document.querySelector('input[title=\"Start date with current employer\"]').value = data.self_employed_start_date;
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent("click", true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
			document.querySelector('select[title=\"Country\"]').dispatchEvent(event);
			setTimeout(function() {
				document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"'+data.self_employed_organisation_country+'\"]').selected = true;
				var event = document.createEvent('HTMLEvents');
				event.initEvent("change", true, true);
				event.eventType = 'message';
				document.querySelector('select[title=\"Country\"]').dispatchEvent(event);
				setTimeout(function() {
					document.querySelector('input[title=\"Address\"]').value = data.self_employed_organisation_address[0];
					document.querySelector('input[title=\"Address 2\"]').value = data.self_employed_organisation_address[1];
					document.querySelectorAll('.ELP-F0028 input[title=\"Suburb / Town\"]')[1].value = data.self_employed_organisation_suburb_tnown;
					var interval = setInterval(function() {
						if(!isHidden(document.querySelector('select[title=\"State or Province\"]'))
							&& document.querySelector('select[title=\"State or Province\"]') != null
							&& document.querySelector('select[title=\"State or Province\"]').querySelector('option[value=\"'+data.self_employed_organisation_state_province+'\"]') != null) {
							clearInterval(interval);
							document.querySelector('select[title=\"State or Province\"]').querySelector('option[value=\"'+data.self_employed_organisation_state_province+'\"]').selected = true;
							document.querySelector('input[title=\"Postal code\"]').value = data.self_employed_organisation_postcode;
							document.querySelector('input[title=\"Business phone\"]').value = data.self_employed_organisation_business_phone;
							document.querySelector('input[title=\"Mobile / Cell phone\"]').value = data.self_employed_organisation_cell_phone;
							document.querySelector('input[title=\"Email address\"]').value = data.self_employed_organisation_email_address;
							currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
						}
					}, 1000);
				}, 1000);
			}, 1000);
		}
	}, 2000);
}
var interval = setInterval(function() {
	console.log('enter interval.');
	if(document.querySelector('select[title=\"Employment status\"]') != null 
		&& !isHidden(document.querySelector('select[title=\"Employment status\"]'))
		&& document.querySelector('select[title=\"Employment status\"]').querySelector('option[value=\"'+data.employment_status+'\"]') != null) {
		clearInterval(interval);
		console.log('clear interval. step12 data.employment_status = ' + data.employment_status);
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent("click", true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
		document.querySelector('select[title=\"Employment status\"]').dispatchEvent(event);
		console.log('trigger click.');
		setTimeout(function() {
			document.querySelector('select[title=\"Employment status\"]').querySelector('option[value=\"'+data.employment_status+'\"]').selected = true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Employment status\"]').dispatchEvent(event);
			console.log('trigger select.');
			setTimeout(function(){
				if(data.employment_status == '1') {
					var interval2 = setInterval(function(){
						if(!isHidden(document.querySelector('select[title=\"Occupation grouping\"]'))
							&& document.querySelector('select[title=\"Occupation grouping\"]') != null
							&& document.querySelector('select[title=\"Occupation grouping\"]').querySelector('option[value=\"'+data.employed_occupation_grouping+'\"]') != null) {
							clearInterval(interval2);
							var event = document.createEvent('HTMLEvents');
							event.initEvent("click", true, true);
							event.eventType = 'message';
							document.querySelector('select[title=\"Occupation grouping\"]').dispatchEvent(event);
							setTimeout(function() {
								document.querySelector('select[title=\"Occupation grouping\"]').querySelector('option[value=\"'+data.employed_occupation_grouping+'\"]').selected = true;
								var event = document.createEvent('HTMLEvents');
								event.initEvent("change", true, true);
								event.eventType = 'message';
								document.querySelector('select[title=\"Occupation grouping\"]').dispatchEvent(event);
								setTimeout(function() {
									if(data.employed_occupation_grouping == '070299') {
										var interval3 = setInterval(function(){
											if(document.querySelector('input[title=\"Occupation\"]') != null
												&& !isHidden(document.querySelector('input[title=\"Occupation\"]'))) {
												clearInterval(interval3);
												document.querySelector('input[title=\"Occupation\"]').value = data.employed_occupation;
												setRemainedInfo();
											}
										}, 2000);
									} else {
										setRemainedInfo();
									}
								}, 2000);
							}, 2000);
						}
					}, 2000);
				} else if (data.employment_status == '2') {
					var interval2 = setInterval(function(){
						if(!isHidden(document.querySelector('select[title=\"Occupation grouping\"]'))) {
							clearInterval(interval2);
							var event = document.createEvent('HTMLEvents');
							event.initEvent("click", true, true);
							event.eventType = 'message';
							document.querySelector('select[title=\"Occupation grouping\"]').dispatchEvent(event);
							setTimeout(function() {
								document.querySelector('select[title=\"Occupation grouping\"]').querySelector('option[value=\"'+data.self_employed_occupation_grouping+'\"]').selected = true;
								var event = document.createEvent('HTMLEvents');
								event.initEvent("change", true, true);
								event.eventType = 'message';
								document.querySelector('select[title=\"Occupation grouping\"]').dispatchEvent(event);
								setTimeout(function() {
									if(data.self_employed_occupation_grouping == '070299') {
										var interval3 = setInterval(function(){
											if(!isHidden(document.querySelector('input[title=\"Occupation\"]'))) {
												clearInterval(interval3);
												document.querySelector('input[title=\"Occupation\"]').value = data.self_employed_occupation;
												setRemainedInfo2();
											}
										}, 1000);
									} else {
										setRemainedInfo2();
									}
								}, 1000);
							}, 1000);
						}
					}, 1000);
				} else if(data.employment_status == '3') {
					var interval2 = setInterval(function(){
						if(!isHidden(document.querySelector('input[title=\"Last employment position\"]'))) {
							clearInterval(interval2);
							document.querySelectorAll('input[title=\"Date from\"]')[1].value = data.unemployed_date_from;
							document.querySelector('input[title=\"Last employment position\"]').value = data.unemployed_last_position;
							currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
						}
					}, 1000);
				} else if(data.employment_status == '4') {
					var interval2 = setInterval(function(){
						if(!isHidden(document.querySelector('input[title=\"Retirement date\"]'))) {
							clearInterval(interval2);
							document.querySelector('input[title=\"Retirement date\"]').value = data.retired_date;
							currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
						}
					}, 1000);
				} else if(data.employment_status == '5') {
					var interval2 = setInterval(function(){
						if(!isHidden(document.querySelector('input[title=\"Course name\"]'))) {
							clearInterval(interval2);
							document.querySelector('input[title=\"Course name\"]').value = data.student_course_name;
							document.querySelector('input[title=\"Institution name\"]').value = data.student_institution_name;
							document.querySelector('input[title=\"Date from\"]').value = data.student_date_from;
							document.querySelector('input[title=\"Date to\"]').value = data.student_date_to;
							currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
						}
					}, 1000);
				} else {
					var interval2 = setInterval(function(){
						if(!isHidden(document.querySelector('textarea[title=\"Give details\"]'))) {
							clearInterval(interval2);
							document.querySelector('textarea[title=\"Give details\"]').value = data.other_details;
							currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
						}
					}, 2000);
				}
			}, 2000);
		}, 2000);
	}
}, 2000);