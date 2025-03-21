const dbConfig = require('../config/currentConfig.js');
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: "postgres",
});

module.exports = sequelize;
