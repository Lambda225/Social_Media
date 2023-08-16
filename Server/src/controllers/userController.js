import { Op } from "sequelize";
import { Chat, User } from "../db/sequelize.js";

export const getAllUser = (req, res) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const getChatUser = (req, res) => {
  Chat.findByPk(req.params.chatId)
    .then((chat) => {
      return chat
        .getUsers({ where: { id: { [Op.ne]: req.params.id } } })
        .then((users) => {
          return res.status(200).json(users);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

export const follow = (req, res) => {
  if (req.params.followerId == req.params.id) {
    return res.status(404).json("it's a same user");
  }
  User.findOne({ where: { id: req.params.id } })
    .then((data) => {
      let following = !data.following ? [] : data.following;

      if (following.includes(req.params.followerId)) {
        following = following.filter((item) => {
          return item != req.params.followerId;
        });
      } else {
        if (JSON.stringify(following) === JSON.stringify([""])) {
          following = [req.params.followerId];
        } else {
          following.push(req.params.followerId);
        }
      }
      return User.findOne({ where: { id: req.params.followerId } }).then(
        (data) => {
          let follower = !data.follower ? [] : data.follower;

          if (follower.includes(req.params.id)) {
            follower = follower.filter((item) => {
              return item != req.params.id;
            });
          } else {
            if (JSON.stringify(follower) === JSON.stringify([""])) {
              follower = [req.params.id];
            } else {
              follower.push(req.params.id);
            }
          }

          return User.update(
            { following: following },
            { where: { id: req.params.id } }
          ).then((data) => {
            return User.update(
              { follower: follower },
              { where: { id: req.params.followerId } }
            ).then((data) => {
              res.status(200).json({ follower, following });
            });
          });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server Erreur" });
    });
};

//       const user = data;
//       let followings = follower.followings.split(',');
//       let followers = user.follower.split(',');
//       followings.push(user.id);
//       followers.push(follower.id);

//       if (followers.includes(req.params.followerId)) {
//         res.status(400).json('already following');
//       }

//       return User.update(
//         { follower: followers.join() },
//         { where: { id: req.params.id } }
//       ).then((data) => {
//          return User.update(
//           { following: followings.join() },
//           { where: { id: req.params.followerId } }
//         ).then((data) => {
//           res.status.json(data);
//         });
//       });
//     });
//   })
//   .catch((err) => {
//     res.status(500).json(err);
//   });
