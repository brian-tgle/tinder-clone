const { stringify } = require("querystring");

module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      title: String,
      firstName: String,
      lastName: String,
      gender: String, //"male", "female", "other"
      email: String,
      dateOfBirth: Date,
      registerDate: Date,
      phone: String,
      picture: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const User = mongoose.model("user", schema);
  return User;
};
