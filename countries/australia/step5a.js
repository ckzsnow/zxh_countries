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
function findAddBtn(){
	var spans = document.querySelectorAll('span');
	var button;
	for(var index in spans){
		if(spans[index].innerHTML == 'Previous passports') {
			var div = spans[index].parentNode.parentNode.parentNode.parentNode.parentNode;
			button = div.children[6].children[0].children[1];
		}
	}
	return button;
}
function skipPageStep(callback, steps){
	window.cefQuery({
		request: 'SkipPageStep:' + steps,
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
var interval = setInterval(function(){
	if(document.querySelector('.ELP-F3280') != null) {
		clearInterval(interval);
		document.querySelector('.ELP-F3280').querySelector('input[value=\"'+data.addition_has_travelled+'\"]').click();
		if(data.addition_has_travelled == '1') {
			var interval2 = setInterval(function(){
				if(document.querySelector('.ELP-F0705') != null) {
					clearInterval(interval2);
					document.querySelector('.ELP-F0705').querySelector('input[value=\"'+data.addition_has_previous_ppt+'\"]').click();
					var addBtn = findAddBtn();
					var addPptInterval = setInterval(function(){
						if(!isHidden(addBtn)) {
							clearInterval(addPptInterval);
							currentStepFinish(function(){addBtn.click();});
						}
					}, 2000);
				}
			}, 2000);
		} else {
			skipPageStep(function(){console.log('step5a skip');document.querySelector('button[title=\"Go to next page\"]').click();}, 2);
		}
	}
}, 2000);