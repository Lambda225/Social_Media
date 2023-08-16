import { DataTypes, Sequelize } from "sequelize";
import { userModel } from "../models/user.js";
import { commentModel } from "../models/commentModel.js";
import { postModel } from "../models/post.js";
import { chatModel } from "../models/chatModel.js";
import { messageModel } from "../models/messageModel.js";

const sequelize = new Sequelize("social_media", "root", "", {
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
  },
});

const User = userModel(sequelize, DataTypes);
const Post = postModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);
const Chat = chatModel(sequelize, DataTypes);
const Message = messageModel(sequelize, DataTypes);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Chat.belongsToMany(User, { through: "chatuser" });
User.belongsToMany(Chat, { through: "chatuser" });

Chat.hasMany(Message);
Message.belongsTo(Chat);

User.hasMany(Message);
Message.belongsTo(User);

const initDb = () => {
  sequelize.sync({ alter: true }).then((_) => {
    console.log("La base de données social_media a bien été syncronisée");
  });
};

export { initDb, User, Post, Comment, Chat, Message };
