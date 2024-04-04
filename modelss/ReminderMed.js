const ReminderMed = sequelize.define(
  "ReminderMed",
  {
    remTime: {
      type: DataTypes.TIME,
      primaryKey: true,
    },
    medID: {
      type: DataTypes.UUID,
      references: {
        model: "Medicine",
        key: "medID",
      },
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: "ReminderMed",
  }
);
