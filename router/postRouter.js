import express from 'express';
import * as postController from '../controller/postController.js';

const postRouter = express.Router();

postRouter.route('/').get(postController.getPosts);

postRouter
  .route('/create')
  .get(postController.getCreate)
  .post(postController.postCreate);

postRouter
  .route('/:id')
  .get(postController.get)
  .put(postController.update)
  .delete(postController.remove);
export default postRouter;
