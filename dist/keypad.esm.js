/*!
  * Weel Keypad v0.2.1
  * (c) 2018 wallen
  * Released under the MIT License.
  */
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

/* eslint-disable */

if (!Object.entries) Object.entries = function (obj) {
  var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
  while (i--) {
    resArray[i] = [ownProps[i], obj[ownProps[i]]];
  }return resArray;
};

if (!Object.keys) Object.keys = function (o) {
  if (o !== Object(o)) throw new TypeError('Object.keys called on a non-object');
  var k = [],
      p;
  for (p in o) {
    if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
  }return k;
};

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

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
  body: document.body
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

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
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





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * Keypad class
 *
 * @param {Object} options user options
 * @param {Object} layouts user layouts
 * @param {Object} maps user maps
 */

var Keypad = function () {
  // constructor (options = {}, layouts = {}, maps = {}) {
  function Keypad() {
    classCallCheck(this, Keypad);

    for (var _len = arguments.length, configs = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      configs[_key2] = arguments[_key2];
    }

    var _configs$ = configs[0],
        options = _configs$ === undefined ? {} : _configs$,
        _configs$2 = configs[1],
        layouts = _configs$2 === undefined ? {} : _configs$2,
        _configs$3 = configs[2],
        maps = _configs$3 === undefined ? {} : _configs$3;


    if (typeof options === 'function') options = options(Object.assign({}, defaultOptions));
    if (typeof layouts === 'function') layouts = layouts(Object.assign({}, defaultLayouts));
    if (typeof maps === 'function') maps = maps(Object.assign({}, defaultMaps));

    options.mobile = Keypad.isMobile;

    this.options = Object.assign({}, defaultOptions, options);
    this.layouts = Object.assign({}, defaultLayouts, layouts);
    this.maps = Object.assign({}, defaultMaps, maps);

    var _options = this.options,
        el = _options.el,
        input = _options.input,
        show = _options.show,
        hide = _options.hide,
        body = _options.body;


    this.input = input || null;
    this.wrap = null;
    this.parent = body || null;

    this.keypads = {};
    this.hightlight = null;
    this.locked = null;

    if (el) this.listen();
    if (body) this.inject();
    if (show) this.show();
    if (hide) this.bodyHide();
  }

  createClass(Keypad, [{
    key: 'prefix',
    value: function prefix() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elem';
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var flex = this.options.flex;


      return {
        elem: 'kypd' + (flex ? '-flex' : '') + '-' + (name || 'span'),
        attr: 'data-kypd-' + (name || 'blank')
      }[type];
    }
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
  }, {
    key: 'reducer',
    value: function reducer(name) {
      var _this = this;

      var reducer = this.options.reducer;


      if (!Keypad.istype(reducer, 'object')) {
        return console.error('"reducer" must to be a plain object.');
      }

      if (typeof reducer[name] === 'function') {
        return function (target) {
          return reducer[name].call(_this, target);
        };
      }

      return function (target) {
        return target;
      };
    }
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

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = layout[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var group = _step.value;

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
            _keyRow.appendChild(keyReducer(_key));
            keyValue = _keyValue;
          };

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            _loop2: for (var _iterator2 = group[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _ref = _step2.value;

              var _ref2 = slicedToArray(_ref, 3);

              var keyText = _ref2[0];
              var keyValue = _ref2[1];
              var keyCode = _ref2[2];

              var _ret = _loop(keyText, keyValue, keyCode);

              switch (_ret) {
                case 'break':
                  break _loop2;

                case 'continue':
                  continue;}
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

          content.appendChild(rowReducer(_keyRow));
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

      return content;
    }
  }, {
    key: 'handleKey',
    value: function handleKey(ev, when, _ref3) {
      var _ref4 = slicedToArray(_ref3, 3),
          keyText = _ref4[0],
          keyValue = _ref4[1],
          keyCode = _ref4[2];

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

        var layouts = Object.keys(this.layouts);

        if (typeof _name === 'string' && !_name.length) {
          var next = layouts.indexOf(name) + 1;

          this.options['name'] = layouts[next === layouts.length ? 0 : next];
        }

        if (layouts.includes(_name)) {
          this.options['name'] = _name;
        }

        this.show();
      }
    }
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.entries(layouts)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref5 = _step3.value;

          var _ref6 = slicedToArray(_ref5, 2);

          var name = _ref6[0];
          var layout = _ref6[1];

          var _content = this.generator(layout);
          var _container = container.cloneNode();

          _container.setAttribute(this.prefix('attr', 'name'), name);
          _container.setAttribute(this.prefix('attr', 'status'), 'ready');

          this.keypads[name] = _container;

          _container.appendChild(contentReducer(_content));
          wrap.appendChild(containerReducer(_container));
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

      wrap.setAttribute(this.prefix('attr', 'status'), 'ready');
      wrap.setAttribute(this.prefix('attr', 'theme'), theme);
      wrap.setAttribute(this.prefix('attr', 'dark'), dark);

      wrap.addEventListener(this.events.start, function (ev) {
        return ev.stopPropagation() || ev.preventDefault();
      }, false);

      this.wrap = this.reducer('wrap')(wrap);

      return this.wrap;
    }
  }, {
    key: 'inject',
    value: function inject(target) {
      var _options3 = this.options,
          body = _options3.body,
          name = _options3.name,
          multiple = _options3.multiple;


      var wrap = target || body;

      wrap.appendChild(this.render(multiple ? this.layouts : defineProperty({}, name, this.layouts[name])));

      this.parent = wrap;
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (this.wrap && this.parent) {
        return this.parent.removeChild(this.wrap);
      }

      return console.log('Has not found "Keypad" that needed to be removed.');
    }
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
  }, {
    key: 'bodyHide',
    value: function bodyHide(ev) {
      var _this4 = this;

      var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options['hide'];

      if (!flag) return false;

      var _flag = typeof flag === 'string' ? flag : 'click';

      document.body.addEventListener(_flag, function (ev) {
        return _this4.hide();
      }, false);

      this.wrap.addEventListener(_flag, function (ev) {
        return ev.stopPropagation() || ev.preventDefault();
      }, false);
    }
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
  }, {
    key: 'dark',
    value: function dark() {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.wrap.setAttribute(this.prefix('attr', 'dark'), !!status);
    }
  }, {
    key: 'events',
    get: function get$$1() {
      var mobile = this.options.mobile;


      return {
        start: mobile ? 'touchstart' : 'mousedown',
        end: mobile ? 'touchend' : 'mouseup',
        move: mobile ? 'touchmove' : 'mousemove'
      };
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

var css = "kypd-flex-wrap, kypd-wrap {\n  width: 100%;\n  font-family: Arial, Helvetica, sans-serif;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 999999999;\n  position: fixed;\n  display: block;\n  -webkit-transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }\n  kypd-flex-wrap[data-kypd-status=\"none\"], kypd-wrap[data-kypd-status=\"none\"] {\n    display: none; }\n  kypd-flex-wrap[data-kypd-status=\"ready\"], kypd-wrap[data-kypd-status=\"ready\"] {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  kypd-flex-wrap[data-kypd-status=\"active\"], kypd-wrap[data-kypd-status=\"active\"] {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translateY(0%);\n            transform: translateY(0%); }\n\nkypd-flex-container, kypd-container {\n  width: inherit;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  position: absolute; }\n  kypd-flex-container[data-kypd-status=\"ready\"], kypd-container[data-kypd-status=\"ready\"] {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    -webkit-transition: -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }\n  kypd-flex-container[data-kypd-status=\"active\"], kypd-container[data-kypd-status=\"active\"] {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  kypd-flex-container[data-kypd-locked=\"upper\"] [data-kypd-key-value], kypd-container[data-kypd-locked=\"upper\"] [data-kypd-key-value] {\n    text-transform: uppercase; }\n\nkypd-flex-key svg, kypd-key svg {\n  fill: currentColor; }\n\nkypd-flex-container {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  kypd-flex-container[data-kypd-name=\"number\"] kypd-flex-content {\n    max-width: 240px; }\n  kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-content {\n    max-width: 560px; }\n\nkypd-flex-content {\n  width: 100%;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-key-row {\n  width: 100%;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-key, kypd-flex-key > span {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto; }\n";
__$$styleInject(css);

var css$2 = "kypd-flex-wrap[data-kypd-theme=\"default\"], kypd-wrap[data-kypd-theme=\"default\"] {\n  background-color: #ffffff; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-container, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-container, kypd-wrap[data-kypd-theme=\"default\"] kypd-container {\n    background-color: inherit;\n    border-top: 1px #f5f5f5 solid;\n    padding: 8px 4px; }\n    kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-container[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-container[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] > span {\n      border-radius: 2px;\n      background-color: #0077ff;\n      color: #ffffff; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key, kypd-wrap[data-kypd-theme=\"default\"] kypd-key {\n    cursor: default;\n    padding: 4px 2px; }\n    kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-key > span {\n      border-radius: 2px;\n      -webkit-box-shadow: 0 1px 2px rgba(73, 158, 255, .431);\n              box-shadow: 0 1px 2px rgba(73, 158, 255, .431);\n      height: 44px;\n      font-size: 16px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      background-color: #ffffff;\n      color: #0077ff;\n      -webkit-transition: background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      transition: background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n    kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-status=\"start\"] > span {\n      background-color: #0077ff;\n      color: #ffffff; }\n    kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"] kypd-key[data-kypd-key-code=\"enter\"] > span {\n      border-radius: 8px;\n      background-color: #0077ff;\n      color: #ffffff; }\n\nkypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"number\"] kypd-flex-key {\n  width: 0; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"number\"] kypd-flex-key[data-kypd-key-value=\"0\"] {\n    -webkit-box-flex: 2;\n        -ms-flex-positive: 2;\n            flex-grow: 2; }\n\nkypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-key-row:nth-child(2)::before, kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-key-row:nth-child(2)::after {\n  content: \"\";\n  margin-left: -6px;\n  margin-right: -6px;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-key {\n  width: 0; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-key[data-kypd-key-value=\" \"] {\n    -webkit-box-flex: 6;\n        -ms-flex-positive: 6;\n            flex-grow: 6; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-key[data-kypd-key-code=\"enter\"], kypd-flex-wrap[data-kypd-theme=\"default\"] kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-key[data-kypd-key-code=\"@@number\"] {\n    -webkit-box-flex: 2;\n        -ms-flex-positive: 2;\n            flex-grow: 2; }\n";
__$$styleInject(css$2);

var css$4 = "kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"], kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] {\n  background-color: #1b1d20; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-container, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-container, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-container, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-container {\n    border-top: 1px #111417 solid; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key > span, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key > span {\n    background-color: #1b1d20;\n    -webkit-box-shadow: 0 1px 2px rgba(63, 84, 107, .431);\n            box-shadow: 0 1px 2px rgba(63, 84, 107, .431); }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-status=\"start\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-status=\"start\"] > span {\n    background-color: #0077ff;\n    color: #1b1d20; }\n  kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-flex-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-flex-key[data-kypd-key-code=\"enter\"] > span, kypd-wrap[data-kypd-theme=\"default\"][data-kypd-dark=\"true\"] kypd-key[data-kypd-key-code=\"enter\"] > span {\n    background-color: #0077ff;\n    color: #1b1d20; }\n";
__$$styleInject(css$4);

export default Keypad;
//# sourceMappingURL=keypad.esm.js.map
