import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
import createError from "http-errors";
import config from "config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "./middlewares/flash.mjs";
import { mountRoutes } from "./config/routes.mjs";
import dbConnection from "./services/database/database_service.mjs";

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/application')
app.set('name', 'Testnodeserver')
app.set('db', dbConnection)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts)
app.use(flash)

mountRoutes(app)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = config.get('app.port')
app.listen(port, () => {
  console.log(`${app.name} listening on port ${port}`)
})

export default app;
