const express = require("express");

const breedController = require("../controller/breed");

const router = express.Router();

router.get("/getBreeds", breedController.getBreeds);

router.get("/getBreedsById/:id", breedController.getBreedById);

router.get("/getDogsByBreedId/:id", breedController.getDogByBreedId);

router.post("/addBreed", breedController.addBreed);

router.put("/editBreed/:id", breedController.editBreed);

router.delete("/deleteBreed/:id", breedController.deleteBreed);

module.exports = router;
