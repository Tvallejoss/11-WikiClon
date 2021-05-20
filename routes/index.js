//archivo de rutas

const express = require("express");
const router = express.Router();
const models = require("../models");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

module.exports = router;

const Page = models.Page;
const Users = models.User;

//pagina principal
router.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

//pagina principal
router.get("/wiki", (req, res, next) => {
  res.render("index");
});

//agrega todo lo de la pagina  a la base de datos
router.post("/wiki", (req, res, next) => {
  // const { name, email, tittle, content, status } = req.body;
  //  Users.create({name,email}).then((UsuarioCreado)=>{
  //      res.status(201).send("USUARIO CREADO")
  //  })
  const title = req.body.title;
  const content = req.body.content;

  Page.create({ title: title, content: content })
    .then((PaginaCreada) => {
      res.redirect(`/wiki/${PaginaCreada.urlTitle}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

//pagina  del form donde estan los inputs
router.get("/wiki/add", (req, res, nex) => {
  res.render("addpage");
});

//pagina que cambia la url en cada wiki/add con la url especifica de esa pagina
router.get("/wiki/:urlTitle", function (req, res, next) {
  Page.findOne({  // select * from pages where urlTitle = pages.urlTitle;
    where: {
      urlTitle: req.params.urlTitle,
    },
  })
    .then(function (foundPage) {
       res.render("wikipage", { foundPage: foundPage })
       
    })
    .catch(next);
});
