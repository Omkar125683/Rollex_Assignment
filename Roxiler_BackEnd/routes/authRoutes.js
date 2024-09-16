const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');
const { validateSignup } = require('../utils/validations');

// Public routes for registration and login
router.post('/register', validateSignup , signup);
router.post('/login', login);

module.exports = router;
