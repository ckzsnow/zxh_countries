function currentStepFinish(callback){
	window.cefQuery({
		request: 'CurrentStepFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
		}
	});
};
function backStep(callback){
	window.cefQuery({
		request: 'BackStep:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
		}
	});
};
function fillPassportDetails(){
	document.querySelector('#passport_no').value=data.passport_no;
	document.querySelector('#passport_issue_place').value=data.passport_issue_place;
	document.querySelector('#passport_issue_date').value=data.passport_issue_date;
	document.querySelector('#passport_expiry_date').value=data.passport_expiry_date;
	if(data.other_ppt_1.toUpperCase() == 'YES'){
		document.querySelector('#other_ppt_1').click();
		var interval = setInterval(function(){
			if(document.querySelector('#other_ppt_country_issue') != null && document.querySelector('#other_ppt_country_issue').querySelector('option[value=\"'+data.other_ppt_country_issue+'\"]') != null){
				clearInterval(interval);
				document.querySelector('#other_ppt_country_issue').querySelector('option[value=\"'+data.other_ppt_country_issue+'\"]').selected=true;
				document.querySelector('#other_ppt_country_issue').onchange();
				document.querySelector('#other_ppt_no').value=data.other_ppt_no;
				document.querySelector('#other_ppt_issue_date').value=data.other_ppt_issue_date;
				document.querySelector('#other_ppt_issue_place').value=data.other_ppt_issue_place;
				var interval2 = setInterval(function(){
					if(document.querySelector('#other_ppt_nat') != null && document.querySelector('#other_ppt_nat').querySelector('option[value=\"'+data.other_ppt_nat+'\"]') != null){
						clearInterval(interval2);
						document.querySelector('#other_ppt_nat').querySelector('option[value=\"'+data.other_ppt_nat+'\"]').selected=true;
						document.querySelector('#other_ppt_nat').onchange();
						currentStepFinish(function(){
							setTimeout(function(){
								document.querySelector('#continue').click();
							},3000);
						});
					}
				},2000);
			}
		},2000);
	} else {
		document.querySelector('#other_ppt_2').click();
		currentStepFinish(function(){
			setTimeout(function(){
				document.querySelector('#continue').click();
			},3000);
		});
	}
}
function fillAppDetails(){
	document.querySelector('#surname').value=data.surname;
	document.querySelector('#givenName').value=data.givenName;
	if(data.changedSurnameCheck.toUpperCase() == 'YES'){
		document.querySelector('#changedSurnameCheck').click();
		document.querySelector('#prev_surname').value=data.prev_surname;
		document.querySelector('#prev_given_name').value=data.prev_given_name;
	}
	var interval = setInterval(function(){
		if(document.querySelector('#gender') != null && document.querySelector('#gender').querySelector('option[value=\"'+data.gender+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#gender').querySelector('option[value=\"'+data.gender+'\"]').selected=true;
			document.querySelector('#birth_place').value=data.birth_place;
			var country_birthinterval = setInterval(function(){
				if(document.querySelector('#country_birth') != null && document.querySelector('#country_birth').querySelector('option[value=\"'+data.country_birth+'\"]') != null){
					clearInterval(country_birthinterval);
					document.querySelector('#country_birth').querySelector('option[value=\"'+data.country_birth+'\"]').selected=true;
					document.querySelector('#nic_number').value=data.nic_number;
					var religioninterval = setInterval(function(){
						if(document.querySelector('#religion') != null && document.querySelector('#religion').querySelector('option[value=\"'+data.religion+'\"]') != null){
							clearInterval(religioninterval);
							document.querySelector('#religion').querySelector('option[value=\"'+data.religion+'\"]').selected=true;
							document.querySelector('#religion').onchange();
							document.querySelector('#identity_marks').value=data.identity_marks;
							var educationinterval = setInterval(function(){
								if(document.querySelector('#education') != null && document.querySelector('#education').querySelector('option[value=\"'+data.education+'\"]') != null){
									clearInterval(educationinterval);
									if(data.religion=='OTHERS'){
										document.querySelector('#religion_other').value=data.religion_other;
									}
									document.querySelector('#education').querySelector('option[value=\"'+data.education+'\"]').selected=true;
									var nationality_byinterval = setInterval(function(){
										if(document.querySelector('#nationality_by') != null && document.querySelector('#nationality_by').querySelector('option[value=\"'+data.nationality_by+'\"]') != null){
											clearInterval(nationality_byinterval);
											document.querySelector('#nationality_by').querySelector('option[value=\"'+data.nationality_by+'\"]').selected=true;
											document.querySelector('#nationality_by').onchange();
											fillPassportDetails();
										}
									},2000);
								}
							},2000);
						}
					},2000);
				}
			},2000);
		}
	},2000);
}
function main() {
	var interval = setInterval(function(){
		if(document.querySelector('#other_ppt_nat') != null){
			clearInterval(interval);
			fillAppDetails();
		}
	},2000);
}
if(window.location.href == 'https://indianvisaonline.gov.in/visa/Registration') {
	backStep(function() {
		window.location.href = 'https://indianvisaonline.gov.in/visa/index.html';
	});
} else {
	main();
}