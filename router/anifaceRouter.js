import express from 'express';
import { sampleData, pyTorchResponsePost, tensorFlowResponsePost } from '../controller/anifaceController.js';

const anifaceRouter = express.Router();

anifaceRouter.get('/', sampleData);
anifaceRouter.post('/tensorflow/inference', tensorFlowResponsePost);
anifaceRouter.post('/pytorch/inference', pyTorchResponsePost);

export default anifaceRouter;
