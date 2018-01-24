/*!
  * Weel Keypad v0.3.4
  * (c) 2018 wallen
  * Released under the MIT License.
  */
'use strict';

function __$$styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$2 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

unwrapExports(defineProperty$2);

var defineProperty$4 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
});

var _defineProperty$1 = unwrapExports(defineProperty$4);

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$2 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$2);

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

var isEnum = _objectPie.f;
var _objectToArray = function (isEntries) {
  return function (it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries

var $entries = _objectToArray(true);

_export(_export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

var entries = _core.Object.entries;

var entries$2 = createCommonjsModule(function (module) {
module.exports = { "default": entries, __esModule: true };
});

var _Object$entries = unwrapExports(entries$2);

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators = {};

var _library = true;

var _redefine = _hide;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator = core_getIterator;

var getIterator$2 = createCommonjsModule(function (module) {
module.exports = { "default": getIterator, __esModule: true };
});

var _getIterator = unwrapExports(getIterator$2);

var ITERATOR$2 = _wks('iterator');

var core_isIterable = _core.isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$2] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || _iterators.hasOwnProperty(_classof(O));
};

var isIterable = core_isIterable;

var isIterable$2 = createCommonjsModule(function (module) {
module.exports = { "default": isIterable, __esModule: true };
});

unwrapExports(isIterable$2);

var slicedToArray = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _isIterable3 = _interopRequireDefault(isIterable$2);



var _getIterator3 = _interopRequireDefault(getIterator$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
});

var _slicedToArray = unwrapExports(slicedToArray);

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$2 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$2);

var classCallCheck = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var defaultOptions = {
  el: null, // listened input element
  input: null, // the input element that need to set value
  inputWhen: 'end', // the time to set input's value, 'start' or 'end'

  flex: true, // use flex layout
  mobile: true, // choose to use "touch" or "mouse" event by boolean

  onstart: null, // touchstart|keydown callback
  onend: null, // touchend|keyup callback,

  name: 'number', // default keypad layout name
  multiple: true, // render all keypad layouts
  show: false, // show keypad after injected
  // hide keypad when 'body' is clicked,
  // support event name, default 'click'
  hide: false,

  render: null, // a callback to replace Keypad's render method
  reducer: { // nodes's hook
    wrap: null,
    container: null,
    content: null,
    row: null,
    key: null
  },

  tag: null, // custom tag name
  theme: 'default', // theme name
  dark: false, // dark theme mode

  // the wrap element to be injected keypad,
  // support callback to repleace default
  body: document.body,

  // auto inject to body
  inject: true
};

var number = [[[7], [8], [9]], [[4], [5], [6]], [[1], [2], [3]], [['En', null, '@@qwer'], ['.'], [0], ['svg[backspace]', null, 'backspace']]];

var qwer = [[['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p']], [['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l']], [['svg[upper]', null, 'upper'], ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], ['svg[backspace]', null, 'backspace']], [['123', null, '@@number'], ['Space', ' '], [','], ['.'], ['svg[done]', null, 'enter']]];

var defaultLayouts = Object.freeze({
	number: number,
	qwer: qwer
});

var defaultMaps = {
  backspace: 'backspace',
  upper: 'upper',
  ctrl: 'ctrl',
  alt: 'alt',
  shift: 'shift'
};

var upper = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M6 18v-2.016h12v2.016h-12zM12 8.391l-4.594 4.594-1.406-1.406 6-6 6 6-1.406 1.406z\"></path></svg>";

var backspace = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M18.984 15.609l-3.563-3.609 3.563-3.609-1.406-1.406-3.563 3.609-3.609-3.609-1.406 1.406 3.609 3.609-3.609 3.609 1.406 1.406 3.609-3.609 3.563 3.609zM21.984 3c1.078 0 2.016 0.938 2.016 2.016v13.969c0 1.078-0.938 2.016-2.016 2.016h-15c-0.703 0-1.219-0.375-1.594-0.891l-5.391-8.109 5.391-8.109c0.375-0.516 0.891-0.891 1.594-0.891h15z\"></path></svg>";

var clear = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" /></svg>";

var add = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z\" /></svg>";

var done = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M9 16.219l10.594-10.641 1.406 1.406-12 12-5.578-5.578 1.359-1.406z\"></path></svg>";

var images = Object.freeze({
	upper: upper,
	backspace: backspace,
	clear: clear,
	add: add,
	done: done
});

