格式jpeg,大小10KB-1MB，最小像素350*350，照片需要手动修改成长款相等

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
function getTop(e){
	var offset=e.offsetTop;
	if(e.offsetParent!=null){
		offset+=getTop(e.offsetParent);
	}
	return offset;
}
function getLeft(e){
	var offset=e.offsetLeft;
	if(e.offsetParent!=null){
		offset+=getLeft(e.offsetParent);
	}
	return offset;
}
var interval = setInterval(function(){
	if(document.querySelector('#continue') != null && document.querySelector('input[type=\"file\"]') != null){
		clearInterval(interval);
		console.log('find upload btn.');
		var inputPosX = getLeft(document.querySelector('input[type=\"file\"]'));
		var inputPosY = getTop(document.querySelector('input[type=\"file\"]'));
		var inputWidth = document.querySelector('input[type=\"file\"]').offsetWidth;
		var inputHeight = document.querySelector('input[type=\"file\"]').offsetHeight;
		window.cefQuery({
			request: 'ClickRegion:'+inputPosX+'###'+inputPosY+'###'+inputWidth+'###'+inputHeight + '###',
			onSuccess: function(response) {
				var fileInterval = setInterval(function(){
					if(document.querySelector('input[type=\"file\"]').value != ''){
						clearInterval(fileInterval);
						currentStepFinish(function(){document.querySelector('#continue').click();});
					}
				}, 3000);
			},
			onFailure: function(error_code, error_message) {
				console.log('ClickRegion error : ' + error_message);
			}
		});
	}
},2000);