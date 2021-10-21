import express from 'express';
import { home } from '../controller/globalController.js';
import * as protectMiddleware from '../middleware/protect.js';

const globalRouter = express.Router();

globalRouter.get('/', protectMiddleware.publicOnly, home);

export default globalRouter;
