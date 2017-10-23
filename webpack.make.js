'use strict';

// Modules
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var APP = __dirname + '/src';

module.exports = function makeWebpackConfig (options) {
   /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
   var BUILD = !!options.BUILD;
   var TEST = !!options.TEST;

   /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
   var config = {};

   if (TEST) {
      config.entry = {}
   } else {
      config.entry = {
         app: APP + '/client/app.js'
      }
   }

   /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
   if (TEST) {
      config.output = {}
   } else {
      config.output = {
         // Absolute output directory
         path: __dirname + '/public',

         // Output path from the view of the page
         // Uses webpack-dev-server in development
         publicPath: '/',

         // Filename for entry points
         // Only adds hash in build mode
         filename: BUILD ? 'assets/[name].[hash].js' : 'assets/[name].bundle.js',

         // Filename for non-entry points
         // Only adds hash in build mode
         chunkFilename: BUILD ? 'assets/[name].[hash].js' : 'assets/[name].bundle.js'
      }
   }

   /**
   * Node
   */
   // config.node = {
   //    console: true,
   //    fs: 'empty',
   //    net: 'empty',
   //    tls: 'empty'
   // }

   /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
   if (TEST) {
      config.devtool = 'inline-source-map';
   } else if (BUILD) {
      config.devtool = 'source-map';
   } else {
      config.devtool = 'eval';
   }

   /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

   // Initialize module
   config.module = {
      preLoaders: [],
      loaders: [{
         // JS LOADER
         // Reference: https://github.com/babel/babel-loader
         // Transpile .js files using babel-loader
         // Compiles ES6 and ES7 into ES5 code
         test: /\.js$/,
         loader: 'ng-annotate!babel!jshint',
         exclude: [/node_modules/, /src\/client\/assets\/libs/]
      }, {
         // ASSET LOADER
         // Reference: https://github.com/webpack/file-loader
         test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         loader: 'file?name=./assets/[hash].[ext]'
      }, {
         // HTML LOADER
         // Reference: https://github.com/webpack/raw-loader
         // Allow loading html through js
         test: /\.html$/,
         loader: 'raw'
      }, {
         test: /\.pdf$|pdf\.worker\.js$/,
          //loader: "url-loader"
         loader: 'file?name=./assets/[hash].[ext]'
      }, {
         test: /\.json$/,
         loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }]
   };

   // CSS LOADER
   // Reference: https://github.com/webpack/css-loader
   // Allow loading css through js
   var cssLoader = {
      test: /\.css$/,
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development for hot-loading
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
   };

   // Add cssLoader to the loader list
   config.module.loaders.push(cssLoader);

   /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
   config.postcss = [
      autoprefixer({
         browsers: ['last 2 version']
      })
   ];

   /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
   config.plugins = [
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('assets/[name].[hash].css', {
         disable: !BUILD || TEST
      }),
   ];

   // Skip rendering index.html in test mode
   if (TEST) {

   } else if (BUILD) {
      config.plugins.push(
         new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/client/index.html',
            inject: 'body',
            favicon: './src/client/assets/favicon.ico',
            minify: {
               collapseWhitespace: true
            }
         })
      )
   } else {
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      // Render index.html
      config.plugins.push(
         new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/client/index.html',
            inject: 'body'
            //favicon: './src/client/assets/favicon.ico'
         })
      )
   }


  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
         mangle:false
      })
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './public',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  return config;
};