var createError = require('http-errors');//
var debug = require('debug')('shopping-cart:server');
var http = require('http');
var config = require('./config/database');
var bodyparser = require("body-parser");//
var express = require('express');//
var path = require('path');
var cookieParser = require('cookie-parser');//
var morgan = require('morgan');//
var expresshsb = require("express-handlebars");
var routes = require('./routes/index');//
var userRoutes = require("./routes/userRoutes");
var mongoose = require("mongoose");//
var session = require("express-session");//
var passport = require("passport");//
var flash = require("connect-flash");//
var validator = require("express-validator");
var Mongostore = require("connect-mongo")(session);
require("./config/passport");
//

var app = express();
// //connect the database to shoppingcart
mongoose.connect("mongodb://Sommycart:Som801886@ds235022.mlab.com:35022/shopping", { useNewUrlParser: true });
//upper mongodb hosted on dbuser:"Sommycart" dbpassword:"Som801886"//
//also change in product-seeder.js------------------------------------------------
// mongoose.connect("localhost:27017/shopping");//not use in latest version it shows eror


// view engine setup
app.engine('.hbs',expresshsb({defaultLayout:'layout',extname:'hbs'}));
app.set('view engine', '.hbs');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
  secret:'secret123', 
  resave:false, 
  saveUninitialized:false,
  store :  new Mongostore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {maxAge : 180 * 60 *1000}// i set the expiry to 3 hours 180 minutes
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next)=>{
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});


app.use('/user',userRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// +++++++++++++++++++++++++++++++++++++++++++SERVER SETUP++++++++++++++++++++++++++++++++++++++++++++++

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
