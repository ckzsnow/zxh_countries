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
function getVisableInput() {
	var inputList = document.querySelectorAll('input[title=\"Suburb / Town\"]');
	for(var index=0; index<inputList.length; index++) {
		if(!isHidden(inputList[index])) {
			return inputList[index];
		}
	}
}
function setRemainedInfo() {
	document.querySelector('input[title=\"Postal code\"]').value = data.postal_code;
	document.querySelector('input[title=\"Home phone\"]').value = data.home_phone;
	document.querySelector('input[title=\"Business phone\"]').value = data.business_phone;
	document.querySelector('input[title=\"Mobile / Cell phone\"]').value = data.mobile_cell_phone;
	document.querySelector('.ELP-F2110').querySelector('input[value=\"1\"]').click();
	document.querySelector('input[title=\"Email address\"]').value = data.email_address;
	currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
}
var interval = setInterval(function(){
	if(document.querySelector('select[title=\"Usual country of residence\"]') != null 
		&& !isHidden(document.querySelector('select[title=\"Usual country of residence\"]')) 
		&& document.querySelector('select[title=\"Usual country of residence\"]').querySelector('option[value=\"PRCH\"]') != null) {
		clearInterval(interval);
		var event = document.createEvent('HTMLEvents');
		event.initEvent("click", true, true);
		event.eventType = 'message';
		document.querySelector('select[title=\"Usual country of residence\"]').dispatchEvent(event);
		setTimeout(function(){
			document.querySelector('select[title=\"Usual country of residence\"]').querySelector('option[value=\"PRCH\"]').selected = true;
			var event = document.createEvent('HTMLEvents');
			event.initEvent("change", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Usual country of residence\"]').dispatchEvent(event);
			var intervalDepart = setInterval(function() {
				if(document.querySelector('.wc-textfield.wc-input-wrapper.wc-combo').querySelector('input') != null 
					&& !isHidden(document.querySelector('.wc-textfield.wc-input-wrapper.wc-combo').querySelector('input'))) {
					clearInterval(intervalDepart);
					document.querySelector('.wc-textfield.wc-input-wrapper.wc-combo').querySelector('input').value = data.department_office;
					var intervalCoun = setInterval(function(){
						if(document.querySelector('select[title=\"Country\"]') != null && document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"PRCH\"]') != null){
							clearInterval(intervalCoun);
							var event = document.createEvent('MouseEvents');
							event.initMouseEvent("click", true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
							document.querySelector('select[title=\"Country\"]').dispatchEvent(event);
							setTimeout(function(){
								document.querySelector('select[title=\"Country\"]').querySelector('option[value=\"PRCH\"]').selected = true;
								var event = document.createEvent('HTMLEvents');
								event.initEvent("change", true, true);
								event.eventType = 'message';
								document.querySelector('select[title=\"Country\"]').dispatchEvent(event);
								setTimeout(function(){
									var event = document.createEvent('HTMLEvents');
									event.initEvent("blur", true, true);
									event.eventType = 'message';
									document.querySelector('select[title=\"Country\"]').dispatchEvent(event);
									setTimeout(function(){
										document.querySelector('input[title=\"Address\"]').value = data.residential_address;
										document.querySelector('input[title=\"Address 2\"]').value = data.residential_address_2;
										getVisableInput().value = data.residential_suburb_town;
										var interval2 = setInterval(function() {
											if(document.querySelector('select[title=\"State or Province\"]') != null
												&& document.querySelector('select[title=\"State or Province\"]').querySelector('option[value=\"'+data.residential_state_province+'\"]') != null) {
												clearInterval(interval2);
												console.log('found select State or Province');
												document.querySelector('select[title=\"State or Province\"]').querySelector('option[value=\"'+data.residential_state_province+'\"]').selected = true;
												setRemainedInfo();
											} else {
												console.log('not found select State or Province');
											}
										}, 2000);
									}, 2000);
								}, 1000);
							},1000);
						}
					}, 2000);
				}
			}, 2000);
		}, 2000);
	}
});