const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Session = require("../Session/Session");

class Doctor extends Model {}

Doctor.init(
  {
    doctor_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nic: {
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
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    medical_license_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Doctor",
    timestamps: true,
    tableName: "doctor",
  }
);

Doctor.hasMany(Session, {
  foreignKey: "doctor_id",
  onDelete: "RESTRICT",
});
Session.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  onDelete: "RESTRICT",
});

module.exports = Doctor;
