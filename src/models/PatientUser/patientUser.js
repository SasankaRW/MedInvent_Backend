const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const DependMember = require("../DependMember/DependMember");
const Prescription = require("../Prescription/Prescription");
const PatientAddress = require("./PatientAddress");

class PatientUser extends Model {}

PatientUser.init(
  {
    userID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Fname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Lname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mobileNo: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    nic: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false,
      },
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    picPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PatientUser",
    tableName: "patientUser",
    timestamps: true,
  }
);

PatientUser.hasOne(PatientAddress, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  as: "patientAddress",
});

PatientUser.hasMany(DependMember, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

PatientUser.hasMany(Prescription, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = PatientUser;
