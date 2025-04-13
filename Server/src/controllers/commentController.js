import { Comment, Post, User } from '../db/sequelize.js';

export const createComment = (req, res) => {
  let comment;
  Comment.create(req.body)
    .then((data) => {
      comment = data;
      return User.findOne({ where: { id: req.params.id } });
    })
    .then((data) => {
      const user = data;
      return Post.findOne({ where: { id: req.params.postId } }).then((data) => {
        const post = data;
        post.addComment(comment);
        user.addComment(comment);
        res.status(200).json(comment);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const getComment = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((data) => {
      const post = data;
      return post.getComments().then((comments) => {
        res.status(200).json(comments);
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: 'server error' });
    });
};
