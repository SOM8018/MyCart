var createError = require('http-errors');//
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
mongoose.connect("mongodb://localhost:27017/shopping", { useNewUrlParser: true });
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

module.exports = app;
