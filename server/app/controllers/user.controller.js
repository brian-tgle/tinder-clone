const db = require("../models");
const User = db.users;
const History = db.histories;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    registerDate: req.body.registerDate,
    phone: req.body.phone,
    picture: req.body.picture
  });

  // Save User in the database
  user
    .save(user)
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