const express = require("express");
const { adminauth, userauth } = require("./middlewares/auth.js");

const app = express();

app.use("/admin", adminauth);

app.get("/user/get", userauth, (req, res) => {
  console.log(req.params);
  res.send("get called");
});

app.get("/admin/get", (req, res) => {
  res.send("admin get");
});

app.post("/admin/post", (req, res) => {
  res.send("deleted");
});

app.listen(3000, () => {
  console.log("successfully server is listening");
});
