/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 10.09.14
 * Time: 15:01
 * To change this template use File | Settings | File Templates.
 */

/*jsHint*/
/*global App*/
/*global google*/
(function () {
    'use strict';
    var api = google.maps;
    var geocoder = new api.Geocoder();

    GMap.extends( App.mdWidgets.MDWidget );

    function GMap( jQ, options ) {
        GMap.super( this, 'constructor', jQ, options );
        this.createMap();
        this.initCustomControl();
    }

    GMap.prototype.createMap = function ( position ) {
        this.options.center = position ?
            new api.LatLng( position.coords.latitude, position.coords.longitude ) :
            App.newInstanceArgs( api.LatLng, App.isString( this.options.center ) ? App.jsonDecode( this.options.center ) : this.options.center );
        this.options.mapTypeId = api.MapTypeId[this.options.mapTypeId];
        this.map = this.$.find( '.map' );
        this.map = new api.Map( this.map.get( 0 ), this.options );
    };

    GMap.prototype.initCustomControl = function () {
        if ( !this.options.customControls ) {
            return;
        }
        this.options.customControls.forEach( function ( control ) {
            this['$' + control.type] = this.$.find( control.selector );
            this['init' + control.type.capitalize()].call( this, control );
        }, this );
    };

    GMap.prototype.initSearchInput = function ( settings ) {
        var self = this;
        App.setTimeout( function () {
            self.map.controls[api.ControlPosition[settings.position]].push( self.$searchInput.get( 0 ) );
            self.$searchInput.show();
        }, 500 );
    };

    GMap.prototype.initZoom = function ( settings ) {
        var self = this;
        this.$zoom.hide().on( 'click', function ( event ) {
            var currentZoomLevel = self.map.getZoom();
            var $target = $( event.target );
            if ( $target.attr( 'role' ) === 'in' && currentZoomLevel !== 21 ) {
                currentZoomLevel++;
            } else if ( $target.attr( 'role' ) === 'out' && currentZoomLevel !== 0 ) {
                currentZoomLevel--;
            }
            self.map.setZoom( currentZoomLevel );
        } );
        App.setTimeout( function () {
            self.map.controls[api.ControlPosition[settings.position]].push( self.$zoom.get( 0 ) );
            self.$zoom.show();
        }, 500 );
    };

    GMap.prototype.geocode = function ( options, callback ) {
        callback = callback instanceof App.mdClasses.MDCallback ? callback : new App.mdClasses.MDCallback( true, callback, this );
        geocoder.geocode( options, function ( result ) {
            callback.fnArgs = [result];
            callback.exec();
        } );
    };

    GMap.prototype.setMarker = function ( settings, events ) {
        settings.map = this.map;
        var marker = new api.Marker( settings );
        if ( !events ) {
            return marker;
        }
        marker.mdGmap = this;
        for ( var eventName in events ) {
            this.attachEventListener(
                marker,
                eventName,
                events[eventName] instanceof App.mdClasses.MDCallback ? 
                    events[eventName] : 
                    new App.mdClasses.MDCallback( true, events[eventName], marker )
            );
        }
        return marker;
    };

    GMap.prototype.attachEventListener = function ( o, eventName, mdCallback ) {
        api.event.addDomListener( o, eventName, function () {
            mdCallback.fnArgs = App.prepareArguments( arguments );
            return mdCallback.exec();
        } );
    };

    GMap.prototype.parseForm = function ( geocodeResult, form ) {
        var componentName;
        geocodeResult = this.parseGeocodeResult( geocodeResult );
        for ( componentName in this.options.formComponents ) {
            if ( !form[componentName] ) {
                continue;
            }
            form[componentName].val( geocodeResult[componentName] );
        }
    };

    GMap.prototype.parseGeocodeResult = function ( geocodeResult ) {
        var parsed = {};
        geocodeResult.forEach( function ( item ) {
            item.address_components.forEach( this.loop, this.settings );
        }, {
            loop    : function ( item ) {
                this.settings.addressComponents = item;
                item.types.forEach( this.loop, this.settings );
            },
            settings: {
                loop    : function ( item ) {
                    if ( item in this.formComponents && !this.parsed[item] ) {
                        this.parsed[item] = this.addressComponents[this.formComponents[item]];
                    }
                },
                settings: {
                    formComponents: this.formComponents,
                    parsed        : parsed
                }
            }
        } );
        parsed.lat = geocodeResult[0].geometry.location.lat();
        parsed.lng = geocodeResult[0].geometry.location.lng();
        return parsed;
    };

    GMap.prototype.listenMap = function ( eventName, callback, additionnalArgs ) {
        var self = this;
        additionnalArgs = additionnalArgs || [];
        if( !App.isArray( additionnalArgs ) ){
            additionnalArgs = [ additionnalArgs ];
        }
        api.event.addListener( this.map, eventName, function () {
            var args = App.prepareArguments( arguments ) || [];
            args.unshift( self );
            callback.apply( null, args.concat( additionnalArgs ) );
        } );
    };

    GMap.prototype.removeMarkers = function () {
        this.markers && this.markers.forEach( function ( marker ) {
            marker.setMap( null );
        } );
        this.markers = [];
    };

    GMap.prototype.setMarkers = function ( dataSet, markerOptions ) {
        var fn = function ( markerData ) {
            return markerData.marker = new api.Marker( App.extend( markerOptions, {
                map     : this,
                position: new api.LatLng( markerData.lat, markerData.lng )
            } ) );
        };
        if ( App.isArray( dataSet ) ) {
            return dataSet.map( fn, this.map );
        }
        return fn.call( this.map, dataSet );
    };

    GMap.prototype.showPopUp = function () {
        var citySelect = App.jQuery( this.options.citySelectPopUpTarget );
        citySelect.mdMDModalWindow( 'show' ).mdMDModalWindow( 'lock' );
        var callback = new App.mdClasses.MDCallback( true, function ( city ) {
            var self = this;
            geocoder.geocode( {'address': city}, function ( result ) {
                self.setCenter( result[0].geometry.location );
            } );
        }, this );
        citySelect.find( '.md-simple-select' ).on( 'change', function () {
            callback.fnArgs = [$( this ).val()];
            callback.exec();
        } );
    };

    GMap.prototype.setCenter = function ( latLng ) {
        this.map.setCenter( latLng );
        this.$.trigger( 'change-center', [latLng] );
    };

    GMap._setDefaultOptions( {
        customControls    : null,
        scrollwheel       : false,
        zoom              : 16,
        center            : [0, 0],
        mapTypeId         : 'ROADMAP',
        mapTypeControl    : false,
        panControl        : false,
        streetViewControl : false,
        zoomControl       : false,
        zoomControlOptions: {
            style   : api.ZoomControlStyle.SMALL,
            position: api.ControlPosition.TOP_LEFT
        },
        formComponents    : {
            street_number              : 'short_name',
            route                      : 'long_name',
            locality                   : 'long_name',
            administrative_area_level_1: 'short_name',
            country                    : 'long_name',
            postal_code                : 'short_name'
        }
    } );

    App.mdWidgets.GMap = GMap;

})();