import resolve from 'rollup-plugin-node-resolve'
import eslint from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

import postcss from 'rollup-plugin-postcss'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

import manifest from './package.json'

const min = process.env.NODE_ENV === 'production' ? '.min' : ''

const banner = `/*!
  * Weel Keypad v${manifest.version}
  * (c) 2018 ${manifest.author}
  * Released under the MIT License.
  */`

const plugins = [
  resolve(),
  commonjs(),
  postcss({
    plugins: [
      simplevars(),
      nested(),
      cssnext({ warnForDuplicates: false })
    ].concat(process.env.NODE_ENV === 'production' ? [cssnano()] : []),
    extensions: [ '.css' ]
  }),
  eslint({ exclude: ['src/**/*.scss'] }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),
  (process.env.NODE_ENV === 'production' && uglify({}, minify))
]

const bundle = {
  input: 'src/main.js',
  output: [{
    file: `dist/keypad.common${min}.js`,
    format: 'cjs',
    banner
  }, {
    file: `dist/keypad.esm${min}.js`,
    format: 'es',
    banner
  }, {
    file: `dist/keypad${min}.js`,
    name: 'Keypad',
    format: 'umd',
    banner
  }],
  plugins
}

const index = {
  input: './index.js',
  output: [{
    file: `dist/index${min}.js`,
    format: 'umd'
  }],
  plugins
}

export default [index, bundle]
