const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("================================");
    console.log("Authorization:", req.headers.authorization);
    console.log("Headers:", req.headers);
    console.log("================================");
    let token;

    console.log("Authorization Header =", req.headers.authorization);
    
    console.log("All Headers =", req.headers);

    // Check token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }


    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Find user
    req.user = await User.findById(decoded.id).select("-password");


    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }


    next();


  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};


module.exports = protect;