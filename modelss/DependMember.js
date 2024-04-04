const DependMember = sequelize.define(
  "DependMember",
  {
    dID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "PatientUser",
        key: "userID",
      },
    },
    Fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
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
    tableName: "DependMember",
  }
);
