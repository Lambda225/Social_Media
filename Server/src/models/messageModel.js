export const messageModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    { charset: "utf8mb4", timestamps: true }
  );
};
