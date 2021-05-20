const express = require("express");
const app = express();
const volleyball = require("volleyball");
const nunjucks = require("nunjucks");
const path = require("path");
const routes = require("./routes");
const port = 4000;
const db = require("./db");

//loggin middleware
app.use(volleyball);

//Usa las rutas de la carpeta routes
app.use("/", routes);

app.engine("html", nunjucks.render); // como renderear templates html
app.set("view engine", "html"); // que extensiones de archivo tienen los templates
nunjucks.configure("views", { noCache: true }); // donde encontrar las views

app.use(express.static(path.join(__dirname, "/public"))); // accede al contenido de la carpeta public

//body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//comienza server
db.sync({ force: true })
  .then(() => {
    console.log("DB conectada correctamente");
    app.listen(port, function () {
      console.log(`Server ok en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.log("DB no se pudo conectar: ", err);
  });
