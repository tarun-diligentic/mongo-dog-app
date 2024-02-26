const express = require("express");

const dogController = require("../controller/dog");

const router = express.Router();

router.get("/getDogs", dogController.getDogs);

router.post("/addDog", dogController.postDog);

router.get("/getDog", dogController.searchDog);

router.put("/editDog/:id", dogController.editDog);

router.delete("/deleteDog/:id", dogController.deleteDog);

module.exports = router;
