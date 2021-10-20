import express from 'express';
import * as userController from '../controller/userController.js';

const userRouter = express.Router();

userRouter
  .route('/signup')
  .get(userController.getCreate)
  .post(userController.postCreate);

userRouter
  .route('/login')
  .get(userController.getLogin)
  .post(userController.postLogin);

userRouter
  .route('/:id')
  .get(userController.seeMe)
  .put(userController.updateMe)
  .delete(userController.deleteMe);

export default userRouter;
