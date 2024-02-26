const Breed = require("../models/breed-model");
const Dog = require("../models/dog-model");

exports.getBreeds = async (req, res) => {
  try {
    const breedName = await Breed.find({}, "breedName -_id");
    return res
      .status(200)
      .json({ status: 200, message: "OK", data: breedName });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getBreedById = async (req, res) => {
  try {
    const breedId = req.params.id;
    const breed = await Breed.findById(breedId);

    if (!breed) {
      return res.status(400).json({ message: "Breed not found" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "OK", breedName: breed.breedName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addBreed = async (req, res) => {
  try {
    const { breedName } = req.body;

    if (!breedName) {
      return res.status(400).json({ message: "Please enter full details" });
    }

    const breedCreated = await Breed.create({ breedName });

    return res.status(201).json({
      status: 200,
      message: "Breed added successfully",
      breedCreated,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.editBreed = async (req, res) => {
  try {
    const { breedName } = req.body;
    const breedId = req.params.id;

    if (!breedName) {
      return res.status(400).json({ message: "Please enter breed name" });
    }

    const breed = await Breed.findById(breedId);

    if (breed) {
      breed.breedName = breedName;

      await breed.save();

      return res.status(200).json({
        status: 200,
        message: "Breed updated successfully",
        breed,
      });
    } else {
      res.status(404).json({ message: "Breed not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBreed = async (req, res) => {
  try {
    const breedId = req.params.id;
    const breed = await Breed.findById(breedId);
    if (breed) {
      const deletedBreed = await Breed.deleteOne({ _id: breedId });
      return res.status(200).json({
        message: "Breed deleted successfully",
        DeletedBreed: breed,
      });
    } else {
      return res.status(400).json({ message: "Breed not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getDogByBreedId = async (req, res) => {
  try {
    const breedId = req.params.id;
    const dogData = await Dog.find({ breedId });

    if (dogData.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Dogs fetched by breed ID",
        Dogs: dogData,
      });
    } else {
      return res.status(404).json({ message: "Dogs not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
