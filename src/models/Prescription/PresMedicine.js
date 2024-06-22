const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const MedicationIntake = require("./MedicationIntake");

class PresMedicine extends Model {}

PresMedicine.init(
  {
    medicine_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    frq: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mealTiming: {
      type: DataTypes.ENUM("Before", "After", "With"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    remainingDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reminders: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    sequelize,
    modelName: "PresMedicine",
    timestamps: false,
    tableName: "presMedicine",
  }
);

PresMedicine.hasMany(MedicationIntake, {
  foreignKey: "medicine_id",
  as: "medicationIntake",
  onDelete: "CASCADE",
});

module.exports = PresMedicine;
