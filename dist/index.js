(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
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

var css = ".kypd-passwords {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  .kypd-passwords + input {\n    margin-bottom: 12px; }\n  .kypd-passwords > i {\n    border-radius: 4px;\n    -webkit-box-shadow: 0px 2px 4px 1px rgba(67, 186, 255, .383);\n            box-shadow: 0px 2px 4px 1px rgba(67, 186, 255, .383);\n    height: 32px;\n    width: 32px;\n    margin: 2px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    .kypd-passwords > i::before {\n      content: \"\";\n      border-radius: 5px;\n      background: #22cbff;\n      height: 10px;\n      width: 10px;\n      display: block;\n      -webkit-transition: opacity .25s ease, visibility .25s ease;\n      transition: opacity .25s ease, visibility .25s ease;\n      opacity: .2; }\n    .kypd-passwords > i.on::before {\n      opacity: 1; }\n\n.kypd-theme label,\n.kypd-layout label {\n  margin-right: 12px; }\n\n.kypd-control button {\n  margin-right: 12px; }\n";
__$$styleInject(css);

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

/* global Keypad */
Keypad.isMobile = /Mobile/.test(navigator.userAgent);

// setTimeout(() => (document.querySelector('main').scrollTop = 10000), 200)

demo('base', function () {
  var kypd = new Keypad();

  return kypd;
});

demo('listen', function () {
  var kypd = new Keypad({
    el: '#listened-input'
  });

  return kypd;
});

demo('input', function () {
  var password = document.querySelector('#password');
  var items = password.querySelectorAll('i');

  var input = document.querySelector('#readonly-input');
  var kypd = new Keypad({
    input: input,
    onend: function onend(key) {
      var code = key[2];
      var n = input.value.length + 1;

      if (code === 'backspace') {
        n--;

        if (n === 0) return kypd.hide();
        if (n > items.length) n = items.length - 1;

        items[n - 1].classList.remove('on');

        return false;
      }

      if (n > items.length) {
        kypd.hide();
        return true;
      }

      if (n === items.length) {
        items[n - 1].classList.add('on');
        return kypd.hide();
      }

      items[n - 1].classList.add('on');
    }
  });

  password.addEventListener('click', function (ev) {
    return kypd.show();
  }, false);

  return kypd;
});

demo('options', function () {
  var kypd = new Keypad(function (options) {
    options.dark = true;
    options.name = 'qwer';
    options.hide = 'click';

    options.onstart = function (key) {
      id('options-print-1').textContent = key[0];
      id('options-print-2').textContent = key[1];
      id('options-print-3').textContent = key[2];
    };

    return options;
  });

  var theme = {
    dark: id('theme-color-1'),
    light: id('theme-color-2')
  };

  Object.entries(theme).forEach(function (action) {
    var name = action[0];
    var target = action[1];

    target.addEventListener('click', function (ev) {
      ev.stopPropagation();
      target.querySelector('input[name]').click();

      kypd.dark(name === 'dark');
    }, false);
  });

  var control = {
    toggle: id('control-1'),
    show: id('control-2'),
    hide: id('control-3')
  };

  Object.entries(control).forEach(function (action) {
    var name = action[0];
    var target = action[1];

    target.addEventListener('click', function (ev) {
      ev.stopPropagation();

      var layout = document.querySelector('input[name="layout"][checked]').value;

      kypd[name](layout);
    }, false);
  });

  var layout = {
    number: id('layout-1'),
    qwer: id('layout-2')
  };

  Object.entries(layout).forEach(function (action) {
    var name = action[0];
    var target = action[1];

    target.addEventListener('click', function (ev) {
      ev.stopPropagation();

      target.querySelector('input[name]').click();

      kypd.hide(name === 'number' ? 'qwer' : 'number');
      kypd.show(name);
    }, false);
  });

  function id(id) {
    return document.querySelector('#' + id);
  }
}, false);

demo('wasd', function () {
  var kypd = new Keypad({
    name: 'wasd',
    multiple: false,
    reducer: {
      content: function content(target) {
        target.style.maxWidth = '240px';
        return target;
      },
      key: function key(target, _key) {
        if (_key[1] === '') {
          target.textContent = '';
          target.style.height = '0';
          target.style.padding = '0';
        }
        return target;
      }
    }
  }, {
    wasd: [[[''], ['↑'], ['']], [['←'], ['↓'], ['→']]]
  });

  return kypd;
});

demo('plugins', function () {
  function pluginDemo() {
    var style = document.createElement('style');
    var css = ['kypd-flex-toolbar {', 'background-color: #f5f5f5;', 'height: 56px; width: 100%;', 'margin-bottom: 8px;', 'display: flex; align-items: center; justify-content: flex-end;', '}', 'kypd-flex-toolbar .close {', 'background: white; color: #0077ff; margin: 0 12px; border-radius: 2px;', 'height: 44px; min-width: 64px; font-size: 14px; border: none;', 'display: flex;  flex: none; justify-content: center; align-items: center;', '}', 'kypd-flex-toolbar .input {', 'background-color: white; border-radius: 2px;', 'font-size: 16px; color: #333; text-indent: .5em;', 'height: 44px; width: 100%; border: 0; padding: 0; margin-left: 12px;', '}'].join('');

    style.innerHTML = css;
    document.head.appendChild(style);

    return function () {
      this.options.reducer.container = function (target) {
        var toolbar = document.createElement(this.prefix('elem', 'toolbar'));
        var input = document.createElement('input');
        var close = document.createElement('button');

        input.type = 'text';
        input.placeholder = 'Type Enter Key To Send.';
        input.readOnly = true;
        input.classList.add('input');

        this.input = input;

        close.textContent = 'Close';
        close.classList.add('close');
        close.addEventListener(this.events.start, function () {
          this.hide();
        }.bind(this), false);

        toolbar.appendChild(input);
        toolbar.appendChild(close);

        target.insertBefore(toolbar, target.firstChild);

        return target;
      };

      this.options.reducer.key = function (target, key) {
        var _this = this;

        if (key[2] === 'enter') {
          target.addEventListener(this.events.end, function (ev) {
            if (typeof _this.options.onsend !== 'function') return true;
            _this.options.onsend.call(key, _this.input.value);
          }, false);
        }

        return target;
      };
    };
  }

  // Keypad.plugins = [
  //   pluginDemo()
  // ]

  var kypd = new Keypad({
    name: 'qwer',
    onsend: function onsend(content) {
      document.querySelector('#plugins-input').value = content;
    },
    inject: false
  });

  kypd.use(pluginDemo(), 'Demo Plugin');

  kypd.inject();

  return kypd;
});

function demo(id, cb) {
  var demo = document.querySelector('#' + id);

  if (!demo) return false;

  var buttons = {
    show: demo.querySelector('.js-show'),
    hide: demo.querySelector('.js-hide'),
    toggle: demo.querySelector('.js-toggle')
  };

  var keypad = cb.call(demo);

  if (!keypad) return false;

  var _loop = function _loop(action, button) {
    if (!button) return 'continue';

    button.addEventListener('click', function (ev) {
      ev.stopPropagation();
      keypad[action]();
    }, false);
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(buttons)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 2);

      var action = _ref2[0];
      var button = _ref2[1];

      var _ret = _loop(action, button);

      if (_ret === 'continue') continue;
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

})));
//# sourceMappingURL=index.js.map
