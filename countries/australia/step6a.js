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
function findAddBtn(){
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'Travelling companions') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[3].children[0].children[1];
		}
	}
	return button;
}
function isHidden(obj) {var style = null;if(window.getComputedStyle){style = window.getComputedStyle(obj, null);} else {style = obj.currentStyle;}return (style.width=='auto');}
var interval = setInterval(function(){
	if(document.querySelector('.ELP-F4575') != null && document.querySelector('.ELP-F4575').querySelector('input[value=\"'+data.has_other_person_travelling_with+'\"]') != null) {
		clearInterval(interval);
		document.querySelector('.ELP-F4575').querySelector('input[value=\"'+data.has_other_person_travelling_with+'\"]').click();
		if(data.has_other_person_travelling_with == '1') {
			getTravelWithInfo(function(obj){
				if(obj == null) {
					skipStep(function(){console.log('step6a skip');});
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
			skipStep(function(){console.log('step6a skip');});
		}
	}
}, 2000);