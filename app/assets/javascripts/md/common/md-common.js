/**
 * Created with JetBrains PhpStorm.
 * User: egor
 * Date: 01.07.14
 * Time: 5:44
 * To change this template use File | Settings | File Templates.
 */
/*jsHint*/
/*global App*/

(function ( undefined ) {
    'use strict';

    App.prepareArguments = function ( args, start, end ) {
        return args.length ? App.Array.prototype.slice.call( args, start, end ) : undefined;
    };

    App.isAvailableFileAPI = function () {
        return App.File && App.FileReader && App.FileList && App.Blob && true;
    };

    App.newInstanceArgs = function ( Class, args ) {
        (args = App.prepareArguments( args )).unshift( Class );
        return new (Class.bind.apply( Class, args ))();
    };

    App.UNDEFINED = undefined;

})();

(function ( $, makeValidator, undefined ) {
    'use strict';

    App.isUndefined = makeValidator( undefined );

    App.isNull = makeValidator( null );

    App.isObject = makeValidator( App.Object );

    App.isArray = $ ? $.isArray : App.Array.isArray;

    App.isString = makeValidator( App.String );

    App.isFunction = $ ? $.isFunction : makeValidator( App.Function );

    App.isBoolean = makeValidator( App.Boolean );

    App.isNumeric = makeValidator( App.Number );

    App.isDate = makeValidator( App.Date );

    App.isError = makeValidator( App.Error );

    App.isRegExp = makeValidator( App.RegExp );

})( App.jQuery, (function ( $, undefined ) {
        'use strict';
        if ( $ ) {
            return function ( ObjectConstructor ) {
                var validType;
                if ( ObjectConstructor === undefined ) {
                    validType = 'undefined';
                } else if ( ObjectConstructor === null ) {
                    validType = 'null';
                } else if ( ObjectConstructor === App.Date ) {
                    validType = 'date';
                } else if ( ObjectConstructor === App.Error ) {
                    validType = 'error';
                } else if ( ObjectConstructor === App.RegExp ) {
                    validType = 'regexp';
                } else {
                    validType = ObjectConstructor.name.toLowerCase();
                }

                return function ( expression ) {
                    return $.type( expression ) === validType;
                };
            };

        }
        return function ( ObjectConstructor ) {
            var validator;
            if ( ObjectConstructor === undefined ) {
                validator = function ( expression ) {
                    return expression === undefined;
                };
            } else if ( ObjectConstructor === null ) {
                validator = function ( expression ) {
                    return expression === null;
                };
            } else if ( ObjectConstructor === App.Date || ObjectConstructor === App.Error || ObjectConstructor === App.RegExp ) {
                validator = function ( expression ) {
                    return !App.isNull( expression ) &&
                           App.isObject( expression ) &&
                           ObjectConstructor.prototype.isPrototypeOf( expression );
                };
            } else {
                validator = function ( expression ) {
                    return typeof expression === validator.validType;
                };

                validator.validType = typeof (new ObjectConstructor());
            }
            return validator;
        };
    })( App.jQuery ) );

(function(){
    App.isEmpty = function ( variable ) {
        return variable ? true : false;
    };
    App.isNotEmpty = function ( variable ) {
        return variable ? false : true;
    };
})();

(function ( $ ) {
    'use strict';
    App.isPlainObject = $ ? $.isPlainObject : function ( o ) {
        var key;

        if ( !o || !App.isObject( o ) || o.nodeType || o.window == o ) {
            return false;
        }

        try {
            if ( o.constructor && !App.Object.hasOwnProperty.call( o, 'constructor' ) && !App.Object.hasOwnProperty.call( o.constructor.prototype, 'isPrototypeOf' ) ) {
                return false;
            }
        } catch ( e ) {
            return false;
        }

        for ( key in o ) {
            return App.Object.hasOwnProperty.call( o, key );
        }

        return App.isUndefined( key ) || App.Object.hasOwnProperty.call( o, key );
    };

    App.extend = $ && $.extend || function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if ( App.isBoolean( target ) ) {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }

        if ( !App.isObject( target ) && !App.isFunction( target ) ) {
            target = {};
        }

        if ( length === i ) {
            target = this;
            --i;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( App.isPlainObject( copy ) || (copyIsArray = App.isArray( copy )) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && App.isArray( src ) ? src : [];

                        } else {
                            clone = src && App.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = App.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    App.jsonEncode = App.JSON.stringify;
    App.jsonDecode = App.JSON.parse;

})( App.jQuery );

(function () {
    'use strict';

    App.String.prototype.capitalize = function () {
        if ( !this.length ) {
            return '';
        }
        return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
    };

    App.concat = App.String.prototype.concat.bind( '' );

})();

(function () {
    'use strict';

    App.getEntityOfAlias = function ( base, alias ) {
        if ( !alias ) {
            throw new App.Error( App.concat( base, ' with alias ', alias, ' is not exists' ) );
        }
        base = App[base];
        alias = alias.split( '.' );
        for ( var i = 0, aliasChunk; i < alias.length && (aliasChunk = alias[i]); i++ ) {
            base = base[aliasChunk];
        }
        return base;
    };

    App.setEntityOfAlias = function ( base, alias, entity ) {
        if ( !App[base] ) {
            App[base] = {};
        }
        if ( App[base][alias] ) {
            throw new App.Error( App.concat( base, ' with alias "', alias, '" is exists' ) );
        }
        App[base][alias] = entity;
        return entity;
    };

    App.Object.defineProperty( App, 'entities', {
        enumerable  : true,
        writable    : false,
        configurable: false,
        value       : ['widgets', 'classes', 'helpers', 'callbacks', 'plugins','singleton']
    } );

    App.entities.forEach( function ( item ) {
        this[item] = {};
        this[App.concat( 'get', item.capitalize(), 'OfAlias' )] = this.getEntityOfAlias.bind( this, item );
        this[App.concat( 'set', item.capitalize(), 'OfAlias' )] = this.setEntityOfAlias.bind( this, item );
    }, App );

})();

(function () {
    'use strict';

    App.pluralizeFormatter = {
        format: function ( number, aliases ) {
            if ( !App.Array.isArray( aliases ) ) {
                aliases = App.Array.prototype.slice.call( arguments, 1 );
            }
            if ( ((number % 10) > 4 && (number % 10) < 10) || (number > 10 && number < 20) ) {
                return aliases[1];
            }
            if ( (number % 10) > 1 && (number % 10) < 5 ) {
                return aliases[2];
            }
            if ( (number % 10) == 1 ) {
                return aliases[0];
            }
            else {
                return aliases[1];
            }
        }
    };
})();

(function () {
    'use strict';

    App.Array.prototype.remove = function remove( value ) {
        var index = this.indexOf( value );
        if ( this.length ) {
            this.splice( index, 1 );
        }
        return this;
    };

})();

(function ( $ ) {
    'use strict';
    App.ajax = $.ajax;//todo: create simple ajax
})( App.jQuery );