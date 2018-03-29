function currentAttachFinish(callback){
	window.cefQuery({
		request: 'currentAttachFinish:',
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
				callback(attachBtnInfo);
			} else {
				attachBtnInfo = JSON.parse(response);
				console.log('attachInfo : ' + attachBtnInfo);
				callback(attachBtnInfo);
			}
		},
		onFailure: function(error_code, error_message) {
			callback(attachBtnInfo={});
		}
	});
}
function getTop(e){var offset=e.offsetTop;if(e.offsetParent!=null){offset+=getTop(e.offsetParent);}return offset;}function getLeft(e){var offset=e.offsetLeft;if(e.offsetParent!=null){offset+=getLeft(e.offsetParent);}return offset;}
function fill_description(attchInfo){
	var interval = setInterval(function() {
		console.log('interval ...');
		var isBusy = document.querySelectorAll('.wc-cell')[7].querySelectorAll('span')[0].getAttribute('aria-busy');
		if(isBusy == null) {
			clearInterval(interval);
			console.log('interval clear...');
			document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[0].value=attchInfo.description;
			setTimeout(function(){
				var inputPosX = getLeft(document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1]);
				var inputPosY = getTop(document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1]);
				var inputWidth = document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1].offsetWidth;
				var inputHeight = document.querySelectorAll('.wc-cell')[7].querySelectorAll('input')[1].offsetHeight;
				window.cefQuery({
					request: 'ClickRegion:'+inputPosX+'###'+inputPosY+'###'+inputWidth+'###'+inputHeight,
					onSuccess: function(response) {
						var uploadInterval = setInterval(function(){
							if(document.querySelectorAll('button[title^=\"Delete attachment\"]') != null && 
								document.querySelectorAll('.wc_list_nb.wc-listlayout-type-flat.wc_filelist') != null &&
								document.querySelectorAll('.wc_list_nb.wc-listlayout-type-flat.wc_filelist').length > 0 &&
								document.querySelectorAll('.wc_list_nb.wc-listlayout-type-flat.wc_filelist')[0].querySelector('progress') == null){
								clearInterval(uploadInterval);
								setTimeout(function(){
									document.querySelectorAll('.wc-cell')[9].querySelectorAll('button')[0].click();
									var attachmentInterval = setInterval(function(){
										var submitBtns = document.querySelectorAll('.wc-panel.wc-panel-type-block li button[type=\"submit\"]');
										document.querySelectorAll('.wc-panel.wc-panel-type-block li button[type=\"submit\"]')[3].getAttribute('disabled');
										for(var index in submitBtns){
											if(submitBtns[index].innerHTML == 'Confirm' && submitBtns[index].getAttribute('disabled') == null){
												clearInterval(attachmentInterval);
												currentAttachFinish(function(){
													console.log('currentUploadFinish');
													submitBtns[index].click();
												});
												break;
											}
										}
									}, 3000);
								}, 2000);
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
function select_document_type(attchInfo){
	var interval = setInterval(function() {
		console.log('interval ...');
		if(document.querySelectorAll('.wc-cell')[6].querySelectorAll('select') != null && 
			document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].querySelector('option[value=\"'+attchInfo.document_type+'\"]') != null) {
			clearInterval(interval);
			console.log('interval clear...');
			var event = document.createEvent('HTMLEvents');
			event.initEvent("click", true, true);
			event.eventType = 'message';
			document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].dispatchEvent(event);
			setTimeout(function(){
				document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].querySelector('option[value=\"'+attchInfo.document_type+'\"]').selected=true;
				var event = document.createEvent('HTMLEvents');
				event.initEvent("change", true, true);
				event.eventType = 'message';
				document.querySelectorAll('.wc-cell')[6].querySelectorAll('select')[0].dispatchEvent(event);
				var selectDTInterval = setInterval(function(){
					var isBusy = document.querySelectorAll('.wc-cell')[7].querySelectorAll('span')[0].getAttribute('aria-busy');
					if(isBusy == null){
						clearInterval(selectDTInterval);
						fill_description(attchInfo);
					}
				}, 3000);
			}, 2000);
		}
	}, 2000);
}
var interval = setInterval(function(){
	if(document.querySelectorAll('.wc-cell button')!= null && document.querySelectorAll('.wc-cell button')[0] != null) {
		clearInterval(interval);
		getUploadInfo(function(attchInfo) {
			var documentTypeStrong = document.querySelectorAll('.wc-cell')[6].querySelectorAll('strong');
			if(documentTypeStrong == null || documentTypeStrong.length == 0){
				console.log("documentTypeStrong == null");
				select_document_type(attchInfo);
			} else {
				fill_description(attchInfo);
				console.log("documentTypeStrong == null");
			}
		});
	}
}, 1000);
