const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Clinic = require("../Clinic/Clinic");
const Doctor = require("../Doctor/Doctor");

class Visiting extends Model {}

Visiting.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    clinic_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    docFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    reqSentBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isReqAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Visiting",
    timestamps: true,
    tableName: "visiting",
  }
);

Visiting.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  as: "doctor",
});

Visiting.belongsTo(Clinic, {
  foreignKey: "clinic_id",
  as: "clinic",
});

Doctor.belongsToMany(Clinic, {
  through: Visiting,
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});
Clinic.belongsToMany(Doctor, {
  through: Visiting,
  foreignKey: "clinic_id",
  onDelete: "CASCADE",
});

module.exports = Visiting;
