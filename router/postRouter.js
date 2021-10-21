import express from 'express';
import * as postController from '../controller/postController.js';
import * as protectMiddleware from '../middleware/protect.js';

const postRouter = express.Router();

postRouter
  .route('/')
  .all(protectMiddleware.loginOnly)
  .get(postController.getPosts);

postRouter
  .route('/create')
  .all(protectMiddleware.loginOnly)
  .get(postController.getCreate)
  .post(postController.postCreate);

postRouter
  .route('/:id')
  .all(protectMiddleware.loginOnly)
  .get(postController.get)
  .put(postController.update)
  .delete(postController.remove);
export default postRouter;
