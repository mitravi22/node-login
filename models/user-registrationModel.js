module.exports = (sequelize, DataTypes) => {
  const UserSignup = sequelize.define(
    "user_signups",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "Only alphabet is allow",
          },
          len: {
            args: [4, 32],
            msg: "String length is not in this range",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "Only alphabet is allow",
          },
          len: {
            args: [4, 32],
            msg: "String length is not in this range",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return UserSignup;
};
