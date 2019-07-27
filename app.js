var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser')

var app = express();

var https = require('http');
var config = require('./config').get(process.env.NODE_ENV);;


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.options('*', cors());
app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', require('./routes/searchmodule'));
// catch 404 and forward to error handlers
app.use(function(req, res, next) {
  console.log('Response',res)
  next(createError(404));
});

app.get('/',function(req,res){
res.sendFile(__dirname+ 'index.html');
})
var port = config.PORT;

https.createServer(app).listen(port, () => {
  console.log('App listening at port number:', port)
})


module.exports = app;
