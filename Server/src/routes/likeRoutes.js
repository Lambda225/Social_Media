import express from 'express';
import {
  createLike,
  deleteLike,
  getLike,
} from '../controllers/likeController.js';
import middlewareAuth from '../help/middlewareAuth.js';

const routes = express.Router();

routes.post('/:id', middlewareAuth, createLike);
routes.get('/:id/:postId', middlewareAuth, getLike);
routes.delete('/:id/:postId', middlewareAuth, deleteLike);

export default routes;
