import { Chat, User } from "../db/sequelize.js";

export const getUserChat = (req, res) => {
  User.findOne({ where: { id: req.params.id }, include: Chat })
    .then((user) => {
      return user.getChats().then((chats) => {
        return res.status(200).json(chats);
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

export const createChat = (req, res) => {
  Chat.findAll({
    include: {
      model: User,
      where: { id: req.params.id, id: req.params.userId },
    },
  })
    .then((data) => {
      if (!data.join()) {
        return User.findOne({ where: { id: req.params.id } }).then((user1) => {
          return User.findOne({ where: { id: req.params.userId } }).then(
            (user2) => {
              return Chat.create().then((chat) => {
                chat.addUser(user1);
                chat.addUser(user2);
                return res.status(200).json(chat);
              });
            }
          );
        });
      } else {
        return res.status(200).json("Existe déjà");
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
