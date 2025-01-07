const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Naveen",
    lastName: "Ambala",
    emailId: "naveen@gmail.com",
    password: "12545",
  };

  const user = await new User(userObj);

  user.save();

  res.send("successfully added to the data base");
});

connectDB()
  .then(() => {
    console.log("daabase established");
    app.listen(7777, () => {
      console.log("successfully server is listening");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
