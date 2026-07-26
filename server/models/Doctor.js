const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    hospital: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    availableTime: {
      type: String,
      trim: true,
    },

    consultationFee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);


const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;