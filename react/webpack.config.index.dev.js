var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSass = new ExtractTextPlugin('index.css');

module.exports = {
  entry: './js/components/Index.jsx',
  output: {
    path: path.join(__dirname, "../"),
    filename: 'index.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    extractSass
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      root: path.join(__dirname, ''),
      appRoot: path.join(__dirname, 'js')
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [ path.join(__dirname, 'index.scss') ],
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        include: [ path.join(__dirname + "/node_modules/react-html5video/dist", 'styles.css') ],
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'js'), path.join(__dirname, 'node_modules/reflux-core')],
        options: {
          presets: ['react', 'es2015', 'stage-1', 'stage-2']
        }
      },
      {
        test: /\.svg$/,
        loader: 'react-svg-loader'
      }
    ]
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  externals: {
    'webpack-config': JSON.stringify({
      ServerURL: "http://localhost:9000/php"
    })
  }
};
