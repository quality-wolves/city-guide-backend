/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 23.06.14
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/
(function ( $, Plugin ) {
    'use strict';
    var afterReady = new App.classes.MDCallbackChain();

    /**
     * @param pluginSettings {App.Object}
     * @return {Plugin.manager}
     * */
    $.createPlugin = function ( pluginSettings ) {

        ['baseClass', 'name', 'dataKey'].forEach( function ( item ) {
            if ( !pluginSettings[item] ) {
                throw new App.Error( 'mdPlugin.'.concat( item, ' is not defined' ) );
            }
        } );

        if ( $[pluginSettings.name] ) {
            throw new App.Error( 'Plugin "'.concat( pluginSettings.name, '" is exists' ) );
        }

        var plugin = new Plugin( pluginSettings );
        $.fn[pluginSettings.name] = plugin.createFn( $ );
        $[pluginSettings.name] = plugin.createManager();

        pluginSettings.afterReady = pluginSettings.afterReady ||
                                    pluginSettings.targetSelector &&
                                    function () {
                                        console.log(pluginSettings.name,pluginSettings.targetSelector);
                                        $.fn[pluginSettings.name].call( $( pluginSettings.targetSelector ) );
                                    };
        if ( pluginSettings.afterReady ) {
            afterReady.push( pluginSettings.afterReady );
        }

        return $[pluginSettings.name];
    };

    $( App.document ).ready( function () {
        afterReady.exec( false ).clear();
    } );

})( App.jQuery, (function () {
        'use strict';

        Plugin.extends( App.classes.MDHooksOwner );

        /**
         * @class Plugin
         * @property manager {App.Object}
         * @property fn {App.Function}
         * */
        function Plugin( pluginSettings ) {
            Plugin.super( this, 'constructor' );
            this.pluginSettings = pluginSettings;
        }

        Plugin.prototype.createWidget = function ( jQ, options ) {
            return new this.pluginSettings.baseClass( jQ, options );
        };

        Plugin.prototype.createFn = function ( $ ) {
            var self = this;

            self.fn = function () {
                if ( !this.length ) {
                    return this;
                }
                if ( this.length > 1 ) {
                    var args = App.prepareArguments( arguments );
                    //FIXME: use jquery.map polyfill
                    return this.map( function () {
                        return self.fn.apply( $( this ), args );
                    } );
                }
                var command;
                var options;
                var object = this.data( self.pluginSettings.dataKey );

                if ( typeof arguments[0] === 'string' ) {
                    command = arguments[0];
                    options = App.prepareArguments( arguments, 1 );
                } else {
                    options = arguments[0];
                }

                if ( !object ) {
                    var createOptions = (command && {}) || (options || {});
                    self.triggerBefore( 'create', createOptions );
                    object = self.createWidget( this, createOptions );
                    self.triggerAfter( 'create', object, createOptions );
                    $.data( this.get( 0 ), self.pluginSettings.dataKey, object );
                }

                if ( $.isFunction( object[command] ) ) {
                    self.triggerBefore( command, object, options );
                    var result = object[command].apply( object, options );
                    self.triggerAfter( command, object, options );
                    return result || this;
                }
                return this;
            };

            return self.fn;
        };

        Plugin.prototype.createManager = function () {
            var self = this;

            self.manager = self.manager || {
                onAfterCommand  : function ( command, fn ) {
                    return self.onAfter.apply( self, App.prepareArguments( arguments ) );
                },
                onBeforeCommand : function ( command, fn ) {
                    return self.onBefore.apply( self, App.prepareArguments( arguments ) );
                },
                offAfterCommand : function ( command, fn ) {
                    return self.offAfter.apply( self, App.prepareArguments( arguments ) );
                },
                offBeforeCommand: function ( command, fn ) {
                    return self.offBefore.apply( self, App.prepareArguments( arguments ) );
                },
                createWidget    : function ( jQ, options ) {
                    return self.createWidget( jQ, options );
                },
                settings        : self.pluginSettings
            };

            return self.manager;
        };

        Plugin.prototype._trigger = function ( type, commandName, args ) {
            return App.classes.MDHooksOwner.super(
                this,
                'trigger',
                this._createHookName( type, commandName ),
                {
                    callbackChainHandler: 'forEach',
                    args                : args,
                    defaultContext      : this.pluginSettings
                }
            );
        };

        return Plugin;
    })() );