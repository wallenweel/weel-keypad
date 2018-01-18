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

var css = "main.container > h4 {\n  margin-top: 48px; }\n\nmain.container .passwords {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  main.container .passwords + input {\n    margin-bottom: 12px; }\n  main.container .passwords > i {\n    border-radius: 4px;\n    border: 1px solid #eee;\n    height: 32px;\n    width: 32px;\n    margin: 2px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    main.container .passwords > i::before {\n      content: \"\";\n      border-radius: 5px;\n      background: #333333;\n      height: 10px;\n      width: 10px;\n      display: block;\n      -webkit-transition: opacity .25s ease, visibility .25s ease;\n      transition: opacity .25s ease, visibility .25s ease;\n      opacity: 0;\n      visibility: hidden; }\n    main.container .passwords > i.on::before {\n      opacity: 1;\n      visibility: visible; }\n";
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

var isMobile = /Mobile/.test(navigator.userAgent);

/* global Keypad */

// demo 1
/* eslint-disable no-new */
new Keypad({
  el: document.querySelector('input.js-normal-input'),
  mobile: isMobile
});

// demo 2
var keypad2 = new Keypad({
  input: document.querySelector('input.js-toggle-input'),
  mobile: isMobile
});

document.querySelector('button.js-toggle-keypad').addEventListener('click', function (ev) {
  keypad2.toggle();
}, false);

document.querySelector('button.js-show-keypad').addEventListener('click', function (ev) {
  keypad2.show();
}, false);

document.querySelector('button.js-hide-keypad').addEventListener('click', function (ev) {
  keypad2.hide();
}, false);

// demo 3
var keypad3 = new Keypad({
  mobile: isMobile,
  onstart: function onstart(_ref) {
    var _ref2 = slicedToArray(_ref, 3),
        text = _ref2[0],
        value = _ref2[1],
        code = _ref2[2];

    console.log('start', text, value, code);
  },
  onend: function onend(_ref3) {
    var _ref4 = slicedToArray(_ref3, 3),
        text = _ref4[0],
        value = _ref4[1],
        code = _ref4[2];

    console.log('end', text, value, code);

    document.querySelector('.js-toggle-keypad2-v').textContent = text;
  }
});

document.querySelector('button.js-toggle-keypad2').addEventListener('click', function (ev) {
  keypad3.toggle();
}, false);

// demo 4
var keypad4 = new Keypad({
  input: document.querySelector('input.js-readonly-input'),
  mobile: isMobile,
  onend: function onend(_ref5) {
    var _ref6 = slicedToArray(_ref5, 3),
        code = _ref6[2];

    var i = this.input.value.length;
    var items = document.querySelectorAll('.js-show-keypad-password > i');

    if (code === 'backspace') {
      if (!i) {
        keypad4.hide();

        return false;
      }

      items[i - 1].classList.remove('on');

      return false;
    }

    if (i >= items.length) {
      keypad4.hide();

      return true;
    }

    items[i].classList.add('on');
  }
});

document.querySelector('.js-show-keypad-password').addEventListener('click', function (ev) {
  keypad4.show();
}, false);
//# sourceMappingURL=index.js.map
