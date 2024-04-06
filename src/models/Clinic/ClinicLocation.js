const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class ClinicLocation extends Model {}

ClinicLocation.init(
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
    modelName: "ClinicLocation",
    timestamps: false,
    tableName: "clinicLocation",
  }
);

module.exports = ClinicLocation;
