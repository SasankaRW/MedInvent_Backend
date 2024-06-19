const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const PresMedicine = require("./PresMedicine");

class Prescription extends Model {}

Prescription.init(
  {
    prescription_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    presName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdBy: {
      type: DataTypes.ENUM("doctor", "user"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    doctorName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    sequelize,
    modelName: "Prescription",
    timestamps: true,
    tableName: "prescription",
  }
);

Prescription.hasMany(PresMedicine, {
  foreignKey: "prescription_id",
  as: "presMedicine",
  onDelete: "CASCADE",
});
PresMedicine.belongsTo(Prescription, { foreignKey: "prescription_id" });

module.exports = Prescription;
