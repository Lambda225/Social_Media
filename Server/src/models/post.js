export const postModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ImgPath: {
        type: DataTypes.TEXT,
      },
      Description: {
        type: DataTypes.TEXT,
      },
      Like: {
        type: DataTypes.TEXT,
        get() {
          return this.getDataValue('Like')?.split(',');
        },
        set(types) {
          this.setDataValue('Like', types.join());
        },
      },
    },
    { charset: 'utf8mb4', timestamps: true }
  );
};
