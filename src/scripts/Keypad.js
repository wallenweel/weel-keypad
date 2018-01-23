import defaultOptions from '../configs/options'
import * as defaultLayouts from '../configs/layouts'
import defaultMaps from '../configs/maps'
import * as images from '../images'

/**
 * Keypad class
 *
 * @param {Object?} options user options
 * @param {Object?} layouts user layouts
 * @param {Object?} maps user maps
 */
export default class Keypad {
  constructor (...configs) {
    let [options = {}, layouts = {}, maps = {}] = configs

    if (typeof options === 'function') options = options(Object.assign({}, defaultOptions))
    if (typeof layouts === 'function') layouts = layouts(Object.assign({}, defaultLayouts))
    if (typeof maps === 'function') maps = maps(Object.assign({}, defaultMaps))

    this.options = Object.assign({}, defaultOptions, options)
    this.layouts = Object.assign({}, defaultLayouts, layouts)
    this.maps = Object.assign({}, defaultMaps, maps)

    if (!Keypad.istype(Keypad.isMobile, 'undefined')) {
      this.options.mobile = Keypad.isMobile
    }

    const { el, input, show, hide, body, inject } = this.options

    if (!body) {
      console.error(`Option "body" is ${body}, maybe you need to wait the body loaded by 'window.onload'.`)
    }

    this.wrap = null
    this.parent = body || null
    this.input = input || null

    this.keypads = {}
    this.hightlight = null
    this.locked = null

    if (Keypad.istype(Keypad.plugins, 'array')) {
      for (const [i, plugin] of Object.entries(Keypad.plugins)) {
        this.use(plugin, i)
      }
    }

    if (el) this.listen()
    if (inject && body) this.inject()
    if (show) this.show()
    if (hide) this.bodyHide()
  }

  use (plugin, id) {
    if (typeof plugin !== 'function') {
      return console.warn(`${id} in Keypad.plugins is not a function.`)
    }

    plugin.call(this)
  }

  /**
   * events according to device type
   */
  get events () {
    const { mobile } = this.options

    return {
      start: mobile ? 'touchstart' : 'mousedown',
      end: mobile ? 'touchend' : 'mouseup',
      move: mobile ? 'touchmove' : 'mousemove'
    }
  }

  /**
   * prefix for Keypad elememnts and attributes
   * @param {String} type 'elem' or 'attr'
   * @param {String} name name of elem or attr
   * @return {String} tag name or attribute's name
   */
  prefix (type = 'elem', name = '') {
    const { flex } = this.options

    return {
      elem: `kypd${flex ? '-flex' : ''}-${name || 'span'}`,
      attr: `data-kypd-${name || 'blank'}`
    }[type]
  }

  /**
   * createElement for custom element
   * @param {String} name custom tag name
   * @param {String} tag user's custom tag name
   * @return {HTMLElement} created HTML element
   */
  createElement (name = '', tag = this.options['tag']) {
    if (!tag) {
      return document.createElement(this.prefix('elem', name))
    }

    const _elem = document.createElement(tag)

    _elem.setAttribute(this.prefix('attr', 'tag'), name)

    return _elem
  }

  /**
   * reducer for user modifing Keypad's elements
   * @param {String} name Keypad custom element name
   * @return {HTMLElement} reduced element
   */
  reducer (name) {
    const { reducer } = this.options

    if (!Keypad.istype(reducer, 'object')) {
      return console.error('"reducer" must to be a plain object.')
    }

    if (typeof reducer[name] === 'function') {
      return (target, extra) =>
        reducer[name].call(this, target, extra) ||
        document.createDocumentFragment()
    }

    return target => target
  }

  /**
   * generator for generating keypad's layout to HTML
   * @param {Array} layout keypad's custom layout
   * @return {HTMLElement} generated HTML
   */
  generator (layout) {
    const { multiple } = this.options

    const content = this.createElement('content')
    const keyRow = this.createElement('key-row')
    const key = this.createElement('key')
    const span = document.createElement('span')

    const rowReducer = this.reducer('row')
    const keyReducer = this.reducer('key')

    for (const row of layout) {
      const _keyRow = keyRow.cloneNode()

      for (let [keyText, keyValue, keyCode] of row) {
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
        _keyRow.appendChild(keyReducer(_key, [keyText, keyValue, keyCode]))
      }

      content.appendChild(rowReducer(_keyRow, row))
    }

    return content
  }

