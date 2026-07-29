const Appointment = require("../models/Appointment");


// Create Appointment
const createAppointment = async (req, res) => {
  try {

    const {
      doctorId,
      date,
      time
    } = req.body;


    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      date,
      time,
    });


    res.status(201).json({
      success: true,
      message: "Appointment Booked Successfully",
      appointment,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};



// Get Patient Appointments
const getPatientAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({
      patientId: req.user._id
    })
      .populate("doctorId")
      .populate("patientId", "name email");


    res.status(200).json({
      success: true,
      appointments,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};



// Get Doctor Appointments
const getDoctorAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({
      doctorId: req.user._id
    })
      .populate("patientId", "name email")
      .populate("doctorId");


    res.status(200).json({
      success: true,
      appointments,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};



module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
};