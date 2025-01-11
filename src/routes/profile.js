const express = require("express");
const { userauth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
const User = require("../models/user");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userauth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userauth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("updating is not allowed:");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    // const { _id } = req.user;

    // const updateduser = await User.findByIdAndUpdate({ _id }, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.json({
      message: `${loggedInUser.firstName}  your data updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.send("ERROR : " + error.message);
  }
});
module.exports = profileRouter;
