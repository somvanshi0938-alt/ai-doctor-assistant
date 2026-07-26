const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Routes Import
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");


// Routes Use
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Doctor App Backend Running 🚀");
});


// Protected Dashboard Route
const protect = require("./middleware/authMiddleware");

app.get("/api/dashboard", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Dashboard",
    user: req.user,
  });
});


// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});