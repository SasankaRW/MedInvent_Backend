const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class PharmacyLocation extends Model {}

PharmacyLocation.init(
  {
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PharmacyLocation",
    timestamps: false,
    tableName: "pharmacyLocation",
  }
);

module.exports = PharmacyLocation;
