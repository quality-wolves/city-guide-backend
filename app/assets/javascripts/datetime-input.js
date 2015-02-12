(function($){
	'use strict';
	
	App.ready(function(){
		var datetime = new App.Date(),settings = {
	    autoclose: true,
	    showSeconds: true,
	    minuteStep: 1
	  };

		$('.datetime-picker').datetimepicker( settings );
		$('.date-picker').datepicker( settings );

	});
	
})(App.jQuery);