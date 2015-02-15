(function($){
	'use strict';

	$.createPlugin({
        baseClass               : function (jQ,options){
            App.mdPlugins.geolocationMapController.settings.baseClass.super( this, 'constructor', jQ, options );
        }.extends( App.getWidgetsOfAlias('MDWidget') ),
        targetSelector          : '.map-wrapper',
        name                    : 'geolocationMapController',
        dataKey                 : 'geolocationMap',
        initStartPoint:function(widget){
            widget.updateMarker(widget.map.options.center);
            widget.map.geocode( {location: widget.map.options.center}, widget.onAfterGocode );
        }
    });

    App.mdPlugins.geolocationMapController.onAfterCommand( 'create', function ( widget, options ) {
        if(!widget.options.center){
            widget.$.data('center',App.jsonEncode(["41.3850639","2.1734034999999494"]));
        }
        widget.
            initCallbacks().
            initMap().
            initAutocomplete();
        App.setTimeout(this.initStartPoint,500,widget);
    } );

})(App.jQuery);

(function( prototype ){

    prototype.initCallbacks = function(){
        this.onAfterGocode = new App.mdClasses.MDCallback( true, this.onAfterGocode, this );
        this.onMarkerDragEnd = new App.mdClasses.MDCallback( true, this.onMarkerDragEnd, this );
        return this;
    };

    prototype.initMap = function(){
        this.map = new App.mdWidgets.GMap(this.$);
        this.map.listenMap('click', this.onClickMap, this );
        return this;
    };

    prototype.initAutocomplete = function(){
        App.setTimeout( function (self) {
            self.autocomplete = new App.mdWidgets.AutocompleteInput(self.map.$searchInput.find('.form-control'));
            self.autocomplete.$.on('place_changed',{self:self},self.onPlaceChanged);
        }, 550, this);
        return this;
    };

    prototype.updateMarker = function( latLng ){
        this.marker = this.marker || this.map.setMarker({
            position: latLng,
            draggable: true
        },{
            dragend: this.onMarkerDragEnd
        });
        this.marker.setPosition(latLng)
        this.map.setCenter(latLng);
    };
    
    prototype.onMarkerDragEnd = function( e ){
        this.map.geocode( {location: e.latLng}, this.onAfterGocode );
    };

    prototype.onPlaceChanged = function( e ){
        var self = e.data.self;
        self.updateMarker( self.autocomplete.getLocation() );
    };

    prototype.onClickMap = function( map, e, controller ){
        controller.updateMarker( e.latLng );
        controller.map.geocode( {location: e.latLng}, controller.onAfterGocode );
    };

    prototype.onAfterGocode = function( result ){
        this.autocomplete.setPlace(result[0]);
    };

})( App.mdPlugins.geolocationMapController.settings.baseClass.prototype );