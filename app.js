import express from 'express';
import morgan from 'morgan';
import flash from 'express-flash';
import session from 'express-session';
import FileStore from 'session-file-store';
import postRouter from './router/postRouter.js';
import userRouter from './router/userRouter.js';
import config from './config.js';
import globalRouter from './router/globalRouter.js';

const app = express();
const PORT = config.host.port;
const baseUrl = config.static.url;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.cookie.secret,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(session)(),
  })
);

app.use(flash());
app.use(express.static(baseUrl));
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/', globalRouter);

app.use((req, res, next) => {
  return res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  return res.sendStatus(500);
});

app.listen(PORT, () =>
  console.log(`success connect! http://localhost:${PORT}`)
);
