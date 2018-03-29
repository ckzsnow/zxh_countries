var engMonth = {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};
function dateParse(engDate){
	var engM = engDate.substring(0, 3);
	console.log(engM);
	var engD = engDate.substring(4, 6);
	console.log(engD);
	var engY = engDate.substring(8);
	console.log(engY);
	return engD + '/' + engMonth[engM.toUpperCase()] + '/' + engY;
}
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
function recordInfo(recordInfo, callback){
	window.cefQuery({
		request: 'RecordInfo:' + recordInfo,
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
function splitAddress(address, maxlength){
	var adds = {};
	if(address.length <=60) {
		adds.address1 = address;
		adds.address2 = '';
		return adds;
	}
	var pos = address.lastIndexOf(' ', 59);
	if(pos != -1) {
		adds.address1 = address.substring(0, pos);
		address = address.substring(pos + 1);
	} else {
		adds.address1 = address.substring(0, 59);
		address = address.substring(60);
	}
	adds.address2 = address.substring(0, 59);
	return adds;
}
function stepSeven(){
	console.log('step seven');
	var interval = setInterval(function(){
		if($('#buttonPay')!=null && !$('#buttonPay').is(":hidden")) {
			clearInterval(interval);
			var intervalTable = setInterval(function(){
				if($("table tr:eq(1) td:eq(0)") != null && $("table tr:eq(1) td:eq(0)").text() != ""){
					clearInterval(intervalTable);
					var recordInfoText = 'Name=' + $("table tr:eq(1) td:eq(0)").text();
					recordInfoText = recordInfoText + ';Date of Birth=' + dateParse($("table tr:eq(1) td:eq(1)").text());
					recordInfoText = recordInfoText + ';Enrollment Number=' + $("table tr:eq(1) td:eq(2)").text();
					recordInfoText = recordInfoText + ';Passport Number=' + $("table tr:eq(1) td:eq(3)").text();
					recordInfoText = recordInfoText + ';B1/B2 Visa Foil Number=' + $("table tr:eq(1) td:eq(4)").text();
					console.log(recordInfo);
					var callback = function(){
						currentStepFinish(function(){
							$('#buttonPay').click();
						});
					};
					recordInfo(recordInfoText, callback);
				}
			}, 3000);
		}
	}, 1000);
}
function stepSix(){
	console.log('step six');
	var interval = setInterval(function(){
		if($('#button-group strong').text() == 'Step 6 of 7') {
			clearInterval(interval);
			$('#esta-review .panel.panel-default.panel-open a:contains(\"CONFIRM & CONTINUE\")').click();
			setTimeout(function(){
				$('#esta-review .panel.panel-default.panel-open a:contains(\"CONFIRM & CONTINUE\")').click();
				setTimeout(function(){
					$('#esta-review .panel.panel-default.panel-open a:contains(\"CONFIRM & CONTINUE\")').click();
					setTimeout(function(){
						$('#esta-review .panel.panel-default.panel-open a:contains(\"CONFIRM & CONTINUE\")').click();
						setTimeout(function(){
							$('#waiverYes').click();
							setTimeout(function(){
								$('button[aid=\"buttonNext\"]').click();
								setTimeout(function(){stepSeven();});
							},2000);
						},2000);
					});
				},2000);
			},2000);
		}
	}, 1000);
}
function stepFive(){
	console.log('step five');
	var interval = setInterval(function(){
		if($('#button-group strong').text() == 'Step 5 of 7') {
			clearInterval(interval);
			for(var index=1; index<=9; index++){
				$('#question'+index).find('option[value=\"no\"]').attr('selected',true);
				$('#question'+index).change();
			}
			var intervalOK = setInterval(function(){
				if($('a:contains(\"CONFIRM & CONTINUE\")')!=null&&!$('a:contains(\"CONFIRM & CONTINUE\")').is(":hidden")){
					clearInterval(intervalOK);
					$('a:contains(\"CONFIRM & CONTINUE\")').click();
					setTimeout(function(){$('#buttonNext').click();stepSix();}, 2000);
				}
			}, 3000);
		}
	}, 1000);
}
function stepFour(){
	console.log('step four');
	var interval = setInterval(function(){
		if($('#button-group strong').text() == 'Step 4 of 7') {
			clearInterval(interval);
			$('#transit').find('option[value=\"no\"]').attr('selected',true);
			$('#transit').change();
			$('#usContactName').val(data.usContactName);
			$('#usContactName').change();
			var addinfo = splitAddress(data.usContactAddressOne, 60);
			$('#usContactAddr_line1').val(addinfo.address1);
			if(addinfo.address2 != null && addinfo.address2.length >0) $('#usContactAddr_line2').val(addinfo.address2);
			$('#usContactAddr_line1').change();
			$('#usContactAddr_line2').change();
			$('#usContactAddr_city').val(data.usContactAddressCity);
			$('#usContactAddr_city').change();
			if($(document.querySelectorAll('#usContactAddr_state')[0]).is(":hidden")){
				$(document.querySelectorAll('#usContactAddr_state')[1]).find('option[value=\"'+data.usContactAddressState+'\"]').attr('selected',true);
				$(document.querySelectorAll('#usContactAddr_state')[1]).change();
			} else {
				$(document.querySelectorAll('#usContactAddr_state')[0]).val(data.usContactAddressState);
				$(document.querySelectorAll('#usContactAddr_state')[0]).change();
			}
			$('#usContactPhoneNumber').val(data.usContactPhoneNumber);
			$('#usContactPhoneNumber').change();
			$("#copyContactAddress").click();
			setTimeout(function(){
				$('#emergencyFamilyName').val(data.emergencyFamilyName);
				$('#emergencyFamilyName').change();
				$('#emergencyGivenName').val(data.emergencyGivenName);
				$('#emergencyGivenName').change();
				$('#emergencyEmail').val(data.emergencyEmail);
				$('#emergencyEmail').change();
				$('#emergencyPhoneCountry').val('86');
				$('#emergencyPhoneCountry').change();
				$('#emergencyPhone').val(data.emergencyPhone);
				$('#emergencyPhone').change();
				$('#buttonNext').click();
				var intervalOK = setInterval(function(){
					if($('a:contains(\"OK\")')!=null){
						clearInterval(intervalOK);
						$('a:contains(\"OK\")').click();
						setTimeout(function(){$('#buttonNext').click();stepFive();}, 3000);
					}
				}, 3000);
			}, 3000);
		}
	}, 1000);
};
function stepThreeSub(){
	$('#contactAddressPhoneType0').find('option[value=\"cell\"]').attr('selected',true);
	$('#contactAddressPhoneType0').change();
	$('#contactAddressPhoneCountry0').val('86');
	$('#contactAddressPhoneCountry0').change();
	$('#contactAddressPhone0').val(data.contactAddressPhone0);
	$('#contactAddressPhone0').change();
	$('#contactEmailAddress').val(data.contactEmailAddress);
	$('#contactEmailAddress').change();
	$('#contactEmailConfirm').val(data.contactEmailAddress);
	$('#contactEmailConfirm').change();
	$('#haveAlias').find('option[value=\"no\"]').attr('selected',true);
	$('#haveAlias').change();
	$('#havePrevCitizenship').find('option[value=\"no\"]').attr('selected',true);
	$('#havePrevCitizenship').change();
	$('#haveMultipleCitizenship').find('option[value=\"no\"]').attr('selected',true);
	$('#haveMultipleCitizenship').change();
	$('#haveOtherDoc').find('option[value=\"no\"]').attr('selected',true);
	$('#haveOtherDoc').change();
	$('#haveGEMembership').find('option[value=\"no\"]').attr('selected',true);
	$('#haveGEMembership').change();
	$('#familyNameParent1').val(data.familyNameParent1);
	$('#familyNameParent1').change();
	$('#givenNameParent1').val(data.givenNameParent1);
	$('#givenNameParent1').change();
	$('#familyNameParent2').val(data.familyNameParent2);
	$('#familyNameParent2').change();
	$('#givenNameParent2').val(data.givenNameParent2);
	$('#givenNameParent2').change();
	$('#parent1Native').val(data.parent1Native);
	$('#parent1Native').change();
	$('#nameParentNative2').val(data.nameParentNative2);
	$('#nameParentNative2').change();
	if(data.haveEmployer == 'yes'){
		$('#haveEmployer').find('option[value=\"yes\"]').attr('selected',true);
		$('#haveEmployer').change();
		$('#employmentTitle').val(data.employmentTitle);
		$('#employmentTitle').change();
		$('#employmentName').val(data.employerName);
		$('#employmentName').change();
		$('#employerNameNative').val(data.employerNameNative);
		$('#employerNameNative').change();
		$('#employmentAddr_country').find('option[value=\"'+data.employmentAddressCountry+'\"]').attr('selected',true);
		$('#employmentAddr_country').change();
		setTimeout(function(){
			var addinfo = splitAddress(data.employmentAddressOne, 60);
			$('#employmentAddr_line1').val(addinfo.address1);
			if(addinfo.address2 != null && addinfo.address2.length >0) $('#employmentAddr_line2').val(addinfo.address2);
			$('#employmentAddr_line1').change();
			$('#employmentAddr_line2').change();
			$('#employmentAddr_city').val(data.employmentAddressCity);
			$('#employmentAddr_city').change();
			$('#employmentAddr_state').val(data.employmentAddressState);
			$('#employmentAddr_state').change();
			$('#employmentPhoneCountry').val('86');
			$('#employmentPhoneCountry').change();
			$('#employmentPhone').val(data.employmentPhone);
			$('#employmentPhone').change();
			$('#buttonNext').click();
			var intervalOK = setInterval(function(){
				if($('a:contains(\"OK\")')!=null){
					clearInterval(intervalOK);
					$('a:contains(\"OK\")').click();
					setTimeout(function(){$('#buttonNext').click();stepFour();}, 2000);
				}
			}, 3000);
		},5000);
	} else {
		$('#haveEmployer').find('option[value=\"no\"]').attr('selected',true);
		$('#haveEmployer').change();
		$('#buttonNext').click();
		var intervalOK = setInterval(function(){
			if($('a:contains(\"OK\")')!=null){
				clearInterval(intervalOK);
				$('a:contains(\"OK\")').click();
				setTimeout(function(){$('#buttonNext').click();stepFour();}, 2000);
			}
		}, 3000);
	}
}
function stepThree(){
	console.log('step three');
	var interval = setInterval(function(){
		if($('#button-group strong').text() == 'Step 3 of 7') {
			clearInterval(interval);
			$('#surnameNative').val(data.surnameNative);
			$('#surnameNative').change();
			$('#givenNameNative').val(data.givenNameNative);
			$('#givenNameNative').change();
			$('#gender').find('option[value=\"'+data.gender+'\"]').attr('selected',true);
			$('#gender').change();
			$('#birthCity').val(data.birthCity);
			$('#birthCity').change();
			$('#birthCountry').find('option[value=\"'+data.birthCountry+'\"]').attr('selected',true);
			$('#birthCountry').change();
			$('#citizenshipCountry').find('option[value=\"'+data.citizenshipCountry+'\"]').attr('selected',true);
			$('#citizenshipCountry').change();
			$('#nationalID').val(data.nationalID);
			$('#nationalID').change();
			$('#homeAddr_country').find('option[value=\"'+data.contactAddressCountry+'\"]').attr('selected',true);
			$('#homeAddr_country').change();
			var addinfo = splitAddress(data.contactAddressOne, 60);
			$('#homeAddr_line1').val(addinfo.address1);
			if(addinfo.address2 != null && addinfo.address2.length >0) $('#homeAddr_line2').val(addinfo.address2);
			$('#homeAddr_line1').change();
			$('#homeAddr_line2').change();
			$('#homeAddr_city').val(data.contactAddressCity);
			$('#homeAddr_city').change();
			$('#homeAddr_state').val(data.contactAddressState);
			$('#homeAddr_state').change();
			stepThreeSub();
		}
	}, 1000);
};
function stepTwoSub(){
	var intervalOK = setInterval(function(){
		if($('a:contains(\"OK\")')!=null){
			clearInterval(intervalOK);
			$('a:contains(\"OK\")').click();
			setTimeout(function(){
				$('#buttonNext').click();
				var count = 1;
				var hasNext = false;
				var intervalContinue = setInterval(function(){
					if($('div[modal-render=\"true\"] a:contains(\"CONTINUE WITH NEW ENROLLMENT\")') != null) {
						clearInterval(intervalContinue);
						setTimeout(function(){$('div[modal-render=\"true\"] a:contains(\"CONTINUE WITH NEW ENROLLMENT\")').click();setTimeout(function(){stepThree();},1000);},5000);
						hasNext = true;
					}
					if(count > 3 && !hasNext) {
						clearInterval(intervalContinue);
						setTimeout(function(){stepThree();},1000);
					}
					count++;
				}, 3000);
			}, 2000);
		}
	}, 3000);
}
function stepTwo(){
	console.log('step two');
	var interval = setInterval(function(){
		if($('#button-group strong').text() == 'Step 2 of 7') {
			clearInterval(interval);
			$('#surname').val(data.surname);
			$('#surname').change();
			$('#givenName').val(data.givenName);
			$('#givenName').change();
			$('#dob').val(data.dob);
			$('#dob').change();
			$('#haveVisa').find('option[value=\"'+data.haveVisa+'\"]').attr('selected',true);
			$('#haveVisa').change();
			$('#visaFoil').val(data.visaFoil);
			$('#visaFoil').change();
			$('#passportNumber').val(data.passportNumber);
			$('#passportNumber').change();
			$('#passIssueCountry').find('option[value=\"'+data.passIssueCountry+'\"]').attr('selected',true);
			$('#passIssueCountry').change();
			$('#passIssue').val(data.passIssue);
			$('#passIssue').change();
			$('#passExpiration').val(data.passExpiration);
			$('#passExpiration').change();
			$('#havePrimaryPassport').find('option[value=\"'+data.havePrimaryPassport+'\"]').attr('selected',true);
			$('#havePrimaryPassport').change();
			if(data.havePrimaryPassport == 'no'){
				$('#primaryPassNum').val(data.primaryPassNum);
				$('#primaryPassNum').change();
				$('#primaryPassCOI').find('option[value=\"'+data.primaryPassCOI+'\"]').attr('selected',true);
				$('#primaryPassCOI').change();
				$('#primaryPassIssue').val(data.primaryPassIssue);
				$('#primaryPassIssue').change();
				$('#primaryPassExp').val(data.primaryPassExp);
				$('#primaryPassExp').change();
				$('#primaryPassSurname').val(data.primaryPassSurname);
				$('#primaryPassSurname').change();
				$('#primaryPassGivenName').val(data.primaryPassGivenName);
				$('#primaryPassGivenName').change();
				$('#primaryPassDOB').val(data.primaryPassDOB);
				$('#primaryPassDOB').change();
			}
			setTimeout(function(){$('#buttonNext').click();stepTwoSub();}, 3000);
		}
	}, 1000);
};
function stepOne(){
	console.log('step one');
	var interval = setInterval(function(){
		if($('#button-group strong').text() == 'Step 1 of 7') {
			clearInterval(interval);
			$('#disclaimerYes').click();
			setTimeout(function(){$('#buttonNext').click();stepTwo();},1000);
		}
	}, 1000);
};
var interval = setInterval(function(){
	$(':button').each(function(){
		if($(this).text()=='Individual Enrollment'){
			clearInterval(interval);
			$(this).click();
			var interval1 = setInterval(function(){
				if($('a:contains(\"CONFIRM & CONTINUE\")')!=null && !$('a:contains(\"CONFIRM & CONTINUE\")').is(':hidden')){
					clearInterval(interval1);
					$('a:contains(\"CONFIRM & CONTINUE\")').click();
					setTimeout(function(){stepOne();},1000);
				}
			}, 3000);
		}
	});
},2000);