const DocRegClinics = sequelize.define(
  "DocRegClinics",
  {
    clinicID: {
      type: DataTypes.UUID,
      references: {
        model: "Clinic",
        key: "clinicID",
      },
      primaryKey: true,
    },
    docID: {
      type: DataTypes.UUID,
      references: {
        model: "Doctor",
        key: "docID",
      },
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: "DocRegClinics",
  }
);
