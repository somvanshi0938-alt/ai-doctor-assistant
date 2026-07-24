const generateToken = require("../utils/generateToken");

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Dummy Login
  if (email === "admin@gmail.com" && password === "123456") {
    const token = generateToken("12345");

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid Credentials",
  });
};

module.exports = {
  registerUser,
  loginUser,
};