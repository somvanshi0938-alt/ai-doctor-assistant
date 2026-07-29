const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");


// Create Appointment
router.post("/", protect, createAppointment);


// Patient Appointments
router.get("/patient", protect, getPatientAppointments);


// Doctor Appointments
router.get("/doctor", protect, getDoctorAppointments);


module.exports = router;