const mongoose = require("mongoose");

const Dog = require("../models/dog-model");
const Breed = require("../models/breed-model");
const { ObjectId } = require("mongodb");

exports.getDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json({ status: 200, message: "OK", data: dogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchDog =async (req, res) => {
  const {searchQuery} = req.query;

  try {
    const results = await Dog.aggregate([
      {
        $match: { name: { $regex: searchQuery, $options: "i" } },
      },
      {
        $unionWith: {
          coll: "breeds",
          pipeline: [
            {
              $match: { breedName: { $regex: searchQuery, $options: "i" } },
            },
          ],
        },
      },
    ]);

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.postDog = async (req, res) => {
  try {
    let { name, color, breedId, age } = req.body;

    if (!name || !color || !breedId || !age) {
      return res.status(400).json({ message: "Please enter full details" });
    }

    const objectIdCheck = mongoose.Types.ObjectId.isValid(breedId);
    if (!objectIdCheck) {
      return res.json({ message: "Breed not found" });
    }

    let breed = await Breed.findById({ _id: breedId });
    // console.log(breed);

    if (!breed) {
      return res.status(400).json({ message: "Breed not found" });
    }

    breedId = breed._id;
    // console.log(breedId);
    const createdDog = await Dog.create({ name, color, age, breedId });

    res
      .status(201)
      .json({ status: 200, message: "Dog added successfully", createdDog });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.editDog = async (req, res) => {
  try {
    const dogId = req.params.id;
    let { name, color, breedId, age } = req.body;

    if (!name || !color || !breedId || !age) {
      return res.status(400).json({ message: "Please enter full details" });
    }

    const objectIdCheck = mongoose.Types.ObjectId.isValid(breedId);
    if (!objectIdCheck) {
      return res.json({ message: "Breed not found" });
    }

    let breed = await Breed.findOne({ _id: breedId });
    if (!breed) {
      return res.status(400).json({ message: "Breed not found" });
    }
    breedId = breed._id;

    const dog = await Dog.findByIdAndUpdate(
      dogId,
      { $set: { name, color, breedId, age } },
      { new: true }
    );

    if (dog) {
      return res
        .status(200)
        .json({ status: 200, message: "Dog updated successfully", dog });
    } else {
      return res.status(404).json({ message: "Dog not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDog = async (req, res) => {
  try {
    const dogId = req.params.id;
    const dog = await Dog.findById(dogId);

    if (dog) {
      const deletedDog = await Dog.deleteOne({ _id: dogId });
      return res.status(200).json({
        status: 200,
        message: "Dog deleted successfully",
        DeletedDog: dog,
      });
    } else {
      res.status(404).json({ message: "Dog not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