/**
 * Keypad class
 *
 * @param {Object?} options user options
 * @param {Object?} layouts user layouts
 * @param {Object?} maps user maps
 */

var Keypad = function () {
  function Keypad() {
    _classCallCheck(this, Keypad);

    for (var _len = arguments.length, configs = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      configs[_key2] = arguments[_key2];
    }

    var _configs$ = configs[0],
        options = _configs$ === undefined ? {} : _configs$,
        _configs$2 = configs[1],
        layouts = _configs$2 === undefined ? {} : _configs$2,
        _configs$3 = configs[2],
        maps = _configs$3 === undefined ? {} : _configs$3;


    if (typeof options === 'function') options = options(_Object$assign({}, defaultOptions));
    if (typeof layouts === 'function') layouts = layouts(_Object$assign({}, defaultLayouts));
    if (typeof maps === 'function') maps = maps(_Object$assign({}, defaultMaps));

    this.options = _Object$assign({}, defaultOptions, options);
    this.layouts = _Object$assign({}, defaultLayouts, layouts);
    this.maps = _Object$assign({}, defaultMaps, maps);

    if (!Keypad.istype(Keypad.isMobile, 'undefined')) {
      this.options.mobile = Keypad.isMobile;
    }

    var _options = this.options,
        el = _options.el,
        input = _options.input,
        show = _options.show,
        hide = _options.hide,
        body = _options.body,
        inject = _options.inject;


    if (!body) {
      console.error('Option "body" is ' + body + ', maybe you need to wait the body loaded by \'window.onload\'.');
    }

    this.wrap = null;
    this.parent = body || null;
    this.input = input || null;

    this.keypads = {};
    this.hightlight = null;
    this.locked = null;

    if (Keypad.istype(Keypad.plugins, 'array')) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(_Object$entries(Keypad.plugins)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var i = _ref2[0];
          var plugin = _ref2[1];

          this.use(plugin, i);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    if (el) this.listen();
    if (inject && body) this.inject();
    if (show) this.show();
    if (hide) this.bodyHide();
  }

  /**
   * use for loading plugin
   * @param {Function} plugin plugin module
   * @param {String} id optional, plugin id or name
   */


  _createClass(Keypad, [{
    key: 'use',
    value: function use(plugin, id) {
      if (typeof plugin !== 'function') {
        return console.warn('[' + id + '] in Keypad.plugins is not a function.');
      }

      plugin.call(this);
    }

    /**
     * events according to device type
     */

  }, {
    key: 'prefix',


    /**
     * prefix for Keypad elememnts and attributes
     * @param {String} type 'elem' or 'attr'
     * @param {String} name name of elem or attr
     * @return {String} tag name or attribute's name
     */
    value: function prefix() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elem';
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var flex = this.options.flex;


      return {
        elem: 'kypd' + (flex ? '-flex' : '') + '-' + (name || 'span'),
        attr: 'data-kypd-' + (name || 'blank')
      }[type];
    }

    /**
     * createElement for custom element
     * @param {String} name custom tag name
     * @param {String} tag user's custom tag name
     * @return {HTMLElement} created HTML element
     */

  }, {
    key: 'createElement',
    value: function createElement() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options['tag'];

      if (!tag) {
        return document.createElement(this.prefix('elem', name));
      }

      var _elem = document.createElement(tag);

      _elem.setAttribute(this.prefix('attr', 'tag'), name);

      return _elem;
    }

    /**
     * reducer for user modifing Keypad's elements
     * @param {String} name Keypad custom element name
     * @return {HTMLElement} reduced element
     */

  }, {
    key: 'reducer',
    value: function reducer(name) {
      var _this = this;

      var reducer = this.options.reducer;


      if (!Keypad.istype(reducer, 'object')) {
        return console.error('"reducer" must to be a plain object.');
      }

      if (typeof reducer[name] === 'function') {
        return function (target, extra) {
          return reducer[name].call(_this, target, extra) || document.createDocumentFragment();
        };
      }

      return function (target) {
        return target;
      };
    }

    /**
     * generator for generating keypad's layout to HTML
     * @param {Array} layout keypad's custom layout
     * @return {HTMLElement} generated HTML
     */

  }, {
    key: 'generator',
    value: function generator(layout) {
      var _this2 = this;

      var multiple = this.options.multiple;


      var content = this.createElement('content');
      var keyRow = this.createElement('key-row');
      var key = this.createElement('key');
      var span = document.createElement('span');

      var rowReducer = this.reducer('row');
      var keyReducer = this.reducer('key');

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(layout), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var row = _step2.value;

          var _keyRow = keyRow.cloneNode();

          var _loop = function _loop(keyText, _keyValue, keyCode) {
            var _key = key.cloneNode();
            var _span = span.cloneNode();

            if (/svg\[.+\]/.test(keyText)) {
              var name = keyText.match(/svg\[(.+)\]/)[1];
              var svg = images[name];

              if (!svg) {
                console.wran('No image is named "' + name + '"');
                return 'break';
              }

              var fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
              fake.innerHTML = svg;

              _span.appendChild(fake.querySelector('svg'));
            } else if (/(<\/svg>[\s]?)$/.test(keyText)) {
              var _fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
              _fake.innerHTML = keyText;

              _span.appendChild(_fake.querySelector('svg'));
            } else {
              _span.textContent = keyText;
            }

            if (_keyValue || !_keyValue && !keyCode) {
              _keyValue = _keyValue || keyText;
              _key.setAttribute(_this2.prefix('attr', 'key-value'), _keyValue || keyText);
            }

            if (keyCode) {
              if (!multiple && /^@@/.test(keyCode + '')) {
                return 'continue';
              }

              _key.setAttribute(_this2.prefix('attr', 'key-code'), keyCode);
            }

            _key.setAttribute(_this2.prefix('attr', 'status'), '');

            _key.addEventListener(_this2.events.start, function (ev) {
              return _this2.handleKey(ev, 'start', [keyText, _keyValue, keyCode]);
            }, false);

            _key.addEventListener(_this2.events.end, function (ev) {
              return _this2.handleKey(ev, 'end', [keyText, _keyValue, keyCode]);
            }, false);

            _key.appendChild(_span);
            _keyRow.appendChild(keyReducer(_key, [keyText, _keyValue, keyCode]));
            keyValue = _keyValue;
          };

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            _loop2: for (var _iterator3 = _getIterator(row), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _ref3 = _step3.value;

              var _ref4 = _slicedToArray(_ref3, 3);

              var keyText = _ref4[0];
              var keyValue = _ref4[1];
              var keyCode = _ref4[2];

              var _ret = _loop(keyText, keyValue, keyCode);

              switch (_ret) {
                case 'break':
                  break _loop2;

                case 'continue':
                  continue;}
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          content.appendChild(rowReducer(_keyRow, row));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return content;
    }

    /**
     * handleKey for key's event listener
     * @param {Event} ev key related event
     * @param {String} when 'start' or 'end'
     * @param {Array} key text and value and code
     */

  }, {
    key: 'handleKey',
    value: function handleKey(ev, when, _ref5) {
      var _ref6 = _slicedToArray(_ref5, 3),
          keyText = _ref6[0],
          keyValue = _ref6[1],
          keyCode = _ref6[2];

      ev.preventDefault();
      ev.stopPropagation();

      var target = ev.currentTarget;
      var attr = this.prefix('attr', 'status');
      var status = target.getAttribute(attr);

      if (status !== 'active') {
        if (when === 'start') {
          target.setAttribute(attr, 'start');
        }

        if (when === 'end') {
          target.setAttribute(attr, '');
        }
      }

      if (!keyCode && this.locked === this.maps['upper']) {
        keyText = keyText && ('' + keyText).toUpperCase();
        keyValue = keyValue && ('' + keyValue).toUpperCase();
      }

      this.keyMap(when, keyValue, keyCode);

      if (typeof this.options['on' + when] === 'function') {
        var prevent = this.options['on' + when].call(target, [keyText, keyValue, keyCode], ev);

        if (prevent) return true;
      }

      if (when === this.options['inputWhen']) {
        this.keyInput(keyValue, keyCode);
      }
    }

    /**
     * keyMap for key's trigger map
     * @param {String} when 'start' or 'end'
     * @param {String?} value key's value
     * @param {String?} code key's command code
     */

  }, {
    key: 'keyMap',
    value: function keyMap(when, value, code) {
      var name = this.options.name;


      var keypad = this.keypads[name];

      var attr = this.prefix('attr', 'hightlight');
      var hightlight = keypad.getAttribute('hightlight') || '';

      hightlight = hightlight ? hightlight + '+' + (code || value) : code || value;

      if (when === 'start') {
        this.hightlight = hightlight;
        keypad.setAttribute(attr, hightlight);
      }

      if (when === 'end') {
        keypad.setAttribute(attr, '');
      }

      if (when === 'start' && code === this.maps['upper']) {
        var _attr = this.prefix('attr', 'locked');

        if (this.locked) {
          this.locked = null;
          keypad.removeAttribute(_attr);
        } else {
          this.locked = code;
          keypad.setAttribute(_attr, code);
        }
      }

      if (when === 'end' && /^@@/.test(code)) {
        var _name = code.match(/^@@(.*)/)[1];

        this.hide();

        var layouts = _Object$keys(this.layouts);

        if (typeof _name === 'string' && !_name.length) {
          var next = layouts.indexOf(name) + 1;

          this.options['name'] = layouts[next === layouts.length ? 0 : next];
        }

        if (~layouts.indexOf(_name)) {
          this.options['name'] = _name;
        }

        this.show();
      }
    }

    /**
     * keyInput for key to set input value
     * @param {String?} value key's value
     * @param {String?} code key's command code
     */

  }, {
    key: 'keyInput',
    value: function keyInput(value, code) {
      if (!this.input || !(value === 0 ? '0' : value) && code !== this.maps['backspace']) return true;

      var _value = this.input.value;
      var start = this.input.selectionStart;
      var end = this.input.selectionEnd;

      if (end - start) {
        _value = _value.slice(0, start) + _value.slice(end);
      }

      if (_value && code === this.maps['backspace'] && !(end - start)) {
        _value = _value.slice(0, start - 1) + _value.slice(start);
        start--;
      }

      var type = Keypad.istype(value);
      if (type !== 'null' && type !== 'undefined') {
        _value = _value.slice(0, start) + value + _value.slice(start);
        start++;
      }

      this.input.value = _value;
      this.input.selectionEnd = start;
    }

    /**
     * render for Keypad's rending
     * @param {Object} layouts all keypad layouts
     * @return {HTMLElement} rended Keypad HTML
     */

  }, {
    key: 'render',
    value: function render() {
      var layouts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.layouts;
      var _options2 = this.options,
          render = _options2.render,
          theme = _options2.theme,
          dark = _options2.dark;


      if (typeof render === 'function') {
        return render.call(this);
      }

      var wrap = this.createElement('wrap');
      var container = this.createElement('container');

      wrap.setAttribute(this.prefix('attr', 'status'), 'none');

      var contentReducer = this.reducer('content');
      var containerReducer = this.reducer('container');

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _getIterator(_Object$entries(layouts)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _ref7 = _step4.value;

          var _ref8 = _slicedToArray(_ref7, 2);

          var name = _ref8[0];
          var layout = _ref8[1];

          var _content = this.generator(layout);

          _content.setAttribute(this.prefix('attr', 'name'), name);
          _content.setAttribute(this.prefix('attr', 'status'), 'ready');

          this.keypads[name] = _content;

          container.appendChild(contentReducer(_content, [name, layout]));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      wrap.appendChild(containerReducer(container, layouts));

      wrap.setAttribute(this.prefix('attr', 'status'), 'ready');
      wrap.setAttribute(this.prefix('attr', 'theme'), theme);
      wrap.setAttribute(this.prefix('attr', 'dark'), dark);

      wrap.addEventListener(this.bodyEvent, function (ev) {
        return ev.stopPropagation() || ev.preventDefault();
      }, false);

      this.wrap = this.reducer('wrap')(wrap);

      return this.wrap;
    }

    /**
     * inject Keypad to the target node
     * @param {Node} target the parent node to be injected
     */

  }, {
    key: 'inject',
    value: function inject(target) {
      var _options3 = this.options,
          body = _options3.body,
          name = _options3.name,
          multiple = _options3.multiple;


      var parent = target || body;

      parent.appendChild(this.render(multiple ? this.layouts : _defineProperty$1({}, name, this.layouts[name])));

      this.parent = parent;
    }

    /**
     * remove Keypad from the parent node
     */

  }, {
    key: 'remove',
    value: function remove() {
      if (this.wrap && this.parent) {
        return !!this.parent.removeChild(this.wrap);
      }

      return !!console.log('Has not found "Keypad" that needed to be removed.');
    }

    /**
     * listen input's focus and blur event
     * @param {HTMLElement?} el HTMLElement or NodeList to be listend
     */

  }, {
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options['el'];

      if (!el) return false;

      var targets = [];

      switch (Keypad.istype(el)) {
        case 'string':
          targets = document.querySelectorAll(el);
          break;

        case 'nodelist':
          targets = el;
          break;

        default:
          // must be a html element
          if (!/html\w*element/.test(Keypad.istype(el))) return false;
          targets = [el];
          break;
      }

      if (!targets || !targets.length) return false;

      Array.prototype.forEach.call(targets, function (target) {
        target.addEventListener('focus', function (ev) {
          _this3.input = ev.currentTarget;
          _this3.show();
        }, false);

        target.addEventListener('blur', function (ev) {
          _this3.input = null;
          _this3.hide();
        }, false);
      });
    }

    /**
     * bodyEvent to bodyHide
     */

  }, {
    key: 'bodyHide',


    /**
     * bodyHide for tap body area except keypad wrap
     */
    value: function bodyHide() {
      var _this4 = this;

      document.body.addEventListener(this.bodyEvent, function (ev) {
        _this4.hide();
      }, false);

      this.wrap.addEventListener(this.bodyEvent, function (ev) {
        return ev.stopPropagation() || ev.preventDefault();
      }, false);
    }

    /**
     * show keypad with a layout
     * @param {String} name layout's name
     */

  }, {
    key: 'show',
    value: function show() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options['name'];

      if (!this.layouts[name]) {
        console.error('Has not a keypad layout named "' + name + '"');
        return false;
      }

      this.wrap.setAttribute(this.prefix('attr', 'status'), 'active');
      this.keypads[name].setAttribute(this.prefix('attr', 'status'), 'active');
    }

    /**
     * hide keypad with a layout
     * @param {String} name layout's name
     */

  }, {
    key: 'hide',
    value: function hide() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options['name'];

      if (!this.layouts[name]) {
        console.error('Has not a keypad layout named "' + name + '"');
        return false;
      }

      this.wrap.setAttribute(this.prefix('attr', 'status'), 'ready');
      this.keypads[name].setAttribute(this.prefix('attr', 'status'), 'ready');
    }

    /**
     * toggle keypad show and hide
     * @param {String} name layout's name
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options['name'];

      if (this.wrap.getAttribute(this.prefix('attr', 'status')) === 'active') {
        this.hide(name);
      } else {
        this.show(name);
      }
    }

    /**
     * dark theme enabled
     * @param {Boolean} expect expect use dark theme whether or not
     */

  }, {
    key: 'dark',
    value: function dark() {
      var expect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.wrap.setAttribute(this.prefix('attr', 'dark'), !!expect);
    }

    /**
     * istype for check object's type
     * @param {Object?} o needed to checked thing
     * @param {String} type expected type
     * @return {Boolean?} is "type" param is undefined return checking result
     */

  }, {
    key: 'events',
    get: function get() {
      var mobile = this.options.mobile;


      return {
        start: mobile ? 'touchstart' : 'mousedown',
        end: mobile ? 'touchend' : 'mouseup',
        move: mobile ? 'touchmove' : 'mousemove'
      };
    }
  }, {
    key: 'bodyEvent',
    get: function get() {
      var hide = this.options.hide;


      return typeof hide === 'string' ? hide : this.events.start;
    }
  }], [{
    key: 'istype',
    value: function istype(o, type) {
      var r = Object.prototype.toString.call(o).replace(/^\[object (.+)\]$/, '$1').toLowerCase();

      if (!type) return r;

      return type === r;
    }
  }]);

  return Keypad;
}();

