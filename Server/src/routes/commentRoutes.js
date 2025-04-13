import express from 'express';
import middlewareAuth from '../help/middlewareAuth.js';
import { createComment, getComment } from '../controllers/commentController.js';

const routes = express.Router();

routes.post('/:id/:postId', middlewareAuth, createComment);
routes.get('/:id/:postId', getComment);

export default routes;
