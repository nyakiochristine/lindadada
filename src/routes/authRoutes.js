const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Login user
router.post('/login', authController.login);

module.exports = router;
// This code defines the authentication routes for the Cervical Cancer Platform.
// It includes routes for user registration and login, which are handled by the `authController`
