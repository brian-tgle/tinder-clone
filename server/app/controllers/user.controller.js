const db = require("../models");
const userSeeder = require('../data/seeder.json');
const User = db.users;
const History = db.histories;

const getPagination = (page, size, skip) => {
  const limit = size ? size : 5;
  const offset = page ? ((page - 1) * limit) + skip : 0;

  return { limit, offset };
};

// Import user data
exports.import = (req, res) => {
  User
    .create(userSeeder)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  const { page, size, userId, skip } = req.query;
  // Get all user that already interacted before.
  // Then select list of user without them.
  const histories = await History.find({ userId }).select({ "interactedUser": 1, "_id": 0});
  const historyIds = histories.map(history => history.interactedUser);
  var condition = userId
    ? { _id : { $nin : historyIds } }
    : {};
  const select = {
    email: 1,
    firstName: 1,
    id: 1,
    lastName: 1,
    picture: 1,
    title: 1
  }
  const { limit, offset } = getPagination(page, size, parseInt(skip));
  User.paginate(condition, { offset, limit, select })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        data: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "User Not found with id " + userId });
      else res.send({data});
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error while retrieving user with id=" + userId });
    });
};