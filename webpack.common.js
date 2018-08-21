const path = require('path');
 
module.exports = {
  entry: {
    index:'./src/index.js'
  },
  output: {
    filename: 'tablio.min.js',
    path: path.resolve(__dirname, 'dist'),
    library:'Tablio',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude:/(node_modules)/,
        loader:'babel-loader',
        options:{
          presets:['env']
        }
      }
    ]
  }
};