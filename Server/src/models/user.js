export const userModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'email already used',
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      picturePath: {
        type: DataTypes.TEXT,
      },
      location: {
        type: DataTypes.INTEGER,
      },
      occupation: {
        type: DataTypes.STRING,
      },
      viewedProfile: {
        type: DataTypes.INTEGER,
      },
      following: {
        type: DataTypes.TEXT,
        get() {
          return this.getDataValue('following')?.split(',');
        },
        set(types) {
          this.setDataValue('following', types.join());
        },
      },
      follower: {
        type: DataTypes.TEXT,
        get() {
          return this.getDataValue('follower')?.split(',');
        },
        set(types) {
          this.setDataValue('follower', types.join());
        },
      },
      impressions: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};
