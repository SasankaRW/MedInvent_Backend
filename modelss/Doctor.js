const Doctor = sequelize.define(
  "Doctor",
  {
    docID: {
      type: DataTypes.UUID,
      primaryKey: true,
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
    NuOfPatients: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mobileNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
    },
    Fname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Lname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    specialNote: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING(50),
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
    tableName: "Doctor",
  }
);
