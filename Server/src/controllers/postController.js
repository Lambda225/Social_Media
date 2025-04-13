import { Post, User } from '../db/sequelize.js';

export const getAllPost = (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const createPost = (req, res) => {
  if (req.file) {
    req.body.ImgPath = req.file.path;
  }
  let post;
  Post.create(req.body)
    .then((data) => {
      post = data;
      return User.findOne({ where: { id: req.params.id } });
    })
    .then((data) => {
      const user = data;
      user.addPost(post);
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
