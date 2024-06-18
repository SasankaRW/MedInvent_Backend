const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const ClinicAddress = require("./ClinicAddress");
const Session = require("../Session/Session");

class Clinic extends Model {}

Clinic.init(
  {
    clinic_id: {
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
    location: {
      type: DataTypes.GEOGRAPHY("POINT", 4326),
      allowNull: false,
    },
    clinicFees: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Clinic",
    timestamps: true,
    tableName: "clinic",
  }
);

Clinic.hasOne(ClinicAddress, {
  foreignKey: "clinic_id",
  onDelete: "CASCADE",
  as: "clinicAddress",
});

Clinic.hasMany(Session, {
  foreignKey: "clinic_id",
  onDelete: "RESTRICT",
  as: "sessions",
});

Session.belongsTo(Clinic, {
  foreignKey: "clinic_id",
  onDelete: "RESTRICT",
  as: "clinic",
});

module.exports = Clinic;
