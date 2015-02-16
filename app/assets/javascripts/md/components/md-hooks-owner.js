/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 01.07.14
 * Time: 6:05
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/

(function ( EventTarget ) {
    'use strict';

    HooksOwner.extends( EventTarget );

    function HooksOwner() {
        HooksOwner.super( this, 'constructor' );
    }

    HooksOwner.prototype._createHookName = function ( type, commandName ) {
        return type.concat( '_', commandName );
    };

    HooksOwner.prototype.onAfter = function ( commandName ) {
        var args = App.prepareArguments( arguments, 0 );
        return this._on( HooksOwner._after, args );
    };

    HooksOwner.prototype.onBefore = function ( commandName ) {
        var args = App.prepareArguments( arguments, 0 );
        return this._on( HooksOwner._before, args );
    };

    HooksOwner.prototype.offAfter = function ( commandName, fn ) {
        return this._off( HooksOwner._after, commandName, fn );
    };

    HooksOwner.prototype.offBefore = function ( commandName, fn ) {
        return this._off( HooksOwner._before, commandName, fn );
    };

    HooksOwner.prototype.triggerAfter = function ( commandName ) {
        return this._trigger( HooksOwner._after, commandName, App.prepareArguments( arguments, 1 ) );
    };

    HooksOwner.prototype.triggerBefore = function ( commandName ) {
        return this._trigger( HooksOwner._before, commandName, App.prepareArguments( arguments, 1 ) );
    };

    HooksOwner.prototype._on = function ( type, args ) {
        args.unshift( this._createHookName( type, args.shift() ) );
        return HooksOwner.super( this, 'on', args, true );
    };

    HooksOwner.prototype._off = function ( type, commandName, fn ) {
        commandName = this._createHookName( type, commandName );
        return HooksOwner.super( this, 'off', commandName, fn );
    };

    HooksOwner.prototype._trigger = function ( type, commandName, args ) {
        return HooksOwner.super( this, 'trigger',
            this._createHookName( type, commandName ),
            {
                callbackChainHandler: 'forEach',
                args                : args,
                defaultContext      : this
            }
        );
    };

    HooksOwner._after = 'after';
    HooksOwner._before = 'before';

    App.mdClasses.MDHooksOwner = HooksOwner;

})( App.mdClasses.MDEventTarget );