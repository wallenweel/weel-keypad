import './src/styles/demo.scss'

/* global Keypad */
Keypad.isMobile = /Mobile/.test(navigator.userAgent)

// setTimeout(() => (document.querySelector('main').scrollTop = 10000), 200)

demo('base', () => {
  var kypd = new Keypad()

  return kypd
})

demo('listen', () => {
  var kypd = new Keypad({
    el: '#listened-input'
  })

  return kypd
})

demo('input', () => {
  var password = document.querySelector('#password')
  var items = password.querySelectorAll('i')

  var input = document.querySelector('#readonly-input')
  var kypd = new Keypad({
    input: input,
    onend: function (key) {
      var code = key[2]
      var n = input.value.length + 1

      if (code === 'backspace') {
        n--

        if (n === 0) return kypd.hide()
        if (n > items.length) n = items.length - 1

        items[n - 1].classList.remove('on')

        return false
      }

      if (n > items.length) {
        kypd.hide()
        return true
      }

      if (n === items.length) {
        items[n - 1].classList.add('on')
        return kypd.hide()
      }

      items[n - 1].classList.add('on')
    }
  })

  password.addEventListener('click', ev => kypd.show(), false)

  return kypd
})

demo('options', () => {
  var kypd = new Keypad(function (options) {
    options.dark = true
    options.name = 'qwer'
    options.hide = 'click'

    options.onstart = function (key) {
      id('options-print-1').textContent = key[0]
      id('options-print-2').textContent = key[1]
      id('options-print-3').textContent = key[2]
    }

    return options
  })

  var theme = {
    dark: id('theme-color-1'),
    light: id('theme-color-2')
  }

  Object.entries(theme).forEach(function (action) {
    var name = action[0]
    var target = action[1]

    target.addEventListener('click', function (ev) {
      ev.stopPropagation()
      target.querySelector('input[name]').click()

      kypd.dark(name === 'dark')
    }, false)
  })

  var control = {
    toggle: id('control-1'),
    show: id('control-2'),
    hide: id('control-3')
  }

  Object.entries(control).forEach(function (action) {
    var name = action[0]
    var target = action[1]

    target.addEventListener('click', function (ev) {
      ev.stopPropagation()

      var layout = document.querySelector('input[name="layout"][checked]').value

      kypd[name](layout)
    }, false)
  })

  var layout = {
    number: id('layout-1'),
    qwer: id('layout-2')
  }

  Object.entries(layout).forEach(function (action) {
    var name = action[0]
    var target = action[1]

    target.addEventListener('click', function (ev) {
      ev.stopPropagation()

      target.querySelector('input[name]').click()

      kypd.hide() || kypd.show(name)
    }, false)
  })

  function id (id) {
    return document.querySelector('#' + id)
  }
}, false)

demo('wasd', () => {
  var kypd = new Keypad({
    name: 'wasd',
    multiple: false,
    reducer: {
      content: function (target) {
        target.style.maxWidth = '240px'
        return target
      },
      key: function (target, key) {
        if (key[1] === '') {
          target.textContent = ''
          target.style.height = '0'
          target.style.padding = '0'
        }
        return target
      }
    }
  }, {
    wasd: [
      [[''], ['↑'], ['']],
      [['←'], ['↓'], ['→']]
    ]
  })

  return kypd
})

demo('plugins', () => {
  function pluginDemo () {
    var style = document.createElement('style')
    var css = [
      'kypd-flex-toolbar {',
      'background-color: #f5f5f5;',
      'height: 56px; width: 100%;',
      'margin-bottom: 8px;',
      'display: flex; align-items: center; justify-content: flex-end;',
      '}',
      'kypd-flex-toolbar .close {',
      'background: white; color: #0077ff; margin: 0 12px; border-radius: 2px;',
      'height: 44px; min-width: 64px; font-size: 14px; border: none;',
      'display: flex;  flex: none; justify-content: center; align-items: center;',
      '}',
      'kypd-flex-toolbar .input {',
      'background-color: white; border-radius: 2px;',
      'font-size: 16px; color: #333; text-indent: .5em;',
      'height: 44px; width: 100%; border: 0; padding: 0; margin-left: 12px;',
      '}'
    ].join('')

    style.innerHTML = css
    document.head.appendChild(style)

    return function () {
      this.options.reducer.container = function (target) {
        var toolbar = document.createElement(this.prefix('elem', 'toolbar'))
        var input = document.createElement('input')
        var close = document.createElement('button')

        input.type = 'text'
        input.placeholder = 'Type Enter Key To Send.'
        input.readOnly = true
        input.classList.add('input')

        this.input = input

        close.textContent = 'Close'
        close.classList.add('close')
        close.addEventListener(this.events.start, function () { this.hide() }.bind(this), false)

        toolbar.appendChild(input)
        toolbar.appendChild(close)

        target.insertBefore(toolbar, target.firstChild)

        return target
      }

      this.options.reducer.key = function (target, key) {
        if (key[2] === 'enter') {
          target.addEventListener(this.events.end, ev => {
            if (typeof this.options.onsend !== 'function') return true
            this.options.onsend.call(key, this.input.value)
          }, false)
        }

        return target
      }
    }
  }

  // Keypad.plugins = [
  //   pluginDemo()
  // ]

  var kypd = new Keypad({
    name: 'qwer',
    onsend: function (content) {
      document.querySelector('#plugins-input').value = content
    },
    inject: false
  })

  kypd.use(pluginDemo(), 'Demo Plugin')

  kypd.inject()

  return kypd
})

function demo (id, cb) {
  const demo = document.querySelector(`#${id}`)

  if (!demo) return false

  const buttons = {
    show: demo.querySelector('.js-show'),
    hide: demo.querySelector('.js-hide'),
    toggle: demo.querySelector('.js-toggle')
  }

  const keypad = cb.call(demo)

  if (!keypad) return false

  for (const [action, button] of Object.entries(buttons)) {
    if (!button) continue

    button.addEventListener('click', ev => {
      ev.stopPropagation()
      keypad[action]()
    }, false)
  }
}
