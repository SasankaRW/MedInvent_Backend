const Pharmacy = sequelize.define(
  "Pharmacy",
  {
    pID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    PHname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mobileNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lineOne: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lineTwo: {
      type: DataTypes.STRING(50),
    },
    city: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(10),
    },
    distric: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    picPath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
    tableName: "Pharmacy",
  }
);
