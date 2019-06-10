const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const indexRouter = require('./routes/index');
const resultsRouter = require('./routes/results');
const usersRouter = require('./routes/users');
const rulesRouter = require('./routes/rules');
const waitResultsRouter = require('./routes/wait_results');
const unsubscribeRouter = require('./routes/unsubscribe');


const app = express();

// mongoose.connect('mongodb://localhost:27017/knivescompetitions', { useNewUrlParser: true });
mongoose.connect(process.env.database, { useNewUrlParser: true });
// mongoose.connect(process.env.database || 'mongodb://localhost:27017/knivescompetitions', { useNewUrlParser: true });

// mongoose.connect('mongodb+srv://admin:knivesawesome@cluster0-opya2.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });


mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db.dropDatabase(); //!!! удалить данные из БД

// обработать ошибку, если не получилось подключиться к базе данных
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// ивент о том, что успешно подключились к базе и можем писать запросы
db.once('open', () => { console.log('we are connected to DB'); });

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    autoRemove: 'interval',
    autoRemoveInterval: 120,
  }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 6000000,
  },
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/rules', rulesRouter);
app.use('/wait_results', waitResultsRouter);
app.use('/unsubscribe', unsubscribeRouter);
app.use('/results-page', resultsRouter);
app.use('/', resultsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