var css = "kypd-flex-wrap, kypd-wrap {\n  width: auto;\n  font-family: Arial, Helvetica, sans-serif;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 999999999;\n  position: fixed;\n  display: block;\n  -webkit-transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }\n  kypd-flex-wrap[data-kypd-status=\"none\"], kypd-wrap[data-kypd-status=\"none\"] {\n    display: none; }\n  kypd-flex-wrap[data-kypd-status=\"ready\"], kypd-wrap[data-kypd-status=\"ready\"] {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  kypd-flex-wrap[data-kypd-status=\"active\"], kypd-wrap[data-kypd-status=\"active\"] {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translateY(0%);\n            transform: translateY(0%); }\n\nkypd-flex-container, kypd-container {\n  width: inherit; }\n\nkypd-flex-content, kypd-content {\n  margin: 0 auto;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }\n  kypd-flex-content[data-kypd-status=\"ready\"], kypd-content[data-kypd-status=\"ready\"] {\n    opacity: 0;\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    position: absolute; }\n  kypd-flex-content[data-kypd-status=\"active\"], kypd-content[data-kypd-status=\"active\"] {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    position: relative; }\n  kypd-flex-content[data-kypd-locked=\"upper\"] [data-kypd-key-value], kypd-content[data-kypd-locked=\"upper\"] [data-kypd-key-value] {\n    text-transform: uppercase; }\n  kypd-flex-content[data-kypd-name=\"number\"], kypd-content[data-kypd-name=\"number\"] {\n    max-width: 240px; }\n  kypd-flex-content[data-kypd-name=\"qwer\"], kypd-content[data-kypd-name=\"qwer\"] {\n    max-width: 560px; }\n\nkypd-flex-key svg, kypd-key svg {\n  fill: currentColor; }\n\nkypd-flex-container {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-content {\n  width: 100%;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-key-row {\n  width: 100%;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-key, kypd-flex-key > span {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto; }\n";
__$$styleInject(css);

