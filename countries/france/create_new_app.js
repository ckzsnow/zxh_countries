function noticeCurrentStepFinish(callback){
	window.cefQuery({
		request: 'CurrentStepFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
		}
	});
};
function save(){
	var interSub6 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interSub6);
			setTimeout(function(){noticeCurrentStepFinish(function(){document.querySelector('#save_button').click();});}, 3000);
		}
	},3000);
};
function fill_fingerprints_collected_when(){
	var interSub6 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interSub6);
			document.querySelector('#fi_fingerprints_collected_when').value=data.fingerprints_collected_when;
			save();
		}
	},2000);
}
function select_fingerprints_collected(){
	var interSub5 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interSub5);
			document.querySelector('#fi_fingerprints_collected-'+data.fingerprints_collected).click();
			if(data.fingerprints_collected == 't'){
				setTimeout(function(){fill_fingerprints_collected_when();}, 3000);
			} else {
				save();
			}
		}
	},2000);
};
function first_schengen_trip(){
	var interSub5 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interSub5);
			document.querySelector('#fi_schengen_visa_first_when').value=data.schengen_visa_first_when;
			document.querySelector('#fi_schengen_visa_first_until').value=data.schengen_visa_first_until;
			document.querySelector('#fi_schengen_visa_second_when').value=data.schengen_visa_second_when;
			document.querySelector('#fi_schengen_visa_second_until').value=data.schengen_visa_second_until;
			document.querySelector('#fi_schengen_visa_third_when').value=data.schengen_visa_third_when;
			document.querySelector('#fi_schengen_visa_third_until').value=data.schengen_visa_third_until;
			setTimeout(function(){select_fingerprints_collected();}, 3000);
		}
	},3000);
};
function select_first_schengen_trip(){
	var interSub4 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interSub4);
			document.querySelector('#fi_first_schengen_trip-'+data.first_schengen_trip).click();
			if(data.first_schengen_trip == 't') {
				first_schengen_trip();
			} else {
				select_fingerprints_collected();
			}
		}
	},3000);
};
function select_means_of_support(){
	var interSub3 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interSub3);
			if(data.sponsorship == 'by_a_sponsor') document.querySelector('#fi_sponsorship_other').value=data.sponsorship_other;
			document.querySelector('#fi_means_of_support').querySelector('option[value=\"'+data.means_of_support+'\"]').selected=true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('#fi_means_of_support').dispatchEvent(event);
			setTimeout(function(){select_first_schengen_trip();}, 3000);
		}
	},2000);
};
function select_sponsorship(){
	document.querySelector('#fi_sponsorship').querySelector('option[value=\"'+data.sponsorship+'\"]').selected=true;
	var event = document.createEvent('HTMLEvents');
	event.initEvent("change", true, true);
	event.eventType = 'message';
	document.querySelector('#fi_sponsorship').dispatchEvent(event);
	setTimeout(function(){select_means_of_support();}, 3000);
};
function fill_host_info(){
	var interSub2 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interSub2);
			if(data.trav_host_is_organisation == 't') document.querySelector('#fi_trav_host_organisation_contact_name').value=data.trav_host_organisation_contact_name;
			document.querySelector('#f_trav_host_name').value=data.trav_host_name;
			document.querySelector('input[name=\"f_trav_host_address[street]\"]').value=data.trav_host_address_street;
			document.querySelector('input[name=\"f_trav_host_address[city]\"]').value=data.trav_host_address_city;
			document.querySelector('input[name=\"f_trav_host_address[postcode]\"]').value=data.trav_host_address_postcode;
			document.querySelector('#fi_trav_host_phone').value=data.trav_host_phone;
			document.querySelector('#fi_trav_host_fax').value=data.trav_host_fax;
			setTimeout(function(){select_sponsorship();}, 3000);
		}
	},3000);
};
function select_trav_host_is_organisation(){
	var intervalSub104 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(intervalSub104);
			if(data.trav_host_is_organisation == 't'){
				document.querySelector('#fi_trav_host_is_organisation-t').click();
			} else {
				document.querySelector('#fi_trav_host_is_organisation-f').click();
			}
			setTimeout(function(){fill_host_info();}, 3000);
		}
	},3000);
};
function select_circulation(){
	var intervalSub103 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(intervalSub103);
			document.querySelector('#fi_circulation-'+data.circulation).click();
			setTimeout(function(){select_trav_host_is_organisation();}, 3000);
		}
	},3000);
};
function overseas(){
	var intervalSub103 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(intervalSub103);
			setTimeout(function(){
				document.querySelector('#overseas_territories').querySelector('option[value=\"'+data.overseas_territories+'\"]').selected=true;
				var event1 = document.createEvent('HTMLEvents');
				event1.initEvent("change", true, true);
				event1.eventType = 'message';
				document.querySelector('#overseas_territories').dispatchEvent(event1);
				setTimeout(function(){select_circulation();},3000);
			}, 3000);
		}
	},3000);
};
function fill_trav_info(){
	var intervalSub102 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(intervalSub102);
			document.querySelector('#fi_trav_origin_departure_date').value=data.trav_origin_departure_date;
			document.querySelector('#f_trav_departure_date').value=data.trav_arrival_date;
			document.querySelector('#f_trav_arrival_date').value=data.trav_departure_date;
			if(data.trav_go_to_domtom == 't'){
				document.querySelector('#f_trav_go_to_domtom-t').click();
				overseas();
			} else {
				document.querySelector('#f_trav_go_to_domtom-f').click();
				select_circulation();
			}
		}
	},3000);
};
function select_main_dest(){
	var intervalSub101 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(intervalSub101);
			document.querySelector('#fi_trav_main_dest').querySelector('option[value=\"'+data.trav_main_dest+'\"]').selected=true;
			var event1 = document.createEvent('HTMLEvents');
			event1.initEvent("change", true, true);
			event1.eventType = 'message';
			document.querySelector('#fi_trav_main_dest').dispatchEvent(event1);
			setTimeout(function(){fill_trav_info();}, 3000);
		}
	},3000);
};
function select_trav_first_entry(){
	document.querySelector('#fi_trav_first_entry').querySelector('option[value=\"'+data.trav_first_entry+'\"]').selected=true;
	var event1 = document.createEvent('HTMLEvents');
	event1.initEvent("change", true, true);
	event1.eventType = 'message';
	document.querySelector('#fi_trav_first_entry').dispatchEvent(event1);
	setTimeout(function(){select_main_dest();}, 3000);
};
function fill_home_info(){
	var intervalSub100 = setInterval(function(){
		if(!document.querySelector('#f_pers_surnames').disabled){
			clearInterval(intervalSub100);
			setTimeout(function(){
				document.querySelector('#f_pers_mobile_phone').value=data.pers_mobile_phone;
				document.querySelector('input[name=\"fi_home_address[street]\"]').value=data.home_address_street;
				document.querySelector('input[name=\"fi_home_address[city]\"]').value=data.home_address_city;
				document.querySelector('input[name=\"fi_home_address[postcode]\"]').value=data.home_address_postcode;
				select_trav_first_entry();
			}, 3000);
		};
	},3000);
};
function select_marital_status(){
	var interval = setInterval(function(){
		if(document.querySelector('#fi_employer_phone') != null && !document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interval);
			setTimeout(function(){
				document.querySelector('#f_fami_marital_status').querySelector('option[value=\"'+data.fami_marital_status+'\"]').selected=true;
				var event1 = document.createEvent('HTMLEvents');
				event1.initEvent("change", true, true);
				event1.eventType = 'message';
				document.querySelector('#f_fami_marital_status').dispatchEvent(event1);
				setTimeout(function(){fill_home_info();},2000);
			},3000);
		}
	},3000);
};
function residence_other_country(){
	if(data.residence_other_country == 't'){
		document.querySelector('#fi_residence_other_country-' + data.residence_other_country).click();
		var interval = setInterval(function(){
			if(document.querySelector('#fi_employer_phone') != null && !document.querySelector('#f_pers_surnames').disabled){
				clearInterval(interval);
				setTimeout(function(){
					document.querySelector('#fi_residence_permit_num').value=data.residence_permit_num;
					document.querySelector('#fi_residence_permit_valid_until').value=data.residence_permit_valid_until;
					select_marital_status();
				},3000);
			}
		},3000);
	} else {
		document.querySelector('#fi_residence_other_country-' + data.residence_other_country).click();
		select_marital_status();
	} 
}
function fill_occupation_info(){
	if(data.occupation_status=='Employed'){
		document.querySelector('#fi_pers_occupation_area').querySelector('option[value=\"'+data.pers_occupation_area+'\"]').selected=true;
		var event1 = document.createEvent('HTMLEvents');
		event1.initEvent("change", true, true);
		event1.eventType = 'message';
		document.querySelector('#fi_pers_occupation_area').dispatchEvent(event1);
		var intervalSub = setInterval(function(){
			if(!document.querySelector('#f_pers_surnames').disabled){
				clearInterval(intervalSub);
				setTimeout(function(){
					document.querySelector('#fi_employer_name').value=data.employer_name;
					document.querySelector('input[name=\"fi_employer_address[street]\"]').value=data.employer_address_street;
					document.querySelector('input[name=\"fi_employer_address[city]\"]').value=data.employer_address_city;
					document.querySelector('input[name=\"fi_employer_address[postcode]\"]').value=data.employer_address_postcode;
					document.querySelector('#fi_employer_phone').value=data.employer_phone;
					residence_other_country();
				},3000);
			}
		}, 2000);
	} else if(data.occupation_status=='Student'){
		document.querySelector('#fi_school_name').value=data.school_name;
		document.querySelector('#fi_school_phone').value=data.school_phone;
		document.querySelector('input[name=\"fi_school_address[street]\"]').value=data.school_address_street;
		document.querySelector('input[name=\"fi_school_address[city]\"]').value=data.school_address_city;
		document.querySelector('input[name=\"fi_school_address[postcode]\"]').value=data.school_address_postcode;
		residence_other_country();
	} else {
		residence_other_country();
	}
};
function select_occupation_status(){
	document.querySelector('#f_pers_occupation').querySelector('option[value=\"'+data.occupation_status+'\"]').selected=true;
	var event = document.createEvent('HTMLEvents');
	event.initEvent("change", true, true);
	event.eventType = 'message';
	document.querySelector('#f_pers_occupation').dispatchEvent(event);
	var interval = setInterval(function(){
		if(document.querySelector('#fi_employer_phone') != null && !document.querySelector('#f_pers_surnames').disabled){
			clearInterval(interval);
			setTimeout(function(){fill_occupation_info();},3000);
		}
	},3000); 
};
function fill_base_info(){
	document.querySelector('#f_pers_surnames').value=data.pers_surnames;
	document.querySelector('#f_birth_surnames').value=data.birth_surnames;
	document.querySelector('#f_pers_givennames').value=data.pers_givennames;
	document.querySelector('#f_pers_sex-'+data.pers_sex).click();
	document.querySelector('#f_pers_birth_date').value=data.pers_birth_date;
	document.querySelector('#fi_minor_parent_surname').value=data.minor_parent_surname;
	document.querySelector('#fi_minor_parent_givennames').value=data.minor_parent_givennames;
	document.querySelector('#f_birth_place').value=data.birth_place;
	document.querySelector('#f_pers_province').querySelector('option[value=\"'+data.pers_province+'\"]').selected=true;
	var event = document.createEvent('HTMLEvents');
	event.initEvent("change", true, true);
	event.eventType = 'message';
	document.querySelector('#f_pers_province').dispatchEvent(event);
	setTimeout(function(){
		document.querySelector('#f_pers_hukou_province').querySelector('option[value=\"'+data.pers_hukou_province+'\"]').selected=true;
		document.querySelector('#f_national_id').value=data.national_id;
		document.querySelector('#f_pass_num').value=data.pass_num;
		document.querySelector('#fi_passport_issue_date').value=data.passport_issue_date;
		document.querySelector('#fi_passport_expiry_date').value=data.passport_expiry_date;
		select_occupation_status();
	}, 3000);
};
function select_visa_type(){
	var interval = setInterval(function(){
		if(document.querySelector('#save_button') != null){
			clearInterval(interval);
			document.querySelector('#application_form a').click();
			setTimeout(function(){
				if(data.visa_type == '3' || data.visa_type == '4'){
					document.querySelectorAll('table a')[1].click();
					setTimeout(function(){
						document.querySelectorAll('table a')[2].click();
						setTimeout(function(){
							document.querySelectorAll('table a')[data.visa_type].click();
							setTimeout(function(){
								document.querySelectorAll('table input[type=\"button\"][value=\"Confirm\"]')[0].click();
								var subInterval = setInterval(function(){
									if(!document.querySelector('#f_pers_surnames').disabled){
										clearInterval(subInterval);
										fill_base_info();
									}
								},2000);
							},2000);
						},2000);
					}, 2000);
				} else {
					document.querySelectorAll('table a')[57].click();
					setTimeout(function(){						
						document.querySelectorAll('table a')[data.visa_type].click();
						setTimeout(function(){
							document.querySelectorAll('table input[type=\"button\"][value=\"Confirm\"]')[0].click();
							var subInterval = setInterval(function(){
								if(!document.querySelector('#f_pers_surnames').disabled){
									clearInterval(subInterval);
									fill_base_info();
								}
							},2000);
						},2000);
					}, 2000);
				}
			},2000);
		}
	},2000);
};
var interval = setInterval(function(){
	if(document.querySelector('input[type=\"button\"]') != null){
		clearInterval(interval);
		document.querySelector('input[type=\"button\"]').click();
		select_visa_type();
	}
},2000);