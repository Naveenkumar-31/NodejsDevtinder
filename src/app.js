const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const { userauth } = require("./middlewares/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
// posting signup data
app.post("/signup", async (req, res) => {
  try {
    //validating
    validateSignUpData(req);

    // encrypting the password
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    //creating the new isthance of the User

    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("data added to database ");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

// user login
app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Inavalid credentials");
    }

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      //creating token
      const token = await user.getJWT();

      console.log(token);
      //sending cookies

      res.cookie("token", token);

      res.send("login successfull");
    } else {
      throw new Error("Inavalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/profile", userauth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});
connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7777, () => {
      console.log("server listenining to port 7777");
    });
  })
  .catch((err) => {
    console.error("data base is not connected");
  });
