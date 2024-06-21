const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class PatientAddress extends Model {}

PatientAddress.init(
  {
    lineOne: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lineTwo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
    },
    district: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PatientAddress",
    tableName: "patientAddress",
    timestamps: false,
  }
);

module.exports = PatientAddress;
