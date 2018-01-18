import resolve from 'rollup-plugin-node-resolve'
import eslint from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'

// PostCSS plugins
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

const min = process.env.NODE_ENV === 'production' ? '.min' : ''

export default {
  input: 'src/main.js',
  output: [{
    file: `dist/keypad${min}.js`,
    format: 'cjs'
  }, {
    file: `dist/keypad.umd${min}.js`,
    name: 'weel-keypad',
    format: 'umd'
  }],
  plugins: [
    resolve(),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({
          warnForDuplicates: false
        }),
        cssnano()
      ],
      extensions: [ '.css' ]
    }),
    eslint({ exclude: ['src/**/*.scss'] }),
    babel({
      exclude: 'node_modules/**'
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
}
