var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var session = require("express-session");
var passport = require('passport');
var passportConfig = require("./passport/localStrategy.js");
var sequelize = require('./models').sequelize;   // mysql 시퀄라이저 모델

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  secret: 'simpleSNS', 
  resave: true, 
  saveUninitialized: false })
); // 세션 활성화

app.use(passport.initialize());  
app.use(passport.session());              // passport.deserializeUser 실행
passportConfig(); 
sequelize.sync();    //서버가 실행될때 시퀄라이저의 스키마를 DB에 적용시킨다.
   
app.use('/', indexRouter);
app.use('/auth', authRouter);


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
