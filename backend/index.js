const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const connectToDatabase = require("./db");
var cors = require("cors");
var app = express();

app.use(cors());

connectToDatabase();

const port = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend on port ${port}`);
});
