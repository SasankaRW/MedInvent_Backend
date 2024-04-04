const { Sequelize } = require("sequelize");

const { APPLICATION } = require("./config");

//const PORT = APPLICATION.DB_PORT;
const HOST = APPLICATION.DB_HOST;
const USER = APPLICATION.DB_USERNAME;
const database = APPLICATION.DB_NAME;
const PASSWORD = APPLICATION.DB_PASSWORD;

const sequelize = new Sequelize(database, USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
});

module.exports = sequelize;   
