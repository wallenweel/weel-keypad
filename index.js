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
  var input = document.querySelector('#readonly-input')
  var password = document.querySelector('#password')
  var items = password.querySelectorAll('i')
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
})

demo('options', () => {
  var kypd = new Keypad(function (options) {
    options.dark = true
    options.name = 'qwer'
    options.hide = true

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
      kypd[name]()
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
      kypd.hide()
      kypd.show(name)
    }, false)
  })

  function id (id) {
    return document.querySelector('#' + id)
  }
}, false)

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
