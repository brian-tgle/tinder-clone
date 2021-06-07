const dbConfig = require("../config/mongodb.config.js");
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose, mongoosePaginate);
db.histories = require("./history.model.js")(mongoose, mongoosePaginate);

module.exports = db;
