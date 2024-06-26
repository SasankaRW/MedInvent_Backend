const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const DependMember = require("../DependMember/DependMember");

class PatientUser extends Model {}

PatientUser.init(
  {
    userID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    mobileNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lineOne: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    lineTwo: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING(25),
      defaultValue: null,
    },
    postalCode: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    district: {
      type: DataTypes.STRING(30),
      defaultValue: null,
    },
    Fname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Lname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    picPath: {
      type: DataTypes.STRING(255),
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
    modelName: "PatientUser",
    timestamps: true,
  }
);

PatientUser.hasMany(DependMember,{
  foreignKey:'userID',
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
});

module.exports = PatientUser;
