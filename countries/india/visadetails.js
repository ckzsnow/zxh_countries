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
function fillRefInfos(){
	document.querySelector('#nameofsponsor_ind').value=data.nameofsponsor_ind;
	document.querySelector('#add1ofsponsor_ind').value=data.add1ofsponsor_ind;
	document.querySelector('#add2ofsponsor_ind').value=data.add2ofsponsor_ind;
	document.querySelector('#phoneofsponsor_ind').value=data.phoneofsponsor_ind;
	document.querySelector('#nameofsponsor_msn').value=data.nameofsponsor_msn;
	document.querySelector('#add1ofsponsor_msn').value=data.add1ofsponsor_msn;
	document.querySelector('#add2ofsponsor_msn').value=data.add2ofsponsor_msn;
	document.querySelector('#phoneofsponsor_msn').value=data.phoneofsponsor_msn;
	setTimeout(function(){
		currentStepFinish(function(){document.querySelector('#continue').click();});
	}, 3000);
}
function fillOtherInfo(){
	document.querySelector('#country_visited').value=data.country_visited;
	document.querySelector('#saarc_flag2').click();
	setTimeout(function(){fillRefInfos();}, 3000);
}
function fillPreVisaDetail(){
	if(data.old_visa_flag1.toUpperCase() == 'YES'){
		document.querySelector('#old_visa_flag1').click();
		document.querySelector('#prv_visit_add1').value=data.prv_visit_add1;
		document.querySelector('#prv_visit_add2').value=data.prv_visit_add2;
		document.querySelector('#prv_visit_add3').value=data.prv_visit_add3;
		document.querySelector('#visited_city').value=data.visited_city;
		document.querySelector('#old_visa_no').value=data.old_visa_no;
		var interval = setInterval(function(){
			if(document.querySelector('#old_visa_type_id') != null && document.querySelector('#old_visa_type_id').querySelector('option[value=\"'+data.old_visa_type_id+'\"]') != null){
				clearInterval(interval);
				document.querySelector('#old_visa_type_id').querySelector('option[value=\"'+data.old_visa_type_id+'\"]').selected=true;
				document.querySelector('#oldvisaissueplace').value=data.oldvisaissueplace;
				document.querySelector('#oldvisaissuedate').value=data.oldvisaissuedate;
				if(data.refuse_flag1.toUpperCase() == 'YES'){
					document.querySelector('#refuse_flag1').click();
					document.querySelector('#refuse_details').value=data.refuse_details;
				} else {
					document.querySelector('#refuse_flag2').click();
				}
				setTimeout(function(){fillOtherInfo();}, 3000);
			}
		},2000);
	} else {
		document.querySelector('#old_visa_flag2').click();
		document.querySelector('#refuse_flag2').click();
		setTimeout(function(){fillOtherInfo();}, 3000);
	}
}
function fillVisaDetail(){
	document.querySelector('#nameofComp').value=data.nameofComp;
	document.querySelector('#addofComp').value=data.addofComp;
	document.querySelector('#phofComp').value=data.phofComp;
	document.querySelector('#emailofComp').value=data.emailofComp;
	document.querySelector('#duration').value=data.duration;
	var interval = setInterval(function(){
		if(document.querySelector('#visa_entry_id') != null && document.querySelector('#visa_entry_id').querySelector('option[value=\"'+data.visa_entry_id+'\"]') != null){
			clearInterval(interval);
			document.querySelector('#visa_entry_id').querySelector('option[value=\"'+data.visa_entry_id+'\"]').selected=true;
			document.querySelector('#jouryney_id').value=data.jouryney_id_visa_detail;
			document.querySelector('#entrypoint').value=data.entrypoint;
			document.querySelector('#exitpoint').value=data.exitpoint;
			fillPreVisaDetail();
		}
	},2000);
}
var interval = setInterval(function(){
	if(document.querySelector('#phoneofsponsor_msn') != null){
		clearInterval(interval);
		fillVisaDetail();
	}
},2000);