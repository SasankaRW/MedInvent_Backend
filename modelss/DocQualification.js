const DocQualification = sequelize.define(
  "DocQualification",
  {
    qualification: {
      type: DataTypes.STRING,
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
    tableName: "DocQualification",
  }
);
