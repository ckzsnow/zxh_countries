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
var interval = setInterval(function(){
	if(document.querySelector('input[title=\"Organisation\"]') != null) {
		clearInterval(interval);
		document.querySelector('input[title=\"Organisation\"]').value = data.business_activity_organisation;
		document.querySelector('input[title=\"Address\"]').value = data.business_activity_address;
		document.querySelector('input[title=\"Address 2\"]').value = data.business_activity_address_2;
		document.querySelector('input[title=\"Suburb / Town\"]').value = data.business_activity_suburb_town;
		document.querySelector('select[title=\"State / Territory\"]').querySelector('option[value=\"'+data.business_activity_state+'\"]').selected = true;
		document.querySelector('input[title=\"Postcode\"]').value = data.business_activity_postcode;
		document.querySelector('input[title=\"Family name\"]').value = data.business_activity_contact_family_name;
		document.querySelector('input[title=\"Given names\"]').value = data.business_activity_contact_given_names;
		document.querySelector('input[title=\"Position\"]').value = data.business_activity_contact_position;
		document.querySelector('input[title=\"Business phone\"]').value = data.business_activity_contact_business_phone;
		document.querySelector('input[title=\"Mobile / Cell phone\"]').value = data.business_activity_contact_cell_phone;
		document.querySelector('input[title=\"Email address\"]').value = data.business_activity_email_address;
		currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
	}
}, 2000);