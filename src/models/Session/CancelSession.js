const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class CancelSession extends Model {}

CancelSession.init(
  {
    cancel_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    doctorFullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clinicName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fcm_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    modelName: "CancelSession",
    timestamps: true,
    tableName: "cancelSession",
  }
);

module.exports = CancelSession;
