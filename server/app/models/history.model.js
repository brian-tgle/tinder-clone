module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      userId: String,
      interactedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      reaction: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const History = mongoose.model("history", schema);
  return History;
};
