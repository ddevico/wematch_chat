var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require("http");
let mongoose = require('mongoose');
var socketio = require('socket.io')
var cors = require('cors');
var messagesRouter = require('./routes/messages');

var app = express();

app.use(cors({
  origin: '*'
}));

var port = 5000;

var server = http.createServer(app);

server.listen(port,()=>{
  console.log(`Server is up on port ${port}!`);
})

io = socketio(server);
app.set('socketio', io);

require('./socket')(io)

const url = 'mongodb://localhost:27017/';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(url, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/messages', messagesRouter);

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
