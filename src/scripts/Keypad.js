import defaultOptions from '../configs/options'
import * as defaultLayouts from '../configs/layouts'
import defaultMaps from '../configs/maps'
import * as images from '../images'

/**
 * Keypad class
 *
 * @param {Object} options user options
 * @param {Object} layouts user layouts
 * @param {Object} maps user maps
 */
export default class Keypad {
  // constructor (options = {}, layouts = {}, maps = {}) {
  constructor (...configs) {
    let [options = {}, layouts = {}, maps = {}] = configs

    if (typeof options === 'function') options = options(Object.assign({}, defaultOptions))
    if (typeof layouts === 'function') layouts = layouts(Object.assign({}, defaultLayouts))
    if (typeof maps === 'function') maps = maps(Object.assign({}, defaultMaps))

    options.mobile = Keypad.isMobile

    this.options = Object.assign({}, defaultOptions, options)
    this.layouts = Object.assign({}, defaultLayouts, layouts)
    this.maps = Object.assign({}, defaultMaps, maps)

    const { el, input, show, hide, body } = this.options

    this.input = input || null
    this.wrap = null
    this.parent = body || null

    this.keypads = {}
    this.hightlight = null
    this.locked = null

    if (el) this.listen()
    if (body) this.inject()
    if (show) this.show()
    if (hide) this.bodyHide()
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
    const { flex } = this.options

    return {
      elem: `kypd${flex ? '-flex' : ''}-${name || 'span'}`,
      attr: `data-kypd-${name || 'blank'}`
    }[type]
  }

  createElement (name = '', tag = this.options['tag']) {
    if (!tag) {
      return document.createElement(this.prefix('elem', name))
    }

    const _elem = document.createElement(tag)

    _elem.setAttribute(this.prefix('attr', 'tag'), name)

    return _elem
  }

  reducer (name) {
    const { reducer } = this.options

    if (!Keypad.istype(reducer, 'object')) {
      return console.error('"reducer" must to be a plain object.')
    }

    if (typeof reducer[name] === 'function') {
      return target => reducer[name].call(this, target)
    }

    return target => target
  }

  generator (layout) {
    const { multiple } = this.options

    const content = this.createElement('content')
    const keyRow = this.createElement('key-row')
    const key = this.createElement('key')
    const span = document.createElement('span')

    const rowReducer = this.reducer('row')
    const keyReducer = this.reducer('key')

    for (const group of layout) {
      const _keyRow = keyRow.cloneNode()

      for (let [keyText, keyValue, keyCode] of group) {
        const _key = key.cloneNode()
        const _span = span.cloneNode()

        if (/svg\[.+\]/.test(keyText)) {
          const name = keyText.match(/svg\[(.+)\]/)[1]
          const svg = images[name]

          if (!svg) {
            console.wran(`No image is named "${name}"`)
            break
          }

          const fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
          fake.innerHTML = svg

          _span.appendChild(fake.querySelector('svg'))
        } else if (/(<\/svg>[\s]?)$/.test(keyText)) {
          const fake = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
          fake.innerHTML = keyText

          _span.appendChild(fake.querySelector('svg'))
        } else {
          _span.textContent = keyText
        }

        if (keyValue || (!keyValue && !keyCode)) {
          keyValue = keyValue || keyText
          _key.setAttribute(this.prefix('attr', 'key-value'), keyValue || keyText)
        }

        if (keyCode) {
          if (!multiple && /^@@/.test(keyCode + '')) {
            continue
          }

          _key.setAttribute(this.prefix('attr', 'key-code'), keyCode)
        }

        _key.setAttribute(this.prefix('attr', 'status'), '')

        _key.addEventListener(this.events.start,
          ev => this.handleKey(ev, 'start', [keyText, keyValue, keyCode]),
          false
        )

        _key.addEventListener(this.events.end,
          ev => this.handleKey(ev, 'end', [keyText, keyValue, keyCode]),
          false
        )

        _key.appendChild(_span)
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
      keyText = keyText && ('' + keyText).toUpperCase()
      keyValue = keyValue && ('' + keyValue).toUpperCase()
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
    const { name } = this.options

    const keypad = this.keypads[name]

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

    if (when === 'start' && code === this.maps['upper']) {
      const attr = this.prefix('attr', 'locked')

      if (this.locked) {
        this.locked = null
        keypad.removeAttribute(attr)
      } else {
        this.locked = code
        keypad.setAttribute(attr, code)
      }
    }

    if (when === 'end' && /^@@/.test(code)) {
      const _name = code.match(/^@@(.*)/)[1]

      this.hide()

      const layouts = Object.keys(this.layouts)

      if (typeof _name === 'string' && !_name.length) {
        let next = layouts.indexOf(name) + 1

        this.options['name'] = layouts[next === layouts.length ? 0 : next]
      }

      if (layouts.includes(_name)) {
        this.options['name'] = _name
      }

      this.show()
    }
  }

  keyInput (value, code) {
    if (
      !this.input || (
        !(value === 0 ? '0' : value) &&
        code !== this.maps['backspace']
      )
    ) return true

    let _value = this.input.value
    let start = this.input.selectionStart
    let end = this.input.selectionEnd

    if ((end - start)) {
      _value = _value.slice(0, start) + _value.slice(end)
    }

    if (_value && code === this.maps['backspace'] && !(end - start)) {
      _value = _value.slice(0, start - 1) + _value.slice(start)
      start--
    }

    const type = Keypad.istype(value)
    if (type !== 'null' && type !== 'undefined') {
      _value = _value.slice(0, start) + value + _value.slice(start)
      start++
    }

    this.input.value = _value
    this.input.selectionEnd = start
  }

  render (layouts = this.layouts) {
    const { render, theme, dark } = this.options

    if (typeof render === 'function') {
      return render.call(this)
    }

    const wrap = this.createElement('wrap')
    const container = this.createElement('container')

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
    wrap.setAttribute(this.prefix('attr', 'theme'), theme)
    wrap.setAttribute(this.prefix('attr', 'dark'), dark)

    wrap.addEventListener(this.events.start,
      ev => ev.stopPropagation() || ev.preventDefault(),
      false
    )

    this.wrap = this.reducer('wrap')(wrap)

    return this.wrap
  }

  inject (target) {
    const { body, name, multiple } = this.options

    const wrap = target || body

    wrap.appendChild(
      this.render(multiple ? this.layouts : { [name]: this.layouts[name] })
    )

    this.parent = wrap
  }

  remove () {
    if (this.wrap && this.parent) {
      return this.parent.removeChild(this.wrap)
    }

    return console.log('Has not found "Keypad" that needed to be removed.')
  }

  listen (el = this.options['el']) {
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

  bodyHide (ev, flag = this.options['hide']) {
    if (!flag) return false

    const _flag = typeof flag === 'string' ? flag : 'click'

    document.body.addEventListener(_flag, ev => this.hide(), false)

    this.wrap.addEventListener(_flag,
      ev => ev.stopPropagation() || ev.preventDefault(),
      false
    )
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

  dark (status = true) {
    this.wrap.setAttribute(this.prefix('attr', 'dark'), !!status)
  }

  static istype (o, type) {
    const r = Object.prototype.toString.call(o)
      .replace(/^\[object (.+)\]$/, '$1').toLowerCase()

    if (!type) return r

    return type === r
  }
}
