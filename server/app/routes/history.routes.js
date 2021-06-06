module.exports = app => {
  const histories = require("../controllers/history.controller.js");

  var router = require("express").Router();

  // Retrieve all histories
  router.get("/", histories.findAll);

  app.use("/api/histories", router);
};