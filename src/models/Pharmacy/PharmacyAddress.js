const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Pharmacy = require("./Pharmacy");
const PharmacyLocation = require("./PharmacyLocation");

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
  }
);

Pharmacy.hasOne(PharmacyAddress, {
  foreignKey: "pharmacy_id",
  onDelete: "CASCADE",
});

Pharmacy.hasOne(PharmacyLocation, {
  foreignKey: "pharmacy_id",
  onDelete: "CASCADE",
});

module.exports = PharmacyAddress;
