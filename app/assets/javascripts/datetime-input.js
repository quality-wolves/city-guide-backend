(function($){
	'use strict';
	
	App.ready(function(){

		var datePicker = $('.date-picker');

		if( datePicker.val() ){
			datePicker.datepicker( 'update', new App.Date( datePicker.val() ) );
		} else {
			datePicker.datepicker( 'update', new App.Date() );
		}

	});
	
})(App.jQuery);