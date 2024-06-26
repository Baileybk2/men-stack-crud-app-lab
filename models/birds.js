const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Birds = mongoose.model("Birds", birdSchema);

module.exports = Birds;
