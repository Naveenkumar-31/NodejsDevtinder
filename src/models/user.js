const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailID: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    age: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
