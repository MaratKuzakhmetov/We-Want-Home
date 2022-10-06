require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const advertsRouter = require('./routers/advertsRouter');
const registerRouter = require('./routers/registerRouter');
const mapRouter = require('./routers/mapRouter');
const lkRouter = require('./routers/lkRouter');
const checkSession = require('./middlewares/checkSession');
const messageRouter = require('./routers/messageRouter');

const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const sessionConfig = {
  name: 'pet',
  secret: process.env.SECRET || 'thisisnotsecure',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false,
};
const sessionParser = session(sessionConfig);
app.use(sessionParser);

app.use(checkSession);

app.use('/adverts', advertsRouter);
app.use('/auth', registerRouter);

app.use('/map', mapRouter);
app.use('/lk', lkRouter);
app.use('/message', messageRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

app.listen(process.env.PORT, () => {
  console.log('The Best Server in our flat', process.env.PORT);
});

module.exports = {
  app,
  sessionParser,
};
