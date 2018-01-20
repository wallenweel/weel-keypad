// Karma configuration
// Generated on Sat Jan 20 2018 20:45:24 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/scripts/Keypad.js': ['coverage'],
      'test/**/*.spec.js': ['rollup']
    },


    rollupPreprocessor: {
      output: {
        name: 'keypad',
        format: 'umd',
        sourcemap: 'inline'
      },
      plugins: [
        require('rollup-plugin-node-resolve')(),
        require('rollup-plugin-postcss')({
          plugins: [
            require('postcss-simple-vars')(),
            require('postcss-nested')(),
            require('postcss-cssnext')()
          ],
          extensions: [ '.css' ]
        }),
        require('rollup-plugin-babel')({
          exclude: 'node_modules/**',
          plugins: ['external-helpers']
        })
      ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    coverageReporter: {
      reporters: [
          // generates ./coverage/lcov.info
          { type:'lcovonly', subdir: '.' },
          // generates ./coverage/coverage-final.json
          { type:'json', subdir: '.' },
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // you can define custom flags
    customLaunchers: {  
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })

  if(process.env.TRAVIS) {  
    config.browsers = ['Chrome_travis_ci'];
  }
}
