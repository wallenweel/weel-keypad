/* global Keypad */
Keypad.isMobile = /Mobile/.test(navigator.userAgent)

demo('base', () => {
  var kypd = new Keypad()

  // kypd.toggle()
  // kypd.show()
  // kypd.hide()

  return kypd
})

demo('listen', () => {
  var kypd = new Keypad({
    el: '#listened-input'
  })

  return kypd
})

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
