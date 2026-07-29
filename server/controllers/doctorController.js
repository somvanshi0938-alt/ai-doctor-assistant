const Doctor = require("../models/Doctor");


// Create Doctor Profile
const createDoctor = async (req, res) => {
  try {

    const {
      specialization,
      experience,
      hospital,
      location,
      availableTime,
      consultationFee,
    } = req.body;


    const doctor = await Doctor.create({
      userId: req.user._id,
      specialization,
      experience,
      hospital,
      location,
      availableTime,
      consultationFee,
    });


    res.status(201).json({
      success: true,
      message: "Doctor Profile Created Successfully",
      doctor,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};



// Get All Doctors
const getAllDoctors = async (req, res) => {
  try {

    const doctors = await Doctor.find()
      .populate("userId", "name email");


    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};



// Search Doctors
const searchDoctors = async (req, res) => {
  try {

    const { specialization, location } = req.query;

    let filter = {};


    if (specialization) {
      filter.specialization = specialization;
    }


    if (location) {
      filter.location = location;
    }


    const doctors = await Doctor.find(filter)
      .populate("userId", "name email");


    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};


// Get Single Doctor Details
const getDoctorById = async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id)
      .populate("userId", "name email");


    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }


    res.status(200).json({
      success: true,
      doctor
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });

  }
};
module.exports = {
  createDoctor,
  getAllDoctors,
  searchDoctors,
  getDoctorById,
};