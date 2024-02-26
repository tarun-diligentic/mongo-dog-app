// models/breed.js
const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema({
  breedName: {
    type: String,
    unique: true,
  },
});

const Breed = mongoose.model("Breed", breedSchema);

module.exports = Breed;
