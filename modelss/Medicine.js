const Medicine = sequelize.define(
  "Medicine",
  {
    medID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    medName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    befo_afte_meal: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    presID: {
      type: DataTypes.UUID,
      references: {
        model: "Prescription",
        key: "presID",
      },
    },
    picPath: {
      type: DataTypes.STRING(255),
    },
    notes: {
      type: DataTypes.STRING,
    },
    addDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "Medicine",
  }
);
