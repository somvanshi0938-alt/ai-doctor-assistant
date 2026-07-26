const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");


// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });


    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Find user
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }


    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );


    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }


    // Generate JWT Token
    const token = generateToken(user._id);


    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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
  registerUser,
  loginUser,
};