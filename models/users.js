

//ARCHIVO DONDE CREO LA Tabla user y la exporto

const S = require("sequelize");
const db = require("../db");

class User extends S.Model {}

User.init(
    {
        name: {
            type: S.STRING,
            allowNull: false,
        },
        email: {
            type: S.STRING,
            allowNull: false,
        },
    },
    { sequelize: db, modelName: "user" }
);

module.exports = User;