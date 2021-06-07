const db = require("../models");
const userSeeder = require('../data/seeder.json');
const User = db.users;
const History = db.histories;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

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
  const { page, size, userId } = req.query;
  const histories = await History.find({ userId }).select({ "userInteractedId": 1, "_id": 0});
  var condition = userId
    ? { _id : { $nin : histories } }
    : {};

  const { limit, offset } = getPagination(page, size);

  User.paginate(condition, { offset, limit })
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
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error while retrieving user with id=" + userId });
    });
};