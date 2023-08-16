import { Chat, Message, User } from "../db/sequelize.js";

export const createMessage = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      return Chat.findByPk(req.params.chatId).then((chat) => {
        Message.create(req.body).then((message) => {
          user.addMessage(message);
          chat.addMessage(message);
          return res.status(200).json(message);
        });
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

export const getChatMessage = (req, res) => {
  Chat.findByPk(req.params.chatId)
    .then((chat) => {
      return chat.getMessages().then((messages) => {
        return res.status(200).json(messages);
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
