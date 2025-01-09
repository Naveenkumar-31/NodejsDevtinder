const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter firstname and lastname ");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("email is invalid ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password ");
  }
};

module.exports = { validateSignUpData };
