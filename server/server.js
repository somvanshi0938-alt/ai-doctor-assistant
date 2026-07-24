const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Import
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Doctor App Backend Running 🚀");
});

// Protected Route
app.get("/api/dashboard", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Dashboard",
    user: req.user,
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});