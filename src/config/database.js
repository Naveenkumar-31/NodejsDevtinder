const { mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://naveenambala24:DRliAZNx2QSPTgUt@cluster0.aa1nm.mongodb.net/devtinder"
  );
};

module.exports = { connectDB };
