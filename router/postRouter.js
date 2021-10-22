import express from 'express';
import * as postController from '../controller/postController.js';
import * as protectMiddleware from '../middleware/protect.js';

const postRouter = express.Router();

postRouter
  .route('/')
  .all(protectMiddleware.loginOnly)
  .get(postController.getPosts);

postRouter
  .route('/upload')
  .all(protectMiddleware.loginOnly)
  .get(postController.getUpload)
  .post(postController.postUpload);

postRouter
  .route('/:id')
  .all(protectMiddleware.loginOnly)
  .get(postController.get)
  .put(postController.update)
  .delete(postController.remove);
export default postRouter;
