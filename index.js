import './src/styles/demo.scss'

const isMobile = /Mobile/.test(navigator.userAgent)

/* global Keypad */

// demo 1
/* eslint-disable no-new */
new Keypad({
  el: document.querySelector('input.js-normal-input'),
  mobile: isMobile
})

// demo 2
const keypad2 = new Keypad({
  input: document.querySelector('input.js-toggle-input'),
  mobile: isMobile
})

document.querySelector('button.js-toggle-keypad')
  .addEventListener('click', ev => { keypad2.toggle() }, false)

document.querySelector('button.js-show-keypad')
  .addEventListener('click', ev => { keypad2.show() }, false)

document.querySelector('button.js-hide-keypad')
  .addEventListener('click', ev => { keypad2.hide() }, false)

// demo 3
const keypad3 = new Keypad({
  mobile: isMobile,
  show: true,
  // name: 'qwer',
  reducer: {
    key (target) {
      if (target.textContent === 'Space') {
        target.textContent = '空 格'
      }
      return target
    }
  },
  onstart ([text, value, code], ev) {
    console.log(this, ev)
  },
  onend ([text, value, code]) {
    console.log(text, value, code)

    document.querySelector('.js-toggle-keypad2-v').textContent = value
  }
})

document.querySelector('button.js-toggle-keypad2')
  .addEventListener('click', ev => { keypad3.toggle() }, false)

// demo 4
const keypad4 = new Keypad({
  input: document.querySelector('input.js-readonly-input'),
  mobile: isMobile,
  onend ([, , code]) {
    const i = document.querySelector('input.js-readonly-input').value.length
    const items = document.querySelectorAll('.js-show-keypad-password > i')

    if (code === 'backspace') {
      if (!i) {
        keypad4.hide()

        return false
      }

      items[i - 1].classList.remove('on')

      return false
    }

    if (i >= items.length) {
      keypad4.hide()

      return true
    }

    items[i].classList.add('on')
  }
})

document.querySelector('.js-show-keypad-password')
  .addEventListener('click', ev => { keypad4.show() }, false)
