const Specialization = sequelize.define(
  "Specialization",
  {
    field: {
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
    tableName: "Specialization",
  }
);
