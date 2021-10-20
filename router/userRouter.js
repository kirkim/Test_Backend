import express from 'express';
import * as userController from '../controller/userController.js';
import * as validator from '../middleware/validator.js';

const userRouter = express.Router();

userRouter
  .route('/signup')
  .get(userController.getCreate)
  .post(validator.signup, userController.postCreate);

userRouter
  .route('/login')
  .get(userController.getLogin)
  .post(validator.login, userController.postLogin);

userRouter
  .route('/:id')
  .get(userController.seeMe)
  .put(userController.updateMe)
  .delete(userController.deleteMe);

export default userRouter;
