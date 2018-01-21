export default {
  el: null, // listened input element
  input: null, // the input element that need to set value
  inputWhen: 'end', // the time to set input's value, 'start' or 'end'

  flex: true, // use flex layout
  mobile: true, // choose to use "touch" or "mouse" event by boolean

  onstart: null, // touchstart|keydown callback
  onend: null, // touchend|keyup callback,

  name: 'number', // default keypad layout name
  multiple: true, // render all keypad layouts
  show: false, // show keypad after injected
  // hide keypad when 'body' is clicked,
  // support event name, default 'click'
  hide: false,

  render: null, // a callback to replace Keypad's render method
  reducer: { // nodes's hook
    wrap: null,
    container: null,
    content: null,
    row: null,
    key: null
  },

  tag: null, // custom tag name
  theme: 'default', // theme name
  dark: false, // dark theme mode

  // the wrap element to be injected keypad,
  // support callback to repleace default
  body: document.body
}
