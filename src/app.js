const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
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

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (isValidPassword) {
      res.send("login successfull");
    } else {
      throw new Error("Inavalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// getting  user
app.get("/user", async (req, res) => {
  const useremailID = req.body.emailID;

  console.log(useremailID);

  try {
    const users = await User.find({ emailID: useremailID });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("somethis their is a issue" + error.message);
  }
});

// getting feed users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//deleting user by userid
app.delete("/user", async (req, res) => {
  const userid = req.body.userid;
  try {
    const user = await User.findByIdAndDelete({ _id: userid }); // (userid)===({_id:userid})
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userid", async (req, res) => {
  const data = req.body;
  const userid = req.params.userid;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "skills", "gender"];

    const isUpdateAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("updates not allowed");
    }

    const user = await User.findByIdAndUpdate({ _id: userid }, data, {
      returnDocument: "before",
      runValidators: true,
    });

    if (!user) {
      res.status(400).send("user not present");
    } else {
      res.send(user + "data updated successfully");
    }
  } catch (err) {
    res.status(400).send("something went wrong : " + err.message);
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
