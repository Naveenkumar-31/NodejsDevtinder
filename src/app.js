const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
// posting signup data
app.post("/signup", async (req, res) => {
  const userObj = req.body;

  const user = new User(userObj);
  try {
    await user.save();
    res.send("data added to database ");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
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
    res.status(400).send("somethis their is a issue");
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

app.patch("/user", async (req, res) => {
  const data = req.body;

  const userid = req.body.userid;

  try {
    const user = await User.findByIdAndUpdate({ _id: userid }, data, {
      returnDocument: "before",
    });

    if (!user) {
      res.status(400).send("user not present");
    } else {
      res.send(user + "data updated successfully");
    }
  } catch {
    res.status(400).send("something went wrong");
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
