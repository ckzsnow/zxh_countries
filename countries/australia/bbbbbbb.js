function currentUploadFinish(callback){
	window.cefQuery({
		request: 'CurrentUploadFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
			callback();
		}
	});
}
function getUploadFileType(callback){
	window.cefQuery({
		request: 'GetUploadFileType:',
		onSuccess: function(response) {
			console.log('GetUploadFileType response : ' + response);
			callback(response);
		},
		onFailure: function(error_code, error_message) {
			console.log('GetUploadFileKey error : ' + error_message);
			callback("");
		}
	});
}
function getTop(e){var offset=e.offsetTop;if(e.offsetParent!=null){offset+=getTop(e.offsetParent);}return offset;}function getLeft(e){var offset=e.offsetLeft;if(e.offsetParent!=null){offset+=getLeft(e.offsetParent);}return offset;}
function fill_description(fileType){
	var fileDesKey = fileType + '_description';
	var interval = setInterval(function() {
		console.log('interval ...');
		var isBusy = document.querySelectorAll('.wc-cell')[7].querySelectorAll('span')[0].getAttribute('aria-busy');
		if(isBusy == null) {
			clearInterval(interval);
			console.log('interval clear...');
			document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[0].value=data[fileDesKey];
			setTimeout(function(){
				var inputPosX = getLeft(document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1]);
				var inputPosY = getTop(document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1]);
				var inputWidth = document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1].offsetWidth;
				var inputHeight = document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1].offsetHeight;
				window.cefQuery({
					request: 'ClickRegion:'+inputPosX+'###'+inputPosY+'###'+inputWidth+'###'+inputHeight,
					onSuccess: function(response) {
						var uploadInterval = setInterval(function(){
							if(document.querySelectorAll('button[title^=\"Delete attachment\"]') != null){
								clearInterval(uploadInterval);
								document.querySelectorAll('.wc-cell')[9].querySelectorAll('button')[0].click();
								var attachmentInterval = setInterval(function(){
									var submitBtns = document.querySelectorAll('.wc-panel.wc-panel-type-block li button[type=\"submit\"]');
									document.querySelectorAll('.wc-panel.wc-panel-type-block li button[type=\"submit\"]')[3].getAttribute('disabled');
									for(var index in submitBtns){
										if(submitBtns[index].innerHTML == 'Confirm' && submitBtns[index].getAttribute('disabled') == null){
											clearInterval(attachmentInterval);
											currentUploadFinish(function(){
												console.log('currentUploadFinish');
												submitBtns[index].click();
											});
											break;
										}
									}
								}, 3000);
							}
						}, 6000);
					},
					onFailure: function(error_code, error_message) {
						console.log('ClickRegion error : ' + error_message);
					}
				});
			},2000);
		}
	}, 2000);
}
function select_document_type(fileType){
	var fileTypeKey = fileType + '_document_type';
	var interval = setInterval(function() {
		console.log('interval ...');
		if(document.querySelectorAll('.wc-cell')[6].querySelectorAll('select') != null && 
			document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].querySelector('option[value=\"'+data[fileTypeKey]+'\"]') != null) {
			clearInterval(interval);
			console.log('interval clear...');
			var event = document.createEvent('HTMLEvents');
			event.initEvent("click", true, true);
			event.eventType = 'message';
			document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].dispatchEvent(event);
			setTimeout(function(){
				document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].querySelector('option[value=\"'+data[fileTypeKey]+'\"]').selected=true;
				var event = document.createEvent('HTMLEvents');
				event.initEvent("change", true, true);
				event.eventType = 'message';
				document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].dispatchEvent(event);
				var selectDTInterval = setInterval(function(){
					var isBusy = document.querySelectorAll('.wc-cell')[7].querySelectorAll('span')[0].getAttribute('aria-busy');
					if(isBusy == null){
						clearInterval(selectDTInterval);
						fill_description(fileType);
					}
				}, 3000);
			}, 2000);
		}
	}, 2000);
}
function checkPageLoadFinish(fileType){
	var interval = setInterval(function(){
		if(document.querySelectorAll('.wc-cell button')!= null && document.querySelectorAll('.wc-cell button')[0] != null) {
			clearInterval(interval);
			var documentTypeStrong = document.querySelectorAll('.wc-cell')[6].querySelectorAll('strong');
			if(documentTypeStrong == null){
				select_document_type(fileType);
			} else {
				fill_description(fileType);
			}
		}
	}, 1000);
}
getUploadFileType(function(type){
	if(type == '') {
		console.log('getUploadFileType error : ' + type);
	} else {
		checkPageLoadFinish(type);
	}
});