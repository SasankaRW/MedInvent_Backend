const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const PatientUser = require("../PatientUser/patientUser");
const PresMedicine = require("./PresMedicine");

class MedicationIntake extends Model {}

MedicationIntake.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    taken: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "MedicationIntake",
    tableName: "medicationIntake",
    timestamps: false,
  }
);

module.exports = MedicationIntake;
