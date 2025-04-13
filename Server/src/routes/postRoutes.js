import express from 'express';
import { upload } from '../help/uploadFile.js';

import { createPost, getAllPost } from '../controllers/postController.js';
import middlewareAuth from '../help/middlewareAuth.js';

const routes = express.Router();

routes.get('/:id', middlewareAuth, getAllPost);
routes.post('/:id', middlewareAuth, upload.single('postImage'), createPost);

export default routes;
