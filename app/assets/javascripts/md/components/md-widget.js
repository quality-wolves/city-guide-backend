/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 01.07.14
 * Time: 7:09
 * To change this template use File | Settings | File Templates.
 */
/*jsHin*/
/*global App*/
(function ( $ ) {
    'use strict';

    function Widget( jQ, options ) {
        this.$ = jQ;
        this.options = App.extend( true, {}, this.constructor._defaultOptions, jQ.data(), options || {} );
    }

    Widget._defaultOptions = {};

    Widget._setDefaultOptions = function ( options ) {
        this._defaultOptions = App.extend( true, {}, this._super._defaultOptions, options );
    };

    App.mdWidgets.MDWidget = Widget;
})( App.jQuery );