const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getAllDoctors,
  searchDoctors,
  getDoctorById
} = require("../controllers/doctorController");


// Create Doctor Profile
router.post("/", createDoctor);


// Get All Doctors
router.get("/", getAllDoctors);
router.get("/search", searchDoctors);
router.get("/:id", getDoctorById);


module.exports = router;