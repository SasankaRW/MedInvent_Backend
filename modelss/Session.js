const Sessions = sequelize.define(
  "Sessions",
  {
    scheduleID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    distric: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    clinicName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    docFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clinicFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sessDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    staTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    emptySlots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    NoOfAppoinments: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    docID: {
      type: DataTypes.UUID,
      references: {
        model: "Doctor",
        key: "docID",
      },
    },
    SessDocID: {
      type: DataTypes.UUID,
      references: {
        model: "Doctor",
        key: "docID",
      },
    },
    clinicID: {
      type: DataTypes.UUID,
      references: {
        model: "Clinic",
        key: "clinicID",
      },
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
    tableName: "Sessions",
  }
);
