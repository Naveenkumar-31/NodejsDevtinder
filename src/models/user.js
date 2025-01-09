const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is in valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password ");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://in.images.search.yahoo.com/search/images;_ylt=Awrx_mYTXH5nHckLMkK9HAx.;_ylu=c2V",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length >= 11) {
          throw new Error("You can enter upto 10 skills ");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Naveen$$$123");
  return token;
};

userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const hashpassword = this.password;
  const isValidPassword = await bcrypt.compare(userInputPassword, hashpassword);
  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
