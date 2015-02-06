/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 16.09.14
 * Time: 19:29
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/
(function ( ) {
    'use strict';
    var componentForm = {
            street_number              : 'short_name',
            route                      : 'long_name',
            locality                   : 'long_name',
            administrative_area_level_1: 'short_name',
            country                    : 'long_name',
            postal_code                : 'short_name'
        },
        geometryComponents = ['lat', 'lng'],
        api = App.google.maps;

    AutocompleteInput.extends( App.widgets.MDWidget );

    function AutocompleteInput( jQ, options ) {
        AutocompleteInput.super( this, 'constructor', jQ, options );

        this.autocomplete = new api.places.Autocomplete(
            this.$.get( 0 ),
            this.options
        );

        this.getComponents();

        api.event.addListener( this.autocomplete, 'place_changed', function () {
            this.fillInAddress();
        }.bind( this ) );
    }

    AutocompleteInput._setDefaultOptions( {
        types: ['geocode']
    } );

    AutocompleteInput.prototype.getComponents = function () {
        var components = this.options.components;
        var key;
        for ( key in componentForm ) {
            if ( components[key + 'Selector'] ) {
                components[key] = this.$.siblings( components[key + 'Selector'] );
                delete components[(key + 'Selector')];
            }
        }
        for ( key in geometryComponents ) {
            key = geometryComponents[key];
            if ( components[key + 'Selector'] ) {
                components[key] = this.$.siblings( components[key + 'Selector'] );
                delete components[(key + 'Selector')];
            }
        }
        this.components = components;
    };

    AutocompleteInput.prototype.fillInAddress = function ( ) {
        var place = this.autocomplete.getPlace(), i;

        for ( i = 0; i < place.address_components.length; i++ ) {
            var addressType = place.address_components[i].types[0];
            if ( this.components[addressType] ) {
                var val = place.address_components[i][componentForm[addressType]];
                this.components[addressType].val( val );
            }
        }
        for ( i in geometryComponents ) {
            i = geometryComponents[i];
            if ( this.components[i] ) {
                this.components[i].val( place.geometry.location[i]() );
            }
        }
        this.trigger();
    };

    AutocompleteInput.prototype.trigger = function(){
        for ( var i in this.components ) {
            this.components[i].trigger( 'change' );
        }
        this.$.trigger( 'change' );
    };

    App.widgets.AutocompleteInput = AutocompleteInput;
})( );

(function($){
    $.mdAutocompleteAddress = $.createPlugin({
        baseClass               : App.widgets.AutocompleteInput,
        targetSelector          : '.md-autocomplete-location',
        name                    : 'mdAutocompleteAddress',
        dataKey                 : 'md-autocomplete-address',
    });
})(App.jQuery);