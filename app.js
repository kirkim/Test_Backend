import express from 'express';
import morgan from 'morgan';
import postRouter from './router/postRouter.js';
import userRouter from './router/userRouter.js';
import path from 'path';

const app = express();
const PORT = 3000;
const baseURL = path.resolve();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(baseURL + '/static'));
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(PORT, () =>
  console.log(`success connect! http://localhost:${PORT}`)
);
