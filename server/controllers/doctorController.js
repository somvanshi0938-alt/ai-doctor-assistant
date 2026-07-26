const Doctor = require("../models/Doctor");


// Create Doctor Profile
const createDoctorProfile = async (req, res) => {
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



module.exports = {
  createDoctorProfile,
  getAllDoctors,
};