/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 01.07.14
 * Time: 5:55
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/

(function ( ) {
    'use strict';

    CallbackChain.extends( Array );

    function CallbackChain() {
        CallbackChain.super( this, 'constructor' );
        this.slice.call( arguments ).forEach( function ( item ) {
            this.push( this._createItem( item ) );
        }.bind( this ) );
    }

    CallbackChain.prototype.exec = function ( breakOnFail ) {
        var fn = 'every', settings = null;
        if ( breakOnFail === false ) {
            fn = 'forEach';
        } else if ( breakOnFail !== true ) {
            settings = breakOnFail;
            fn = settings.callbackChainHandler || fn;
            if ( settings.callbackChainHandler ) {
                delete settings.callbackChainHandler;
            }
        }

        this[fn]( function ( callback ) {
            return callback.exec( settings );
        } );
        return this;
    };

    CallbackChain.prototype._createItem = function ( args ) {
        return new App.mdClasses.MDCallback( args.length == 1 ? args[0] : args );
    };

    CallbackChain.prototype.push = function () {
        CallbackChain.super( this, 'push', this._createItem( arguments ) );
        return this;
    };

    CallbackChain.prototype.unset = function ( fn ) {
        this.splice( this.indexOf( fn.callback ), 1 );
        return this;
    };

    CallbackChain.prototype.clear = function () {
        this.forEach( function ( callback ) {
            callback.destroy();
        } );
        this.length = 0;
        return this;
    };

    App.mdClasses.MDCallbackChain = CallbackChain;

})( );