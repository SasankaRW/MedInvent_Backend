const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const PharmacyAddress = require("./PharmacyAddress");
const PharmacyLocation = require("./PharmacyLocation");

class Pharmacy extends Model {}

Pharmacy.init(
  {
    pharmacy_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    openHoursFrom: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    openHoursTo: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    openDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Pharmacy",
    timestamps: true,
    tableName: "pharmacy",
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

module.exports = Pharmacy;
