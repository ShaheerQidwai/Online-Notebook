const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/inotebook", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection error:", err));
};

module.exports = connectToDatabase;
