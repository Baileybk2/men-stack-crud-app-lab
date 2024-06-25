const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
});

const Birds = mongoose.model("Birds", birdSchema);

module.exports = Birds;
