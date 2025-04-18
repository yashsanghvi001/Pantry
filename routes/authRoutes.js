/**
 * Authentication Routes
 * Defines the endpoints for user authentication and registration
 */

const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login existing user
router.post('/login', authController.login);

module.exports = router;