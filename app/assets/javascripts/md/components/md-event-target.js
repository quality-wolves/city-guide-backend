/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 01.07.14
 * Time: 5:57
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/

(function ( CallbackChain ) {
    'use strict';

    function EventTarget() {
        this.events = {};
    }

    EventTarget.prototype.on = function ( eventName ) {
        if ( !this.events[eventName] ) {
            this.events[eventName] = new CallbackChain();
        }
        this.events[eventName].push( App.prepareArguments( arguments, 1 ) );
        return this;
    };

    EventTarget.prototype.off = function ( eventName, fn ) {
        if ( !this.events[eventName] ) {
            return this;
        }
        this.events[eventName].unset( fn );
    };

    EventTarget.prototype.trigger = function ( eventName, options ) {
        if ( !this.events[eventName] ) {
            return;
        }
        this.events[eventName].exec( options || false );
    };

    App.classes.MDEventTarget = EventTarget;

})( App.classes.MDCallbackChain );