const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dogRoutes = require("./routes/dog");
const breedRoutes = require("./routes/breed");

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(dogRoutes);
app.use(breedRoutes);

mongoose
  .connect(
    "mongodb+srv://tarundiligentic:hello@dogapp.nbel4mg.mongodb.net/dog?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
