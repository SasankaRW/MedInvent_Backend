const Prescription = sequelize.define(
  "Prescription",
  {
    presID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    relatedID: {
      type: DataTypes.UUID,
      references: {
        model: "DependMember",
        key: "dID",
      },
    },
    presType: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    presname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    docID: {
      type: DataTypes.UUID,
      references: {
        model: "Doctor",
        key: "docID",
      },
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "PatientUser",
        key: "userID",
      },
    },
    addTime: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
    tableName: "Prescription",
  }
);
