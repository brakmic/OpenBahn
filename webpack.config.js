var path          = require('path');
var webpack       = require('webpack');
var _root         = __dirname + '/';
var scriptsRoot   = _root + 'src/';
var stylesRoot    = _root + 'styles/';
var vendorScripts = scriptsRoot + 'vendor/';

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/app/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/release/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
       'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {

    loaders: [

              {
                  test : /\.html$/, loader: 'html'
              },
              {
                  test : /\.less$/, loader: 'style-loader!css-loader!less-loader'
              },
              {
                  test : /\.css$/, loader: 'style-loader!css-loader'
              },
              {
                  test : /\.(png|jpe?g|eot|ttf|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                  loader: 'url-loader?limit=8192&hash=sha512&digest=hex&name=[hash].[ext]'
              },
              {
                  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                  loader: 'url-loader?mimetype=application/font-woff'
              },
              {   test: /\.jpg$/,
                  loader: "file-loader?name=[path][name].[ext]"
              },
              {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
              },
        ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.html'],
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      'bootstrap.min.css'              : vendorScripts + 'bootstrap/css/bootstrap.min.css',
      'bootstrap.theme.min.css'        : vendorScripts + 'bootstrap/css/bootstrap-theme.min.css',
      'bootstrap'                      : vendorScripts + 'bootstrap/js/bootstrap.js',
      'bootstrap.min'                  : vendorScripts + 'bootstrap/js/bootstrap.min.js',
      'metisMenu.min.css'              : stylesRoot + 'metis/metisMenu.min.css',
      'font-awesome.min.css'           : stylesRoot + 'fontawesome/css/font-awesome.min.css',
      'awesome-bootstrap-checkbox.css' : stylesRoot + 'awesome-bootstrap-checkbox.css',

    }
  },
  useMemoryFs: true,
  progress: true
};