import 'normalize.css'
import './src/styles/page.scss'

/* global Keypad */
const k = new Keypad({
  el: 'input'
})

k.focus()
