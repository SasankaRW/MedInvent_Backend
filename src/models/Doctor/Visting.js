const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Clinic = require("../Clinic/Clinic");
const Doctor = require("./Doctor");

class Visting extends Model {}

Visting.init(
  {
    docFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        notEmpty: true,
      },
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Visitng",
    timestamps: false,
    tableName: "visiting",
  }
);

Doctor.belongsToMany(Clinic, { through: Visting, foreignKey: "doctor_id" });
Clinic.belongsToMany(Doctor, { through: Visting, foreignKey: "clinic_id" });

module.exports = Visting;
