var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require("body-parser");
var session = require('express-session');
var flash = require('./middlewares/flash')
var indexRouter = require('./routes/index');
var sessionsRouter = require('./routes/sessions');
var registrationsRouter = require('./routes/registrations');
var db = require('./db/connection_pool')



// const dotenv = require("dotenv")
// dotenv.config()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/application')
app.set('name', 'Testnodeserver')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts)
app.use(flash)


app.use('/', indexRouter);
app.use('/sessions', sessionsRouter);
app.use('/registrations', registrationsRouter);

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

const port = 3000
app.listen(port, () => {
  console.log(`${app.name} listening on port ${port}`)
})

module.exports = app;
