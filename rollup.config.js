import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: [{
    file: 'dist/keypad.js',
    format: 'cjs'
  }, {
    file: 'dist/keypad.umd.js',
    name: 'weel-keypad',
    format: 'umd'
  }],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
