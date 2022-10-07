import express from 'express';
import morgan from 'morgan';
import config from './config.js';
import anifaceRouter from './router/anifaceRouter.js';

const app = express();
const PORT = config.host.port;
const baseUrl = config.static.url;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(baseUrl));
app.use('/', anifaceRouter);

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