  /**
   * handleKey for key's event listener
   * @param {Event} ev key related event
   * @param {String} when 'start' or 'end'
   * @param {Array} key text and value and code
   */
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

  /**
   * keyMap for key's trigger map
   * @param {String} when 'start' or 'end'
   * @param {String?} value key's value
   * @param {String?} code key's command code
   */
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

  /**
   * keyInput for key to set input value
   * @param {String?} value key's value
   * @param {String?} code key's command code
   */
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

  /**
   * render for Keypad's rending
   * @param {Object} layouts all keypad layouts
   * @return {HTMLElement} rended Keypad HTML
   */
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

      _container.appendChild(contentReducer(_content, [name, layout]))
      wrap.appendChild(containerReducer(_container))
    }

    wrap.setAttribute(this.prefix('attr', 'status'), 'ready')
    wrap.setAttribute(this.prefix('attr', 'theme'), theme)
    wrap.setAttribute(this.prefix('attr', 'dark'), dark)

    wrap.addEventListener(this.bodyEvent,
      ev => ev.stopPropagation() || ev.preventDefault(),
      false
    )

    this.wrap = this.reducer('wrap')(wrap)

    return this.wrap
  }

  /**
   * inject Keypad to the target node
   * @param {Node} target the parent node to be injected
   */
  inject (target) {
    const { body, name, multiple } = this.options

    const parent = target || body

    parent.appendChild(
      this.render(multiple ? this.layouts : { [name]: this.layouts[name] })
    )

    this.parent = parent
  }

  /**
   * remove Keypad from the parent node
   */
  remove () {
    if (this.wrap && this.parent) {
      return !!this.parent.removeChild(this.wrap)
    }

    return !!console.log('Has not found "Keypad" that needed to be removed.')
  }

  /**
   * listen input's focus and blur event
   * @param {HTMLElement?} el HTMLElement or NodeList to be listend
   */
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

  /**
   * bodyEvent to bodyHide
   */
  get bodyEvent () {
    const { hide } = this.options

    return typeof hide === 'string' ? hide : this.events.start
  }

  /**
   * bodyHide for tap body area except keypad wrap
   */
  bodyHide () {
    document.body.addEventListener(this.bodyEvent, ev => {
      this.hide()
    }, false)

    this.wrap.addEventListener(this.bodyEvent,
      ev => ev.stopPropagation() || ev.preventDefault(),
      false
    )
  }

  /**
   * show keypad with a layout
   * @param {String} name layout's name
   */
  show (name = this.options['name']) {
    if (!this.layouts[name]) {
      console.error(`Has not a keypad layout named "${name}"`)
      return false
    }

    this.wrap.setAttribute(this.prefix('attr', 'status'), 'active')
    this.keypads[name].setAttribute(this.prefix('attr', 'status'), 'active')
  }

  /**
   * hide keypad with a layout
   * @param {String} name layout's name
   */
  hide (name = this.options['name']) {
    if (!this.layouts[name]) {
      console.error(`Has not a keypad layout named "${name}"`)
      return false
    }

    this.wrap.setAttribute(this.prefix('attr', 'status'), 'ready')
    this.keypads[name].setAttribute(this.prefix('attr', 'status'), 'ready')
  }

  /**
   * toggle keypad show and hide
   * @param {String} name layout's name
   */
  toggle (name = this.options['name']) {
    if (this.wrap.getAttribute(this.prefix('attr', 'status')) === 'active') {
      this.hide(name)
    } else {
      this.show(name)
    }
  }

  /**
   * dark theme enabled
   * @param {Boolean} expect expect use dark theme whether or not
   */
  dark (expect = true) {
    this.wrap.setAttribute(this.prefix('attr', 'dark'), !!expect)
  }

  /**
   * istype for check object's type
   * @param {Object?} o needed to checked thing
   * @param {String} type expected type
   * @return {Boolean?} is "type" param is undefined return checking result
   */
  static istype (o, type) {
    const r = Object.prototype.toString.call(o)
      .replace(/^\[object (.+)\]$/, '$1').toLowerCase()

    if (!type) return r

    return type === r
  }
}
