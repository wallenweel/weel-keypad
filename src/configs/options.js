export default {
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

  tag: null,
  theme: 'default',
  dark: false,

  inject: document.body // the wrap element to be injected keypad
}
