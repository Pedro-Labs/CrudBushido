const auth = require("../../middleware/auth");
const {admin} = require('../../middleware/roles');
module.exports = app => {
    const produtos = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/",[auth, admin], produtos.create);
    // Retrieve all Tutorials
    router.get("/",[auth, admin], produtos.findAll);
    router.get("/exp",[auth, admin], produtos.findExp); //mais caro
    router.get("/cheap",[auth, admin], produtos.findCheap); //mais barato
    // Retrieve all published Tutorials
    router.get("/published",[auth, admin], produtos.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id",[auth, admin], produtos.findOne);
    // Update a Tutorial with id
    router.put("/:id",[auth, admin], produtos.update);
    // Delete a Tutorial with id
    router.delete("/:id",[auth, admin], produtos.delete);
    // Delete all Tutorials
    router.delete("/",[auth, admin], produtos.deleteAll);
    app.use('/api/tutorials', router);
  };

