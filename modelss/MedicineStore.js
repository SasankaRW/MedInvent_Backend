const MedicineStore = sequelize.define(
  "MedicineStore",
  {
    storeID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    storeName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    drugInteraction: {
      type: DataTypes.STRING,
    },
    picPath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "MedicineStore",
  }
);
