const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" Database Connection Established");
  } catch (err) {
    console.log(" Connection Issues with Database");
    console.error("Error ->", err.message);
    process.exit(1);
  }
};
