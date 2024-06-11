const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const PatientUser = require("../PatientUser/patientUser");

class TokenStore extends Model {}

TokenStore.init(
  {
    tokenStore_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fcm_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActiveToken: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "TokenStore",
    timestamps: true,
    tableName: "tokenStore",
  }
);

PatientUser.hasMany(TokenStore, {
  foreignKey: "userID",
  onDelete: "RESTRICT",
});

TokenStore.belongsTo(PatientUser, {
  foreignKey: "userID",
});


module.exports = TokenStore;
