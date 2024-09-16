const { check, validationResult } = require('express-validator');

exports.validateSignup = [
    check('name').isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters.'),
    check('email').isEmail().withMessage('Invalid email.'),
    check('password').isLength({ min: 8, max: 16 }).matches(/[A-Z]/).matches(/[!@#$%^&*]/).withMessage('Password must be 8-16 characters and contain an uppercase letter and special character.'),
    check('address').isLength({ max: 400 }).withMessage('Address cannot exceed 400 characters.'),
];
