const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createDoctorProfile,
  getAllDoctors,
} = require("../controllers/doctorController");


// Create Doctor Profile
router.post(
  "/profile",
  protect,
  createDoctorProfile
);


// Get All Doctors
router.get(
  "/",
  getAllDoctors
);


module.exports = router;