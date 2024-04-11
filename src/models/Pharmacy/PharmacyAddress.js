const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class PharmacyAddress extends Model {}

PharmacyAddress.init(
  {
    lineOne: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lineTwo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PharmacyAddress",
    timestamps: false,
    tableName: "pharmacyAddress",
  }
);

module.exports = PharmacyAddress;
