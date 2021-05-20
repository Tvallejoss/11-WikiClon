//Archivo donde creo la tabla Pages y la exporto

const S = require("sequelize");
const db = require("../db"); //Requiero la base de datos

class Page extends S.Model {}

Page.init(
    {
        title: {
            type: S.STRING,
            allowNull: false,
        },
        urlTitle: {
            type: S.STRING,
            allowNull: false,
        },
        content: {
            type: S.TEXT,
            allowNull: false,
        },
        status: {
            type: S.ENUM("open", "close"),
        },
        date: {
            type: S.DATE,
            defaultValue: S.NOW,
        },
        getRoute: {
            type: S.VIRTUAL,
            get() {
                return "/wiki/" + this.urlTittle;
            },
        },
    },
    { sequelize: db, modelName: "pages" }
);

//funcion auxiliar para generar un urlTIttle
function generateUrlTitle (title) {
    if (title) {
      // Remueve todos los caracteres no-alfanuméricos 
      // y hace a los espacios guiones bajos. 
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Generá de forma aleatoria un string de 5 caracteres
      return Math.random().toString(36).substring(2, 7);
    }
  }
//Hooks
Page.addHook('beforeValidate',(page)=>{
    let url = generateUrlTitle(page.title)
    page.urlTitle= url;
})

module.exports = Page;