var css$2 = "kypd-flex-wrap[data-kypd-theme=\"default\"], kypd-wrap[data-kypd-theme=\"default\"] {\n  background-color: #ffffff; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-container, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-container, kypd-wrap[data-kypd-theme=\"default\"] kypd-container {\n    background-color: inherit;\n    border-top: 1px #f5f5f5 solid;\n    padding: 8px 4px; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-content[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-content[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span {\n    border-radius: 2px;\n    background-color: #0077ff;\n    color: #ffffff; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key, kypd-wrap[data-kypd-theme=\"default\"] kypd-key {\n    cursor: default;\n    padding: 4px 2px; }\n    kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-key > span {\n      border-radius: 2px;\n      -webkit-box-shadow: 0 1px 2px rgba(73, 158, 255, .431);\n              box-shadow: 0 1px 2px rgba(73, 158, 255, .431);\n      height: 44px;\n      font-size: 16px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      background-color: #ffffff;\n      color: #0077ff;\n      -webkit-transition: background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 0.45s cubic-bezier(0.215, 0.61, 0.355, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      transition: background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 0.45s cubic-bezier(0.215, 0.61, 0.355, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n    kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-status=\"start\"] > span {\n      background-color: #0077ff;\n      color: #ffffff;\n      opacity: .9; }\n    kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-key-code=\"enter\"] > span {\n      border-radius: 8px;\n      background-color: #0077ff;\n      color: #ffffff; }\n\nkypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"number\"] kypd-flex-key {\n  width: 0; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"number\"] kypd-flex-key[data-kypd-key-value=\"0\"] {\n    -webkit-box-flex: 2;\n        -ms-flex-positive: 2;\n            flex-grow: 2; }\n\nkypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"qwer\"] kypd-flex-key-row:nth-child(2)::before, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"qwer\"] kypd-flex-key-row:nth-child(2)::after {\n  content: \"\";\n  margin-left: -6px;\n  margin-right: -6px;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"qwer\"] kypd-flex-key {\n  width: 0; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"qwer\"] kypd-flex-key[data-kypd-key-value=\" \"] {\n    -webkit-box-flex: 6;\n        -ms-flex-positive: 6;\n            flex-grow: 6; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"qwer\"] kypd-flex-key[data-kypd-key-code=\"enter\"], kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-content[data-kypd-name=\"qwer\"] kypd-flex-key[data-kypd-key-code=\"@@number\"] {\n    -webkit-box-flex: 2;\n        -ms-flex-positive: 2;\n            flex-grow: 2; }\n";
__$$styleInject(css$2);

var css$4 = "kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"], kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] {\n  background-color: #1b1d20; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-container, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-container, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-container, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-container {\n    border-top: 1px #111417 solid; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key > span, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key > span {\n    background-color: #1b1d20;\n    -webkit-box-shadow: 0 1px 2px rgba(63, 84, 107, .431);\n            box-shadow: 0 1px 2px rgba(63, 84, 107, .431); }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-status=\"start\"] > span {\n    background-color: #0077ff;\n    color: #1b1d20; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-key-code=\"enter\"] > span {\n    background-color: #0077ff;\n    color: #1b1d20; }\n";
__$$styleInject(css$4);

module.exports = Keypad;
//# sourceMappingURL=keypad.common.js.map
