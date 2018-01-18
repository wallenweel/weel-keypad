(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Keypad = factory());
}(this, (function () { 'use strict';

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
  flex: true, // use flex layout
  start: null, // touchstart|keydown callback
  end: null, // touchend|keyup callback,
  inject: document.body, // the wrap element to be injected keypad
  render: null // manually render layout
};

var defaultLayouts = {
  numberPad: [[[7], [8], [9]], [[4], [5], [6]], [[1], [2], [3]], [['Delete', null, 'backspace'], [0], ['·', '.']]]
};

var Keypad = function () {
  function Keypad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var layouts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Keypad);

    this.options = Object.assign(defaultOptions, options);
    this.layouts = Object.assign(defaultLayouts, layouts);

    this.input = null;
    this.wrap = document.querySelector(this.prefix('elem', 'wrap'));

    var el = this.options.el;


    if (el) this.listen(el);

    this.inject();
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
    key: 'generator',
    value: function generator(layout) {
      var _this = this;

      var content = document.createElement(this.prefix('elem', 'content'));
      var key = document.createElement(this.prefix('elem', 'key'));
      var keyRow = document.createElement(this.prefix('elem', 'key-row'));

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = layout[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var group = _step.value;

          var _keyRow = keyRow.cloneNode();

          var _loop = function _loop(keyText, keyValue, keyCode) {
            var _key = key.cloneNode();

            _key.textContent = keyText;

            if (keyCode) _key.setAttribute(_this.prefix('attr', 'key-code'), keyCode);

            if (keyValue || !keyValue && !keyCode) {
              _key.setAttribute(_this.prefix('attr', 'key-value'), keyValue || keyText);
            }

            _key.setAttribute(_this.prefix('attr', 'touch'), '');

            _key.addEventListener('touchstart', function (ev) {
              ev.preventDefault();
              ev.stopPropagation();

              _key.setAttribute(_this.prefix('attr', 'key-status'), 'start');
            }, false);

            _key.addEventListener('touchend', function (ev) {
              ev.preventDefault();
              ev.stopPropagation();

              _key.setAttribute(_this.prefix('attr', 'key-status'), '');

              var target = ev.currentTarget;
              var code = target.getAttribute(_this.prefix('attr', 'key-code'));

              if (_this.input.value && code === 'backspace') {
                _this.input.value = _this.input.value.slice(0, -1);
              }

              var value = target.getAttribute(_this.prefix('attr', 'key-value'));

              if (_this.input && value) {
                _this.input.value += value;
              }
            }, false);

            _keyRow.appendChild(_key);
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

              _loop(keyText, keyValue, keyCode);
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

          content.appendChild(_keyRow);
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
    key: 'render',
    value: function render() {
      var layouts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.layouts;

      var wrap = document.createElement(this.prefix('elem', 'wrap'));
      var container = document.createElement(this.prefix('elem', 'container'));

      wrap.setAttribute(this.prefix('attr', 'status'), 'none');

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.entries(this.layouts)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref3 = _step3.value;

          var _ref4 = slicedToArray(_ref3, 2);

          var name = _ref4[0];
          var layout = _ref4[1];

          var content = this.generator(layout);

          content.setAttribute(this.prefix('attr', 'name'), name);
          container.appendChild(content);
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

      wrap.appendChild(container);
      wrap.setAttribute(this.prefix('attr', 'status'), 'ready');

      this.wrap = wrap;

      return wrap;
    }
  }, {
    key: 'inject',
    value: function inject() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options['inject'];

      target.appendChild(this.render());
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

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
          _this2.wrap.setAttribute(_this2.prefix('attr', 'status'), 'active');
          _this2.input = ev.currentTarget;
        }, false);

        target.addEventListener('blur', function (ev) {
          _this2.wrap.setAttribute(_this2.prefix('attr', 'status'), 'ready');
        }, false);
      });
    }
  }, {
    key: 'focus',
    value: function focus() {
      console.log('has focused.');
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

var css = "kypd-wrap, kypd-flex-wrap {\n  width: 100%;\n  font-family: Arial, Helvetica, sans-serif;\n  display: block;\n  position: fixed;\n  bottom: 0;\n  -webkit-transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.35s, visibility 0.35s, transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }\n  kypd-wrap[data-kypd-status=\"none\"], kypd-flex-wrap[data-kypd-status=\"none\"] {\n    display: none; }\n  kypd-wrap[data-kypd-status=\"ready\"], kypd-flex-wrap[data-kypd-status=\"ready\"] {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  kypd-wrap[data-kypd-status=\"active\"], kypd-flex-wrap[data-kypd-status=\"active\"] {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translateY(0%);\n            transform: translateY(0%); }\n\nkypd-flex-container {\n  width: inherit;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-content {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  kypd-flex-content[data-kypd-name=\"numberPad\"] {\n    width: 100%;\n    max-width: 240px; }\n\nkypd-flex-key-row {\n  width: 100%;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\nkypd-flex-key {\n  height: 48px;\n  width: 100%;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n";
__$$styleInject(css);

var css$2 = "kypd-wrap, kypd-flex-wrap {\n  background: #ffffff; }\n\nkypd-flex-container {\n  border-top: 1px #f5f5f5 solid; }\n\nkypd-flex-key {\n  border-radius: 10px;\n  background: #ffffff;\n  color: #0077ff;\n  font-size: 16px;\n  -webkit-transition: background 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-radius 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: background 0.25s cubic-bezier(0.075, 0.82, 0.165, 1), color 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-radius 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n  kypd-flex-key[data-kypd-key-status=\"start\"] {\n    border-radius: 2px;\n    background: #0077ff;\n    color: #ffffff; }\n";
__$$styleInject(css$2);

return Keypad;

})));
//# sourceMappingURL=keypad.umd.js.map
