(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Think of app.js as "table of contents" for JS 

window.addEventListener('load', function(){
    document.querySelector('#navs').classList.add('hide');
    document.querySelector('#grid').classList.add('hide');
    document.querySelector('#game').classList.add('hide');

    start();
    playGame();

});

function setupButtons(model){

    let upBtn = document.querySelector("#move-up");
    let downBtn = document.querySelector("#move-down");
    let leftBtn = document.querySelector("#move-left");
    let rightBtn = document.querySelector("#move-right");
    

    upBtn.addEventListener('click', function (){
        model.moveUp();

    });

    downBtn.addEventListener('click', function (){
        model.moveDown();
    });

    leftBtn.addEventListener('click', function (){
        model.moveLeft();
    });

    rightBtn.addEventListener('click', function (){
        model.moveRight();
    });

}

function setupStart(model){

    let hybridBtn = document.querySelector("#hybrid");
    let guzzlerBtn = document.querySelector("#gas-guzzler");

    hybridBtn.addEventListener('click', function (){

    document.querySelector('#navs').classList.remove('hide');
    document.querySelector('#grid').classList.remove('hide');
    document.querySelector('#cars').classList.add('hide');

    model.car = 'Hybrid';

    });

    guzzlerBtn.addEventListener('click', function (){

    document.querySelector('#navs').classList.remove('hide');
    document.querySelector('#grid').classList.remove('hide');
    document.querySelector('#cars').classList.add('hide');

    model.car = 'Gas Guzzler';

    });
}

function start(){

    let StartView = require('./views/start');
    let StartModel = require('./models/start');

    let start = new StartModel();
    start.car = null;

    let view = new StartView({
        el: document.querySelector('#start'),
        model: start,
    });

    view.render();

    setupStart(start);


}

function playGame(){

    let TaxiView = require('./views/taxi');
    let TaxiModel = require('./models/taxi');

    let taxi = new TaxiModel();
    taxi.x = 9;
    taxi.y = 9;
    taxi.gas = 200;

    let view = new TaxiView({
        el: document.querySelector('#game'),
        model: taxi,
    });

    view.render();

    setupButtons(taxi);

    document.querySelector('#grid').rows[taxi.x].cells[taxi.y].classList.add('highlight');

}
},{"./models/start":2,"./models/taxi":3,"./views/start":4,"./views/taxi":5}],2:[function(require,module,exports){
let State = require('ampersand-state');

module.exports = State.extend({
    props: {
        car: "string",
    },
});
},{"ampersand-state":404}],3:[function(require,module,exports){
let State = require('ampersand-state');


module.exports = State.extend({
    props: {
        x: "number",
        y: "number",
        gas: "number",
    },

    moveUp: function(){
        if(this.x > 0 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.x --;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');

            this.gas = this.gas - 1;
            console.log(model.car);

        }
    },

    moveDown: function(){
        if(this.x < 19 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.x ++;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');
        
            this.gas = this.gas - 1;

        }
    },

    moveLeft: function(){
        if(this.y > 0 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.y --;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');
        
            this.gas = this.gas - 1;

        }
    },

    moveRight: function(){
        if(this.y < 19 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.y ++;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');
        
            this.gas = this.gas - 1;
        }
    },
});
},{"ampersand-state":404}],4:[function(require,module,exports){
let View = require('ampersand-view');

module.exports = View.extend({
    template: document.querySelector('#start-template').innerHTML,
    bindings: {
        'model.car': '.car',
    },

    render: function(){

        this.renderWithTemplate();


    },
});
},{"ampersand-view":623}],5:[function(require,module,exports){
let View = require('ampersand-view');

module.exports = View.extend({
    template: document.querySelector('#taxi-template').innerHTML,
    bindings: {
        'model.x': '.xcord',
        'model.y': '.ycord',
        'model.gas': '.gas',
    },

    render: function(){

        this.renderWithTemplate();
    },
});
},{"ampersand-view":623}],6:[function(require,module,exports){
var assign = require('lodash/assign');

/// Following code is largely pasted from Backbone.js

// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps) {
    var parent = this;
    var child;
    var args = [].slice.call(arguments);

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    assign(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        args.unshift(child.prototype);
        assign.apply(null, args);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};

// Expose the extend function
module.exports = extend;

},{"lodash/assign":42}],7:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":38}],8:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],9:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":19,"./_isIndex":29,"./isArguments":46,"./isArray":47,"./isBuffer":49,"./isTypedArray":54}],10:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":11,"./eq":44}],11:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":24}],12:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":7,"./_getRawTag":27,"./_objectToString":35}],13:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":12,"./isObjectLike":53}],14:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":31,"./_toSource":41,"./isFunction":50,"./isObject":52}],15:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

},{"./_baseGetTag":12,"./isLength":51,"./isObjectLike":53}],16:[function(require,module,exports){
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":32,"./_nativeKeys":33}],17:[function(require,module,exports){
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

},{"./_overRest":37,"./_setToString":39,"./identity":45}],18:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":24,"./constant":43,"./identity":45}],19:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],20:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],21:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    baseAssignValue = require('./_baseAssignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":10,"./_baseAssignValue":11}],22:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":38}],23:[function(require,module,exports){
var baseRest = require('./_baseRest'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_baseRest":17,"./_isIterateeCall":30}],24:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":26}],25:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],26:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":14,"./_getValue":28}],27:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":7}],28:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],29:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],30:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":29,"./eq":44,"./isArrayLike":48,"./isObject":52}],31:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":22}],32:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],33:[function(require,module,exports){
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":36}],34:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":25}],35:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],36:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],37:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":8}],38:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":25}],39:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":18,"./_shortOut":40}],40:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],41:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],42:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    isArrayLike = require('./isArrayLike'),
    isPrototype = require('./_isPrototype'),
    keys = require('./keys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;

},{"./_assignValue":10,"./_copyObject":21,"./_createAssigner":23,"./_isPrototype":32,"./isArrayLike":48,"./keys":55}],43:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],44:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],45:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],46:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":13,"./isObjectLike":53}],47:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],48:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":50,"./isLength":51}],49:[function(require,module,exports){
var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":38,"./stubFalse":56}],50:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":12,"./isObject":52}],51:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],52:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],53:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],54:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":15,"./_baseUnary":20,"./_nodeUtil":34}],55:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":9,"./_baseKeys":16,"./isArrayLike":48}],56:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],57:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-collection-view"] = window.ampersand["ampersand-collection-view"] || [];  window.ampersand["ampersand-collection-view"].push("2.0.2");}
var assign = require('lodash/assign');
var invokeMap = require('lodash/invokeMap');
var pick = require('lodash/pick');
var find = require('lodash/find');
var difference = require('lodash/difference');
var bind = require('lodash/bind');
var Events = require('ampersand-events');
var ampExtend = require('ampersand-class-extend');

// options
var options = ['collection', 'el', 'viewOptions', 'view', 'emptyView', 'filter', 'reverse', 'parent'];


function CollectionView(spec) {
    if (!spec) {
        throw new ReferenceError('Collection view missing required parameters: collection, el');
    }
    if (!spec.collection) {
        throw new ReferenceError('Collection view requires a collection');
    }
    if (!spec.el && !this.insertSelf) {
        throw new ReferenceError('Collection view requires an el');
    }
    assign(this, pick(spec, options));
    this.views = [];
    this.listenTo(this.collection, 'add', this._addViewForModel);
    this.listenTo(this.collection, 'remove', this._removeViewForModel);
    this.listenTo(this.collection, 'sort', this._rerenderAll);
    this.listenTo(this.collection, 'refresh reset', this._reset);
}

assign(CollectionView.prototype, Events, {
    // for view contract compliance
    render: function () {
        this._renderAll();
        return this;
    },
    remove: function () {
        invokeMap(this.views, 'remove');
        this.stopListening();
    },
    _getViewByModel: function (model) {
        return find(this.views, function (view) {
            return model === view.model;
        });
    },
    _createViewForModel: function (model, renderOpts) {
        var defaultViewOptions = {model: model, collection: this.collection, parent: this};
        var view = new this.view(assign(defaultViewOptions, this.viewOptions));
        this.views.push(view);
        view.renderedByParentView = true;
        view.render(renderOpts);
        return view;
    },
    _getOrCreateByModel: function (model, renderOpts) {
        return this._getViewByModel(model) || this._createViewForModel(model, renderOpts);
    },
    _addViewForModel: function (model, collection, options) {
        var matches = this.filter ? this.filter(model) : true;
        if (!matches) {
            return;
        }
        if (this.renderedEmptyView) {
            this._removeView(this.renderedEmptyView);
            delete this.renderedEmptyView;
        }
        var view = this._getOrCreateByModel(model, {containerEl: this.el});
        if (options && options.rerender) {
            this._insertView(view);
        } else {
            this._insertViewAtIndex(view);
        }
    },
    _insertViewAtIndex: function (view) {
        if (!view.insertSelf) {
            var pos = this.collection.indexOf(view.model);
            pos = this.reverse ? pos - 1 : pos + 1;

            var modelToInsertBefore = this.collection.at(pos);

            var viewToInsertBefore = this._getViewByModel(modelToInsertBefore);

            // FIX IE bug (https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore)
            // "In Internet Explorer an undefined value as referenceElement will throw errors, while in rest of the modern browsers, this works fine."
            if (viewToInsertBefore) {
                this.el.insertBefore(view.el, viewToInsertBefore && viewToInsertBefore.el);
            } else {
                this.el.appendChild(view.el);
            }
        }
    },
    _insertView: function (view) {
        if (!view.insertSelf) {
            if (this.reverse && this.el.firstChild) {
                this.el.insertBefore(view.el, this.el.firstChild);
            } else {
                this.el.appendChild(view.el);
            }
        }
    },
    _removeViewForModel: function (model) {
        var view = this._getViewByModel(model);
        if (!view) {
            return;
        }
        var index = this.views.indexOf(view);
        if (index !== -1) {
            // remove it if we found it calling animateRemove
            // to give user option of gracefully destroying.
            view = this.views.splice(index, 1)[0];
            this._removeView(view);
            this._renderEmptyView();
        }
    },
    _removeView: function (view) {
        if (view.animateRemove) {
            view.animateRemove();
        } else {
            view.remove();
        }
    },
    _renderAll: function () {
        this.collection.each(bind(this._addViewForModel, this));
        this._renderEmptyView();
    },
    _rerenderAll: function (collection, options) {
        options = options || {};
        this.collection.each(bind(function (model) {
            this._addViewForModel(model, this, assign(options, {rerender: true}));
        }, this));
    },
    _renderEmptyView: function() {
        if (this.views.length === 0 && this.emptyView && !this.renderedEmptyView) {
            this.renderedEmptyView = new this.emptyView({parent: this});
            this.el.appendChild(this.renderedEmptyView.render().el);
        }
    },
    _reset: function () {
        var newViews = this.collection.map(bind(this._getOrCreateByModel, this));

        //Remove existing views from the ui
        var toRemove = difference(this.views, newViews);
        toRemove.forEach(this._removeView, this);

        //Rerender the full list with the new views
        this.views = newViews;
        this._rerenderAll();
        this._renderEmptyView();
    }
});

CollectionView.extend = ampExtend;

module.exports = CollectionView;

},{"ampersand-class-extend":6,"ampersand-events":327,"lodash/assign":218,"lodash/bind":219,"lodash/difference":221,"lodash/find":223,"lodash/invokeMap":229,"lodash/pick":245}],58:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":152,"./_root":199}],59:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":159,"./_hashDelete":160,"./_hashGet":161,"./_hashHas":162,"./_hashSet":163}],60:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    baseLodash = require('./_baseLodash');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

