const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class OTP extends Model {}

OTP.init(
  {
    OTP_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    senderUUID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverNic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OTPNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "OTP",
    timestamps: true,
    tableName: "otp",
  }
);

module.exports = OTP;
