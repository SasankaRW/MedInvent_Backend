const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class Medicine extends Model {}

Medicine.init(
  {
    medicine_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    manufacturer: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    side_effects: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Medicine",
    tableName: "medicine",
    timestamps: false,
  }
);

module.exports = Medicine;
