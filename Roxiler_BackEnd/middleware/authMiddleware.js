const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is in the models folder
const {roleEnum} = require('../utils/RoleEnum');
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password'); // Attach user to request object
      console.log('Decoded token ID:', decoded.id);
      console.log('User found:', req.user);

      // Check if the user exists
      // if (!req.user) {
      //     return res.status(401).json({ message: 'User not found' });
      // }
      // Move to the next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  // Ensure the user exists and has the role of Admin
  if (req.user && req.user.role === roleEnum[0]) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
};


module.exports = { protect, admin };
