/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 10.09.14
 * Time: 15:51
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/
(function () {
    'use strict';

    var geolocation = App.navigator.geolocation || {
        clearWatch        : new App.Function(),
        getCurrentPosition: function ( success, fail ) {
            fail( App.UNDEFINED );
        },
        watchPosition     : function ( success, fail ) {
            fail( App.UNDEFINED );
        }
    };

    App.geolocation = {
        options           : {maximumAge: 0, timeout: 5000, enableHighAccuracy: false},
        isSupported       : App.navigator.geolocation !== App.UNDEFINED,
        clearWatch        : function ( watchId ) {
            geolocation.clearWatch( watchId );
        },
        /**
         * @param success {App.mdClasses.MDCallback}
         * @param fail {App.mdClasses.MDCallback}
         * */
        getCurrentPosition: function ( success, fail ) {
            geolocation.getCurrentPosition(
                function ( position ) {
                    App.geolocation.position = position;
                    success && (success.fnArgs = [position]) && success.exec();
                },
                function ( error ) {
                    fail && (fail.fnArgs = [error]) && fail.exec();
                },
                this.options
            );
        },
        /**
         * @param success {App.mdClasses.MDCallback}
         * @param fail {App.mdClasses.MDCallback}
         * */
        watchPosition     : function ( success, fail ) {
            return geolocation.watchPosition(
                function ( position ) {
                    success && (success.fnArgs = [position]) && success.exec();
                },
                function ( error ) {
                    fail && (fail.fnArgs = [error]) && fail.exec();
                },
                this.options
            );
        }
    };
})();