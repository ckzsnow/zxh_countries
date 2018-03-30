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
var interval = setInterval(function(){
	if(document.querySelectorAll('.jcrop-holder .jcrop-tracker') != null && document.querySelectorAll('.jcrop-holder .jcrop-tracker')[1] != null && 
		document.querySelectorAll('.jcrop-holder .jcrop-tracker')[1].offsetWidth > 100){
		clearInterval(interval);
		var width = document.querySelectorAll('.jcrop-holder .jcrop-tracker')[1].offsetWidth;
		var height = document.querySelectorAll('.jcrop-holder .jcrop-tracker')[1].offsetHeight;
		var max = width>height?width:height;
		$('#target').data('Jcrop').setSelect([0,0,max,max]);
		setTimeout(function(){
			currentStepFinish(function(){document.querySelector('input[value=\"Crop and Save\"]').click();});
		},3000);
	}
},5000);