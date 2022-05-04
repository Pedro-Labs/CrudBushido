module.exports = app => {
    const produtos = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", produtos.create);
    // Retrieve all Tutorials
    router.get("/", produtos.findAll);
    // Retrieve all published Tutorials
    router.get("/published", produtos.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", produtos.findOne);
    // Update a Tutorial with id
    router.put("/:id", produtos.update);
    // Delete a Tutorial with id
    router.delete("/:id", produtos.delete);
    // Delete all Tutorials
    router.delete("/", produtos.deleteAll);
    app.use('/api/tutorials', router);
  };