module.exports = LazyWrapper;

},{"./_baseCreate":84,"./_baseLodash":106}],61:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":174,"./_listCacheDelete":175,"./_listCacheGet":176,"./_listCacheHas":177,"./_listCacheSet":178}],62:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    baseLodash = require('./_baseLodash');

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;

},{"./_baseCreate":84,"./_baseLodash":106}],63:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":152,"./_root":199}],64:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":179,"./_mapCacheDelete":180,"./_mapCacheGet":181,"./_mapCacheHas":182,"./_mapCacheSet":183}],65:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":152,"./_root":199}],66:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":152,"./_root":199}],67:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":64,"./_setCacheAdd":200,"./_setCacheHas":201}],68:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":61,"./_stackClear":207,"./_stackDelete":208,"./_stackGet":209,"./_stackHas":210,"./_stackSet":211}],69:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./_root":199,"dup":7}],70:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":199}],71:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":152,"./_root":199}],72:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],73:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],74:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],75:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":95}],76:[function(require,module,exports){
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],77:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./_baseTimes":118,"./_isIndex":166,"./isArguments":230,"./isArray":231,"./isBuffer":234,"./isTypedArray":240,"dup":9}],78:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],79:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],80:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],81:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./_baseAssignValue":83,"./eq":222,"dup":10}],82:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":222}],83:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./_defineProperty":140,"dup":11}],84:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;

},{"./isObject":237}],85:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./_SetCache":67,"./_arrayIncludes":75,"./_arrayIncludesWith":76,"./_arrayMap":78,"./_baseUnary":120,"./_cacheHas":121}],86:[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./_baseForOwn":90,"./_createBaseEach":130}],87:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],88:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":79,"./_isFlattenable":165}],89:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":131}],90:[function(require,module,exports){
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":89,"./keys":241}],91:[function(require,module,exports){
var castPath = require('./_castPath'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":122,"./_toKey":214}],92:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArray = require('./isArray');

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

},{"./_arrayPush":79,"./isArray":231}],93:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./_Symbol":69,"./_getRawTag":153,"./_objectToString":192,"dup":12}],94:[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

},{}],95:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":87,"./_baseIsNaN":101,"./_strictIndexOf":212}],96:[function(require,module,exports){
var apply = require('./_apply'),
    castPath = require('./_castPath'),
    last = require('./last'),
    parent = require('./_parent'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.invoke` without support for individual
 * method arguments.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} args The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 */
function baseInvoke(object, path, args) {
  path = castPath(path, object);
  object = parent(object, path);
  var func = object == null ? object : object[toKey(last(path))];
  return func == null ? undefined : apply(func, object, args);
}

module.exports = baseInvoke;

},{"./_apply":72,"./_castPath":122,"./_parent":195,"./_toKey":214,"./last":242}],97:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./_baseGetTag":93,"./isObjectLike":238,"dup":13}],98:[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":99,"./isObjectLike":238}],99:[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":68,"./_equalArrays":141,"./_equalByTag":142,"./_equalObjects":143,"./_getTag":155,"./isArray":231,"./isBuffer":234,"./isTypedArray":240}],100:[function(require,module,exports){
var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./_Stack":68,"./_baseIsEqual":98}],101:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],102:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./_isMasked":171,"./_toSource":215,"./isFunction":235,"./isObject":237,"dup":14}],103:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./_baseGetTag":93,"./isLength":236,"./isObjectLike":238,"dup":15}],104:[function(require,module,exports){
var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

},{"./_baseMatches":107,"./_baseMatchesProperty":108,"./identity":228,"./isArray":231,"./property":246}],105:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./_isPrototype":172,"./_nativeKeys":190,"dup":16}],106:[function(require,module,exports){
/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

module.exports = baseLodash;

},{}],107:[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData'),
    matchesStrictComparable = require('./_matchesStrictComparable');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

},{"./_baseIsMatch":100,"./_getMatchData":151,"./_matchesStrictComparable":185}],108:[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn'),
    isKey = require('./_isKey'),
    isStrictComparable = require('./_isStrictComparable'),
    matchesStrictComparable = require('./_matchesStrictComparable'),
    toKey = require('./_toKey');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;

},{"./_baseIsEqual":98,"./_isKey":168,"./_isStrictComparable":173,"./_matchesStrictComparable":185,"./_toKey":214,"./get":226,"./hasIn":227}],109:[function(require,module,exports){
var basePickBy = require('./_basePickBy'),
    hasIn = require('./hasIn');

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;

},{"./_basePickBy":110,"./hasIn":227}],110:[function(require,module,exports){
var baseGet = require('./_baseGet'),
    baseSet = require('./_baseSet'),
    castPath = require('./_castPath');

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;

},{"./_baseGet":91,"./_baseSet":114,"./_castPath":122}],111:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],112:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

},{"./_baseGet":91}],113:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./_overRest":194,"./_setToString":204,"./identity":228,"dup":17}],114:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    castPath = require('./_castPath'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;

},{"./_assignValue":81,"./_castPath":122,"./_isIndex":166,"./_toKey":214,"./isObject":237}],115:[function(require,module,exports){
var identity = require('./identity'),
    metaMap = require('./_metaMap');

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"./_metaMap":188,"./identity":228}],116:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./_defineProperty":140,"./constant":220,"./identity":228,"dup":18}],117:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],118:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],119:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":69,"./_arrayMap":78,"./isArray":231,"./isSymbol":239}],120:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],121:[function(require,module,exports){
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],122:[function(require,module,exports){
var isArray = require('./isArray'),
    isKey = require('./_isKey'),
    stringToPath = require('./_stringToPath'),
    toString = require('./toString');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

},{"./_isKey":168,"./_stringToPath":213,"./isArray":231,"./toString":252}],123:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;

},{}],124:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

module.exports = composeArgsRight;

},{}],125:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],126:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"./_assignValue":81,"./_baseAssignValue":83,"dup":21}],127:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"./_root":199,"dup":22}],128:[function(require,module,exports){
/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}

module.exports = countHolders;

},{}],129:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./_baseRest":113,"./_isIterateeCall":167,"dup":23}],130:[function(require,module,exports){
var isArrayLike = require('./isArrayLike');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isArrayLike":232}],131:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],132:[function(require,module,exports){
var createCtor = require('./_createCtor'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

module.exports = createBind;

},{"./_createCtor":133,"./_root":199}],133:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    isObject = require('./isObject');

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtor;

},{"./_baseCreate":84,"./isObject":237}],134:[function(require,module,exports){
var apply = require('./_apply'),
    createCtor = require('./_createCtor'),
    createHybrid = require('./_createHybrid'),
    createRecurry = require('./_createRecurry'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders'),
    root = require('./_root');

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

module.exports = createCurry;

},{"./_apply":72,"./_createCtor":133,"./_createHybrid":136,"./_createRecurry":138,"./_getHolder":149,"./_replaceHolders":198,"./_root":199}],135:[function(require,module,exports){
var baseIteratee = require('./_baseIteratee'),
    isArrayLike = require('./isArrayLike'),
    keys = require('./keys');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;

},{"./_baseIteratee":104,"./isArrayLike":232,"./keys":241}],136:[function(require,module,exports){
var composeArgs = require('./_composeArgs'),
    composeArgsRight = require('./_composeArgsRight'),
    countHolders = require('./_countHolders'),
    createCtor = require('./_createCtor'),
    createRecurry = require('./_createRecurry'),
    getHolder = require('./_getHolder'),
    reorder = require('./_reorder'),
    replaceHolders = require('./_replaceHolders'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_ARY_FLAG = 128,
    WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG,
      isBind = bitmask & WRAP_BIND_FLAG,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
      isFlip = bitmask & WRAP_FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybrid;

},{"./_composeArgs":123,"./_composeArgsRight":124,"./_countHolders":128,"./_createCtor":133,"./_createRecurry":138,"./_getHolder":149,"./_reorder":197,"./_replaceHolders":198,"./_root":199}],137:[function(require,module,exports){
var apply = require('./_apply'),
    createCtor = require('./_createCtor'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;

},{"./_apply":72,"./_createCtor":133,"./_root":199}],138:[function(require,module,exports){
var isLaziable = require('./_isLaziable'),
    setData = require('./_setData'),
    setWrapToString = require('./_setWrapToString');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
  }
  var newData = [
    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
    newHoldersRight, argPos, ary, arity
  ];

  var result = wrapFunc.apply(undefined, newData);
  if (isLaziable(func)) {
    setData(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

module.exports = createRecurry;

},{"./_isLaziable":170,"./_setData":202,"./_setWrapToString":205}],139:[function(require,module,exports){
var baseSetData = require('./_baseSetData'),
    createBind = require('./_createBind'),
    createCurry = require('./_createCurry'),
    createHybrid = require('./_createHybrid'),
    createPartial = require('./_createPartial'),
    getData = require('./_getData'),
    mergeData = require('./_mergeData'),
    setData = require('./_setData'),
    setWrapToString = require('./_setWrapToString'),
    toInteger = require('./toInteger');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

module.exports = createWrap;

},{"./_baseSetData":115,"./_createBind":132,"./_createCurry":134,"./_createHybrid":136,"./_createPartial":137,"./_getData":147,"./_mergeData":187,"./_setData":202,"./_setWrapToString":205,"./toInteger":250}],140:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./_getNative":152,"dup":24}],141:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arraySome = require('./_arraySome'),
    cacheHas = require('./_cacheHas');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

},{"./_SetCache":67,"./_arraySome":80,"./_cacheHas":121}],142:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    eq = require('./eq'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":69,"./_Uint8Array":70,"./_equalArrays":141,"./_mapToArray":184,"./_setToArray":203,"./eq":222}],143:[function(require,module,exports){
var getAllKeys = require('./_getAllKeys');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

},{"./_getAllKeys":146}],144:[function(require,module,exports){
var flatten = require('./flatten'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;

},{"./_overRest":194,"./_setToString":204,"./flatten":225}],145:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],146:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbols = require('./_getSymbols'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

},{"./_baseGetAllKeys":92,"./_getSymbols":154,"./keys":241}],147:[function(require,module,exports){
var metaMap = require('./_metaMap'),
    noop = require('./noop');

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;

},{"./_metaMap":188,"./noop":244}],148:[function(require,module,exports){
var realNames = require('./_realNames');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

module.exports = getFuncName;

},{"./_realNames":196}],149:[function(require,module,exports){
/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

module.exports = getHolder;

},{}],150:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":169}],151:[function(require,module,exports){
var isStrictComparable = require('./_isStrictComparable'),
    keys = require('./keys');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;

},{"./_isStrictComparable":173,"./keys":241}],152:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./_baseIsNative":102,"./_getValue":156,"dup":26}],153:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./_Symbol":69,"dup":27}],154:[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    stubArray = require('./stubArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;

},{"./_arrayFilter":74,"./stubArray":247}],155:[function(require,module,exports){
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":58,"./_Map":63,"./_Promise":65,"./_Set":66,"./_WeakMap":71,"./_baseGetTag":93,"./_toSource":215}],156:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],157:[function(require,module,exports){
/** Used to match wrap detail comments. */
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

module.exports = getWrapDetails;

},{}],158:[function(require,module,exports){
var castPath = require('./_castPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isLength = require('./isLength'),
    toKey = require('./_toKey');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;

},{"./_castPath":122,"./_isIndex":166,"./_toKey":214,"./isArguments":230,"./isArray":231,"./isLength":236}],159:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":189}],160:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],161:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":189}],162:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":189}],163:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":189}],164:[function(require,module,exports){
/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

module.exports = insertWrapDetails;

},{}],165:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray');

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

},{"./_Symbol":69,"./isArguments":230,"./isArray":231}],166:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],167:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./_isIndex":166,"./eq":222,"./isArrayLike":232,"./isObject":237,"dup":30}],168:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":231,"./isSymbol":239}],169:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],170:[function(require,module,exports){
var LazyWrapper = require('./_LazyWrapper'),
    getData = require('./_getData'),
    getFuncName = require('./_getFuncName'),
    lodash = require('./wrapperLodash');

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

module.exports = isLaziable;

},{"./_LazyWrapper":60,"./_getData":147,"./_getFuncName":148,"./wrapperLodash":253}],171:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./_coreJsData":127,"dup":31}],172:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],173:[function(require,module,exports){
var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"./isObject":237}],174:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],175:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":82}],176:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":82}],177:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":82}],178:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":82}],179:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":59,"./_ListCache":61,"./_Map":63}],180:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":150}],181:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":150}],182:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":150}],183:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":150}],184:[function(require,module,exports){
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],185:[function(require,module,exports){
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;

},{}],186:[function(require,module,exports){
var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

},{"./memoize":243}],187:[function(require,module,exports){
var composeArgs = require('./_composeArgs'),
    composeArgsRight = require('./_composeArgsRight'),
    replaceHolders = require('./_replaceHolders');

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

  var isCombo =
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & WRAP_BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = value;
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;

},{"./_composeArgs":123,"./_composeArgsRight":124,"./_replaceHolders":198}],188:[function(require,module,exports){
var WeakMap = require('./_WeakMap');

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

},{"./_WeakMap":71}],189:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":152}],190:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./_overArg":193,"dup":33}],191:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"./_freeGlobal":145,"dup":34}],192:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],193:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],194:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"./_apply":72,"dup":37}],195:[function(require,module,exports){
var baseGet = require('./_baseGet'),
    baseSlice = require('./_baseSlice');

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;

},{"./_baseGet":91,"./_baseSlice":117}],196:[function(require,module,exports){
/** Used to lookup unminified function names. */
var realNames = {};

module.exports = realNames;

},{}],197:[function(require,module,exports){
var copyArray = require('./_copyArray'),
    isIndex = require('./_isIndex');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;

},{"./_copyArray":125,"./_isIndex":166}],198:[function(require,module,exports){
/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;

},{}],199:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./_freeGlobal":145,"dup":38}],200:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],201:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],202:[function(require,module,exports){
var baseSetData = require('./_baseSetData'),
    shortOut = require('./_shortOut');

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = shortOut(baseSetData);

module.exports = setData;

},{"./_baseSetData":115,"./_shortOut":206}],203:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],204:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"./_baseSetToString":116,"./_shortOut":206,"dup":39}],205:[function(require,module,exports){
var getWrapDetails = require('./_getWrapDetails'),
    insertWrapDetails = require('./_insertWrapDetails'),
    setToString = require('./_setToString'),
    updateWrapDetails = require('./_updateWrapDetails');

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  var source = (reference + '');
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

module.exports = setWrapToString;

},{"./_getWrapDetails":157,"./_insertWrapDetails":164,"./_setToString":204,"./_updateWrapDetails":216}],206:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],207:[function(require,module,exports){
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;

},{"./_ListCache":61}],208:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

},{}],209:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],210:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],211:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

},{"./_ListCache":61,"./_Map":63,"./_MapCache":64}],212:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],213:[function(require,module,exports){
var memoizeCapped = require('./_memoizeCapped');

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./_memoizeCapped":186}],214:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":239}],215:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],216:[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    arrayIncludes = require('./_arrayIncludes');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', WRAP_ARY_FLAG],
  ['bind', WRAP_BIND_FLAG],
  ['bindKey', WRAP_BIND_KEY_FLAG],
  ['curry', WRAP_CURRY_FLAG],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
  ['flip', WRAP_FLIP_FLAG],
  ['partial', WRAP_PARTIAL_FLAG],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
  ['rearg', WRAP_REARG_FLAG]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

module.exports = updateWrapDetails;

},{"./_arrayEach":73,"./_arrayIncludes":75}],217:[function(require,module,exports){
var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    copyArray = require('./_copyArray');

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;

},{"./_LazyWrapper":60,"./_LodashWrapper":62,"./_copyArray":125}],218:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./_assignValue":81,"./_copyObject":126,"./_createAssigner":129,"./_isPrototype":172,"./isArrayLike":232,"./keys":241,"dup":42}],219:[function(require,module,exports){
var baseRest = require('./_baseRest'),
    createWrap = require('./_createWrap'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
var bind = baseRest(function(func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG;
  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bind));
    bitmask |= WRAP_PARTIAL_FLAG;
  }
  return createWrap(func, bitmask, thisArg, partials, holders);
});

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;

},{"./_baseRest":113,"./_createWrap":139,"./_getHolder":149,"./_replaceHolders":198}],220:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],221:[function(require,module,exports){
var baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    baseRest = require('./_baseRest'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
});

module.exports = difference;

},{"./_baseDifference":85,"./_baseFlatten":88,"./_baseRest":113,"./isArrayLikeObject":233}],222:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],223:[function(require,module,exports){
var createFind = require('./_createFind'),
    findIndex = require('./findIndex');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;

},{"./_createFind":135,"./findIndex":224}],224:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIteratee = require('./_baseIteratee'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;

},{"./_baseFindIndex":87,"./_baseIteratee":104,"./toInteger":250}],225:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten');

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

},{"./_baseFlatten":88}],226:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":91}],227:[function(require,module,exports){
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":94,"./_hasPath":158}],228:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],229:[function(require,module,exports){
var apply = require('./_apply'),
    baseEach = require('./_baseEach'),
    baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest'),
    isArrayLike = require('./isArrayLike');

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|string} path The path of the method to invoke or
 *  the function invoked per iteration.
 * @param {...*} [args] The arguments to invoke each method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * _.invokeMap([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
var invokeMap = baseRest(function(collection, path, args) {
  var index = -1,
      isFunc = typeof path == 'function',
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value) {
    result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
  });
  return result;
});

module.exports = invokeMap;

},{"./_apply":72,"./_baseEach":86,"./_baseInvoke":96,"./_baseRest":113,"./isArrayLike":232}],230:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./_baseIsArguments":97,"./isObjectLike":238,"dup":46}],231:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],232:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./isFunction":235,"./isLength":236,"dup":48}],233:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":232,"./isObjectLike":238}],234:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"./_root":199,"./stubFalse":248,"dup":49}],235:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"./_baseGetTag":93,"./isObject":237,"dup":50}],236:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],237:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],238:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],239:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":93,"./isObjectLike":238}],240:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./_baseIsTypedArray":103,"./_baseUnary":120,"./_nodeUtil":191,"dup":54}],241:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"./_arrayLikeKeys":77,"./_baseKeys":105,"./isArrayLike":232,"dup":55}],242:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],243:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":64}],244:[function(require,module,exports){
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],245:[function(require,module,exports){
var basePick = require('./_basePick'),
    flatRest = require('./_flatRest');

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;

},{"./_basePick":109,"./_flatRest":144}],246:[function(require,module,exports){
var baseProperty = require('./_baseProperty'),
    basePropertyDeep = require('./_basePropertyDeep'),
    isKey = require('./_isKey'),
    toKey = require('./_toKey');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

},{"./_baseProperty":111,"./_basePropertyDeep":112,"./_isKey":168,"./_toKey":214}],247:[function(require,module,exports){
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

},{}],248:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],249:[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

},{"./toNumber":251}],250:[function(require,module,exports){
var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

},{"./toFinite":249}],251:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":237,"./isSymbol":239}],252:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":119}],253:[function(require,module,exports){
var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    baseLodash = require('./_baseLodash'),
    isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike'),
    wrapperClone = require('./_wrapperClone');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;

},{"./_LazyWrapper":60,"./_LodashWrapper":62,"./_baseLodash":106,"./_wrapperClone":217,"./isArray":231,"./isObjectLike":238}],254:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-dom-bindings"] = window.ampersand["ampersand-dom-bindings"] || [];  window.ampersand["ampersand-dom-bindings"].push("3.9.1");}
var Store = require('key-tree-store');
var dom = require('ampersand-dom');
var matchesSelector = require('matches-selector');
var partial = require('lodash/partial');
var slice = Array.prototype.slice;

function getMatches(el, selector, firstOnly) {
    if (selector === '') return [el];
    var matches = [];
    if (!selector) return matches;
    if (firstOnly) {
        if (matchesSelector(el, selector)) return [el];
        return el.querySelector(selector) ? [el.querySelector(selector)] : [];
    } else {
        if (matchesSelector(el, selector)) matches.push(el);
        return matches.concat(slice.call(el.querySelectorAll(selector)));
    }
}
function setAttributes(el, attrs) {
    for (var name in attrs) {
        dom.setAttribute(el, name, attrs[name]);
    }
}

function removeAttributes(el, attrs) {
    for (var name in attrs) {
        dom.removeAttribute(el, name);
    }
}

function makeArray(val) {
    return Array.isArray(val) ? val : [val];
}

function switchHandler(binding, el, value) {
    // the element selector to show
    var showValue = binding.cases[value];

    var firstMatchOnly = binding.firstMatchOnly;

    // hide all the other elements with a different value
    for (var item in binding.cases) {
        var curValue = binding.cases[item];

        if (value !== item && curValue !== showValue) {
            getMatches(el, curValue, firstMatchOnly).forEach(function (match) {
                dom.hide(match);
            });
        }
    }
    getMatches(el, showValue, firstMatchOnly).forEach(function (match) {
        dom.show(match);
    });
}

function getSelector(binding) {
    if (typeof binding.selector === 'string') {
        return binding.selector;
    } else if (binding.hook) {
        return '[data-hook~="' + binding.hook + '"]';
    } else {
        return '';
    }
}

function getBindingFunc(binding, context) {
    var type = binding.type || 'text';
    var isCustomBinding = typeof type === 'function';
    var selector = getSelector(binding);
    var firstMatchOnly = binding.firstMatchOnly;
    var yes = binding.yes;
    var no = binding.no;
    var hasYesNo = !!(yes || no);

    // storage variable for previous if relevant
    var previousValue;

    if (isCustomBinding) {
        return function (el, value) {
            getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                type.call(context, match, value, previousValue);
            });
            previousValue = value;
        };
    } else if (type === 'text') {
        return function (el, value) {
            getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                dom.text(match, value);
            });
        };
    } else if (type === 'class') {
        return function (el, value) {
            getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                dom.switchClass(match, previousValue, value);
            });
            previousValue = value;
        };
    } else if (type === 'attribute') {
        if (!binding.name) throw Error('attribute bindings must have a "name"');
        return function (el, value) {
            var names = makeArray(binding.name);
            getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                names.forEach(function (name) {
                    dom.setAttribute(match, name, value);
                });
            });
            previousValue = value;
        };
    } else if (type === 'value') {
        return function (el, value) {
            getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                if (!value && value !== 0) value = '';
                // only apply bindings if element is not currently focused
                if (document.activeElement !== match) match.value = value;
            });
            previousValue = value;
        };
    } else if (type === 'booleanClass') {
        // if there's a `no` case this is actually a switch
        if (hasYesNo) {
            yes = makeArray(yes || '');
            no = makeArray(no || '');
            return function (el, value) {
                var prevClass = value ? no : yes;
                var newClass = value ? yes : no;
                getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                    prevClass.forEach(function (pc) {
                        dom.removeClass(match, pc);
                    });
                    newClass.forEach(function (nc) {
                        dom.addClass(match, nc);
                    });
                });
            };
        } else {
            return function (el, value, keyName) {
                var name = makeArray(binding.name || keyName);
                var invert = (binding.invert || false);
                value = (invert ? (value ? false : true) : value);
                getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                    name.forEach(function (className) {
                        dom[value ? 'addClass' : 'removeClass'](match, className);
                    });
                });
            };
        }
    } else if (type === 'booleanAttribute') {
        // if there are `yes` and `no` selectors, this swaps between them
        if (hasYesNo) {
            yes = makeArray(yes || '');
            no = makeArray(no || '');
            return function (el, value) {
                var prevAttribute = value ? no : yes;
                var newAttribute = value ? yes : no;
                getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                    prevAttribute.forEach(function (pa) {
                        if (pa) {
                            dom.removeAttribute(match, pa);
                        }
                    });
                    newAttribute.forEach(function (na) {
                        if (na) {
                            dom.addAttribute(match, na);
                        }
                    });
                });
            };
        } else {
            return function (el, value, keyName) {
                var name = makeArray(binding.name || keyName);
                var invert = (binding.invert || false);
                value = (invert ? (value ? false : true) : value);
                getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                    name.forEach(function (attr) {
                        dom[value ? 'addAttribute' : 'removeAttribute'](match, attr);
                    });
                });
            };
        }
    } else if (type === 'toggle') {
        var mode = (binding.mode || 'display');
        var invert = (binding.invert || false);
        // this doesn't require a selector since we can pass yes/no selectors
        if (hasYesNo) {
            return function (el, value) {
                getMatches(el, yes, firstMatchOnly).forEach(function (match) {
                    dom[value ? 'show' : 'hide'](match, mode);
                });
                getMatches(el, no, firstMatchOnly).forEach(function (match) {
                    dom[value ? 'hide' : 'show'](match, mode);
                });
            };
        } else {
            return function (el, value) {
                value = (invert ? (value ? false : true) : value);
                getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                    dom[value ? 'show' : 'hide'](match, mode);
                });
            };
        }
    } else if (type === 'switch') {
        if (!binding.cases) throw Error('switch bindings must have "cases"');
        return partial(switchHandler, binding);
    } else if (type === 'innerHTML') {
        return function (el, value) {
            getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                dom.html(match, value);
            });
        };
    } else if (type === 'switchClass') {
        if (!binding.cases) throw Error('switchClass bindings must have "cases"');
        return function (el, value, keyName) {
            var name = makeArray(binding.name || keyName);
            for (var item in binding.cases) {
                getMatches(el, binding.cases[item], firstMatchOnly).forEach(function (match) {
                    name.forEach(function (className) {
                        dom[value === item ? 'addClass' : 'removeClass'](match, className);
                    });
                });
            }
        };
    } else if (type === 'switchAttribute') {
        if (!binding.cases) throw Error('switchAttribute bindings must have "cases"');
        return function (el, value, keyName) {
            getMatches(el, selector, firstMatchOnly).forEach(function (match) {
                if (previousValue) {
                    removeAttributes(match, previousValue);
                }

                if (value in binding.cases) {
                    var attrs = binding.cases[value];
                    if (typeof attrs === 'string') {
                        attrs = {};
                        attrs[binding.name || keyName] = binding.cases[value];
                    }
                    setAttributes(match, attrs);

                    previousValue = attrs;
                }
            });
        };
    } else {
        throw new Error('no such binding type: ' + type);
    }
}

// returns a key-tree-store of functions
// that can be applied to any element/model.

// all resulting functions should be called
// like func(el, value, lastKeyName)
module.exports = function (bindings, context) {
    var store = new Store();
    var key, current;

    for (key in bindings) {
        current = bindings[key];
        if (typeof current === 'string') {
            store.add(key, getBindingFunc({
                type: 'text',
                selector: current
            }));
        } else if (current.forEach) {
            current.forEach(function (binding) {
                store.add(key, getBindingFunc(binding, context));
            });
        } else {
            store.add(key, getBindingFunc(current, context));
        }
    }

    return store;
};

},{"ampersand-dom":326,"key-tree-store":787,"lodash/partial":321,"matches-selector":788}],255:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"./_baseCreate":262,"./_baseLodash":268,"dup":60}],256:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./_baseCreate":262,"./_baseLodash":268,"dup":62}],257:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./_root":304,"dup":7}],258:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"./_getNative":289,"./_root":304,"dup":71}],259:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],260:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],261:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./_baseIndexOf":265,"dup":75}],262:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"./isObject":317,"dup":84}],263:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"dup":87}],264:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./_Symbol":257,"./_getRawTag":290,"./_objectToString":299,"dup":12}],265:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"./_baseFindIndex":263,"./_baseIsNaN":266,"./_strictIndexOf":309,"dup":95}],266:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101}],267:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./_isMasked":296,"./_toSource":310,"./isFunction":316,"./isObject":317,"dup":14}],268:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],269:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./_overRest":300,"./_setToString":306,"./identity":314,"dup":17}],270:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"./_metaMap":298,"./identity":314,"dup":115}],271:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./_defineProperty":284,"./constant":313,"./identity":314,"dup":18}],272:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"dup":123}],273:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124}],274:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],275:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"./_root":304,"dup":22}],276:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],277:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"./_createCtor":278,"./_root":304,"dup":132}],278:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"./_baseCreate":262,"./isObject":317,"dup":133}],279:[function(require,module,exports){
arguments[4][134][0].apply(exports,arguments)
},{"./_apply":259,"./_createCtor":278,"./_createHybrid":280,"./_createRecurry":282,"./_getHolder":288,"./_replaceHolders":303,"./_root":304,"dup":134}],280:[function(require,module,exports){
arguments[4][136][0].apply(exports,arguments)
},{"./_composeArgs":272,"./_composeArgsRight":273,"./_countHolders":276,"./_createCtor":278,"./_createRecurry":282,"./_getHolder":288,"./_reorder":302,"./_replaceHolders":303,"./_root":304,"dup":136}],281:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"./_apply":259,"./_createCtor":278,"./_root":304,"dup":137}],282:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"./_isLaziable":295,"./_setData":305,"./_setWrapToString":307,"dup":138}],283:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"./_baseSetData":270,"./_createBind":277,"./_createCurry":279,"./_createHybrid":280,"./_createPartial":281,"./_getData":286,"./_mergeData":297,"./_setData":305,"./_setWrapToString":307,"./toInteger":323,"dup":139}],284:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./_getNative":289,"dup":24}],285:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],286:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"./_metaMap":298,"./noop":320,"dup":147}],287:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"./_realNames":301,"dup":148}],288:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],289:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./_baseIsNative":267,"./_getValue":291,"dup":26}],290:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./_Symbol":257,"dup":27}],291:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],292:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"dup":157}],293:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"dup":164}],294:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],295:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"./_LazyWrapper":255,"./_getData":286,"./_getFuncName":287,"./wrapperLodash":325,"dup":170}],296:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./_coreJsData":275,"dup":31}],297:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"./_composeArgs":272,"./_composeArgsRight":273,"./_replaceHolders":303,"dup":187}],298:[function(require,module,exports){
arguments[4][188][0].apply(exports,arguments)
},{"./_WeakMap":258,"dup":188}],299:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],300:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"./_apply":259,"dup":37}],301:[function(require,module,exports){
arguments[4][196][0].apply(exports,arguments)
},{"dup":196}],302:[function(require,module,exports){
arguments[4][197][0].apply(exports,arguments)
},{"./_copyArray":274,"./_isIndex":294,"dup":197}],303:[function(require,module,exports){
arguments[4][198][0].apply(exports,arguments)
},{"dup":198}],304:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./_freeGlobal":285,"dup":38}],305:[function(require,module,exports){
arguments[4][202][0].apply(exports,arguments)
},{"./_baseSetData":270,"./_shortOut":308,"dup":202}],306:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"./_baseSetToString":271,"./_shortOut":308,"dup":39}],307:[function(require,module,exports){
arguments[4][205][0].apply(exports,arguments)
},{"./_getWrapDetails":292,"./_insertWrapDetails":293,"./_setToString":306,"./_updateWrapDetails":311,"dup":205}],308:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],309:[function(require,module,exports){
arguments[4][212][0].apply(exports,arguments)
},{"dup":212}],310:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],311:[function(require,module,exports){
arguments[4][216][0].apply(exports,arguments)
},{"./_arrayEach":260,"./_arrayIncludes":261,"dup":216}],312:[function(require,module,exports){
arguments[4][217][0].apply(exports,arguments)
},{"./_LazyWrapper":255,"./_LodashWrapper":256,"./_copyArray":274,"dup":217}],313:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],314:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],315:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],316:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"./_baseGetTag":264,"./isObject":317,"dup":50}],317:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],318:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],319:[function(require,module,exports){
arguments[4][239][0].apply(exports,arguments)
},{"./_baseGetTag":264,"./isObjectLike":318,"dup":239}],320:[function(require,module,exports){
arguments[4][244][0].apply(exports,arguments)
},{"dup":244}],321:[function(require,module,exports){
var baseRest = require('./_baseRest'),
    createWrap = require('./_createWrap'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders');

/** Used to compose bitmasks for function metadata. */
var WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with `partials` prepended to the
 * arguments it receives. This method is like `_.bind` except it does **not**
 * alter the `this` binding.
 *
 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * **Note:** This method doesn't set the "length" property of partially
 * applied functions.
 *
 * @static
 * @memberOf _
 * @since 0.2.0
 * @category Function
 * @param {Function} func The function to partially apply arguments to.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 * @example
 *
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * var sayHelloTo = _.partial(greet, 'hello');
 * sayHelloTo('fred');
 * // => 'hello fred'
 *
 * // Partially applied with placeholders.
 * var greetFred = _.partial(greet, _, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 */
var partial = baseRest(function(func, partials) {
  var holders = replaceHolders(partials, getHolder(partial));
  return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
});

// Assign default placeholders.
partial.placeholder = {};

module.exports = partial;

},{"./_baseRest":269,"./_createWrap":283,"./_getHolder":288,"./_replaceHolders":303}],322:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"./toNumber":324,"dup":249}],323:[function(require,module,exports){
arguments[4][250][0].apply(exports,arguments)
},{"./toFinite":322,"dup":250}],324:[function(require,module,exports){
arguments[4][251][0].apply(exports,arguments)
},{"./isObject":317,"./isSymbol":319,"dup":251}],325:[function(require,module,exports){
arguments[4][253][0].apply(exports,arguments)
},{"./_LazyWrapper":255,"./_LodashWrapper":256,"./_baseLodash":268,"./_wrapperClone":312,"./isArray":315,"./isObjectLike":318,"dup":253}],326:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-dom"] = window.ampersand["ampersand-dom"] || [];  window.ampersand["ampersand-dom"].push("1.5.0");}
var dom = module.exports = {
    text: function (el, val) {
        el.textContent = getString(val);
    },
    // optimize if we have classList
    addClass: function (el, cls) {
        cls = getString(cls);
        if (!cls) return;
        if (Array.isArray(cls)) {
            cls.forEach(function(c) {
                dom.addClass(el, c);
            });
        } else if (el.classList) {
            el.classList.add(cls);
        } else {
            if (!hasClass(el, cls)) {
                if (el.classList) {
                    el.classList.add(cls);
                } else {
                    el.className += ' ' + cls;
                }
            }
        }
    },
    removeClass: function (el, cls) {
        if (Array.isArray(cls)) {
            cls.forEach(function(c) {
                dom.removeClass(el, c);
            });
        } else if (el.classList) {
            cls = getString(cls);
            if (cls) el.classList.remove(cls);
        } else {
            // may be faster to not edit unless we know we have it?
            el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },
    hasClass: hasClass,
    switchClass: function (el, prevCls, newCls) {
        if (prevCls) this.removeClass(el, prevCls);
        this.addClass(el, newCls);
    },
    // makes sure attribute (with no content) is added
    // if exists it will be cleared of content
    addAttribute: function (el, attr) {
        // setting to empty string does same
        el.setAttribute(attr, '');
        // Some browsers won't update UI for boolean attributes unless you
        // set it directly. So we do both
        if (hasBooleanProperty(el, attr)) el[attr] = true;
    },
    // completely removes attribute
    removeAttribute: function (el, attr) {
        el.removeAttribute(attr);
        if (hasBooleanProperty(el, attr)) el[attr] = false;
    },
    // sets attribute to string value given, clearing any current value
    setAttribute: function (el, attr, value) {
        el.setAttribute(attr, getString(value));
    },
    getAttribute: function (el, attr) {
        return el.getAttribute(attr);
    },
    hasAttribute: function (el, attr) {
        return el.hasAttribute(attr);
    },
    hide: function (el, mode) {
        if (!mode) mode = 'display';
        if (!isHidden(el)) {
            storeDisplayStyle(el, mode);
            hide(el, mode);
        }
    },
    // show element
    show: function (el, mode) {
        if (!mode) mode = 'display';
        show(el, mode);
    },
    toggle: function (el, mode) {
        if (!isHidden(el)) {
            dom.hide(el, mode);
        } else {
            dom.show(el, mode);
        }
    },
    html: function (el, content) {
        el.innerHTML = content;
    }
};

// helpers
function getString(val) {
    if (!val && val !== 0) {
        return '';
    } else {
        return val;
    }
}

function hasClass(el, cls) {
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.className);
    }
}

function hasBooleanProperty(el, prop) {
    var val = el[prop];
    return prop in el && (val === true || val === false);
}

function isHidden (el) {
    return dom.getAttribute(el, 'data-anddom-hidden') === 'true';
}

function storeDisplayStyle (el, mode) {
    dom.setAttribute(el, 'data-anddom-' + mode, el.style[mode]);
}

function show (el, mode) {
    el.style[mode] = dom.getAttribute(el, 'data-anddom-' + mode) || '';
    dom.removeAttribute(el, 'data-anddom-hidden');
}

function hide (el, mode) {
    dom.setAttribute(el, 'data-anddom-hidden', 'true');
    el.style[mode] = (mode === 'visibility' ? 'hidden' : 'none');
}

},{}],327:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-events"] = window.ampersand["ampersand-events"] || [];  window.ampersand["ampersand-events"].push("2.0.2");}
var runOnce = require('lodash/once');
var keys = require('lodash/keys');
var isEmpty = require('lodash/isEmpty');
var assign = require('lodash/assign');
var forEach = require('lodash/forEach');
var slice = Array.prototype.slice;

var utils = require('./libs/utils');

var Events = {
    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function (name, callback, context) {
        if (!utils.eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
        this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push({callback: callback, context: context, ctx: context || this});
        return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function (name, callback, context) {
        if (!utils.eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
        var self = this;
        var once = runOnce(function () {
            self.off(name, once);
            callback.apply(this, arguments);
        });
        once._callback = callback;
        return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function (name, callback, context) {
        var retain, ev, events, names, i, l, j, k;
        if (!this._events || !utils.eventsApi(this, 'off', name, [callback, context])) return this;
        if (!name && !callback && !context) {
            this._events = void 0;
            return this;
        }
        names = name ? [name] : keys(this._events);
        for (i = 0, l = names.length; i < l; i++) {
            name = names[i];
            if (events = this._events[name]) {
                this._events[name] = retain = [];
                if (callback || context) {
                    for (j = 0, k = events.length; j < k; j++) {
                        ev = events[j];
                        if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                                (context && context !== ev.context)) {
                            retain.push(ev);
                        }
                    }
                }
                if (!retain.length) delete this._events[name];
            }
        }

        return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function (name) {
        if (!this._events) return this;
        var args = slice.call(arguments, 1);
        if (!utils.eventsApi(this, 'trigger', name, args)) return this;
        var events = this._events[name];
        var allEvents = this._events.all;
        if (events) utils.triggerEvents(events, args);
        if (allEvents) utils.triggerEvents(allEvents, arguments);
        return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function (obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;
        var remove = !name && !callback;
        if (!callback && typeof name === 'object') callback = this;
        if (obj) (listeningTo = {})[obj._listenId] = obj;
        var self = this;
        forEach(listeningTo, function (item, id) {
            item.off(name, callback, self);
            if (remove || isEmpty(item._events)) delete self._listeningTo[id];
        });
        return this;
    },

    // extend an object with event capabilities if passed
    // or just return a new one.
    createEmitter: function (obj) {
        return assign(obj || {}, Events);
    },

    listenTo: utils.createListenMethod('on'),

    listenToOnce: utils.createListenMethod('once'),

    listenToAndRun: function (obj, name, callback) {
        this.listenTo.apply(this, arguments);
        if (!callback && typeof name === 'object') callback = this;
        callback.apply(this);
        return this;
    }
};

// setup aliases
Events.bind = Events.on;
Events.unbind = Events.off;
Events.removeListener = Events.off;
Events.removeAllListeners = Events.off;
Events.emit = Events.trigger;

module.exports = Events;

},{"./libs/utils":328,"lodash/assign":379,"lodash/forEach":383,"lodash/isEmpty":389,"lodash/keys":396,"lodash/once":397}],328:[function(require,module,exports){
var uniqueId = require('lodash/uniqueId');
var eventSplitter = /\s+/;

// A difficult-to-believe, but optimized internal dispatch function for
// triggering events. Tries to keep the usual cases speedy.
exports.triggerEvents = function triggerEvents(events, args) {
    var ev;
    var i = -1;
    var l = events.length;
    var a1 = args[0];
    var a2 = args[1];
    var a3 = args[2];
    switch (args.length) {
        case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
        case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
        case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
        case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
        default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
};

// Implement fancy features of the Events API such as multiple event
// names `"change blur"` and jQuery-style event maps `{change: action}`
// in terms of the existing API.
exports.eventsApi = function eventsApi(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
        for (var key in name) {
            obj[action].apply(obj, [key, name[key]].concat(rest));
        }
        return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
        var names = name.split(eventSplitter);
        for (var i = 0, l = names.length; i < l; i++) {
            obj[action].apply(obj, [names[i]].concat(rest));
        }
        return false;
    }

    return true;
};

// Inversion-of-control versions of `on` and `once`. Tell *this* object to
// listen to an event in another object ... keeping track of what it's
// listening to.
exports.createListenMethod = function createListenMethod(implementation) {
    return function listenMethod(obj, name, callback) {
        if (!obj) {
            throw new Error('Trying to listenTo event: \'' + name + '\' but the target object is undefined');
        }
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var id = obj._listenId || (obj._listenId = uniqueId('l'));
        listeningTo[id] = obj;
        if (!callback && typeof name === 'object') callback = this;
        if (typeof obj[implementation] !== 'function') {
            throw new Error('Trying to listenTo event: \'' + name + '\' on object: ' + obj.toString() + ' but it does not have an \'on\' method so is unbindable');
        }
        obj[implementation](name, callback, this);
        return this;
    };
};

},{"lodash/uniqueId":403}],329:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"./_getNative":362,"./_root":375,"dup":58}],330:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"./_getNative":362,"./_root":375,"dup":63}],331:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"./_getNative":362,"./_root":375,"dup":65}],332:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"./_getNative":362,"./_root":375,"dup":66}],333:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./_root":375,"dup":7}],334:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"./_getNative":362,"./_root":375,"dup":71}],335:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],336:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],337:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./_baseTimes":351,"./_isIndex":366,"./isArguments":385,"./isArray":386,"./isBuffer":388,"./isTypedArray":395,"dup":9}],338:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],339:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./_baseAssignValue":340,"./eq":382,"dup":10}],340:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./_defineProperty":360,"dup":11}],341:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"./_baseForOwn":343,"./_createBaseEach":358,"dup":86}],342:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"./_createBaseFor":359,"dup":89}],343:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"./_baseFor":342,"./keys":396,"dup":90}],344:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./_Symbol":333,"./_getRawTag":363,"./_objectToString":372,"dup":12}],345:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./_baseGetTag":344,"./isObjectLike":393,"dup":13}],346:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./_isMasked":368,"./_toSource":378,"./isFunction":390,"./isObject":392,"dup":14}],347:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./_baseGetTag":344,"./isLength":391,"./isObjectLike":393,"dup":15}],348:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./_isPrototype":369,"./_nativeKeys":370,"dup":16}],349:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./_overRest":374,"./_setToString":376,"./identity":384,"dup":17}],350:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./_defineProperty":360,"./constant":381,"./identity":384,"dup":18}],351:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],352:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"./_Symbol":333,"./_arrayMap":338,"./isArray":386,"./isSymbol":394,"dup":119}],353:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],354:[function(require,module,exports){
var identity = require('./identity');

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;

},{"./identity":384}],355:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"./_assignValue":339,"./_baseAssignValue":340,"dup":21}],356:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"./_root":375,"dup":22}],357:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./_baseRest":349,"./_isIterateeCall":367,"dup":23}],358:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"./isArrayLike":387,"dup":130}],359:[function(require,module,exports){
arguments[4][131][0].apply(exports,arguments)
},{"dup":131}],360:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./_getNative":362,"dup":24}],361:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],362:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./_baseIsNative":346,"./_getValue":365,"dup":26}],363:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./_Symbol":333,"dup":27}],364:[function(require,module,exports){
arguments[4][155][0].apply(exports,arguments)
},{"./_DataView":329,"./_Map":330,"./_Promise":331,"./_Set":332,"./_WeakMap":334,"./_baseGetTag":344,"./_toSource":378,"dup":155}],365:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],366:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],367:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./_isIndex":366,"./eq":382,"./isArrayLike":387,"./isObject":392,"dup":30}],368:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./_coreJsData":356,"dup":31}],369:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],370:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./_overArg":373,"dup":33}],371:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"./_freeGlobal":361,"dup":34}],372:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],373:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],374:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"./_apply":335,"dup":37}],375:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./_freeGlobal":361,"dup":38}],376:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"./_baseSetToString":350,"./_shortOut":377,"dup":39}],377:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],378:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],379:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./_assignValue":339,"./_copyObject":355,"./_createAssigner":357,"./_isPrototype":369,"./isArrayLike":387,"./keys":396,"dup":42}],380:[function(require,module,exports){
var toInteger = require('./toInteger');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

module.exports = before;

},{"./toInteger":400}],381:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],382:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],383:[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    baseEach = require('./_baseEach'),
    castFunction = require('./_castFunction'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;

},{"./_arrayEach":336,"./_baseEach":341,"./_castFunction":354,"./isArray":386}],384:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],385:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./_baseIsArguments":345,"./isObjectLike":393,"dup":46}],386:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],387:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./isFunction":390,"./isLength":391,"dup":48}],388:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"./_root":375,"./stubFalse":398,"dup":49}],389:[function(require,module,exports){
var baseKeys = require('./_baseKeys'),
    getTag = require('./_getTag'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLike = require('./isArrayLike'),
    isBuffer = require('./isBuffer'),
    isPrototype = require('./_isPrototype'),
    isTypedArray = require('./isTypedArray');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;

},{"./_baseKeys":348,"./_getTag":364,"./_isPrototype":369,"./isArguments":385,"./isArray":386,"./isArrayLike":387,"./isBuffer":388,"./isTypedArray":395}],390:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"./_baseGetTag":344,"./isObject":392,"dup":50}],391:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],392:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],393:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],394:[function(require,module,exports){
arguments[4][239][0].apply(exports,arguments)
},{"./_baseGetTag":344,"./isObjectLike":393,"dup":239}],395:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./_baseIsTypedArray":347,"./_baseUnary":353,"./_nodeUtil":371,"dup":54}],396:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"./_arrayLikeKeys":337,"./_baseKeys":348,"./isArrayLike":387,"dup":55}],397:[function(require,module,exports){
var before = require('./before');

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
function once(func) {
  return before(2, func);
}

module.exports = once;

},{"./before":380}],398:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],399:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"./toNumber":401,"dup":249}],400:[function(require,module,exports){
arguments[4][250][0].apply(exports,arguments)
},{"./toFinite":399,"dup":250}],401:[function(require,module,exports){
arguments[4][251][0].apply(exports,arguments)
},{"./isObject":392,"./isSymbol":394,"dup":251}],402:[function(require,module,exports){
arguments[4][252][0].apply(exports,arguments)
},{"./_baseToString":352,"dup":252}],403:[function(require,module,exports){
var toString = require('./toString');

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;

},{"./toString":402}],404:[function(require,module,exports){
'use strict';
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-state"] = window.ampersand["ampersand-state"] || [];  window.ampersand["ampersand-state"].push("5.0.2");}
var uniqueId = require('lodash/uniqueId');
var assign = require('lodash/assign');
var cloneObj = function(obj) { return assign({}, obj); };
var omit = require('lodash/omit');
var escape = require('lodash/escape');
var forOwn = require('lodash/forOwn');
var includes = require('lodash/includes');
var isString = require('lodash/isString');
var isObject = require('lodash/isObject');
var isDate = require('lodash/isDate');
var isFunction = require('lodash/isFunction');
var _isEqual = require('lodash/isEqual'); // to avoid shadowing
var has = require('lodash/has');
var result = require('lodash/result');
var bind = require('lodash/bind'); // because phantomjs doesn't have Function#bind
var union = require('lodash/union');
var Events = require('ampersand-events');
var KeyTree = require('key-tree-store');
var arrayNext = require('array-next');
var changeRE = /^change:/;
var noop = function () {};

function Base(attrs, options) {
    options || (options = {});
    this.cid || (this.cid = uniqueId('state'));
    this._events = {};
    this._values = {};
    this._eventBubblingHandlerCache = {};
    this._definition = Object.create(this._definition);
    if (options.parse) attrs = this.parse(attrs, options);
    this.parent = options.parent;
    this.collection = options.collection;
    this._keyTree = new KeyTree();
    this._initCollections();
    this._initChildren();
    this._cache = {};
    this._previousAttributes = {};
    if (attrs) this.set(attrs, assign({silent: true, initial: true}, options));
    this._changed = {};
    if (this._derived) this._initDerived();
    if (options.init !== false) this.initialize.apply(this, arguments);
}

assign(Base.prototype, Events, {
    // can be allow, ignore, reject
    extraProperties: 'ignore',

    idAttribute: 'id',

    namespaceAttribute: 'namespace',

    typeAttribute: 'modelType',

    // Stubbed out to be overwritten
    initialize: function () {
        return this;
    },

    // Get ID of model per configuration.
    // Should *always* be how ID is determined by other code.
    getId: function () {
        return this[this.idAttribute];
    },

    // Get namespace of model per configuration.
    // Should *always* be how namespace is determined by other code.
    getNamespace: function () {
        return this[this.namespaceAttribute];
    },

    // Get type of model per configuration.
    // Should *always* be how type is determined by other code.
    getType: function () {
        return this[this.typeAttribute];
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function () {
        return this.getId() == null;
    },

    // get HTML-escaped value of attribute
    escape: function (attr) {
        return escape(this.get(attr));
    },

    // Check if the model is currently in a valid state.
    isValid: function (options) {
        return this._validate({}, assign(options || {}, { validate: true }));
    },

    // Parse can be used remap/restructure/rename incoming properties
    // before they are applied to attributes.
    parse: function (resp, options) {
        //jshint unused:false
        return resp;
    },

    // Serialize is the inverse of `parse` it lets you massage data
    // on the way out. Before, sending to server, for example.
    serialize: function (options) {
        var attrOpts = assign({props: true}, options);
        var res = this.getAttributes(attrOpts, true);
        forOwn(this._children, bind(function (value, key) {
            res[key] = this[key].serialize();
        }, this));
        forOwn(this._collections, bind(function (value, key) {
            res[key] = this[key].serialize();
        }, this));
        return res;
    },

    // Main set method used by generated setters/getters and can
    // be used directly if you need to pass options or set multiple
    // properties at once.
    set: function (key, value, options) {
        var self = this;
        var extraProperties = this.extraProperties;
        var wasChanging, changeEvents, newType, newVal, def, cast, err, attr,
            attrs, dataType, silent, unset, currentVal, initial, hasChanged, isEqual, onChange;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (isObject(key) || key === null) {
            attrs = key;
            options = value;
        } else {
            attrs = {};
            attrs[key] = value;
        }

        options = options || {};

        if (!this._validate(attrs, options)) return false;

        // Extract attributes and options.
        unset = options.unset;
        silent = options.silent;
        initial = options.initial;

        // Initialize change tracking.
        wasChanging = this._changing;
        this._changing = true;
        changeEvents = [];

        // if not already changing, store previous
        if (initial) {
            this._previousAttributes = {};
        } else if (!wasChanging) {
            this._previousAttributes = this.attributes;
            this._changed = {};
        }

        // For each `set` attribute...
        for (var i = 0, keys = Object.keys(attrs), len = keys.length; i < len; i++) {
            attr = keys[i];
            newVal = attrs[attr];
            newType = typeof newVal;
            currentVal = this._values[attr];
            def = this._definition[attr];

            if (!def) {
                // if this is a child model or collection
                if (this._children[attr] || this._collections[attr]) {
                    if (!isObject(newVal)) {
                        newVal = {};
                    }

                    this[attr].set(newVal, options);
                    continue;
                } else if (extraProperties === 'ignore') {
                    continue;
                } else if (extraProperties === 'reject') {
                    throw new TypeError('No "' + attr + '" property defined on ' + (this.type || 'this') + ' model and extraProperties not set to "ignore" or "allow"');
                } else if (extraProperties === 'allow') {
                    def = this._createPropertyDefinition(attr, 'any');
                } else if (extraProperties) {
                    throw new TypeError('Invalid value for extraProperties: "' + extraProperties + '"');
                }
            }

            isEqual = this._getCompareForType(def.type);
            onChange = this._getOnChangeForType(def.type);
            dataType = this._dataTypes[def.type];

            // check type if we have one
            if (dataType && dataType.set) {
                cast = dataType.set(newVal);
                newVal = cast.val;
                newType = cast.type;
            }

            // If we've defined a test, run it
            if (def.test) {
                err = def.test.call(this, newVal, newType);
                if (err) {
                    throw new TypeError('Property \'' + attr + '\' failed validation with error: ' + err);
                }
            }

            // If we are required but undefined, throw error.
            // If we are null and are not allowing null, throw error
            // If we have a defined type and the new type doesn't match, and we are not null, throw error.
            // If we require specific value and new one is not one of them, throw error (unless it has default value or we're unsetting it with undefined).

            if (newVal === undefined && def.required) {
                throw new TypeError('Required property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (newVal === null && def.required && !def.allowNull) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + ' (cannot be null). Tried to set ' + newVal);
            }
            if ((def.type && def.type !== 'any' && def.type !== newType) && newVal !== null && newVal !== undefined) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (def.values && !includes(def.values, newVal)) {
                var defaultValue = result(def, 'default');
                if (unset && defaultValue !== undefined) {
                    newVal = defaultValue;
                } else if (!unset || (unset && newVal !== undefined)) {
                    throw new TypeError('Property \'' + attr + '\' must be one of values: ' + def.values.join(', ') + '. Tried to set ' + newVal);
                }
            }

            // We know this has 'changed' if it's the initial set, so skip a potentially expensive isEqual check.
            hasChanged = initial || !isEqual(currentVal, newVal, attr);

            // enforce `setOnce` for properties if set
            if (def.setOnce && currentVal !== undefined && hasChanged) {
                throw new TypeError('Property \'' + attr + '\' can only be set once.');
            }

            // set/unset attributes.
            // If this is not the initial set, keep track of changed attributes
            // and push to changeEvents array so we can fire events.
            if (hasChanged) {

                // This fires no matter what, even on initial set.
                onChange(newVal, currentVal, attr);

                // If this is a change (not an initial set), mark the change.
                // Note it's impossible to unset on the initial set (it will already be unset),
                // so we only include that logic here.
                if (!initial) {
                    this._changed[attr] = newVal;
                    this._previousAttributes[attr] = currentVal;
                    if (unset) {
                        // FIXME delete is very slow. Can we get away with setting to undefined?
                        delete this._values[attr];
                    }
                    if (!silent) {
                        changeEvents.push({prev: currentVal, val: newVal, key: attr});
                    }
                }
                if (!unset) {
                    this._values[attr] = newVal;
                }
            } else {
                // Not changed
                // FIXME delete is very slow. Can we get away with setting to undefined?
                delete this._changed[attr];
            }
        }

        // Fire events. This array is not populated if we are told to be silent.
        if (changeEvents.length) this._pending = true;
        changeEvents.forEach(function (change) {
            self.trigger('change:' + change.key, self, change.val, options);
        });

        // You might be wondering why there's a `while` loop here. Changes can
        // be recursively nested within `"change"` events.
        if (wasChanging) return this;
        while (this._pending) {
            this._pending = false;
            this.trigger('change', this, options);
        }
        this._pending = false;
        this._changing = false;
        return this;
    },

    get: function (attr) {
        return this[attr];
    },

    // Toggle boolean properties or properties that have a `values`
    // array in its definition.
    toggle: function (property) {
        var def = this._definition[property];
        if (def.type === 'boolean') {
            // if it's a bool, just flip it
            this[property] = !this[property];
        } else if (def && def.values) {
            // If it's a property with an array of values
            // skip to the next one looping back if at end.
            this[property] = arrayNext(def.values, this[property]);
        } else {
            throw new TypeError('Can only toggle properties that are type `boolean` or have `values` array.');
        }
        return this;
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function () {
        return cloneObj(this._previousAttributes);
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function (attr) {
        if (attr == null) return !!Object.keys(this._changed).length;
        if (has(this._derived, attr)) {
            return this._derived[attr].depList.some(function (dep) {
                return this.hasChanged(dep);
            }, this);
        }
        return has(this._changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function (diff) {
        if (!diff) return this.hasChanged() ? cloneObj(this._changed) : false;
        var val, changed = false;
        var old = this._changing ? this._previousAttributes : this.attributes;
        var def, isEqual;
        for (var attr in diff) {
            def = this._definition[attr];
            if (!def) continue;
            isEqual = this._getCompareForType(def.type);
            if (isEqual(old[attr], (val = diff[attr]))) continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    },

    toJSON: function () {
        return this.serialize();
    },

    unset: function (attrs, options) {
        var self = this;
        attrs = Array.isArray(attrs) ? attrs : [attrs];
        attrs.forEach(function (key) {
            var def = self._definition[key];
            if (!def) return;
            var val;
            if (def.required) {
                val = result(def, 'default');
                return self.set(key, val, options);
            } else {
                return self.set(key, val, assign({}, options, {unset: true}));
            }
        });
    },

    clear: function (options) {
        var self = this;
        Object.keys(this.attributes).forEach(function (key) {
            self.unset(key, options);
        });
        return this;
    },

    previous: function (attr) {
        if (attr == null || !Object.keys(this._previousAttributes).length) return null;
        return this._previousAttributes[attr];
    },

    // Get default values for a certain type
    _getDefaultForType: function (type) {
        var dataType = this._dataTypes[type];
        return dataType && dataType['default'];
    },

    // Determine which comparison algorithm to use for comparing a property
    _getCompareForType: function (type) {
        var dataType = this._dataTypes[type];
        if (dataType && dataType.compare) return bind(dataType.compare, this);
        return _isEqual; // if no compare function is defined, use _.isEqual
    },

    _getOnChangeForType : function(type){
        var dataType = this._dataTypes[type];
        if (dataType && dataType.onChange) return bind(dataType.onChange, this);
        return noop;
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function (attrs, options) {
        if (!options.validate || !this.validate) return true;
        attrs = assign({}, this.attributes, attrs);
        var error = this.validationError = this.validate(attrs, options) || null;
        if (!error) return true;
        this.trigger('invalid', this, error, assign(options || {}, {validationError: error}));
        return false;
    },

    _createPropertyDefinition: function (name, desc, isSession) {
        return createPropertyDefinition(this, name, desc, isSession);
    },

    // just makes friendlier errors when trying to define a new model
    // only used when setting up original property definitions
    _ensureValidType: function (type) {
        return includes(['string', 'number', 'boolean', 'array', 'object', 'date', 'state', 'any']
            .concat(Object.keys(this._dataTypes)), type) ? type : undefined;
    },

    getAttributes: function (options, raw) {
        options = assign({
            session: false,
            props: false,
            derived: false
        }, options || {});
        var res = {};
        var val, def;
        for (var item in this._definition) {
            def = this._definition[item];
            if ((options.session && def.session) || (options.props && !def.session)) {
                val = raw ? this._values[item] : this[item];
                if (raw && val && isFunction(val.serialize)) val = val.serialize();
                if (typeof val === 'undefined') val = result(def, 'default');
                if (typeof val !== 'undefined') res[item] = val;
            }
        }
        if (options.derived) {
            for (var derivedItem in this._derived) res[derivedItem] = this[derivedItem];
        }
        return res;
    },

    _initDerived: function () {
        var self = this;

        forOwn(this._derived, function (value, name) {
            var def = self._derived[name];
            def.deps = def.depList;

            var update = function (options) {
                options = options || {};

                var newVal = def.fn.call(self);

                if (self._cache[name] !== newVal || !def.cache) {
                    if (def.cache) {
                        self._previousAttributes[name] = self._cache[name];
                    }
                    self._cache[name] = newVal;
                    self.trigger('change:' + name, self, self._cache[name]);
                }
            };

            def.deps.forEach(function (propString) {
                self._keyTree.add(propString, update);
            });
        });

        this.on('all', function (eventName) {
            if (changeRE.test(eventName)) {
                self._keyTree.get(eventName.split(':')[1]).forEach(function (fn) {
                    fn();
                });
            }
        }, this);
    },

    _getDerivedProperty: function (name, flushCache) {
        // is this a derived property that is cached
        if (this._derived[name].cache) {
            //set if this is the first time, or flushCache is set
            if (flushCache || !this._cache.hasOwnProperty(name)) {
                this._cache[name] = this._derived[name].fn.apply(this);
            }
            return this._cache[name];
        } else {
            return this._derived[name].fn.apply(this);
        }
    },

    _initCollections: function () {
        var coll;
        if (!this._collections) return;
        for (coll in this._collections) {
            this._safeSet(coll, new this._collections[coll](null, {parent: this}));
        }
    },

    _initChildren: function () {
        var child;
        if (!this._children) return;
        for (child in this._children) {
            this._safeSet(child, new this._children[child]({}, {parent: this}));
            this.listenTo(this[child], 'all', this._getCachedEventBubblingHandler(child));
        }
    },

    // Returns a bound handler for doing event bubbling while
    // adding a name to the change string.
    _getCachedEventBubblingHandler: function (propertyName) {
        if (!this._eventBubblingHandlerCache[propertyName]) {
            this._eventBubblingHandlerCache[propertyName] = bind(function (name, model, newValue) {
                if (changeRE.test(name)) {
                    this.trigger('change:' + propertyName + '.' + name.split(':')[1], model, newValue);
                } else if (name === 'change') {
                    this.trigger('change', this);
                }
            }, this);
        }
        return this._eventBubblingHandlerCache[propertyName];
    },

    // Check that all required attributes are present
    _verifyRequired: function () {
        var attrs = this.attributes; // should include session
        for (var def in this._definition) {
            if (this._definition[def].required && typeof attrs[def] === 'undefined') {
                return false;
            }
        }
        return true;
    },

    // expose safeSet method
    _safeSet: function safeSet(property, value) {
        if (property in this) {
            throw new Error('Encountered namespace collision while setting instance property `' + property + '`');
        }
        this[property] = value;
        return this;
    }
});

// getter for attributes
Object.defineProperties(Base.prototype, {
    attributes: {
        get: function () {
            return this.getAttributes({props: true, session: true});
        }
    },
    all: {
        get: function () {
            return this.getAttributes({
                session: true,
                props: true,
                derived: true
            });
        }
    },
    isState: {
        get: function () { return true; },
        set: function () { }
    }
});

// helper for creating/storing property definitions and creating
// appropriate getters/setters
function createPropertyDefinition(object, name, desc, isSession) {
    var def = object._definition[name] = {};
    var type, descArray;

    if (isString(desc)) {
        // grab our type if all we've got is a string
        type = object._ensureValidType(desc);
        if (type) def.type = type;
    } else {
        //Transform array of ['type', required, default] to object form
        if (Array.isArray(desc)) {
            descArray = desc;
            desc = {
                type: descArray[0],
                required: descArray[1],
                'default': descArray[2]
            };
        }

        type = object._ensureValidType(desc.type);
        if (type) def.type = type;

        if (desc.required) def.required = true;

        if (desc['default'] && typeof desc['default'] === 'object') {
            throw new TypeError('The default value for ' + name + ' cannot be an object/array, must be a value or a function which returns a value/object/array');
        }

        def['default'] = desc['default'];

        def.allowNull = desc.allowNull ? desc.allowNull : false;
        if (desc.setOnce) def.setOnce = true;
        if (def.required && def['default'] === undefined && !def.setOnce) def['default'] = object._getDefaultForType(type);
        def.test = desc.test;
        def.values = desc.values;
    }
    if (isSession) def.session = true;

    if (!type) {
        type = isString(desc) ? desc : desc.type;
        // TODO: start throwing a TypeError in future major versions instead of warning
        console.warn('Invalid data type of `' + type + '` for `' + name + '` property. Use one of the default types or define your own');
    }

    // define a getter/setter on the prototype
    // but they get/set on the instance
    Object.defineProperty(object, name, {
        set: function (val) {
            this.set(name, val);
        },
        get: function () {
            if (!this._values) {
                throw Error('You may be trying to `extend` a state object with "' + name + '" which has been defined in `props` on the object being extended');
            }
            var value = this._values[name];
            var typeDef = this._dataTypes[def.type];
            if (typeof value !== 'undefined') {
                if (typeDef && typeDef.get) {
                    value = typeDef.get(value);
                }
                return value;
            }
            var defaultValue = result(def, 'default');
            this._values[name] = defaultValue;
            // If we've set a defaultValue, fire a change handler effectively marking
            // its change from undefined to the default value.
            if (typeof defaultValue !== 'undefined') {
                var onChange = this._getOnChangeForType(def.type);
                onChange(defaultValue, value, name);
            }
            return defaultValue;
        }
    });

    return def;
}

// helper for creating derived property definitions
function createDerivedProperty(modelProto, name, definition) {
    var def = modelProto._derived[name] = {
        fn: isFunction(definition) ? definition : definition.fn,
        cache: (definition.cache !== false),
        depList: definition.deps || []
    };

    // add to our shared dependency list
    def.depList.forEach(function (dep) {
        modelProto._deps[dep] = union(modelProto._deps[dep] || [], [name]);
    });

    // defined a top-level getter for derived names
    Object.defineProperty(modelProto, name, {
        get: function () {
            return this._getDerivedProperty(name);
        },
        set: function () {
            throw new TypeError("`" + name + "` is a derived property, it can't be set directly.");
        }
    });
}

var dataTypes = {
    string: {
        'default': function () {
            return '';
        }
    },
    date: {
        set: function (newVal) {
            var newType;
            if (newVal == null) {
                newType = typeof null;
            } else if (!isDate(newVal)) {
                var err = null;
                var dateVal = new Date(newVal).valueOf();
                if (isNaN(dateVal)) {
                    // If the newVal cant be parsed, then try parseInt first
                    dateVal = new Date(parseInt(newVal, 10)).valueOf();
                    if (isNaN(dateVal)) err = true;
                }
                newVal = dateVal;
                newType = 'date';
                if (err) {
                    newType = typeof newVal;
                }
            } else {
                newType = 'date';
                newVal = newVal.valueOf();
            }

            return {
                val: newVal,
                type: newType
            };
        },
        get: function (val) {
            if (val == null) { return val; }
            return new Date(val);
        },
        'default': function () {
            return new Date();
        }
    },
    array: {
        set: function (newVal) {
            return {
                val: newVal,
                type: Array.isArray(newVal) ? 'array' : typeof newVal
            };
        },
        'default': function () {
            return [];
        }
    },
    object: {
        set: function (newVal) {
            var newType = typeof newVal;
            // we have to have a way of supporting "missing" objects.
            // Null is an object, but setting a value to undefined
            // should work too, IMO. We just override it, in that case.
            if (newType !== 'object' && newVal === undefined) {
                newVal = null;
                newType = 'object';
            }
            return {
                val: newVal,
                type: newType
            };
        },
        'default': function () {
            return {};
        }
    },
    // the `state` data type is a bit special in that setting it should
    // also bubble events
    state: {
        set: function (newVal) {
            var isInstance = newVal instanceof Base || (newVal && newVal.isState);
            if (isInstance) {
                return {
                    val: newVal,
                    type: 'state'
                };
            } else {
                return {
                    val: newVal,
                    type: typeof newVal
                };
            }
        },
        compare: function (currentVal, newVal) {
            return currentVal === newVal;
        },

        onChange : function(newVal, previousVal, attributeName){
            // if this has changed we want to also handle
            // event propagation
            if (previousVal) {
                this.stopListening(previousVal, 'all', this._getCachedEventBubblingHandler(attributeName));
            }

            if (newVal != null) {
                this.listenTo(newVal, 'all', this._getCachedEventBubblingHandler(attributeName));
            }
        }
    }
};

// the extend method used to extend prototypes, maintain inheritance chains for instanceof
// and allow for additions to the model definitions.
function extend(protoProps) {
    /*jshint validthis:true*/
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    assign(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function () { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // set prototype level objects
    child.prototype._derived =  assign({}, parent.prototype._derived);
    child.prototype._deps = assign({}, parent.prototype._deps);
    child.prototype._definition = assign({}, parent.prototype._definition);
    child.prototype._collections = assign({}, parent.prototype._collections);
    child.prototype._children = assign({}, parent.prototype._children);
    child.prototype._dataTypes = assign({}, parent.prototype._dataTypes || dataTypes);

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        var omitFromExtend = [
            'dataTypes', 'props', 'session', 'derived', 'collections', 'children'
        ];
        for(var i = 0; i < arguments.length; i++) {
            var def = arguments[i];
            if (def.dataTypes) {
                forOwn(def.dataTypes, function (def, name) {
                    child.prototype._dataTypes[name] = def;
                });
            }
            if (def.props) {
                forOwn(def.props, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def);
                });
            }
            if (def.session) {
                forOwn(def.session, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def, true);
                });
            }
            if (def.derived) {
                forOwn(def.derived, function (def, name) {
                    createDerivedProperty(child.prototype, name, def);
                });
            }
            if (def.collections) {
                forOwn(def.collections, function (constructor, name) {
                    child.prototype._collections[name] = constructor;
                });
            }
            if (def.children) {
                forOwn(def.children, function (constructor, name) {
                    child.prototype._children[name] = constructor;
                });
            }
            assign(child.prototype, omit(def, omitFromExtend));
        }
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
}

Base.extend = extend;

// Our main exports
module.exports = Base;

},{"ampersand-events":327,"array-next":780,"key-tree-store":787,"lodash/assign":581,"lodash/bind":582,"lodash/escape":585,"lodash/forOwn":587,"lodash/has":588,"lodash/includes":590,"lodash/isDate":596,"lodash/isEqual":597,"lodash/isFunction":598,"lodash/isObject":600,"lodash/isString":603,"lodash/omit":611,"lodash/result":612,"lodash/union":619,"lodash/uniqueId":620}],405:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"./_getNative":511,"./_root":562,"dup":58}],406:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./_hashClear":520,"./_hashDelete":521,"./_hashGet":522,"./_hashHas":523,"./_hashSet":524,"dup":59}],407:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"./_baseCreate":437,"./_baseLodash":456,"dup":60}],408:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"./_listCacheClear":537,"./_listCacheDelete":538,"./_listCacheGet":539,"./_listCacheHas":540,"./_listCacheSet":541,"dup":61}],409:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./_baseCreate":437,"./_baseLodash":456,"dup":62}],410:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"./_getNative":511,"./_root":562,"dup":63}],411:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./_mapCacheClear":542,"./_mapCacheDelete":543,"./_mapCacheGet":544,"./_mapCacheHas":545,"./_mapCacheSet":546,"dup":64}],412:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"./_getNative":511,"./_root":562,"dup":65}],413:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"./_getNative":511,"./_root":562,"dup":66}],414:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"./_MapCache":411,"./_setCacheAdd":563,"./_setCacheHas":564,"dup":67}],415:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"./_ListCache":408,"./_stackClear":570,"./_stackDelete":571,"./_stackGet":572,"./_stackHas":573,"./_stackSet":574,"dup":68}],416:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./_root":562,"dup":7}],417:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"./_root":562,"dup":70}],418:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"./_getNative":511,"./_root":562,"dup":71}],419:[function(require,module,exports){
/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;

},{}],420:[function(require,module,exports){
/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

module.exports = addSetEntry;

},{}],421:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],422:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],423:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"dup":74}],424:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./_baseIndexOf":446,"dup":75}],425:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"dup":76}],426:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./_baseTimes":462,"./_isIndex":530,"./isArguments":591,"./isArray":592,"./isBuffer":595,"./isTypedArray":605,"dup":9}],427:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],428:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],429:[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],430:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"dup":80}],431:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./_baseAssignValue":435,"./eq":584,"dup":10}],432:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"./eq":584,"dup":82}],433:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keys = require('./keys');

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

},{"./_copyObject":482,"./keys":606}],434:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;

},{"./_copyObject":482,"./keysIn":607}],435:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./_defineProperty":498,"dup":11}],436:[function(require,module,exports){
var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    baseAssignIn = require('./_baseAssignIn'),
    cloneBuffer = require('./_cloneBuffer'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    copySymbolsIn = require('./_copySymbolsIn'),
    getAllKeys = require('./_getAllKeys'),
    getAllKeysIn = require('./_getAllKeysIn'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isObject = require('./isObject'),
    keys = require('./keys');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

},{"./_Stack":415,"./_arrayEach":422,"./_assignValue":431,"./_baseAssign":433,"./_baseAssignIn":434,"./_cloneBuffer":472,"./_copyArray":481,"./_copySymbols":483,"./_copySymbolsIn":484,"./_getAllKeys":505,"./_getAllKeysIn":506,"./_getTag":516,"./_initCloneArray":525,"./_initCloneByTag":526,"./_initCloneObject":527,"./isArray":592,"./isBuffer":595,"./isObject":600,"./keys":606}],437:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"./isObject":600,"dup":84}],438:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"dup":87}],439:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"./_arrayPush":428,"./_isFlattenable":529,"dup":88}],440:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"./_createBaseFor":488,"dup":89}],441:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"./_baseFor":440,"./keys":606,"dup":90}],442:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"./_castPath":470,"./_toKey":577,"dup":91}],443:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"./_arrayPush":428,"./isArray":592,"dup":92}],444:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./_Symbol":416,"./_getRawTag":513,"./_objectToString":555,"dup":12}],445:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;

},{}],446:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"./_baseFindIndex":438,"./_baseIsNaN":451,"./_strictIndexOf":575,"dup":95}],447:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./_baseGetTag":444,"./isObjectLike":601,"dup":13}],448:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var dateTag = '[object Date]';

/**
 * The base implementation of `_.isDate` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 */
function baseIsDate(value) {
  return isObjectLike(value) && baseGetTag(value) == dateTag;
}

module.exports = baseIsDate;

},{"./_baseGetTag":444,"./isObjectLike":601}],449:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"./_baseIsEqualDeep":450,"./isObjectLike":601,"dup":98}],450:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./_Stack":415,"./_equalArrays":499,"./_equalByTag":500,"./_equalObjects":501,"./_getTag":516,"./isArray":592,"./isBuffer":595,"./isTypedArray":605,"dup":99}],451:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101}],452:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./_isMasked":535,"./_toSource":578,"./isFunction":598,"./isObject":600,"dup":14}],453:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./_baseGetTag":444,"./isLength":599,"./isObjectLike":601,"dup":15}],454:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./_isPrototype":536,"./_nativeKeys":552,"dup":16}],455:[function(require,module,exports){
var isObject = require('./isObject'),
    isPrototype = require('./_isPrototype'),
    nativeKeysIn = require('./_nativeKeysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

},{"./_isPrototype":536,"./_nativeKeysIn":553,"./isObject":600}],456:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],457:[function(require,module,exports){
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;

},{}],458:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./_overRest":557,"./_setToString":567,"./identity":589,"dup":17}],459:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"./_metaMap":550,"./identity":589,"dup":115}],460:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./_defineProperty":498,"./constant":583,"./identity":589,"dup":18}],461:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"dup":117}],462:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],463:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"./_Symbol":416,"./_arrayMap":427,"./isArray":592,"./isSymbol":604,"dup":119}],464:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],465:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./_SetCache":414,"./_arrayIncludes":424,"./_arrayIncludesWith":425,"./_cacheHas":468,"./_createSet":495,"./_setToArray":566}],466:[function(require,module,exports){
var castPath = require('./_castPath'),
    last = require('./last'),
    parent = require('./_parent'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;

},{"./_castPath":470,"./_parent":558,"./_toKey":577,"./last":608}],467:[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;

},{"./_arrayMap":427}],468:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"dup":121}],469:[function(require,module,exports){
arguments[4][354][0].apply(exports,arguments)
},{"./identity":589,"dup":354}],470:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"./_isKey":532,"./_stringToPath":576,"./isArray":592,"./toString":618,"dup":122}],471:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

},{"./_Uint8Array":417}],472:[function(require,module,exports){
var root = require('./_root');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

},{"./_root":562}],473:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;

},{"./_cloneArrayBuffer":471}],474:[function(require,module,exports){
var addMapEntry = require('./_addMapEntry'),
    arrayReduce = require('./_arrayReduce'),
    mapToArray = require('./_mapToArray');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;

},{"./_addMapEntry":419,"./_arrayReduce":429,"./_mapToArray":547}],475:[function(require,module,exports){
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;

},{}],476:[function(require,module,exports){
var addSetEntry = require('./_addSetEntry'),
    arrayReduce = require('./_arrayReduce'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;

},{"./_addSetEntry":420,"./_arrayReduce":429,"./_setToArray":566}],477:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;

},{"./_Symbol":416}],478:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneArrayBuffer":471}],479:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"dup":123}],480:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124}],481:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],482:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"./_assignValue":431,"./_baseAssignValue":435,"dup":21}],483:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbols = require('./_getSymbols');

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

},{"./_copyObject":482,"./_getSymbols":514}],484:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbolsIn = require('./_getSymbolsIn');

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;

},{"./_copyObject":482,"./_getSymbolsIn":515}],485:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"./_root":562,"dup":22}],486:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],487:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./_baseRest":458,"./_isIterateeCall":531,"dup":23}],488:[function(require,module,exports){
arguments[4][131][0].apply(exports,arguments)
},{"dup":131}],489:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"./_createCtor":490,"./_root":562,"dup":132}],490:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"./_baseCreate":437,"./isObject":600,"dup":133}],491:[function(require,module,exports){
arguments[4][134][0].apply(exports,arguments)
},{"./_apply":421,"./_createCtor":490,"./_createHybrid":492,"./_createRecurry":494,"./_getHolder":509,"./_replaceHolders":561,"./_root":562,"dup":134}],492:[function(require,module,exports){
arguments[4][136][0].apply(exports,arguments)
},{"./_composeArgs":479,"./_composeArgsRight":480,"./_countHolders":486,"./_createCtor":490,"./_createRecurry":494,"./_getHolder":509,"./_reorder":560,"./_replaceHolders":561,"./_root":562,"dup":136}],493:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"./_apply":421,"./_createCtor":490,"./_root":562,"dup":137}],494:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"./_isLaziable":534,"./_setData":565,"./_setWrapToString":568,"dup":138}],495:[function(require,module,exports){
var Set = require('./_Set'),
    noop = require('./noop'),
    setToArray = require('./_setToArray');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;

},{"./_Set":413,"./_setToArray":566,"./noop":610}],496:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"./_baseSetData":459,"./_createBind":489,"./_createCurry":491,"./_createHybrid":492,"./_createPartial":493,"./_getData":507,"./_mergeData":549,"./_setData":565,"./_setWrapToString":568,"./toInteger":616,"dup":139}],497:[function(require,module,exports){
var isPlainObject = require('./isPlainObject');

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

module.exports = customOmitClone;

},{"./isPlainObject":602}],498:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./_getNative":511,"dup":24}],499:[function(require,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"./_SetCache":414,"./_arraySome":430,"./_cacheHas":468,"dup":141}],500:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"./_Symbol":416,"./_Uint8Array":417,"./_equalArrays":499,"./_mapToArray":547,"./_setToArray":566,"./eq":584,"dup":142}],501:[function(require,module,exports){
arguments[4][143][0].apply(exports,arguments)
},{"./_getAllKeys":505,"dup":143}],502:[function(require,module,exports){
var basePropertyOf = require('./_basePropertyOf');

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
var escapeHtmlChar = basePropertyOf(htmlEscapes);

module.exports = escapeHtmlChar;

},{"./_basePropertyOf":457}],503:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"./_overRest":557,"./_setToString":567,"./flatten":586,"dup":144}],504:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],505:[function(require,module,exports){
arguments[4][146][0].apply(exports,arguments)
},{"./_baseGetAllKeys":443,"./_getSymbols":514,"./keys":606,"dup":146}],506:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbolsIn = require('./_getSymbolsIn'),
    keysIn = require('./keysIn');

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;

},{"./_baseGetAllKeys":443,"./_getSymbolsIn":515,"./keysIn":607}],507:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"./_metaMap":550,"./noop":610,"dup":147}],508:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"./_realNames":559,"dup":148}],509:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],510:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"./_isKeyable":533,"dup":150}],511:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./_baseIsNative":452,"./_getValue":517,"dup":26}],512:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":556}],513:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./_Symbol":416,"dup":27}],514:[function(require,module,exports){
arguments[4][154][0].apply(exports,arguments)
},{"./_arrayFilter":423,"./stubArray":613,"dup":154}],515:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    getPrototype = require('./_getPrototype'),
    getSymbols = require('./_getSymbols'),
    stubArray = require('./stubArray');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;

},{"./_arrayPush":428,"./_getPrototype":512,"./_getSymbols":514,"./stubArray":613}],516:[function(require,module,exports){
arguments[4][155][0].apply(exports,arguments)
},{"./_DataView":405,"./_Map":410,"./_Promise":412,"./_Set":413,"./_WeakMap":418,"./_baseGetTag":444,"./_toSource":578,"dup":155}],517:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],518:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"dup":157}],519:[function(require,module,exports){
arguments[4][158][0].apply(exports,arguments)
},{"./_castPath":470,"./_isIndex":530,"./_toKey":577,"./isArguments":591,"./isArray":592,"./isLength":599,"dup":158}],520:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"./_nativeCreate":551,"dup":159}],521:[function(require,module,exports){
arguments[4][160][0].apply(exports,arguments)
},{"dup":160}],522:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"./_nativeCreate":551,"dup":161}],523:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"./_nativeCreate":551,"dup":162}],524:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"./_nativeCreate":551,"dup":163}],525:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],526:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer'),
    cloneDataView = require('./_cloneDataView'),
    cloneMap = require('./_cloneMap'),
    cloneRegExp = require('./_cloneRegExp'),
    cloneSet = require('./_cloneSet'),
    cloneSymbol = require('./_cloneSymbol'),
    cloneTypedArray = require('./_cloneTypedArray');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

},{"./_cloneArrayBuffer":471,"./_cloneDataView":473,"./_cloneMap":474,"./_cloneRegExp":475,"./_cloneSet":476,"./_cloneSymbol":477,"./_cloneTypedArray":478}],527:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

},{"./_baseCreate":437,"./_getPrototype":512,"./_isPrototype":536}],528:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"dup":164}],529:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"./_Symbol":416,"./isArguments":591,"./isArray":592,"dup":165}],530:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],531:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./_isIndex":530,"./eq":584,"./isArrayLike":593,"./isObject":600,"dup":30}],532:[function(require,module,exports){
arguments[4][168][0].apply(exports,arguments)
},{"./isArray":592,"./isSymbol":604,"dup":168}],533:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"dup":169}],534:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"./_LazyWrapper":407,"./_getData":507,"./_getFuncName":508,"./wrapperLodash":622,"dup":170}],535:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./_coreJsData":485,"dup":31}],536:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],537:[function(require,module,exports){
arguments[4][174][0].apply(exports,arguments)
},{"dup":174}],538:[function(require,module,exports){
arguments[4][175][0].apply(exports,arguments)
},{"./_assocIndexOf":432,"dup":175}],539:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"./_assocIndexOf":432,"dup":176}],540:[function(require,module,exports){
arguments[4][177][0].apply(exports,arguments)
},{"./_assocIndexOf":432,"dup":177}],541:[function(require,module,exports){
arguments[4][178][0].apply(exports,arguments)
},{"./_assocIndexOf":432,"dup":178}],542:[function(require,module,exports){
arguments[4][179][0].apply(exports,arguments)
},{"./_Hash":406,"./_ListCache":408,"./_Map":410,"dup":179}],543:[function(require,module,exports){
arguments[4][180][0].apply(exports,arguments)
},{"./_getMapData":510,"dup":180}],544:[function(require,module,exports){
arguments[4][181][0].apply(exports,arguments)
},{"./_getMapData":510,"dup":181}],545:[function(require,module,exports){
arguments[4][182][0].apply(exports,arguments)
},{"./_getMapData":510,"dup":182}],546:[function(require,module,exports){
arguments[4][183][0].apply(exports,arguments)
},{"./_getMapData":510,"dup":183}],547:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"dup":184}],548:[function(require,module,exports){
arguments[4][186][0].apply(exports,arguments)
},{"./memoize":609,"dup":186}],549:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"./_composeArgs":479,"./_composeArgsRight":480,"./_replaceHolders":561,"dup":187}],550:[function(require,module,exports){
arguments[4][188][0].apply(exports,arguments)
},{"./_WeakMap":418,"dup":188}],551:[function(require,module,exports){
arguments[4][189][0].apply(exports,arguments)
},{"./_getNative":511,"dup":189}],552:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./_overArg":556,"dup":33}],553:[function(require,module,exports){
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

},{}],554:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"./_freeGlobal":504,"dup":34}],555:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],556:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],557:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"./_apply":421,"dup":37}],558:[function(require,module,exports){
arguments[4][195][0].apply(exports,arguments)
},{"./_baseGet":442,"./_baseSlice":461,"dup":195}],559:[function(require,module,exports){
arguments[4][196][0].apply(exports,arguments)
},{"dup":196}],560:[function(require,module,exports){
arguments[4][197][0].apply(exports,arguments)
},{"./_copyArray":481,"./_isIndex":530,"dup":197}],561:[function(require,module,exports){
arguments[4][198][0].apply(exports,arguments)
},{"dup":198}],562:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./_freeGlobal":504,"dup":38}],563:[function(require,module,exports){
arguments[4][200][0].apply(exports,arguments)
},{"dup":200}],564:[function(require,module,exports){
arguments[4][201][0].apply(exports,arguments)
},{"dup":201}],565:[function(require,module,exports){
arguments[4][202][0].apply(exports,arguments)
},{"./_baseSetData":459,"./_shortOut":569,"dup":202}],566:[function(require,module,exports){
arguments[4][203][0].apply(exports,arguments)
},{"dup":203}],567:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"./_baseSetToString":460,"./_shortOut":569,"dup":39}],568:[function(require,module,exports){
arguments[4][205][0].apply(exports,arguments)
},{"./_getWrapDetails":518,"./_insertWrapDetails":528,"./_setToString":567,"./_updateWrapDetails":579,"dup":205}],569:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],570:[function(require,module,exports){
arguments[4][207][0].apply(exports,arguments)
},{"./_ListCache":408,"dup":207}],571:[function(require,module,exports){
arguments[4][208][0].apply(exports,arguments)
},{"dup":208}],572:[function(require,module,exports){
arguments[4][209][0].apply(exports,arguments)
},{"dup":209}],573:[function(require,module,exports){
arguments[4][210][0].apply(exports,arguments)
},{"dup":210}],574:[function(require,module,exports){
arguments[4][211][0].apply(exports,arguments)
},{"./_ListCache":408,"./_Map":410,"./_MapCache":411,"dup":211}],575:[function(require,module,exports){
arguments[4][212][0].apply(exports,arguments)
},{"dup":212}],576:[function(require,module,exports){
arguments[4][213][0].apply(exports,arguments)
},{"./_memoizeCapped":548,"dup":213}],577:[function(require,module,exports){
arguments[4][214][0].apply(exports,arguments)
},{"./isSymbol":604,"dup":214}],578:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],579:[function(require,module,exports){
arguments[4][216][0].apply(exports,arguments)
},{"./_arrayEach":422,"./_arrayIncludes":424,"dup":216}],580:[function(require,module,exports){
arguments[4][217][0].apply(exports,arguments)
},{"./_LazyWrapper":407,"./_LodashWrapper":409,"./_copyArray":481,"dup":217}],581:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./_assignValue":431,"./_copyObject":482,"./_createAssigner":487,"./_isPrototype":536,"./isArrayLike":593,"./keys":606,"dup":42}],582:[function(require,module,exports){
arguments[4][219][0].apply(exports,arguments)
},{"./_baseRest":458,"./_createWrap":496,"./_getHolder":509,"./_replaceHolders":561,"dup":219}],583:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],584:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],585:[function(require,module,exports){
var escapeHtmlChar = require('./_escapeHtmlChar'),
    toString = require('./toString');

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"']/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;

},{"./_escapeHtmlChar":502,"./toString":618}],586:[function(require,module,exports){
arguments[4][225][0].apply(exports,arguments)
},{"./_baseFlatten":439,"dup":225}],587:[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    castFunction = require('./_castFunction');

/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forOwn(object, iteratee) {
  return object && baseForOwn(object, castFunction(iteratee));
}

module.exports = forOwn;

},{"./_baseForOwn":441,"./_castFunction":469}],588:[function(require,module,exports){
var baseHas = require('./_baseHas'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;

},{"./_baseHas":445,"./_hasPath":519}],589:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],590:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    toInteger = require('./toInteger'),
    values = require('./values');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;

},{"./_baseIndexOf":446,"./isArrayLike":593,"./isString":603,"./toInteger":616,"./values":621}],591:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./_baseIsArguments":447,"./isObjectLike":601,"dup":46}],592:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],593:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./isFunction":598,"./isLength":599,"dup":48}],594:[function(require,module,exports){
arguments[4][233][0].apply(exports,arguments)
},{"./isArrayLike":593,"./isObjectLike":601,"dup":233}],595:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"./_root":562,"./stubFalse":614,"dup":49}],596:[function(require,module,exports){
var baseIsDate = require('./_baseIsDate'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsDate = nodeUtil && nodeUtil.isDate;

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * _.isDate(new Date);
 * // => true
 *
 * _.isDate('Mon April 23 2012');
 * // => false
 */
var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

module.exports = isDate;

},{"./_baseIsDate":448,"./_baseUnary":464,"./_nodeUtil":554}],597:[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

},{"./_baseIsEqual":449}],598:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"./_baseGetTag":444,"./isObject":600,"dup":50}],599:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],600:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],601:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],602:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":444,"./_getPrototype":512,"./isObjectLike":601}],603:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;

},{"./_baseGetTag":444,"./isArray":592,"./isObjectLike":601}],604:[function(require,module,exports){
arguments[4][239][0].apply(exports,arguments)
},{"./_baseGetTag":444,"./isObjectLike":601,"dup":239}],605:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./_baseIsTypedArray":453,"./_baseUnary":464,"./_nodeUtil":554,"dup":54}],606:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"./_arrayLikeKeys":426,"./_baseKeys":454,"./isArrayLike":593,"dup":55}],607:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeysIn = require('./_baseKeysIn'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

},{"./_arrayLikeKeys":426,"./_baseKeysIn":455,"./isArrayLike":593}],608:[function(require,module,exports){
arguments[4][242][0].apply(exports,arguments)
},{"dup":242}],609:[function(require,module,exports){
arguments[4][243][0].apply(exports,arguments)
},{"./_MapCache":411,"dup":243}],610:[function(require,module,exports){
arguments[4][244][0].apply(exports,arguments)
},{"dup":244}],611:[function(require,module,exports){
var arrayMap = require('./_arrayMap'),
    baseClone = require('./_baseClone'),
    baseUnset = require('./_baseUnset'),
    castPath = require('./_castPath'),
    copyObject = require('./_copyObject'),
    customOmitClone = require('./_customOmitClone'),
    flatRest = require('./_flatRest'),
    getAllKeysIn = require('./_getAllKeysIn');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

module.exports = omit;

},{"./_arrayMap":427,"./_baseClone":436,"./_baseUnset":466,"./_castPath":470,"./_copyObject":482,"./_customOmitClone":497,"./_flatRest":503,"./_getAllKeysIn":506}],612:[function(require,module,exports){
var castPath = require('./_castPath'),
    isFunction = require('./isFunction'),
    toKey = require('./_toKey');

/**
 * This method is like `_.get` except that if the resolved value is a
 * function it's invoked with the `this` binding of its parent object and
 * its result is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to resolve.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
 *
 * _.result(object, 'a[0].b.c1');
 * // => 3
 *
 * _.result(object, 'a[0].b.c2');
 * // => 4
 *
 * _.result(object, 'a[0].b.c3', 'default');
 * // => 'default'
 *
 * _.result(object, 'a[0].b.c3', _.constant('default'));
 * // => 'default'
 */
function result(object, path, defaultValue) {
  path = castPath(path, object);

  var index = -1,
      length = path.length;

  // Ensure the loop is entered when path is empty.
  if (!length) {
    length = 1;
    object = undefined;
  }
  while (++index < length) {
    var value = object == null ? undefined : object[toKey(path[index])];
    if (value === undefined) {
      index = length;
      value = defaultValue;
    }
    object = isFunction(value) ? value.call(object) : value;
  }
  return object;
}

module.exports = result;

},{"./_castPath":470,"./_toKey":577,"./isFunction":598}],613:[function(require,module,exports){
arguments[4][247][0].apply(exports,arguments)
},{"dup":247}],614:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],615:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"./toNumber":617,"dup":249}],616:[function(require,module,exports){
arguments[4][250][0].apply(exports,arguments)
},{"./toFinite":615,"dup":250}],617:[function(require,module,exports){
arguments[4][251][0].apply(exports,arguments)
},{"./isObject":600,"./isSymbol":604,"dup":251}],618:[function(require,module,exports){
arguments[4][252][0].apply(exports,arguments)
},{"./_baseToString":463,"dup":252}],619:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    baseRest = require('./_baseRest'),
    baseUniq = require('./_baseUniq'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

module.exports = union;

},{"./_baseFlatten":439,"./_baseRest":458,"./_baseUniq":465,"./isArrayLikeObject":594}],620:[function(require,module,exports){
arguments[4][403][0].apply(exports,arguments)
},{"./toString":618,"dup":403}],621:[function(require,module,exports){
var baseValues = require('./_baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;

},{"./_baseValues":467,"./keys":606}],622:[function(require,module,exports){
arguments[4][253][0].apply(exports,arguments)
},{"./_LazyWrapper":407,"./_LodashWrapper":409,"./_baseLodash":456,"./_wrapperClone":580,"./isArray":592,"./isObjectLike":601,"dup":253}],623:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-view"] = window.ampersand["ampersand-view"] || [];  window.ampersand["ampersand-view"].push("10.0.1");}
var State = require('ampersand-state');
var CollectionView = require('ampersand-collection-view');
var domify = require('domify');
var uniqueId = require("lodash/uniqueId");
var pick = require("lodash/pick");
var assign = require("lodash/assign");
var forEach = require("lodash/forEach");
var result = require("lodash/result");
var last = require("lodash/last");
var isString = require("lodash/isString");
var bind = require("lodash/bind");
var flatten = require("lodash/flatten");
var invokeMap = require("lodash/invokeMap");
var events = require('events-mixin');
var matches = require('matches-selector');
var bindings = require('ampersand-dom-bindings');
var getPath = require('lodash/get');

function View(attrs) {
    this.cid = uniqueId('view');
    attrs || (attrs = {});
    var parent = attrs.parent;
    delete attrs.parent;
    BaseState.call(this, attrs, {init: false, parent: parent});
    this.on('change:el', this._handleElementChange, this);
    this._upsertBindings();
    this.template = attrs.template || this.template;
    this._cache.rendered = false; // prep `rendered` derived cache immediately
    this.initialize.apply(this, arguments);
    if (this.autoRender && this.template) {
        this.render();
    }
}

var BaseState = State.extend({
    dataTypes: {
        element: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal instanceof Element ? 'element' : typeof newVal
                };
            },
            compare: function (el1, el2) {
                return el1 === el2;
            }
        },
        collection: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal && newVal.isCollection ? 'collection' : typeof newVal
                };
            },
            compare: function (currentVal, newVal) {
                return currentVal === newVal;
            }
        }
    },
    props: {
        model: 'state',
        el: 'element',
        collection: 'collection',
    },
    session: {
        _rendered: ['boolean', true, false]
    },
    derived: {
        hasData: {
            deps: ['model'],
            fn: function () {
                return !!this.model;
            }
        },
        rendered: {
            deps: ['_rendered'],
            fn: function() {
                if (this._rendered) {
                    this.trigger('render', this);
                    return true;
                }
                this.trigger('remove', this);
                return false;
            }
        }
    }
});

// Cached regex to split keys for `delegate`.
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

View.prototype = Object.create(BaseState.prototype);

var queryNoElMsg = 'Query cannot be performed as this.el is not defined. Ensure that the view has been rendered.';

// Set up all inheritable properties and methods.
assign(View.prototype, {
    // ## query
    // Get an single element based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`.
    // If you pass an element we just return it back.
    // This lets us use `get` to handle cases where users
    // can pass a selector or an already selected element.
    query: function (selector) {
        if (!this.el) {
            throw new Error(queryNoElMsg);
        }
        if (!selector) return this.el;
        if (typeof selector === 'string') {
            if (matches(this.el, selector)) return this.el;
            return this.el.querySelector(selector) || undefined;
        }
        return selector;
    },

    // ## queryAll
    // Returns an array of elements based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`. Also includes root
    // element.
    queryAll: function (selector) {
        if (!this.el) {
            throw new Error(queryNoElMsg);
        }
        if (!selector) return [this.el];
        var res = [];
        if (matches(this.el, selector)) res.push(this.el);
        return res.concat(Array.prototype.slice.call(this.el.querySelectorAll(selector)));
    },

    // ## queryByHook
    // Convenience method for fetching element by it's `data-hook` attribute.
    // Also tries to match against root element.
    // Also supports matching 'one' of several space separated hooks.
    queryByHook: function (hook) {
        return this.query('[data-hook~="' + hook + '"]');
    },

    // ## queryAllByHook
    // Convenience method for fetching all elements by their's `data-hook` attribute.
    queryAllByHook: function (hook) {
        return this.queryAll('[data-hook~="' + hook + '"]');
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {},

    // **render** is the core function that your view can override. Its job is
    // to populate its element (`this.el`), with the appropriate HTML.
    _render: function () {
        this._upsertBindings();
        this.renderWithTemplate(this);
        this._rendered = true;
        return this;
    },

    // Removes this view by taking the element out of the DOM, and removing any
    // applicable events listeners.
    _remove: function () {
        if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
        this._rendered = false;
        this._downsertBindings();
        return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    _handleElementChange: function (element, delegate) {
        if (this.eventManager) this.eventManager.unbind();
        this.eventManager = events(this.el, this);
        this.delegateEvents();
        this._applyBindingsForKey();
        return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function (e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function (events) {
        if (!(events || (events = result(this, 'events')))) return this;
        this.undelegateEvents();
        for (var key in events) {
            this.eventManager.bind(key, events[key]);
        }
        return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function () {
        this.eventManager.unbind();
        return this;
    },

    // ## registerSubview
    // Pass it a view. This can be anything with a `remove` method
    registerSubview: function (view) {
        // Storage for our subviews.
        this._subviews = this._subviews || [];
        this._subviews.push(view);
        // set the parent reference if it has not been set
        if (!view.parent) view.parent = this;
        return view;
    },

    // ## renderSubview
    // Pass it a view instance and a container element
    // to render it in. It's `remove` method will be called
    // when the parent view is destroyed.
    renderSubview: function (view, container) {
        if (typeof container === 'string') {
            container = this.query(container);
        }
        if (!container) container = this.el;
        this.registerSubview(view);
        container.appendChild(view.render().el);
        return view;
    },

    _applyBindingsForKey: function (name) {
        if (!this.el) return;
        var fns = this._parsedBindings.getGrouped(name);
        var item;
        for (item in fns) {
            fns[item].forEach(function (fn) {
                fn(this.el, getPath(this, item), last(item.split('.')));
            }, this);
        }
    },

    _initializeBindings: function () {
        if (!this.bindings) return;
        this.on('all', function (eventName) {
            if (eventName.slice(0, 7) === 'change:') {
                this._applyBindingsForKey(eventName.split(':')[1]);
            }
        }, this);
    },

    // ## _initializeSubviews
    // this is called at setup and grabs declared subviews
    _initializeSubviews: function () {
        if (!this.subviews) return;
        for (var item in this.subviews) {
            this._parseSubview(this.subviews[item], item);
        }
    },

    // ## _parseSubview
    // helper for parsing out the subview declaration and registering
    // the `waitFor` if need be.
    _parseSubview: function (subview, name) {
        //backwards compatibility with older versions, when `container` was a valid property (#114)
        if (subview.container) {
            subview.selector = subview.container;
        }
        var opts = this._parseSubviewOpts(subview);

        function action() {
            var el, subview;
            // if not rendered or we can't find our element, stop here.
            if (!this.el || !(el = this.query(opts.selector))) return;
            if (!opts.waitFor || getPath(this, opts.waitFor)) {
                subview = this[name] = opts.prepareView.call(this, el);
                if (!subview.el) {
                    this.renderSubview(subview, el);
                } else {
                    subview.render();
                    this.registerSubview(subview);
                }
                this.off('change', action);
            }
        }
        // we listen for main `change` items
        this.on('change', action, this);
    },

    // Parses the declarative subview definition.
    // You may overload this method to create your own declarative subview style.
    // You must return an object with members 'selector', 'waitFor' and 'prepareView'.
    // waitFor is trigged on the view 'change' event and so one way to extend the deferred view
    // construction is to add an additional property (props) to the view. Then setting this property
    // will satisfy the waitFor condition. You can then extend the prepareView function to pass in
    // additional data from the parent view. This can allow you to have multi-stage rendering of
    // custom data formats and to declaratively define.
    _parseSubviewOpts: function (subview) {
        var self = this;
        var opts = {
            selector: subview.selector || '[data-hook="' + subview.hook + '"]',
            waitFor: subview.waitFor || '',
            prepareView: subview.prepareView || function () {
                return new subview.constructor({
                    parent: self
                });
            }
        };
        return opts;
    },

    // Shortcut for doing everything we need to do to
    // render and fully replace current root element.
    // Either define a `template` property of your view
    // or pass in a template directly.
    // The template can either be a string or a function.
    // If it's a function it will be passed the `context`
    // argument.
    renderWithTemplate: function (context, templateArg) {
        var template = templateArg || this.template;
        if (!template) throw new Error('Template string or function needed.');
        var newDom = isString(template) ? template : template.call(this, context || this);
        if (isString(newDom)) newDom = domify(newDom);
        var parent = this.el && this.el.parentNode;
        if (parent) parent.replaceChild(newDom, this.el);
        if (newDom.nodeName === '#document-fragment') throw new Error('Views can only have one root element, including comment nodes.');
        this.el = newDom;
        return this;
    },

    // ## cacheElements
    // This is a shortcut for adding reference to specific elements within your view for
    // access later. This avoids excessive DOM queries and makes it easier to update
    // your view if your template changes.
    //
    // In your `render` method. Use it like so:
    //
    //     render: function () {
    //       this.basicRender();
    //       this.cacheElements({
    //         pages: '#pages',
    //         chat: '#teamChat',
    //         nav: 'nav#views ul',
    //         me: '#me',
    //         cheatSheet: '#cheatSheet',
    //         omniBox: '#awesomeSauce'
    //       });
    //     }
    //
    // Then later you can access elements by reference like so: `this.pages`, or `this.chat`.
    cacheElements: function (hash) {
        for (var item in hash) {
            this[item] = this.query(hash[item]);
        }
        return this;
    },

    // ## listenToAndRun
    // Shortcut for registering a listener for a model
    // and also triggering it right away.
    listenToAndRun: function (object, events, handler) {
        var bound = bind(handler, this);
        this.listenTo(object, events, bound);
        bound();
    },

    // ## animateRemove
    // Placeholder for if you want to do something special when they're removed.
    // For example fade it out, etc.
    // Any override here should call `.remove()` when done.
    animateRemove: function () {
        this.remove();
    },

    // ## renderCollection
    // Method for rendering a collections with individual views.
    // Just pass it the collection, and the view to use for the items in the
    // collection. The collectionView is returned.
    renderCollection: function (collection, ViewClass, container, opts) {
        var containerEl = (typeof container === 'string') ? this.query(container) : container;
        var config = assign({
            collection: collection,
            el: containerEl || this.el,
            view: ViewClass,
            parent: this,
            viewOptions: {
                parent: this
            }
        }, opts);
        var collectionView = new CollectionView(config);
        collectionView.render();
        return this.registerSubview(collectionView);
    },

    _setRender: function(obj) {
        Object.defineProperty(obj, 'render', {
            get: function() {
                return this._render;
            },
            set: function(fn) {
                this._render = function() {
                    fn.apply(this, arguments);
                    this._rendered = true;
                    return this;
                };
            }
        });
    },

    _setRemove: function(obj) {
        Object.defineProperty(obj, 'remove', {
            get: function() {
                return this._remove;
            },
            set: function(fn) {
                this._remove = function() {
                    fn.apply(this, arguments);
                    this._rendered = false;
                    return this;
                };
            }
        });
    },

    _downsertBindings: function() {
        var parsedBindings = this._parsedBindings;
        if (!this.bindingsSet) return;
        if (this._subviews) invokeMap(flatten(this._subviews), 'remove');
        this.stopListening();
        // TODO: Not sure if this is actually necessary.
        // Just trying to de-reference this potentially large
        // amount of generated functions to avoid memory leaks.
        forEach(parsedBindings, function (properties, modelName) {
            forEach(properties, function (value, key) {
                delete parsedBindings[modelName][key];
            });
            delete parsedBindings[modelName];
        });
        this.bindingsSet = false;
    },

    _upsertBindings: function(attrs) {
        attrs = attrs || this;
        if (this.bindingsSet) return;
        this._parsedBindings = bindings(this.bindings, this);
        this._initializeBindings();
        if (attrs.el && !this.autoRender) {
            this._handleElementChange();
        }
        this._initializeSubviews();
        this.bindingsSet = true;
    }
});

View.prototype._setRender(View.prototype);
View.prototype._setRemove(View.prototype);
View.extend = BaseState.extend;
module.exports = View;

},{"ampersand-collection-view":57,"ampersand-dom-bindings":254,"ampersand-state":404,"domify":785,"events-mixin":786,"lodash/assign":746,"lodash/bind":747,"lodash/flatten":750,"lodash/forEach":751,"lodash/get":752,"lodash/invokeMap":755,"lodash/isString":764,"lodash/last":768,"lodash/pick":771,"lodash/result":772,"lodash/uniqueId":778,"matches-selector":788}],624:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./_hashClear":698,"./_hashDelete":699,"./_hashGet":700,"./_hashHas":701,"./_hashSet":702,"dup":59}],625:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"./_baseCreate":641,"./_baseLodash":657,"dup":60}],626:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"./_listCacheClear":712,"./_listCacheDelete":713,"./_listCacheGet":714,"./_listCacheHas":715,"./_listCacheSet":716,"dup":61}],627:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./_baseCreate":641,"./_baseLodash":657,"dup":62}],628:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"./_getNative":693,"./_root":735,"dup":63}],629:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./_mapCacheClear":717,"./_mapCacheDelete":718,"./_mapCacheGet":719,"./_mapCacheHas":720,"./_mapCacheSet":721,"dup":64}],630:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./_root":735,"dup":7}],631:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"./_getNative":693,"./_root":735,"dup":71}],632:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],633:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],634:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./_baseIndexOf":650,"dup":75}],635:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./_baseTimes":665,"./_isIndex":705,"./isArguments":756,"./isArray":757,"./isBuffer":759,"./isTypedArray":766,"dup":9}],636:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],637:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],638:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./_baseAssignValue":640,"./eq":749,"dup":10}],639:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"./eq":749,"dup":82}],640:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./_defineProperty":686,"dup":11}],641:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"./isObject":762,"dup":84}],642:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"./_baseForOwn":646,"./_createBaseEach":677,"dup":86}],643:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"dup":87}],644:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"./_arrayPush":637,"./_isFlattenable":704,"dup":88}],645:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"./_createBaseFor":678,"dup":89}],646:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"./_baseFor":645,"./keys":767,"dup":90}],647:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"./_castPath":669,"./_toKey":742,"dup":91}],648:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./_Symbol":630,"./_getRawTag":694,"./_objectToString":728,"dup":12}],649:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"dup":94}],650:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"./_baseFindIndex":643,"./_baseIsNaN":653,"./_strictIndexOf":740,"dup":95}],651:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"./_apply":632,"./_castPath":669,"./_parent":731,"./_toKey":742,"./last":768,"dup":96}],652:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./_baseGetTag":648,"./isObjectLike":763,"dup":13}],653:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101}],654:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./_isMasked":710,"./_toSource":743,"./isFunction":760,"./isObject":762,"dup":14}],655:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./_baseGetTag":648,"./isLength":761,"./isObjectLike":763,"dup":15}],656:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./_isPrototype":711,"./_nativeKeys":726,"dup":16}],657:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],658:[function(require,module,exports){
arguments[4][109][0].apply(exports,arguments)
},{"./_basePickBy":659,"./hasIn":753,"dup":109}],659:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"./_baseGet":647,"./_baseSet":661,"./_castPath":669,"dup":110}],660:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./_overRest":730,"./_setToString":737,"./identity":754,"dup":17}],661:[function(require,module,exports){
arguments[4][114][0].apply(exports,arguments)
},{"./_assignValue":638,"./_castPath":669,"./_isIndex":705,"./_toKey":742,"./isObject":762,"dup":114}],662:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"./_metaMap":724,"./identity":754,"dup":115}],663:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./_defineProperty":686,"./constant":748,"./identity":754,"dup":18}],664:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"dup":117}],665:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],666:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"./_Symbol":630,"./_arrayMap":636,"./isArray":757,"./isSymbol":765,"dup":119}],667:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],668:[function(require,module,exports){
arguments[4][354][0].apply(exports,arguments)
},{"./identity":754,"dup":354}],669:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"./_isKey":707,"./_stringToPath":741,"./isArray":757,"./toString":777,"dup":122}],670:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"dup":123}],671:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124}],672:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],673:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"./_assignValue":638,"./_baseAssignValue":640,"dup":21}],674:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"./_root":735,"dup":22}],675:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],676:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./_baseRest":660,"./_isIterateeCall":706,"dup":23}],677:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"./isArrayLike":758,"dup":130}],678:[function(require,module,exports){
arguments[4][131][0].apply(exports,arguments)
},{"dup":131}],679:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"./_createCtor":680,"./_root":735,"dup":132}],680:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"./_baseCreate":641,"./isObject":762,"dup":133}],681:[function(require,module,exports){
arguments[4][134][0].apply(exports,arguments)
},{"./_apply":632,"./_createCtor":680,"./_createHybrid":682,"./_createRecurry":684,"./_getHolder":691,"./_replaceHolders":734,"./_root":735,"dup":134}],682:[function(require,module,exports){
arguments[4][136][0].apply(exports,arguments)
},{"./_composeArgs":670,"./_composeArgsRight":671,"./_countHolders":675,"./_createCtor":680,"./_createRecurry":684,"./_getHolder":691,"./_reorder":733,"./_replaceHolders":734,"./_root":735,"dup":136}],683:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"./_apply":632,"./_createCtor":680,"./_root":735,"dup":137}],684:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"./_isLaziable":709,"./_setData":736,"./_setWrapToString":738,"dup":138}],685:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"./_baseSetData":662,"./_createBind":679,"./_createCurry":681,"./_createHybrid":682,"./_createPartial":683,"./_getData":689,"./_mergeData":723,"./_setData":736,"./_setWrapToString":738,"./toInteger":775,"dup":139}],686:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./_getNative":693,"dup":24}],687:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"./_overRest":730,"./_setToString":737,"./flatten":750,"dup":144}],688:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],689:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"./_metaMap":724,"./noop":770,"dup":147}],690:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"./_realNames":732,"dup":148}],691:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],692:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"./_isKeyable":708,"dup":150}],693:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./_baseIsNative":654,"./_getValue":695,"dup":26}],694:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./_Symbol":630,"dup":27}],695:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],696:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"dup":157}],697:[function(require,module,exports){
arguments[4][158][0].apply(exports,arguments)
},{"./_castPath":669,"./_isIndex":705,"./_toKey":742,"./isArguments":756,"./isArray":757,"./isLength":761,"dup":158}],698:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"./_nativeCreate":725,"dup":159}],699:[function(require,module,exports){
arguments[4][160][0].apply(exports,arguments)
},{"dup":160}],700:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"./_nativeCreate":725,"dup":161}],701:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"./_nativeCreate":725,"dup":162}],702:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"./_nativeCreate":725,"dup":163}],703:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"dup":164}],704:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"./_Symbol":630,"./isArguments":756,"./isArray":757,"dup":165}],705:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],706:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./_isIndex":705,"./eq":749,"./isArrayLike":758,"./isObject":762,"dup":30}],707:[function(require,module,exports){
arguments[4][168][0].apply(exports,arguments)
},{"./isArray":757,"./isSymbol":765,"dup":168}],708:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"dup":169}],709:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"./_LazyWrapper":625,"./_getData":689,"./_getFuncName":690,"./wrapperLodash":779,"dup":170}],710:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./_coreJsData":674,"dup":31}],711:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],712:[function(require,module,exports){
arguments[4][174][0].apply(exports,arguments)
},{"dup":174}],713:[function(require,module,exports){
arguments[4][175][0].apply(exports,arguments)
},{"./_assocIndexOf":639,"dup":175}],714:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"./_assocIndexOf":639,"dup":176}],715:[function(require,module,exports){
arguments[4][177][0].apply(exports,arguments)
},{"./_assocIndexOf":639,"dup":177}],716:[function(require,module,exports){
arguments[4][178][0].apply(exports,arguments)
},{"./_assocIndexOf":639,"dup":178}],717:[function(require,module,exports){
arguments[4][179][0].apply(exports,arguments)
},{"./_Hash":624,"./_ListCache":626,"./_Map":628,"dup":179}],718:[function(require,module,exports){
arguments[4][180][0].apply(exports,arguments)
},{"./_getMapData":692,"dup":180}],719:[function(require,module,exports){
arguments[4][181][0].apply(exports,arguments)
},{"./_getMapData":692,"dup":181}],720:[function(require,module,exports){
arguments[4][182][0].apply(exports,arguments)
},{"./_getMapData":692,"dup":182}],721:[function(require,module,exports){
arguments[4][183][0].apply(exports,arguments)
},{"./_getMapData":692,"dup":183}],722:[function(require,module,exports){
arguments[4][186][0].apply(exports,arguments)
},{"./memoize":769,"dup":186}],723:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"./_composeArgs":670,"./_composeArgsRight":671,"./_replaceHolders":734,"dup":187}],724:[function(require,module,exports){
arguments[4][188][0].apply(exports,arguments)
},{"./_WeakMap":631,"dup":188}],725:[function(require,module,exports){
arguments[4][189][0].apply(exports,arguments)
},{"./_getNative":693,"dup":189}],726:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./_overArg":729,"dup":33}],727:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"./_freeGlobal":688,"dup":34}],728:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],729:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],730:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"./_apply":632,"dup":37}],731:[function(require,module,exports){
arguments[4][195][0].apply(exports,arguments)
},{"./_baseGet":647,"./_baseSlice":664,"dup":195}],732:[function(require,module,exports){
arguments[4][196][0].apply(exports,arguments)
},{"dup":196}],733:[function(require,module,exports){
arguments[4][197][0].apply(exports,arguments)
},{"./_copyArray":672,"./_isIndex":705,"dup":197}],734:[function(require,module,exports){
arguments[4][198][0].apply(exports,arguments)
},{"dup":198}],735:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./_freeGlobal":688,"dup":38}],736:[function(require,module,exports){
arguments[4][202][0].apply(exports,arguments)
},{"./_baseSetData":662,"./_shortOut":739,"dup":202}],737:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"./_baseSetToString":663,"./_shortOut":739,"dup":39}],738:[function(require,module,exports){
arguments[4][205][0].apply(exports,arguments)
},{"./_getWrapDetails":696,"./_insertWrapDetails":703,"./_setToString":737,"./_updateWrapDetails":744,"dup":205}],739:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],740:[function(require,module,exports){
arguments[4][212][0].apply(exports,arguments)
},{"dup":212}],741:[function(require,module,exports){
arguments[4][213][0].apply(exports,arguments)
},{"./_memoizeCapped":722,"dup":213}],742:[function(require,module,exports){
arguments[4][214][0].apply(exports,arguments)
},{"./isSymbol":765,"dup":214}],743:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],744:[function(require,module,exports){
arguments[4][216][0].apply(exports,arguments)
},{"./_arrayEach":633,"./_arrayIncludes":634,"dup":216}],745:[function(require,module,exports){
arguments[4][217][0].apply(exports,arguments)
},{"./_LazyWrapper":625,"./_LodashWrapper":627,"./_copyArray":672,"dup":217}],746:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./_assignValue":638,"./_copyObject":673,"./_createAssigner":676,"./_isPrototype":711,"./isArrayLike":758,"./keys":767,"dup":42}],747:[function(require,module,exports){
arguments[4][219][0].apply(exports,arguments)
},{"./_baseRest":660,"./_createWrap":685,"./_getHolder":691,"./_replaceHolders":734,"dup":219}],748:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],749:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],750:[function(require,module,exports){
arguments[4][225][0].apply(exports,arguments)
},{"./_baseFlatten":644,"dup":225}],751:[function(require,module,exports){
arguments[4][383][0].apply(exports,arguments)
},{"./_arrayEach":633,"./_baseEach":642,"./_castFunction":668,"./isArray":757,"dup":383}],752:[function(require,module,exports){
arguments[4][226][0].apply(exports,arguments)
},{"./_baseGet":647,"dup":226}],753:[function(require,module,exports){
arguments[4][227][0].apply(exports,arguments)
},{"./_baseHasIn":649,"./_hasPath":697,"dup":227}],754:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],755:[function(require,module,exports){
arguments[4][229][0].apply(exports,arguments)
},{"./_apply":632,"./_baseEach":642,"./_baseInvoke":651,"./_baseRest":660,"./isArrayLike":758,"dup":229}],756:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./_baseIsArguments":652,"./isObjectLike":763,"dup":46}],757:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],758:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./isFunction":760,"./isLength":761,"dup":48}],759:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"./_root":735,"./stubFalse":773,"dup":49}],760:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"./_baseGetTag":648,"./isObject":762,"dup":50}],761:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],762:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],763:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],764:[function(require,module,exports){
arguments[4][603][0].apply(exports,arguments)
},{"./_baseGetTag":648,"./isArray":757,"./isObjectLike":763,"dup":603}],765:[function(require,module,exports){
arguments[4][239][0].apply(exports,arguments)
},{"./_baseGetTag":648,"./isObjectLike":763,"dup":239}],766:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./_baseIsTypedArray":655,"./_baseUnary":667,"./_nodeUtil":727,"dup":54}],767:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"./_arrayLikeKeys":635,"./_baseKeys":656,"./isArrayLike":758,"dup":55}],768:[function(require,module,exports){
arguments[4][242][0].apply(exports,arguments)
},{"dup":242}],769:[function(require,module,exports){
arguments[4][243][0].apply(exports,arguments)
},{"./_MapCache":629,"dup":243}],770:[function(require,module,exports){
arguments[4][244][0].apply(exports,arguments)
},{"dup":244}],771:[function(require,module,exports){
arguments[4][245][0].apply(exports,arguments)
},{"./_basePick":658,"./_flatRest":687,"dup":245}],772:[function(require,module,exports){
arguments[4][612][0].apply(exports,arguments)
},{"./_castPath":669,"./_toKey":742,"./isFunction":760,"dup":612}],773:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],774:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"./toNumber":776,"dup":249}],775:[function(require,module,exports){
arguments[4][250][0].apply(exports,arguments)
},{"./toFinite":774,"dup":250}],776:[function(require,module,exports){
arguments[4][251][0].apply(exports,arguments)
},{"./isObject":762,"./isSymbol":765,"dup":251}],777:[function(require,module,exports){
arguments[4][252][0].apply(exports,arguments)
},{"./_baseToString":666,"dup":252}],778:[function(require,module,exports){
arguments[4][403][0].apply(exports,arguments)
},{"./toString":777,"dup":403}],779:[function(require,module,exports){
arguments[4][253][0].apply(exports,arguments)
},{"./_LazyWrapper":625,"./_LodashWrapper":627,"./_baseLodash":657,"./_wrapperClone":745,"./isArray":757,"./isObjectLike":763,"dup":253}],780:[function(require,module,exports){
module.exports = function arrayNext(array, currentItem) {
    var len = array.length;
    var newIndex = array.indexOf(currentItem) + 1;
    if (newIndex > (len - 1)) newIndex = 0;
    return array[newIndex];
};

},{}],781:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":782}],782:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],783:[function(require,module,exports){
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
},{}],784:[function(require,module,exports){
/**
 * Module dependencies.
 */

var closest = require('closest')
  , event = require('component-event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

// Some events don't bubble, so we want to bind to the capture phase instead
// when delegating.
var forceCaptureEvents = ['focus', 'blur'];

exports.bind = function(el, selector, type, fn, capture){
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  event.unbind(el, type, fn, capture);
};

},{"closest":781,"component-event":783}],785:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],786:[function(require,module,exports){

/**
 * Module dependencies.
 */

var events = require('component-event');
var delegate = require('delegate-events');
var forceCaptureEvents = ['focus', 'blur'];

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 *  Multiple events handling:
 *
 *    events.bind({
 *      'click .remove': 'remove',
 *      'click .add': 'add'
 *    });
 *
 * @param {String|object} - object is used for multiple binding,
 *                               string for single event binding
 * @param {String|function} [arg2] - method to call (optional)
 * @param {*} [arg3] - data for single event binding (optional)
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(arg1, arg2){
  var bindEvent = function(event, method) {
    var e = parse(event);
    var el = this.el;
    var obj = this.obj;
    var name = e.name;
    var method = method || 'on' + name;
    var args = [].slice.call(arguments, 2);

    // callback
    function cb(){
      var a = [].slice.call(arguments).concat(args);

      if (typeof method === 'function') {
          method.apply(obj, a);
          return;
      }

      if (!obj[method]) {
          throw new Error(method + ' method is not defined');
      } else {
          obj[method].apply(obj, a);
      }
    }

    // bind
    if (e.selector) {
      cb = delegate.bind(el, e.selector, name, cb);
    } else {
      events.bind(el, name, cb);
    }

    // subscription for unbinding
    this.sub(name, method, cb);

    return cb;
  };

  if (typeof arg1 == 'string') {
    bindEvent.apply(this, arguments);
  } else {
    for(var key in arg1) {
      if (arg1.hasOwnProperty(key)) {
        bindEvent.call(this, key, arg1[key]);
      }
    }
  }
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  var capture = (forceCaptureEvents.indexOf(event) !== -1);
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb, capture);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

},{"component-event":783,"delegate-events":784}],787:[function(require,module,exports){
var slice = Array.prototype.slice;

// our constructor
function KeyTreeStore(options) {
    options = options || {};
    if (typeof options !== 'object') {
        throw new TypeError('Options must be an object');
    }
    var DEFAULT_SEPARATOR = '.';

    this.storage = {};
    this.separator = options.separator || DEFAULT_SEPARATOR;
}

// add an object to the store
KeyTreeStore.prototype.add = function (keypath, obj) {
    var arr = this.storage[keypath] || (this.storage[keypath] = []);
    arr.push(obj);
};

// remove an object
KeyTreeStore.prototype.remove = function (obj) {
    var path, arr;
    for (path in this.storage) {
        arr = this.storage[path];
        arr.some(function (item, index) {
            if (item === obj) {
                arr.splice(index, 1);
                return true;
            }
        });
    }
};

// get array of all all relevant functions, without keys
KeyTreeStore.prototype.get = function (keypath) {
    var res = [];
    var key;

    for (key in this.storage) {
        if (!keypath || keypath === key || key.indexOf(keypath + this.separator) === 0) {
            res = res.concat(this.storage[key]);
        }
    }

    return res;
};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getGrouped = function (keypath) {
    var res = {};
    var key;

    for (key in this.storage) {
        if (!keypath || keypath === key || key.indexOf(keypath + this.separator) === 0) {
            res[key] = slice.call(this.storage[key]);
        }
    }

    return res;
};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getAll = function (keypath) {
    var res = {};
    var key;

    for (key in this.storage) {
        if (keypath === key || key.indexOf(keypath + this.separator) === 0) {
            res[key] = slice.call(this.storage[key]);
        }
    }

    return res;
};

// run all matches with optional context
KeyTreeStore.prototype.run = function (keypath, context) {
    var args = slice.call(arguments, 2);
    this.get(keypath).forEach(function (fn) {
        fn.apply(context || this, args);
    });
};

module.exports = KeyTreeStore;

},{}],788:[function(require,module,exports){
'use strict';

var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}]},{},[1]);
