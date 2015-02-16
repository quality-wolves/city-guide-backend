(function(toastr){
	'use strict';
	
	App.ready(function(){
		toastr.options = {
			"closeButton": true,
			"debug":false,
			"positionClass": "toast-top-right",
			"onclick": null,
			"showDuration": "1000",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		};
		
		var notice = $("#notice"), alert = $("#alert"), error = $("#error");

		notice.length && toastr.success(notice.text());
		alert.length && toastr.info(alert.text());
		error.length && toastr.error(error.text());

	});

})(toastr);