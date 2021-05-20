//REQUIERO LA BASE DE DATOS

const sequelize = require("sequelize");
const db = new sequelize("postgres://localhost/wiki", {
  logging: false,
  dialect: "postgres",
});

module.exports = db;
