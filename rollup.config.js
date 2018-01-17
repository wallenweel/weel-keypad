export default {
  entry: 'src/main.js',
  targets: [{
    dest: 'dist/keypad.js',
    format: 'cjs'
  }, {
    dest: 'dist/keypad.umd.js',
    moduleName: 'weel-keypad',
    format: 'umd'
  }]
}