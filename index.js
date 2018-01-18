import './src/styles/page.scss'

const isMobile = /Mobile/.test(navigator.userAgent)

/* global Keypad */
/* eslint-disable no-new */
new Keypad({
  el: document.querySelector('input.js-normal-input'),
  mobile: isMobile
})

const keypad = new Keypad({
  input: document.querySelector('input.js-toggle-input'),
  mobile: isMobile,
  onend ([text, value, code]) {
    console.log(text, 'value', code)

    // return true
  }
})

document.querySelector('button.js-toggle-keypad')
  .addEventListener('click', ev => {
    keypad.toggle()
  }, false)
