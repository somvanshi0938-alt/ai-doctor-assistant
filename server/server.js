const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// connectDB();

app.use(cors());
app.use(express.json());

// Routes import
const authRoutes = require("./routes/authRoutes");

// Routes use
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Doctor App Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});