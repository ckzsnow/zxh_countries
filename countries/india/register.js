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
function fillIdentifyCode(){
	window.cefQuery({
		request: 'GetIndianCode:',
		onSuccess: function(response) {
			document.querySelector('#captcha').value = '';
			document.querySelector('#captcha').value=response;
			currentStepFinish(function(){
				setTimeout(function(){
					document.querySelector('input[type=\"submit\"]').click();
				}, 2000);
			});
		},
		onFailure: function(error_code, error_message) {
			currentStepFinish(function(){
				setTimeout(function(){
					document.querySelector('input[type=\"submit\"]').click();
				}, 2000);
			});
		}
	});
}
function fillBaseInfo(){
	document.querySelector('#dob_id').value=data.dob_id;
	document.querySelector('#email_id').value=data.email_id;
	document.querySelector('#email_re_id').value=data.email_re_id;
	document.querySelector('#jouryney_id').value=data.jouryney_id;
	var visaServiceInterval = setInterval(function(){
		if(document.querySelector('#visaService') != null && document.querySelector('#visaService').querySelector('option[value=\"'+data.visaService+'\"]') != null){
			clearInterval(visaServiceInterval);
			document.querySelector('#visaService').querySelector('option[value=\"'+data.visaService+'\"]').selected=true;
			document.querySelector('#visaService').onchange();
			var purposeInterval = setInterval(function(){
				if(document.querySelector('#purpose') != null && document.querySelector('#purpose').querySelector('option[value=\"'+data.purpose+'\"]') != null){
					clearInterval(purposeInterval);
					document.querySelector('#purpose').querySelector('option[value=\"'+data.purpose+'\"]').selected=true;
					fillIdentifyCode();
				}
			});
		}
	}, 3000);
}
function fillThreeSelectInfo(){
	var interval = setInterval(function(){
		if(document.querySelector('#countryname_id') != null && document.querySelector('#countryname_id').querySelector('option[value=\"'+data.countryname_id+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#countryname_id').querySelector('option[value=\"'+data.countryname_id+'\"]').selected=true;
			document.querySelector('#countryname_id').onchange();
			var cityInterval = setInterval(function(){
				if(document.querySelector('#missioncode_id') != null && document.querySelector('#missioncode_id').querySelector('option[value=\"'+data.missioncode_id+'\"]') != null){
					clearInterval(cityInterval);
					document.querySelector('#missioncode_id').querySelector('option[value=\"'+data.missioncode_id+'\"]').selected=true;
					document.querySelector('#missioncode_id').onchange();
					var nationalityInterval = setInterval(function(){
						if(document.querySelector('#nationality_id') != null && document.querySelector('#nationality_id').querySelector('option[value=\"'+data.nationality_id+'\"]') != null){
							clearInterval(nationalityInterval);
							document.querySelector('#nationality_id').querySelector('option[value=\"'+data.nationality_id+'\"]').selected=true;
							document.querySelector('#nationality_id').onchange();
							setTimeout(function(){fillBaseInfo()},3000);
						}
					}, 2000);
				}
			}, 2000);
		}
	},2000);
}
var interval = setInterval(function(){
	console.log('enter register interval.....');
	if(document.querySelector('#captcha') != null){
		clearInterval(interval);
		console.log('clear register interval!!!');
		fillThreeSelectInfo();
	}
},2000);