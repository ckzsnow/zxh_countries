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
function skipStep(callback){
	window.cefQuery({
		request: 'SkipStep:',
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
function findAddBtn(){
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'Non-accompanying members of the family unit') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[2].children[0].children[1];
		}
	}
	return button;
}
var interval = setInterval(function(){
	if(document.querySelector('.ELP-F2143') != null) {
		clearInterval(interval);
		document.querySelector('.ELP-F2143').querySelector('input[value=\"'+data.has_other_family_members+'\"]').click();
		if(data.has_other_family_members == '1'){
			getFamilyInfo(function(obj){
				if(obj == null) {
					skipStep(function(){console.log('step9a skip');});
				} else {
					var interval2 = setInterval(function(){
						var btn = findAddBtn();
						if(!isHidden(btn)) {
							clearInterval(interval2);
							currentStepFinish(function(){btn.click();});
						}
					}, 2000);
				}
			});
		} else {
			skipStep(function(){console.log('step9a skip');});
		}
	}
}, 2000);