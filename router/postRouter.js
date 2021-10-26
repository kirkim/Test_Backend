import express from 'express';
import * as postController from '../controller/postController.js';
import * as protectMiddleware from '../middleware/protect.js';
import * as validator from '../middleware/validator.js';

const postRouter = express.Router();

postRouter
  .route('/upload')
  .all(protectMiddleware.loginOnly)
  .get(postController.getUpload)
  .post(validator.post, postController.postUpload);

postRouter
  .route('/view')
  .all(protectMiddleware.loginOnly)
  .all(protectMiddleware.existPost)
  .get(postController.get)
  .delete(postController.remove);

postRouter
  .route('/update')
  .all(protectMiddleware.loginOnly)
  .all(protectMiddleware.existPost)
  .get(postController.getUpdate)
  .put(validator.post, postController.putUpdate);

postRouter
  .route('/list')
  .all(protectMiddleware.loginOnly)
  .get(postController.getPosts);

export default postRouter;
