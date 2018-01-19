import { number, qwer } from '../layouts'

export const defaultOptions = {
  el: null, // target element
  input: null, // need to set value
  flex: true, // use flex layout
  mobile: true, // choose to use "touch" or "mouse" event
  onstart: null, // touchstart|keydown callback
  onend: null, // touchend|keyup callback,
  show: false,
  name: 'number',
  multiple: true,
  render: null,
  inject: document.body // the wrap element to be injected keypad
}

export const defaultLayouts = {
  number,
  qwer
}

export default class Keypad {
  constructor (options = {}, layouts = {}) {
    this.options = Object.assign({}, defaultOptions, options)
    this.layouts = Object.assign({}, defaultLayouts, layouts)

    this.input = this.options['input']
    this.wrap = null
    this.keypads = {}

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

  generator (layout) {
    const content = document.createElement(this.prefix('elem', 'content'))
    const key = document.createElement(this.prefix('elem', 'key'))
    const keyRow = document.createElement(this.prefix('elem', 'key-row'))

    for (const group of layout) {
      const _keyRow = keyRow.cloneNode()

      for (const [keyText, keyValue, keyCode] of group) {
        const _key = key.cloneNode()

        _key.textContent = keyText

        if (keyCode) _key.setAttribute(this.prefix('attr', 'key-code'), keyCode)

        if (keyValue || (!keyValue && !keyCode)) {
          _key.setAttribute(this.prefix('attr', 'key-value'), keyValue || keyText)
        }

        _key.setAttribute(this.prefix('attr', 'touch'), '')

        _key.addEventListener(this.events.start, ev => {
          ev.preventDefault()
          ev.stopPropagation()

          _key.setAttribute(this.prefix('attr', 'key-status'), 'start')

          if (typeof this.options['onstart'] === 'function') {
            const prevent = this.options['onstart'].call(this, [keyText, keyValue, keyCode])

            if (prevent) return true
          }
        }, false)

        _key.addEventListener(this.events.end, ev => {
          ev.preventDefault()
          ev.stopPropagation()

          _key.setAttribute(this.prefix('attr', 'key-status'), '')

          const target = ev.currentTarget
          const value = target.getAttribute(this.prefix('attr', 'key-value'))
          const code = target.getAttribute(this.prefix('attr', 'key-code'))

          if (typeof this.options['onend'] === 'function') {
            const prevent = this.options['onend'].call(this, [keyText, keyValue, keyCode])

            if (prevent) return true
          }

          if (!this.input) return true

          let v = this.input.value
          let s = this.input.selectionStart

          if (this.input.value && code === 'backspace') {
            v = v.slice(0, s - 1) + v.slice(s)
            s--
          }

          if (value) {
            v = v.slice(0, s) + value + v.slice(s)
            s++
          }

          this.input.value = v
          this.input.selectionEnd = s
        }, false)

        _keyRow.appendChild(_key)
      }

      content.appendChild(_keyRow)
    }

    return content
  }

  render (layouts = this.layouts) {
    const wrap = document.createElement(this.prefix('elem', 'wrap'))
    const container = document.createElement(this.prefix('elem', 'container'))

    wrap.setAttribute(this.prefix('attr', 'status'), 'none')

    for (const [name, layout] of Object.entries(this.layouts)) {
      const _container = container.cloneNode()
      const _content = this.generator(layout)

      _content.setAttribute(this.prefix('attr', 'name'), name)
      _container.setAttribute(this.prefix('attr', 'name'), name)
      _container.setAttribute(this.prefix('attr', 'status'), 'ready')

      this.keypads[name] = _container

      _container.appendChild(_content)
      wrap.appendChild(_container)
    }

    wrap.setAttribute(this.prefix('attr', 'status'), 'ready')

    this.wrap = wrap

    return wrap
  }

  inject (target = this.options['inject']) {
    target.appendChild(this.render())
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
        this.wrap.setAttribute(this.prefix('attr', 'status'), 'active')
        this.input = ev.currentTarget
      }, false)

      target.addEventListener('blur', ev => {
        this.wrap.setAttribute(this.prefix('attr', 'status'), 'ready')
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
