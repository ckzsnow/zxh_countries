var interval = setInterval(function(){
	if($("table tr:eq(1) td:eq(0)") != null && $("table tr:eq(1) td:eq(0)").text() != "" && $('a[id=\"buttonExit\"]') != null &&
		$('a[id=\"buttonExit\"]')[0] != null){
		clearInterval(interval);
		$('a[id=\"buttonExit\"]')[0].click();
		var dialogInterval = setInterval(function(){
			if($('.modal-dialog a') != null && $('.modal-dialog a')[1] != null) {
				clearInterval(dialogInterval);
				window.cefQuery({
					request: 'AllFinish:',
					onSuccess: function(response) {
						$('.modal-dialog a')[1].click();
					},
					onFailure: function(error_code, error_message) {
						$('.modal-dialog a')[1].click();
					}
				});
			}
		}, 3000);
	}
}, 3000);