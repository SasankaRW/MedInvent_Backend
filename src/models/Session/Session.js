const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Appointment = require("../Appointment/Appointment");
const Clinic = require("../Clinic/Clinic");
// const Doctor = require("../Doctor/Doctor");

class Session extends Model {}

Session.init(
  {
    session_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    scheduledById: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    scheduledByType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timeFrom: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timeTo: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    noOfPatients: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    activePatients: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: true,
      },
    },
    isRefundable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    isArrived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancelledById: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    cancelledByType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Session",
    timestamps: true,
    tableName: "session",
  }
);

Session.hasMany(Appointment, {
  foreignKey: "session_id",
  onDelete: "RESTRICT",
});

module.exports = Session;
