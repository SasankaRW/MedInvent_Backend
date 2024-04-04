const Appoinment = sequelize.define(
  "Appoinment",
  {
    appoinmentID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    appoinmentType: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    appoinmentNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dID: {
      type: DataTypes.UUID,
      references: {
        model: "DependMember",
        key: "dID",
      },
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "PatientUser",
        key: "userID",
      },
    },
    docID: {
      type: DataTypes.UUID,
      references: {
        model: "Doctor",
        key: "docID",
      },
    },
    scheduleID: {
      type: DataTypes.UUID,
      references: {
        model: "Sessions",
        key: "scheduleID",
      },
    },
    clinicID: {
      type: DataTypes.UUID,
      references: {
        model: "Clinic",
        key: "clinicID",
      },
    },
    madeTime: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
    tableName: "Appoinment",
  }
);
