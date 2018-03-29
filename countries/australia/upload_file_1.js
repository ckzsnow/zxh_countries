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
function findAttachBtnByBtnName(obj) {
	var spanNodes = document.querySelectorAll('span[data-wc-component=\"textfield\"]');
	for(var index in spanNodes) {
		if(spanNodes[index].innerHTML.indexOf(obj) != -1) {
			var attachBtnUl = spanNodes[index].parentNode.parentNode.parentNode.parentNode.parentNode.children[4].children[0].children[0];
			if(attachBtnUl.children.length > 0) {
				return attachBtnUl.children[0].children[0];
			}
		}
	}
}
function allFinish(callback){
	window.cefQuery({
		request: 'AllFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
function getUploadInfo(callback){
	window.cefQuery({
		request: 'getUploadInfo:',
		onSuccess: function(response) {
			console.log('getUploadInfo response : ' + response);
			var attachBtnInfo = {};
			if(response == '') {
				callback(null);
			} else {
				attachBtnInfo = JSON.parse(response);
				console.log('attachBtnInfo : ' + attachBtnInfo);
				callback(attachBtnInfo);
			}
		},
		onFailure: function(error_code, error_message) {
			callback(attachBtnInfo={});
		}
	});
}
var processFunc = function(obj){
	if(obj == null){
		console.log('attachBtnInfo is empty');
		allFinish(function(){
			/*document.querySelector('button[title=\"Go to the next page\"]').click();*/
		});
	} else {
		var btnName = obj.btnName;
		console.log('btnName : ' + btnName);
		var attachBtn = findAttachBtnByBtnName(btnName);
		if(attachBtn == null || attachBtn == undefined){
			console.log('btn has not found!');
			getUploadInfo(processFunc);
		} else {
			console.log('btn has found : ' + attachBtn);
			currentStepFinish(function(){
				console.log('attachBtn class : ' + attachBtn.getAttribute('class'));
				attachBtn.click();
			});
		}
	}
};
var interval = setInterval(function(){
	if(document.querySelectorAll('table tr button') != null && document.querySelectorAll('table tr button').length > 1) {
		clearInterval(interval);
		getUploadInfo(processFunc);
	}
}, 3000);