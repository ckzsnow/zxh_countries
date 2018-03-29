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
	if(document.querySelector('button[title=\"Go to next page\"]') != null && !isHidden(document.querySelector('button[title=\"Go to next page\"]'))) {
		clearInterval(interval);
		document.querySelector('.ELP-F2200').querySelector('input[value=\"'+data.priority_fee+'\"]').click();
		if(data.priority_fee == '1') {
			var interval2 = setInterval(function(){
				if(!isHidden(document.querySelector('.ELP-F2201'))) {
					clearInterval(interval2);
					document.querySelector('.ELP-F2201').querySelector('input[value=\"1\"]').click();
					currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
				}
			}, 1000);
		} else {
			currentStepFinish(function(){document.querySelector('button[title=\"Go to next page\"]').click();});
		}
	}
}, 1000);