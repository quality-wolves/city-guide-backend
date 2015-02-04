/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 26.05.14
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/
/**
 * @class
 * @memberOf {App.classes}
 * */
(function () {
    'use strict';

    /**
     * @constructor
     * @this {App.classes.MDCallback}
     * @param [isUsageContext] {Boolean}
     * @param fn {Function}
     * @param [args] {Array}
     * @param [context] {Object}
     * */
    function Callback( isUsageContext, fn, args, context ) {
        if ( arguments.length === 1 && App.isArray( arguments[0] ) ) {
            this._parseArgs( arguments[0] );
        } else {
            this._parseArgs( arguments );
        }
    }

    /**
     * @field
     * @fieldOf {App.classes.MDCallback.prototype}
     * @type Function*/
    Callback.prototype.fn = null;
    /**
     * @field
     * @fieldOf {App.classes.MDCallback.prototype}
     * @type Array*/
    Callback.prototype.fnArgs = null;
    /**
     * @field
     * @fieldOf {App.classes.MDCallback.prototype}
     * @type Object*/
    Callback.prototype.context = null;

    /**
     * @memberOf {App.classes.MDCallback.prototype}
     * @this {App.classes.MDCallback}
     * @protected
     * @param args {Array}
     * */
    Callback.prototype._parseArgs = function ( args ) {
        args = App.prepareArguments( args );
        var fnIndex = 0;
        if ( args[0] === true ) {
            fnIndex = 1;
        }
        this.fn = args[fnIndex];
        this.fnArgs = args.slice( fnIndex + 1, args.length - fnIndex );
        this.context = fnIndex ? args.pop() : null;
        this.fn.callback = this;
    };

    /**
     * @memberOf {App.classes.MDCallback.prototype}
     * @this {App.classes.MDCallback}
     * @param settings {Object}
     * */
    Callback.prototype.exec = function ( settings ) {
        var result ,
            oldContext = this.context;
        if ( !(!settings && ((result = this.fn.apply( this.context, this.fnArgs )) || true)) ) {
            if ( App.isArray( settings.args ) ) {
                this.fnArgs = this.fnArgs.concat( settings.args );
            } else {
                this.fnArgs.args.push( settings.args );
            }
            this.context = settings.context || this.context || settings.defaultContext;
            result = this.fn.apply( this.context, this.fnArgs );
            if ( App.isArray( settings.args ) ) {
                this.fnArgs = this.fnArgs.slice( 0, -settings.args.length );
            } else {
                this.fnArgs.pop();
            }
            this.context = oldContext;
        }
        return result;
    };

    /**
     * @memberOf {App.classes.MDCallback.prototype}
     * @this {App.classes.MDCallback}
     * */
    Callback.prototype.destroy = function () {
        delete this.fn.callback;
        delete this.fnArgs;
        delete this.context;
        delete this.fn;
    };

    App.classes.MDCallback = Callback;
})();