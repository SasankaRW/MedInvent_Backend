const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class ClinicAddress extends Model {}

ClinicAddress.init(
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
    modelName: "ClinicAddress",
    timestamps: false,
    tableName: "clinicAddress",
  }
);

module.exports = ClinicAddress;
