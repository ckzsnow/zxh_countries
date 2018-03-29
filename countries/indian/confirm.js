function allFinish(callback){
	window.cefQuery({
		request: 'AllFinish:',
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
		}
	});
}
function recordInfo(callback, infos){
	window.cefQuery({
		request: 'RecordInfo:' + infos,
		onSuccess: function(response) {
			callback();
		},
		onFailure: function(error_code, error_message) {
		}
	});
}
var interval = setInterval(function(){
	if(document.querySelectorAll('.container div span') != null && document.querySelectorAll('.container div span')[1] != null){
		clearInterval(interval);
		var appid = document.querySelectorAll('.container div span')[1].innerHTML;
		var infos = 'appid='+appid+';'+'passportNO='+data.passport_no;
		recordInfo(function(){allFinish(function(){});}, infos);
	}
},5000);