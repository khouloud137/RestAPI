const express = require("express");
const mongoose = require("mongoose");
const USER = require("./models/User.js");
require("dotenv").config();
const DB = process.env.CONNECTION_MONGODB;
const app = express();
app.use(express.json());

mongoose.connect(DB).then(() => console.log("base de donnes connecté"));
// route pour afficher la liste de TOUS les users
//localhost:5000/get_all_users (methode GET)
app.get("/AllUSERS", async (req, res) => {
  await USER.find({}).then((data) => {
    res.status(200).json(data);
  });
});
// route pour creer un user
//localhost:5000/Add_user(methode POST)
app.post("/Add_user", (req, res) => {
  let new_user = new USER(req.body);
  new_user.save().then(() => {
    res
      .status(200)
      .json("user added")
      .catch((err) => {
        res.status(400).json({ err });
      });
  });
});
// route pour mise a jour d'un user SPECEFIQUE
//localhost:5000/edit-user/:id (methode PUT)
app.put("/edit-user/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  USER.findByIdAndUpdate(id, updates).then(() => {
    res
      .status(200)
      .json("user updated")
      .catch(() => {
        res.status(404).json(err);
      });
  });
});
// route pour supprimé un user SPECEFIQUE
//localhost:5000/delete-user/:id (methode DELETE)
app.delete("/delete-user", async (req, res) => {
  await USER.deleteOne({ firstname: req.query.firstname })
    .then(() => res.status(200).json("supprimé avec succés"))
    .catch(() => res.status(404).json("il n'ya pas un employé avec ce id"));
});
const port = 5000;
app.listen(port, () => console.log("server en marche  "));
