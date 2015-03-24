(function($){
	'use strict';
	
	App.ready(function(){
		$('input.icheck').iCheck({
			checkboxClass: 'icheckbox_square-aero',
			radioClass: 'iradio_square-aero',
			increaseArea: '20%' // optional
		});
	});
	
})(App.jQuery);