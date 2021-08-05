const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Age: Number,
  FavoriteFoods: [String],
  Email: { type: String },
});

module.exports = Person = mongoose.model("person", personSchema);
