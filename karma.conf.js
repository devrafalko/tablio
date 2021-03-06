const webpackConfig = require('./webpack.prod.js');
const specMode = process.env.karma_spec_mode;

module.exports = function(config) {
  config.set({
    basePath: '',
    files: [
      {pattern: 'tests/helpers/*.js',watched:false,served:true,included:true},
      {pattern: 'tests/specs/*.js',watched:false,served:true,included:true}
    ],
    autoWatch: true,
    singleRun:false,
    failOnEmptyTestSuite:false,
    frameworks: ['jasmine-dom','jasmine'],
    browsers: ['Chrome'],
    reporters: ['mocha','karmaHTML'],
    retryLimit:0,
    client: {
      captureConsole:true,
      clearContext:false,
      jasmine:{
        random: false
      },
      karmaHTML:{
        auto:true,
        source:[
          {src:'./tests/views/index.html', tag:'index'}
        ]
      }
    },
    webpack: webpackConfig,
    preprocessors: {
      './tests/helpers/*.js': ['webpack'],
      './tests/specs/*.js': ['webpack']
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    mochaReporter: {
      output: specMode,
      ignoreSkipped: true
    }
  });
};