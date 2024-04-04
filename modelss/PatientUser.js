const PatientUser = sequelize.define(
  "PatientUser",
  {
    userID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    mobileNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lineOne: {
      type: DataTypes.STRING(50),
    },
    lineTwo: {
      type: DataTypes.STRING(50),
    },
    city: {
      type: DataTypes.STRING(25),
    },
    postalCode: {
      type: DataTypes.STRING(10),
    },
    distric: {
      type: DataTypes.STRING(30),
    },
    Fname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Lname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
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
    tableName: "PatientUser",
  }
);
