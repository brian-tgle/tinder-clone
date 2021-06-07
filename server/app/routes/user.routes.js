module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const history = require("../controllers/history.controller.js");

  var router = require("express").Router();

  // Import User data
  router.get("/import", users.import);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:userId", users.findOne);

  // Mark a user as liked
  router.post("/like", history.create);

  // Mark a user as not liked
  router.post("/pass", history.create);

  app.use("/api/user", router);
};