/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 12.05.14
 * Time: 15:20
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/

(function () {
    'use strict';

    App.Function.super = function ( children, methodName ) {
        var args = arguments,
            parent = this._super.prototype,
            method = parent[methodName];

        if ( !method || !App.isFunction( method ) ) {
            throw new Error( this._super.prototype.constructor.name.concat( '.', methodName, '() is not exists' ) );
        }

        if ( args.length === 4 && args[3] === true && Array.isArray( args[2] ) ) {
            args = arguments[2];
        } else {
            args = Array.prototype.slice.call( args, 2 );
        }

        return method.apply( children, args );
    };

    App.Function._super = null;

    function _extends( children, parent ) {
        function Constructor() {
            this.constructor = children;
        }

        Constructor.prototype = parent.prototype;
        children.prototype = new Constructor();

        children.super = App.Function.super;
        children._super = parent;

        return children;
    }

    App.Function.prototype.extends = function ( parent ) {
        for ( var key in parent ) {
            if ( !this[key] ) {
                this[key] = parent[key];
            }
        }
        return _extends( this, parent );
    };

})();