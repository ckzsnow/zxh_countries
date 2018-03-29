var scrollTop=0;
var data;
function getUploadInfo(callback){
	window.cefQuery({
		request: 'getUploadInfo:',
		onSuccess: function(response) {
			console.log('getUploadInfo response : ' + response);
			var uploadInfo = [];
			if(response == '') {
				callback(null);
			} else {
				uploadInfo = JSON.parse(response);
				console.log('uploadInfo : ' + uploadInfo);
				callback(uploadInfo);
			}
		},
		onFailure: function(error_code, error_message) {
			callback(null);
		}
	});
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
function refind(obj) {
	console.log('refind : ' + obj);
	var spanNodes = document.querySelectorAll('span[class=\"wc-labelhead wc_dlbl_seg\"]');
	for(var index in spanNodes) {
		if(spanNodes[index].innerHTML != undefined && spanNodes[index].innerHTML.indexOf(obj) > -1) {
			return spanNodes[index].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.children[0].children[0].children[1];
		}
	}
}
function findFillArea(obj) {
	var spanNodes = document.querySelectorAll('span[class=\"wc-labelhead wc_dlbl_seg\"]');
	console.log('spanNodes length : ' + spanNodes.length);
	for(var index in spanNodes) {
		console.log('span node innerHTML:' + spanNodes[index].innerHTML);
		if(spanNodes[index].innerHTML != undefined && spanNodes[index].innerHTML.indexOf(obj) > -1) {
			spanNodes[index].click();
			var top = getTop(spanNodes[index]);
			var left = getLeft(spanNodes[index]);
			console.log('span top:' + top + ', left:' + left);
			window.scrollTo(left, top);
			scrollTop = window.pageYOffset;
			console.log('scrollTop -------- ' + scrollTop);
			return spanNodes[index].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.children[0].children[0].children[1];
		}
	}
}
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
function fill_input(fillArea, obj, index) {
	console.log('fill_input fillArea html' + fillArea.innerHTML);
	console.log('fillArea input length:' + fillArea.querySelectorAll('input').length);
	fillArea.querySelector('input[type=\"text\"]').value = obj.description;
	var fileInput = fillArea.querySelector('input[type=\"file\"]');
	var interval = setInterval(function(){
		console.log('enter fill_input interval.....');
		console.log('file input disabled:' + fileInput.getAttribute('disabled'));
		if(fileInput.getAttribute('disabled') == null) {
			clearInterval(interval);
			console.log('clear fill_input interval.....');
			var inputPosX = getLeft(fileInput);
			var inputPosY = parseInt(getTop(fileInput)-scrollTop);
			var inputWidth = fileInput.offsetWidth;
			var inputHeight = fileInput.offsetHeight;
			console.log('X,Y,WIDTH,HEIGHT:'+ inputPosX + '  ' + inputPosY + '  '  + inputWidth + '  '  + inputHeight);
			window.cefQuery({
				request: 'ClickRegion:'+inputPosX+'###'+inputPosY+'###'+inputWidth+'###'+inputHeight + '###' + obj.fileIdentifier,
				onSuccess: function(response) {
					var uploadInterval = setInterval(function(){
						var area = refind(obj.btnName);
						console.log('area : ' + area);
						console.log('enter uploadInterval.....');
						if(area.querySelectorAll('button[title^=\"Delete attachment\"]') != null && 
							area.querySelectorAll('.wc_list_nb.wc_filelist.wc-margin-n-sm.wc-vgap-sm') != null &&
							area.querySelectorAll('.wc_list_nb.wc_filelist.wc-margin-n-sm.wc-vgap-sm').length > 0 &&
							area.querySelectorAll('.wc_list_nb.wc_filelist.wc-margin-n-sm.wc-vgap-sm')[0].querySelector('progress') == null){
							clearInterval(uploadInterval);
							console.log('enter refindInterval.....');
							var refindInterval = setInterval(function(){
								if(document.querySelector('body').getAttribute('data-wc-domready') != null && 
									document.querySelector('body').getAttribute('data-wc-domready') == 'true') {
									clearInterval(refindInterval);
									console.log('clear refindInterval....');
									console.log('refindInterval : ' + area.innerHTML);
									area.querySelector('.wc-button').click();
									var reloadInterval = setInterval(function(){
										console.log('enter reloadInterval......');
										if(document.querySelector('body').getAttribute('data-wc-domready') != null && 
											document.querySelector('body').getAttribute('data-wc-domready') == 'true') {
											clearInterval(reloadInterval);
											refind(obj.btnName).parentNode.parentNode.parentNode.previousSibling.click();
											console.log('clear reloadInterval.....');
											index = (index+1);
											console.log('nex index ======== ' + index);
											setTimeout(function(){execUpload(index);}, 3000);
										}
									}, 5000);
								}
							}, 3000);
						}
					}, 3000);
				},
				onFailure: function(error_code, error_message) {
					console.log('ClickRegion error : ' + error_message);
				}
			});
		}
	}, 5000);
}
function select_document_type(fillArea, obj, index) {
	var interval = setInterval(function(){
		console.log('select_document_type interval ...');
		if(fillArea.querySelector('select') != null && fillArea.querySelector('select').querySelector('option[value=\"'+obj.document_type+'\"]') != null) {
			clearInterval(interval);
			console.log('select_document_type interval clear...');
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent("focus");
			fillArea.querySelector('select').dispatchEvent(event);
			setTimeout(function(){
				var event = document.createEvent('MouseEvents');
				event.initMouseEvent("click");
				fillArea.querySelector('select').dispatchEvent(event);
				setTimeout(function(){
					fillArea.querySelector('select').querySelector('option[value=\"'+obj.document_type+'\"]').selected = true;
					var event = document.createEvent('HTMLEvents');
					event.initEvent("change", true, true);
					event.eventType = 'message';
					fillArea.querySelector('select').dispatchEvent(event);
					setTimeout(function(){
						var event = document.createEvent('HTMLEvents');
						event.initEvent("blur", true, true);
						event.eventType = 'message';
						/*fillArea.querySelector('select').dispatchEvent(event);*/
						var refindInterval = setInterval(function(){
							if(document.querySelector('body').getAttribute('data-wc-domready') != null && 
								document.querySelector('body').getAttribute('data-wc-domready') == 'true') {
								clearInterval(refindInterval);
								fill_input(refind(obj.btnName), obj, index);
							}
						}, 3000);
					}, 1000);
				},1000);
			},1000);
		}
	}, 2000);
}
function isHidden(obj) {var style = null;if(window.getComputedStyle){style = window.getComputedStyle(obj, null);} else {style = obj.currentStyle;}return (style.width=='auto');}
function execUpload(index) {
	console.log('enter execUpload func.....');
	console.log('execUpload index : ' + index);
	console.log('execUpload data length : ' + data.length);
	if(index < data.length) {
		console.log('execUpload data[index].btnName : ' + data[index].btnName);
		var fillArea = findFillArea(data[index].btnName);
		if(fillArea != null && fillArea != undefined) {
			console.log('fillArea : ' + fillArea.innerHTML);
			if(fillArea.querySelector('select') != null) {
				console.log(data[index].document_type);
				select_document_type(fillArea, data[index], index);
			} else {
				fill_input(fillArea, data[index], index);
			}
		} else {
			index = (index+1);
			execUpload(index);
		}
	} else {
		allFinish(function(){
			console.log('all finish!!!!');
		});
	}
}
var interval = setInterval(function() {
	console.log('enter interval!!!');
	if(document.querySelector('body').getAttribute('data-wc-domready') != null && 
		document.querySelector('body').getAttribute('data-wc-domready') == 'true') {
		clearInterval(interval);
		console.log('clear interval!!!');
		getUploadInfo(function(obj){
			var index = 0;
			data = obj;
			console.log('data str : ' + JSON.stringify(data));
			execUpload(index);
		});
	}
}, 2000);