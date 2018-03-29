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
	var trees = document.querySelectorAll('.wc-submenu.wc-submenu-type-tree');
	if(trees != null && trees.length>12){
		clearInterval(interval);
		trees[11].click();
		setTimeout(function(){
			var interval1 = setInterval(function(){
				if(document.querySelectorAll('.wc-submenu.wc-submenu-type-tree')[11].querySelectorAll('.wc-menuitem.wc-invite.wc-nobutton')[2] != null && !isHidden(document.querySelectorAll('.wc-submenu.wc-submenu-type-tree')[11].querySelectorAll('.wc-menuitem.wc-invite.wc-nobutton')[2])) {
					clearInterval(interval1);
					currentStepFinish(function(){document.querySelectorAll('.wc-submenu.wc-submenu-type-tree')[11].querySelectorAll('.wc-menuitem.wc-invite.wc-nobutton')[2].click();});
				}
			},2000);
		},1000);
	}
},1000);