import * as images from '../images'

import { number, qwer } from '../layouts'

export const defaultOptions = {
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
}

export const defaultLayouts = {
  number,
  qwer
}

export const defaultMaps = {
  upper: 'upper',
  ctrl: 'ctrl',
  alt: 'alt',
  shift: 'shift'
}

export default class Keypad {
  constructor (options = {}, layouts = {}, maps = {}) {
    this.options = Object.assign({}, defaultOptions, options)
    this.layouts = Object.assign({}, defaultLayouts, layouts)
    this.maps = Object.assign({}, defaultMaps, maps)

    this.input = this.options['input']
    this.wrap = null
    this.keypads = {}
    this.hightlight = null
    this.locked = null

    const { el, show } = this.options

    if (el) this.listen(el)

    this.inject()

    if (show) this.show()
  }

  get events () {
    const { mobile } = this.options

    return {
      start: mobile ? 'touchstart' : 'mousedown',
      end: mobile ? 'touchend' : 'mouseup',
      move: mobile ? 'touchmove' : 'mousemove'
    }
  }

  prefix (type = 'elem', name = '') {
    const { flex = true } = this.options

    return {
      elem: `kypd${flex ? '-flex' : ''}-${name || 'span'}`,
      attr: `data-kypd-${name || 'blank'}`
    }[type]
  }

  reducer (name) {
    if (!Keypad.istype(this.options['reducer'], 'object')) {
      console.error('"reducer" must to be a plain object.')
      return
    }

    if (typeof this.options['reducer'][name] === 'function') {
      return target => this.options['reducer'][name].call(this, target)
    }

    return target => target
  }

  generator (layout) {
    const content = document.createElement(this.prefix('elem', 'content'))
    const key = document.createElement(this.prefix('elem', 'key'))
    const keyRow = document.createElement(this.prefix('elem', 'key-row'))

    const rowReducer = this.reducer('row')
    const keyReducer = this.reducer('key')

    for (const group of layout) {
      const _keyRow = keyRow.cloneNode()

      for (let [keyText, keyValue, keyCode] of group) {
        const _key = key.cloneNode()

        if (/svg\[.+\]/.test(keyText)) {
          const name = keyText.match(/svg\[(.+)\]/)[1]
          const svg = images[name]

          if (!svg) {
            console.wran(`No image is named "${name}"`)
            break
          }

          const fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
          fake.innerHTML = svg

          _key.appendChild(fake.querySelector('svg'))
        } else if (/(<\/svg>[\s]?)$/.test(keyText)) {
          const fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
          fake.innerHTML = keyText

          _key.appendChild(fake.querySelector('svg'))
        } else {
          _key.textContent = keyText
        }

        if (keyValue || (!keyValue && !keyCode)) {
          keyValue = keyValue || keyText
          _key.setAttribute(this.prefix('attr', 'key-value'), keyValue || keyText)
        }

        if (keyCode) _key.setAttribute(this.prefix('attr', 'key-code'), keyCode)

        _key.setAttribute(this.prefix('attr', 'status'), '')

        _key.addEventListener(this.events.start,
          ev => this.handleKey(ev, 'start', [keyText, keyValue, keyCode]),
          false
        )

        _key.addEventListener(this.events.end,
          ev => this.handleKey(ev, 'end', [keyText, keyValue, keyCode]),
          false
        )

        _keyRow.appendChild(keyReducer(_key))
      }

      content.appendChild(rowReducer(_keyRow))
    }

    return content
  }

  handleKey (ev, when, [keyText, keyValue, keyCode]) {
    ev.preventDefault()
    ev.stopPropagation()

    const target = ev.currentTarget
    const attr = this.prefix('attr', 'status')
    const status = target.getAttribute(attr)

    if (status !== 'active') {
      if (when === 'start') {
        target.setAttribute(attr, 'start')
      }

      if (when === 'end') {
        target.setAttribute(attr, '')
      }
    }

    if (!keyCode && this.locked === this.maps['upper']) {
      keyText = keyText && keyText.toUpperCase()
      keyValue = keyValue && keyValue.toUpperCase()
    }

    this.keyMap(when, keyValue, keyCode)

    if (typeof this.options[`on${when}`] === 'function') {
      const prevent = this.options[`on${when}`].call(target, [keyText, keyValue, keyCode], ev)

      if (prevent) return true
    }

    if (when === this.options['inputWhen']) {
      this.keyInput(keyValue, keyCode)
    }
  }

