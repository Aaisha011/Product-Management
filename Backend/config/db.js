const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("products", "root", "khan@123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
