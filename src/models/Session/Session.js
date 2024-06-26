const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Appointment = require("../Appointment/Appointment");
const SessionDates = require("./SessionDates");

class Session extends Model {}

Session.init(
  {
    session_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
  },
  {
    sequelize,
    modelName: "Session",
    timestamps: true,
    tableName: "session",
  }
);

Session.hasMany(SessionDates, {
  foreignKey: "session_id",
  onDelete: "CASCADE",
});

Session.hasMany(Appointment, {
  foreignKey: "session_id",
  onDelete: "RESTRICT",
});

module.exports = Session;
