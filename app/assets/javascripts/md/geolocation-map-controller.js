(function($){
	'use strict';

	$.createPlugin({
        baseClass               : function (jQ,options){
            App.mdPlugins.geolocationMapController.settings.baseClass.super( this, 'constructor', jQ, options );
            this.$address = jQ.find('[name*="address"]');
            this.$streetNumber = jQ.find('[role="street_number"]');
            this.$route = jQ.find('[role="route"]');
        }.extends( App.getWidgetsOfAlias('MDWidget') ),
        targetSelector          : '.map-wrapper',
        name                    : 'geolocationMapController',
        dataKey                 : 'geolocationMap',
        initStartPoint:function(){
            this.updateMarker(this.map.options.center);
            this.map.geocode( {location: this.map.options.center}, this.onAfterGocode );
        }
    });

    App.mdPlugins.geolocationMapController.onAfterCommand( 'create', function ( widget, options ) {
        if(!widget.options.center){
            widget.$.data('center',App.jsonEncode(["41.3850639","2.1734034999999494"]));
        }
        widget.
            initCallbacks().
            initMap().
            initAutocomplete().
            initAddressInput();
        widget.map.onReady(new App.mdClasses.MDCallback(true, this.initStartPoint, widget));
    } );

})(App.jQuery);

(function( prototype ){

    prototype.initCallbacks = function(){
        this.onAfterGocode = new App.mdClasses.MDCallback( true, this.onAfterGocode, this );
        this.onMarkerDragEnd = new App.mdClasses.MDCallback( true, this.onMarkerDragEnd, this );
        this.onChangeAddress = this.onChangeAddress.bind(this);
        return this;
    };

    prototype.initMap = function(){
        this.map = new App.mdWidgets.GMap(this.$);
        this.map.listenMap('click', this.onClickMap, this );
        return this;
    };

    prototype.initAutocomplete = function(){
        this.map.onReady(new App.mdClasses.MDCallback(true, this._initAutocomplete, this));
        return this;
    };

    prototype.initAddressInput = function(){
        this.$streetNumber.on('change',{widget:this},this.onChangeAddressComponent);
        this.$route.on('change',{widget:this},this.onChangeAddressComponent);
        this.initAddressDeffered();
    }

    prototype.initAddressDeffered = function(){
        this.$route.deffered = jQuery.Deferred();
        this.$streetNumber.deffered = jQuery.Deferred();
        this.$address.promise = $.when(
                this.$route.deffered,
                this.$streetNumber.deffered
            ).then( 
                this.onChangeAddress
            );
    };

    prototype.onChangeAddressComponent = function(e){
        var widget = e.data.widget, 
            $route = widget.$route,
            $streetNumber = widget.$streetNumber;
        if(this === $route.get(0)){
            $route.deffered.resolve(e);
        }else{
            $streetNumber.deffered.resolve(e);
        }
    };

    prototype.onChangeAddress = function(e){
        this.$address.val(this.$route.val() +' '+this.$streetNumber.val());
        this.initAddressDeffered();
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

    prototype._initAutocomplete = function(){
        this.autocomplete = new App.mdWidgets.AutocompleteInput(this.map.$searchInput.find('.form-control'));
        this.autocomplete.$.on('place_changed',{self:this},this.onPlaceChanged);
    };

})( App.mdPlugins.geolocationMapController.settings.baseClass.prototype );