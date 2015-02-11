(function($){
	'use strict';

	$.createPlugin({
        baseClass               : function (jQ,options){
            App.mdPlugins.geolocationMapController.settings.baseClass.super( this, 'constructor', jQ, options );
        	this.map = new App.mdWidgets.GMap(this.$);
        	App.setTimeout( function (self) {
                console.log(self.map);
        		self.autocomplete = new App.mdWidgets.AutocompleteInput(self.map.$searchInput.find('.form-control'));
        	}, 550, this);
        }.extends( App.getWidgetsOfAlias('MDWidget') ),
        targetSelector          : '.map-wrapper',
        name                    : 'geolocationMapController',
        dataKey                 : 'geolocationMap',
        onAfterGetCurrentPosition : function ( position ) {
            this.setCenter( new google.maps.LatLng( position.coords.latitude, position.coords.longitude ) );
        },
        onFailGetCurrentPosition:function(){
        	alert();
        }
    });

    App.mdPlugins.geolocationMapController.onAfterCommand( 'create', function ( widget, options ) {
        // widget.$.on( 'change-center', this.onAfterSetCenter );
        // widget.listenMap( 'idle', this.lazyCompaniesSort );
        // this.renderCity( widget );
        App.geolocation.getCurrentPosition(
            new App.mdClasses.MDCallback( true, this.onAfterGetCurrentPosition, widget.map ),
            new App.mdClasses.MDCallback( true, this.onFailGetCurrentPosition, widget.map )
        );
    } );

})(App.jQuery);