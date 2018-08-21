const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StylesLoader = require('styles-loader');
const stylesLoader = new StylesLoader({
  extract: 'tablio.min.css',
  sass: { outputStyle: 'compressed' }
});

module.exports = merge(common, stylesLoader, {
  mode: 'production',
  watch: false,
  stats:false,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions:{
          compress:true,
          mangle:false,
          output:{
            ecma:6,
            indent_level:2,
            comments:false,
            beautify:false
          }
        }
      })
    ]
  }
});