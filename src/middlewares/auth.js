const adminauth = (req, res, next) => {
  const token = "xyz";
  const isauthorized = token === "xyz";
  if (!isauthorized) {
    res.send("unathorized");
  } else {
    next();
  }
};

const userauth = (req, res, next) => {
  const token = "xy";
  const isauthorized = token === "xyz";
  if (!isauthorized) {
    res.send("unauthorized");
  } else {
    next();
  }
};

module.exports = { adminauth, userauth };
