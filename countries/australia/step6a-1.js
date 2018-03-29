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
function getTravelWithInfo(callback){
	window.cefQuery({
		request: 'getTravelWithMemberInfo:',
		onSuccess: function(response) {
			console.log('travelWithMemberInfo json : ' + response);
			var travelWithMemberInfo = {};
			if(response == null || response == '') {
				callback(null);
			} else {
				travelWithMemberInfo = JSON.parse(response);
				callback(travelWithMemberInfo);
			}
		},
		onFailure: function(error_code, error_message) {
			callback(null);
		}
	});
}
}
function addTravelWithMemberFinish(callback){
	window.cefQuery({
		request: 'addTravelWithMemberFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
function isHidden(obj) {var style = null;if(window.getComputedStyle){style = window.getComputedStyle(obj, null);} else {style = obj.currentStyle;}return (style.width=='auto');}
function process(obj) {
	var interval = setInterval(function() {
		console.log('interval ...');
		if(document.querySelector('button[title=\"Save the current entry\"]') != null && 
			document.querySelector('select[title=\"Relationship to the applicant\"]') != null &&
			document.querySelector('select[title=\"Relationship to the applicant\"]').querySelector('option[value=\"'+obj.other_person_relationship+'\"]') != null) {
			clearInterval(interval);
			console.log('interval clear...');
			var event = document.createEvent('HTMLEvents');
			event.initEvent("click", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Relationship to the applicant\"]').dispatchEvent(event);
			setTimeout(function(){
				document.querySelector('select[title=\"Relationship to the applicant\"]').querySelector('option[value=\"'+obj.other_person_relationship+'\"]').selected=true;
				var event = document.createEvent('HTMLEvents');
				event.initEvent("change", true, true);
				event.eventType = 'message';
				document.querySelector('select[title=\"Relationship to the applicant\"]').dispatchEvent(event);
				setTimeout(function(){
					document.querySelector('input[title=\"Family name\"]').value = obj.other_person_familyname;
					document.querySelector('input[title=\"Given names\"]').value = obj.other_person_givennames;
					document.querySelector('.ELP-F0570').querySelector('input[value=\"'+obj.other_person_sex+'\"]').click();
					document.querySelector('input[title=\"Date of birth\"]').value = obj.other_person_birth_date;
					addTravelWithMemberFinish(function(){document.querySelector('button[title=\"Save the current entry\"]').click();});
				}, 2000);
			}, 2000);
		}
	}, 2000);
}
getTravelWithInfo(function(obj){
	console.log(obj);
	process(obj);
});