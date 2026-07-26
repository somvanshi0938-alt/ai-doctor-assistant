const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("========== FULL ERROR ==========");
    console.error(err);
    console.log("================================");
  }
};

module.exports = connectDB;