const mongoose = require("mongoose");
const validator = require("validator");

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
        "https://in.images.search.yahoo.com/search/images;_ylt=Awrx_mYTXH5nHckLMkK9HAx.;_ylu=c2VjA3NlYXJjaARzbGsDYnV0dG9u;_ylc=X1MDMjExNDcyMzAwNQRfcgMyBGZyA21jYWZlZQRmcjIDcDpzLHY6aSxtOnNiLXRvcARncHJpZAM4ZTFtaGJEQVFZbXR3bGJGTDh2eDZBBG5fcnNsdAMwBG5fc3VnZwMxMARvcmlnaW4DaW4uaW1hZ2VzLnNlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMwBHFzdHJsAzM1BHF1ZXJ5A2RlZmF1bHQlMjBwaG90byUyMGltYWdlcyUyMHdpdGglMjBzbWFsbCUyMHVybAR0X3N0bXADMTczNjMzNDQ2OA--?p=default+photo+images+with+small+url&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&ei=UTF-8&x=wrt&type=E211IN1357G0#id=0&iurl=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F10%2FDefault-Profile-Picture-PNG-Transparent-Image.png&action=click",
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

module.exports = mongoose.model("User", userSchema);
