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
function fillOccupationInfo(){
	var interval = setInterval(function(){
		if(document.querySelector('#occupation') != null && document.querySelector('#occupation').querySelector('option[value=\"'+data.occupation+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#occupation').querySelector('option[value=\"'+data.occupation+'\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('#occupation').dispatchEvent(event);
			setTimeout(function(){
				document.querySelector('#empname').value=data.empname;
				document.querySelector('#empdesignation').value=data.empdesignation;
				document.querySelector('#empaddress').value=data.empaddress;
				document.querySelector('#empphone').value=data.empphone;
				if(data.previous_occupation == '') {
					if(data.prev_org1.toUpperCase() == 'YES') {
						document.querySelector('#prev_org1').click();
						document.querySelector('#previous_organization').value=data.previous_organization;
						document.querySelector('#previous_designation').value=data.previous_designation;
						document.querySelector('#previous_rank').value=data.previous_rank;
						document.querySelector('#previous_posting').value=data.previous_posting;
					} else {
						document.querySelector('#prev_org2').click();
					}
					setTimeout(function(){
						currentStepFinish(function(){document.querySelector('#continue').click();});
					}, 3000);
				} else {
					var previous_occupationInterval = setInterval(function(){
						if(document.querySelector('#previous_occupation') != null && document.querySelector('#previous_occupation').querySelector('option[value=\"'+data.previous_occupation+'\"]') != null){
							clearInterval(previous_occupationInterval);
							document.querySelector('#previous_occupation').querySelector('option[value=\"'+data.previous_occupation+'\"]').selected=true;
							var event = document.createEvent('HTMLEvents');
							event.initEvent("change", true, true);
							event.eventType = 'message';
							document.querySelector('#previous_occupation').dispatchEvent(event);
							if(data.prev_org1.toUpperCase() == 'YES') {
								document.querySelector('#prev_org1').click();
								document.querySelector('#previous_organization').value=data.previous_organization;
								document.querySelector('#previous_designation').value=data.previous_designation;
								document.querySelector('#previous_rank').value=data.previous_rank;
								document.querySelector('#previous_posting').value=data.previous_posting;
							} else {
								document.querySelector('#prev_org2').click();
							}
							setTimeout(function(){
								currentStepFinish(function(){document.querySelector('#continue').click();});
							}, 3000);
						}
					}, 3000);
				}
			}, 2000);
		}
	},2000);
}
function fillSpouseInfo(){
	document.querySelector('#spouse_name').value=data.spouse_name;
	var interval = setInterval(function(){
		if(document.querySelector('#spouse_nationality') != null && document.querySelector('#spouse_nationality').querySelector('option[value=\"'+data.spouse_nationality+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#spouse_nationality').querySelector('option[value=\"'+data.spouse_nationality+'\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('#spouse_nationality').dispatchEvent(event);
			var preInterval = setInterval(function(){
				if(document.querySelector('#spouse_previous_nationality') != null && document.querySelector('#spouse_previous_nationality').querySelector('option[value=\"'+data.spouse_previous_nationality+'\"]') != null){
					clearInterval(preInterval);
					document.querySelector('#spouse_previous_nationality').querySelector('option[value=\"'+data.spouse_previous_nationality+'\"]').selected=true;
					var event = document.createEvent('HTMLEvents');
					event.initEvent("change", true, true);
					event.eventType = 'message';
					document.querySelector('#spouse_previous_nationality').dispatchEvent(event);
					document.querySelector('#spouse_place_of_birth').value=data.spouse_place_of_birth;
					var birthInterval = setInterval(function(){
						if(document.querySelector('#spouse_country_of_birth') != null && document.querySelector('#spouse_country_of_birth').querySelector('option[value=\"'+data.spouse_country_of_birth+'\"]') != null){
							clearInterval(birthInterval);
							document.querySelector('#spouse_country_of_birth').querySelector('option[value=\"'+data.spouse_country_of_birth+'\"]').selected=true;
							var event = document.createEvent('HTMLEvents');
							event.initEvent("change", true, true);
							event.eventType = 'message';
							document.querySelector('#spouse_country_of_birth').dispatchEvent(event);
							setTimeout(function(){
								fillOccupationInfo();
							}, 3000);
						}
					}, 2000);
				}
			},2000);
		}
	},2000);
}
function fillMotherDetails(){
	document.querySelector('#mother_name').value=data.mother_name;
	var interval = setInterval(function(){
		if(document.querySelector('#mother_nationality') != null && document.querySelector('#mother_nationality').querySelector('option[value=\"'+data.mother_nationality+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#mother_nationality').querySelector('option[value=\"'+data.mother_nationality+'\"]').selected=true;
			var preInterval = setInterval(function(){
				if(document.querySelector('#mother_previous_nationality') != null && document.querySelector('#mother_previous_nationality').querySelector('option[value=\"'+data.mother_previous_nationality+'\"]') != null){
					clearInterval(preInterval);
					document.querySelector('#mother_previous_nationality').querySelector('option[value=\"'+data.mother_previous_nationality+'\"]').selected=true;
					document.querySelector('#mother_place_of_birth').value=data.mother_place_of_birth;
					var birthInterval = setInterval(function(){
						if(document.querySelector('#mother_country_of_birth') != null && document.querySelector('#mother_country_of_birth').querySelector('option[value=\"'+data.mother_country_of_birth+'\"]') != null){
							clearInterval(birthInterval);
							document.querySelector('#mother_country_of_birth').querySelector('option[value=\"'+data.mother_country_of_birth+'\"]').selected=true;
							var mInterval = setInterval(function(){
								if(document.querySelector('#marital_status') != null && document.querySelector('#marital_status').querySelector('option[value=\"'+data.marital_status+'\"]') != null){
									clearInterval(mInterval);
									document.querySelector('#marital_status').querySelector('option[value=\"'+data.marital_status+'\"]').selected=true;
									var event = document.createEvent('HTMLEvents');
									event.initEvent("change", true, true);
									event.eventType = 'message';
									document.querySelector('#marital_status').dispatchEvent(event);
									document.querySelector('#grandparent_flag2').click();
									console.log('data marital_status = ' + data.marital_status);
									if(data.marital_status == '0'){
										fillSpouseInfo();
									} else {
										setTimeout(function(){
											console.log('fillOccupationInfo invoke');
											fillOccupationInfo();
										}, 3000);
									}
								}
							}, 2000);
						}
					}, 2000);
				}
			},2000);
		}
	},2000);
}
function fillFatherDetails(){
	document.querySelector('#fthrname').value=data.fthrname;
	var interval = setInterval(function(){
		if(document.querySelector('#father_nationality') != null && document.querySelector('#father_nationality').querySelector('option[value=\"'+data.father_nationality+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#father_nationality').querySelector('option[value=\"'+data.father_nationality+'\"]').selected=true;
			var preInterval = setInterval(function(){
				if(document.querySelector('#father_previous_nationality') != null && document.querySelector('#father_previous_nationality').querySelector('option[value=\"'+data.father_previous_nationality+'\"]') != null){
					clearInterval(preInterval);
					document.querySelector('#father_previous_nationality').querySelector('option[value=\"'+data.father_previous_nationality+'\"]').selected=true;
					document.querySelector('#father_place_of_birth').value=data.father_place_of_birth;
					var birthInterval = setInterval(function(){
						if(document.querySelector('#father_country_of_birth') != null && document.querySelector('#father_country_of_birth').querySelector('option[value=\"'+data.father_country_of_birth+'\"]') != null){
							clearInterval(birthInterval);
							document.querySelector('#father_country_of_birth').querySelector('option[value=\"'+data.father_country_of_birth+'\"]').selected=true;
							fillMotherDetails();
						}
					}, 2000);
				}
			},2000);
		}
	},2000);
}
function fillAddDetails(){
	document.querySelector('#pres_add1').value=data.pres_add1;
	document.querySelector('#pres_add2').value=data.pres_add2;
	var interval = setInterval(function(){
		if(document.querySelector('#pres_country') != null && document.querySelector('#pres_country').querySelector('option[value=\"'+data.pres_country+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#pres_country').querySelector('option[value=\"'+data.pres_country+'\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('#pres_country').dispatchEvent(event);
			document.querySelector('#pres_add3').value=data.pres_add3;
			document.querySelector('#pincode').value=data.pincode;
			document.querySelector('#pres_phone').value=data.pres_phone;
			var phoneCodeInterval = setInterval(function(){
				if(document.querySelector('#isd_code1') != null && document.querySelector('#isd_code1').querySelector('option[value=\"'+data.isd_code1+'\"]') != null){
					clearInterval(phoneCodeInterval);
					document.querySelector('#isd_code1').querySelector('option[value=\"'+data.isd_code1+'\"]').selected=true;
					var event = document.createEvent('HTMLEvents');
					event.initEvent("change", true, true);
					event.eventType = 'message';
					document.querySelector('#isd_code1').dispatchEvent(event);
					setTimeout(function(){
						if(data.isd_code1.toUpperCase() == 'OTHER'){
							document.querySelector('#isd_code2').value=data.isd_code2;
						}
						document.querySelector('#mobile').value=data.mobile;
						if(data.sameAddress_id.toUpperCase() == 'YES'){
							document.querySelector('#sameAddress_id').click();
						} else {
							document.querySelector('#perm_address1').value=data.perm_address1;
							document.querySelector('#perm_address2').value=data.perm_address2;
							document.querySelector('#perm_address3').value=data.perm_address3;
						}
						setTimeout(function(){
							fillFatherDetails();
						},3000);
					}, 3000);
				}
			}, 2000);
		}
	},2000);
}
var interval = setInterval(function(){
	if(document.querySelector('#previous_posting') != null){
		clearInterval(interval);
		fillAddDetails();
	}
},2000);