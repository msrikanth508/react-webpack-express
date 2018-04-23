var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var viewRoute = require('./routes/viewIndex');
const webpack = require('webpack');
var app = express();
const config = require('./config/webpack.config.development');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// dev mode settings like
// run express applicaiton with webpack middleware for hotreloading,
// show error statck
if (app.get('env') === 'development') {
    var webpackMiddleware = require('webpack-dev-middleware')
    var webpackHotMiddleware = require('webpack-hot-middleware')
    var compiler = webpack(config);
    var middleware = webpackMiddleware(compiler,
      {
        publicPath: config.output.publicPath,
        headers: {
          'X-Powered-By': 'Webpack'
        },
        stats: {
          colors: true,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          modules: false
        }
      })
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    // disable error stack in prod mode
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public'));
app.use('/api', routes);
app.use('/', viewRoute);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
