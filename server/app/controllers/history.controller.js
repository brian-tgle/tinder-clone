const db = require("../models");
const History = db.histories;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new History
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId || !req.body.userInteractedId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a History
  const history = new History({
    userId: req.body.userId,
    userInteractedId: req.body.userInteractedId,
    liked: req.body.liked
  });

  // Save User in the database
  history
    .save(history)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the history.",
      });
    });
};

// Retrieve all Histories from the database.
exports.findAll = async (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  History.paginate({}, { offset, limit })
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
          err.message || "Some error occurred while retrieving histories.",
      });
    });
};