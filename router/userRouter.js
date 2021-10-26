import express from 'express';
import * as userController from '../controller/userController.js';
import * as validator from '../middleware/validator.js';
import * as protectMiddleware from '../middleware/protect.js';

const userRouter = express.Router();

userRouter
  .route('/signup')
  .all(protectMiddleware.publicOnly)
  .get(userController.getSignup)
  .post(validator.signup, userController.postSignup);

userRouter
  .route('/login')
  .all(protectMiddleware.publicOnly)
  .get(userController.getLogin)
  .post(validator.login, userController.postLogin);

userRouter
  .route('/logout')
  .all(protectMiddleware.loginOnly)
  .post(userController.logout);

userRouter
  .route('/:id')
  .all(protectMiddleware.loginOnly)
  .get(userController.seeMe)
  .delete(userController.deleteMe);

userRouter
  .route('/update/:id')
  .all(protectMiddleware.loginOnly)
  .get(userController.getUpdateMe)
  .put(validator.edit, userController.updateMe);

export default userRouter;
