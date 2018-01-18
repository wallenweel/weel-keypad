import './src/styles/page.scss'

const isMobile = /Mobile/.test(navigator.userAgent)

/* global Keypad */
const k = new Keypad({
  el: 'input',
  mobile: isMobile
})

k.focus()
