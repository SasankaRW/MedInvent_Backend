const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class SessionDates extends Model {}

SessionDates.init(
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "SessionDates",
    timestamps: false,
    tableName: "sessionDates",
  }
);

module.exports = SessionDates;
