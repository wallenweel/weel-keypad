export const defaultOptions = {
  el: null, // target element
  flex: true, // use flex layout
  mobile: true,
  start: null, // touchstart|keydown callback
  end: null, // touchend|keyup callback,
  inject: document.body, // the wrap element to be injected keypad
  render: null // manually render layout
}

export const defaultLayouts = {
  numberPad: [
    [[7], [8], [9]],
    [[4], [5], [6]],
    [[1], [2], [3]],
    [['Delete', null, 'backspace'], [0], ['·', '.']]
  ]
}

export default class Keypad {
  constructor (options = {}, layouts = {}) {
    this.options = Object.assign(defaultOptions, options)
    this.layouts = Object.assign(defaultLayouts, layouts)

    this.input = null
    this.wrap = document.querySelector(this.prefix('elem', 'wrap'))

    const { el } = this.options

    if (el) this.listen(el)

    this.inject()
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
        }, false)

        _key.addEventListener(this.events.end, ev => {
          ev.preventDefault()
          ev.stopPropagation()

          _key.setAttribute(this.prefix('attr', 'key-status'), '')

          const target = ev.currentTarget
          const code = target.getAttribute(this.prefix('attr', 'key-code'))

          if (this.input.value && code === 'backspace') {
            const p = this.input.value
            const s = this.input.selectionStart

            this.input.value = p.slice(0, s - 1) + p.slice(s)
            this.input.selectionEnd = s - 1
          }

          const value = target.getAttribute(this.prefix('attr', 'key-value'))

          if (this.input && value) {
            this.input.value += value
          }
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
      const content = this.generator(layout)

      content.setAttribute(this.prefix('attr', 'name'), name)
      container.appendChild(content)
    }

    wrap.appendChild(container)
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

  focus () {
    console.log('has focused.')
  }

  static istype (o, type) {
    const r = Object.prototype.toString.call(o)
      .replace(/^\[object (.+)\]$/, '$1').toLowerCase()

    if (!type) return r

    return type === r
  }
}
