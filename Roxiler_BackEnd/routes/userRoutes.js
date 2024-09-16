const express = require('express');
const router = express.Router();
const {getAllUsers, getUserDetails, updateUserDetails, updatePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Fetch user details (protected route)
router.get('/me', protect, getUserDetails).get('/',protect, getAllUsers)
  .put('/me', protect, updateUserDetails)
  .put('/password', protect, updatePassword)


module.exports = router;
