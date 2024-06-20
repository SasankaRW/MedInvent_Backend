const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Prescription = require("../Prescription/Prescription");
//const { v4: uuidv4 } = require('uuid');

class DependMember extends Model {}

DependMember.init(
  {
    dID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    Fname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    Lname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    picPath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "DependMember",
    timestamps: false,
    tableName: "DependMember",
  }
);

DependMember.hasMany(Prescription, {
  foreignKey: "dID",
  as: "prescriptions",
  onDelete: "CASCADE",
});

Prescription.belongsTo(DependMember, {
  foreignKey: "dID",
  as: "dependMember",
  constraints: false,
});

module.exports = DependMember;
