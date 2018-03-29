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
var interval = setInterval(function(){
	if(document.querySelector('.ELP-F0800') != null) {
		clearInterval(interval);
		document.querySelector('.ELP-F0800').querySelector('input[value=\"'+data.addition_has_visa_grant_num+'\"]').click();
		if(data.addition_has_visa_grant_num == '1') {
			var interval2 = setInterval(function(){
				if(!isHidden(document.querySelector('input[title=\"Australian visa grant number (if known)\"]'))) {
					clearInterval(interval2);
					if(data.addition_visa_grant_num == undefined || data.addition_visa_grant_num == '') {
						currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
					} else {
						document.querySelector('input[title=\"Australian visa grant number (if known)\"]').value = data.addition_visa_grant_num;
						currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
					}
				}
			}, 2000);
		} else {
			currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
		}
	}
}, 2000);