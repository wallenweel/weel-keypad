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

var number = [[[7], [8], [9]], [[4], [5], [6]], [[1], [2], [3]], [['svg[backspace]', null, 'backspace'], [0], ['·', '.']]];

var qwer = [[['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p']], [['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l']], [['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m']], [['svg[upper]', null, 'upper'], ['Space', ' '], [','], ['.'], ['svg[backspace]', null, 'backspace']]];

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

var defaultOptions = {
  el: null, // target element
  input: null, // need to set value
  inputWhen: 'end',

  flex: true, // use flex layout
  mobile: true, // choose to use "touch" or "mouse" event

  onstart: null, // touchstart|keydown callback
  onend: null, // touchend|keyup callback,

  name: 'number',
  show: false,
  multiple: true,

  render: null,
  reducer: {
    wrap: null,
    container: null,
    content: null,
    row: null,
    key: null
  },

  inject: document.body // the wrap element to be injected keypad
};

var defaultLayouts = {
  number: number,
  qwer: qwer
};

var defaultMaps = {
  upper: 'upper',
  ctrl: 'ctrl',
  alt: 'alt',
  shift: 'shift'
};

var Keypad = function () {
  function Keypad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var layouts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var maps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Keypad);

    this.options = Object.assign({}, defaultOptions, options);
    this.layouts = Object.assign({}, defaultLayouts, layouts);
    this.maps = Object.assign({}, defaultMaps, maps);

    this.input = this.options['input'];
    this.wrap = null;
    this.keypads = {};
    this.hightlight = null;
    this.locked = null;

    var _options = this.options,
        el = _options.el,
        show = _options.show;


    if (el) this.listen(el);

    this.inject();

    if (show) this.show();
  }

  createClass(Keypad, [{
    key: 'prefix',
    value: function prefix() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elem';
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var _options$flex = this.options.flex,
          flex = _options$flex === undefined ? true : _options$flex;


      return {
        elem: 'kypd' + (flex ? '-flex' : '') + '-' + (name || 'span'),
        attr: 'data-kypd-' + (name || 'blank')
      }[type];
    }
  }, {
    key: 'reducer',
    value: function reducer(name) {
      var _this = this;

      if (!Keypad.istype(this.options['reducer'], 'object')) {
        console.error('"reducer" must to be a plain object.');
        return;
      }

      if (typeof this.options['reducer'][name] === 'function') {
        return function (target) {
          return _this.options['reducer'][name].call(_this, target);
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

      var content = document.createElement(this.prefix('elem', 'content'));
      var key = document.createElement(this.prefix('elem', 'key'));
      var keyRow = document.createElement(this.prefix('elem', 'key-row'));

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

            if (/svg\[.+\]/.test(keyText)) {
              var name = keyText.match(/svg\[(.+)\]/)[1];
              var svg = images[name];

              if (!svg) {
                console.wran('No image is named "' + name + '"');
                return 'break';
              }

              var fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
              fake.innerHTML = svg;

              _key.appendChild(fake.querySelector('svg'));
            } else if (/(<\/svg>[\s]?)$/.test(keyText)) {
              var _fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
              _fake.innerHTML = keyText;

              _key.appendChild(_fake.querySelector('svg'));
            } else {
              _key.textContent = keyText;
            }

            if (_keyValue || !_keyValue && !keyCode) {
              _keyValue = _keyValue || keyText;
              _key.setAttribute(_this2.prefix('attr', 'key-value'), _keyValue || keyText);
            }

            if (keyCode) _key.setAttribute(_this2.prefix('attr', 'key-code'), keyCode);

            _key.setAttribute(_this2.prefix('attr', 'status'), '');

            _key.addEventListener(_this2.events.start, function (ev) {
              return _this2.handleKey(ev, 'start', [keyText, _keyValue, keyCode]);
            }, false);

            _key.addEventListener(_this2.events.end, function (ev) {
              return _this2.handleKey(ev, 'end', [keyText, _keyValue, keyCode]);
            }, false);

            _keyRow.appendChild(keyReducer(_key));
            keyValue = _keyValue;
          };

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = group[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _ref = _step2.value;

              var _ref2 = slicedToArray(_ref, 3);

              var keyText = _ref2[0];
              var keyValue = _ref2[1];
              var keyCode = _ref2[2];

              var _ret = _loop(keyText, keyValue, keyCode);

              if (_ret === 'break') break;
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
        keyText = keyText && keyText.toUpperCase();
        keyValue = keyValue && keyValue.toUpperCase();
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
      var keypad = this.keypads[this.options['name']];

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

      switch (code) {
        case this.maps['upper']:
          if (when === 'start') break;

          var _attr = this.prefix('attr', 'locked');

          if (this.locked) {
            this.locked = null;
            keypad.removeAttribute(_attr);
            break;
          }
          this.locked = code;
          keypad.setAttribute(_attr, code);
          break;
      }
    }
  }, {
    key: 'keyInput',
    value: function keyInput(value, code) {
      if (!this.input) return true;

      var v = this.input.value;
      var s = this.input.selectionStart;

      if (v && code === 'backspace') {
        v = v.slice(0, s - 1) + v.slice(s);
        s--;
      }

      var type = Keypad.istype(value);
      if (type !== 'null' && type !== 'undefined') {
        v = v.slice(0, s) + value + v.slice(s);
        s++;
      }

      this.input.value = v;
      this.input.selectionEnd = s;
    }
  }, {
    key: 'render',
    value: function render() {
      var layouts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.layouts;

      if (typeof this.options['render'] === 'function') {
        return this.options['render'].call(this);
      }

      var wrap = document.createElement(this.prefix('elem', 'wrap'));
      var container = document.createElement(this.prefix('elem', 'container'));

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

      this.wrap = this.reducer('wrap')(wrap);

      return this.wrap;
    }
  }, {
    key: 'inject',
    value: function inject() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options['inject'];

      target.appendChild(this.render(this.options['multiple'] ? this.layouts : defineProperty({}, this.options['name'], this.layouts[this.options['name']])));
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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

var css = "kypd-flex-wrap, kypd-wrap {\n  width: 100%;\n  font-family: Arial, Helvetica, sans-serif;\n  display: block;\n  bottom: 0;\n  z-index: 999999999;\n  position: fixed;\n  -webkit-transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }\n  kypd-flex-wrap[data-kypd-status=\"none\"], kypd-wrap[data-kypd-status=\"none\"] {\n    display: none; }\n  kypd-flex-wrap[data-kypd-status=\"ready\"], kypd-wrap[data-kypd-status=\"ready\"] {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  kypd-flex-wrap[data-kypd-status=\"active\"], kypd-wrap[data-kypd-status=\"active\"] {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translateY(0%);\n            transform: translateY(0%); }\n\nkypd-flex-container, kypd-container {\n  width: inherit;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  position: absolute; }\n  kypd-flex-container[data-kypd-status=\"ready\"], kypd-container[data-kypd-status=\"ready\"] {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    -webkit-transition: -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }\n  kypd-flex-container[data-kypd-status=\"active\"], kypd-container[data-kypd-status=\"active\"] {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  kypd-flex-container[data-kypd-locked=\"upper\"] [data-kypd-key-value], kypd-container[data-kypd-locked=\"upper\"] [data-kypd-key-value] {\n    text-transform: uppercase; }\n\nkypd-flex-key svg, kypd-key svg {\n  fill: currentColor; }\n\nkypd-flex-container {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  kypd-flex-container[data-kypd-name=\"number\"] kypd-flex-content {\n    max-width: 240px; }\n  kypd-flex-container[data-kypd-name=\"qwer\"] kypd-flex-content {\n    max-width: 560px; }\n\nkypd-flex-content {\n  width: 100%;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-key-row {\n  width: 100%;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-key {\n  height: 48px;\n  width: 100%;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n";
__$$styleInject(css);

var css$2 = "kypd-wrap, kypd-flex-wrap {\n  background-color: #ffffff; }\n\nkypd-flex-container {\n  background-color: inherit;\n  border-top: 1px #f5f5f5 solid; }\n  kypd-flex-container[data-kypd-locked=\"upper\"] [data-kypd-key-code=\"upper\"] {\n    border-radius: 2px;\n    background-color: #0077ff;\n    color: #ffffff; }\n\nkypd-flex-key {\n  cursor: default;\n  border-radius: 10px;\n  background-color: #ffffff;\n  color: #0077ff;\n  font-size: 16px;\n  -webkit-transition: background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-radius 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-radius 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n  kypd-flex-key[data-kypd-status=\"start\"] {\n    border-radius: 2px;\n    background-color: #0077ff;\n    color: #ffffff; }\n  kypd-flex-key[data-kypd-key-value=\" \"] {\n    min-width: 50%; }\n";
__$$styleInject(css$2);

export default Keypad;
//# sourceMappingURL=keypad.es.js.map
