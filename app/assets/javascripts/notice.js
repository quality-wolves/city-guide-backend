(function(){
	App.ready(function(){
		toastr.options = {
			"closeButton": true,
			"debug":false,
			"positionClass": "toast-top-left",
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
		if($("#notice").length)toastr.success($("#notice").text())
		if($("#alert").length)toastr.info($("#alert").text())
		if($("#error").length)toastr.error($("#error").text())
	})
})();