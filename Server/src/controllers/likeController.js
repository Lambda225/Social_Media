import { Post, User } from '../db/sequelize.js';

export const createLike = (req, res) => {
  Post.findOne({ where: { id: req.body.postId } })
    .then((post) => {
      let like = !post.Like ? [] : post.Like;

      if (like.includes(req.params.id)) {
        like = like.filter((item) => {
          return item != req.params.id;
        });
      } else {
        console.log(like);
        if (JSON.stringify(like) === JSON.stringify([''])) {
          like = [req.params.id];
        } else {
          like.push(req.params.id);
        }
      }

      return Post.update(
        { Like: like },
        { where: { id: req.body.postId } }
      ).then((data) => {
        res.status(200).json(like);
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: 'erreur server' });
    });
};

export const getLike = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((data) => {
      const post = data;
      return post.getUsers().then((data) => {
        const users = data;
        res.status(200).json(users);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const deleteLike = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((data) => {
      const post = data;
      return User.findOne({ where: { id: req.params.postId } }).then((data) => {
        const user = data;
        return post.removeUser(user).then((data) => {
          res.status(204).json({ data });
        });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
