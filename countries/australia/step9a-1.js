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
function addFamilyMemberFinish(callback){
	window.cefQuery({
		request: 'addFamilyMemberFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
function getFamilyInfo(callback){
	window.cefQuery({
		request: 'getFamilyInfo:',
		onSuccess: function(response) {
			console.log('familyMemberInfo json : ' + response);
			var familyMemberInfo = {};
			if(response == null || response == '') {
				callback(null);
			} else {
				familyMemberInfo = JSON.parse(response);
				callback(familyMemberInfo);
			}
		},
		onFailure: function(error_code, error_message) {
			callback(null);
		}
	});
}
function isHidden(obj) {var style = null;if(window.getComputedStyle){style = window.getComputedStyle(obj, null);} else {style = obj.currentStyle;}return (style.width=='auto');}
function process(obj){
	var interval = setInterval(function(){
		if(document.querySelector('select[title=\"Relationship to the applicant\"]') != null
			&& document.querySelector('select[title=\"Relationship to the applicant\"]').querySelector('option[value=\"'+obj.family_members_relationship+'\"]') != null
			&& document.querySelector('select[title=\"Country of birth\"]') != null
			&& document.querySelector('select[title=\"Country of birth\"]').querySelector('option[value=\"'+obj.family_members_birth_country+'\"]') != null) {
			clearInterval(interval);
			var event = document.createEvent('HTMLEvents');
			event.initEvent("click", true, true);
			event.eventType = 'message';
			document.querySelector('select[title=\"Relationship to the applicant\"]').dispatchEvent(event);
			setTimeout(function(){
				document.querySelector('select[title=\"Relationship to the applicant\"]').querySelector('option[value=\"'+obj.family_members_relationship+'\"]').selected=true;
				var event = document.createEvent('HTMLEvents');
				event.initEvent("change", true, true);
				event.eventType = 'message';
				document.querySelector('select[title=\"Relationship to the applicant\"]').dispatchEvent(event);
				setTimeout(function() {
					document.querySelector('input[title=\"Family name\"]').value = obj.family_members_family_name;
					document.querySelector('input[title=\"Given names\"]').value = obj.family_members_given_names;
					document.querySelector('.ELP-F0570').querySelector('input[value=\"'+obj.family_members_sex+'\"]').click();
					document.querySelector('input[title=\"Date of birth\"]').value = obj.family_members_birth_date;
					var event = document.createEvent('HTMLEvents');
					event.initEvent("click", true, true);
					event.eventType = 'message';
					document.querySelector('select[title=\"Country of birth\"]').dispatchEvent(event);
					setTimeout(function(){
						document.querySelector('select[title=\"Country of birth\"]').querySelector('option[value=\"'+obj.family_members_birth_country+'\"]').selected=true;
						var event = document.createEvent('HTMLEvents');
						event.initEvent("change", true, true);
						event.eventType = 'message';
						document.querySelector('select[title=\"Country of birth\"]').dispatchEvent(event);
						setTimeout(function(){
							addFamilyMemberFinish(function(){document.querySelector('button[title=\"Save the current entry\"]').click();});
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}
	});
}
getFamilyInfo(function(obj){
	console.log(obj);
	process(obj);
});