  keyMap (when, value, code) {
    const keypad = this.keypads[this.options['name']]

    const attr = this.prefix('attr', 'hightlight')
    let hightlight = keypad.getAttribute('hightlight') || ''

    hightlight = hightlight ? `${hightlight}+${code || value}` : (code || value)

    if (when === 'start') {
      this.hightlight = hightlight
      keypad.setAttribute(attr, hightlight)
    }

    if (when === 'end') {
      keypad.setAttribute(attr, '')
    }

    switch (code) {
      case this.maps['upper']:
        if (when === 'start') break

        const attr = this.prefix('attr', 'locked')

        if (this.locked) {
          this.locked = null
          keypad.removeAttribute(attr)
          break
        }
        this.locked = code
        keypad.setAttribute(attr, code)
        break
    }
  }

  keyInput (value, code) {
    if (!this.input) return true

    let v = this.input.value
    let s = this.input.selectionStart

    if (v && code === 'backspace') {
      v = v.slice(0, s - 1) + v.slice(s)
      s--
    }

    if (value) {
      v = v.slice(0, s) + value + v.slice(s)
      s++
    }

    this.input.value = v
    this.input.selectionEnd = s
  }

  render (layouts = this.layouts) {
    if (typeof this.options['render'] === 'function') {
      return this.options['render'].call(this)
    }

    const wrap = document.createElement(this.prefix('elem', 'wrap'))
    const container = document.createElement(this.prefix('elem', 'container'))

    wrap.setAttribute(this.prefix('attr', 'status'), 'none')

    const contentReducer = this.reducer('content')
    const containerReducer = this.reducer('container')

    for (const [name, layout] of Object.entries(layouts)) {
      const _content = this.generator(layout)
      const _container = container.cloneNode()

      _container.setAttribute(this.prefix('attr', 'name'), name)
      _container.setAttribute(this.prefix('attr', 'status'), 'ready')

      this.keypads[name] = _container

      _container.appendChild(contentReducer(_content))
      wrap.appendChild(containerReducer(_container))
    }

    wrap.setAttribute(this.prefix('attr', 'status'), 'ready')

    this.wrap = this.reducer('wrap')(wrap)

    return this.wrap
  }

  inject (target = this.options['inject']) {
    target.appendChild(this.render(
      this.options['multiple']
        ? this.layouts
        : { [this.options['name']]: this.layouts[this.options['name']] }
    ))
  }

  listen (el = null) {
    if (!el) return false

    let targets = []

    switch (Keypad.istype(el)) {
      case 'string':
        targets = document.querySelectorAll(el)
        break

      case 'nodelist':
        targets = el
        break

      default:
        // must be a html element
        if (!/html\w*element/.test(Keypad.istype(el))) return false
        targets = [el]
        break
    }

    if (!targets || !targets.length) return false

    Array.prototype.forEach.call(targets, target => {
      target.addEventListener('focus', ev => {
        this.input = ev.currentTarget
        this.show()
      }, false)

      target.addEventListener('blur', ev => {
        this.input = null
        this.hide()
      }, false)
    })
  }

  show (name = this.options['name']) {
    if (!this.layouts[name]) {
      console.error(`Has not a keypad layout named "${name}"`)
      return false
    }

    this.wrap.setAttribute(this.prefix('attr', 'status'), 'active')
    this.keypads[name].setAttribute(this.prefix('attr', 'status'), 'active')
  }

  hide (name = this.options['name']) {
    if (!this.layouts[name]) {
      console.error(`Has not a keypad layout named "${name}"`)
      return false
    }

    this.wrap.setAttribute(this.prefix('attr', 'status'), 'ready')
    this.keypads[name].setAttribute(this.prefix('attr', 'status'), 'ready')
  }

  toggle (name = this.options['name']) {
    if (this.wrap.getAttribute(this.prefix('attr', 'status')) === 'active') {
      this.hide(name)
    } else {
      this.show(name)
    }
  }

  static istype (o, type) {
    const r = Object.prototype.toString.call(o)
      .replace(/^\[object (.+)\]$/, '$1').toLowerCase()

    if (!type) return r

    return type === r
  }
}
