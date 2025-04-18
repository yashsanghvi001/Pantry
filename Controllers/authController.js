/**
 * Authentication Controller
 * Handles user registration and login functionality
 */

const { body, validationResult } = require('express-validator');
const userBal = require('../BAL/UserBal');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with registration status
 */
const register = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password,role, auth_provider} = req.body;
    // Register user through business logic layer
    const userId = await userBal.registerUser(email, password,role, auth_provider || 'email');
    res.status(201).json({ message: 'User registered successfully', user_id: userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Login existing user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with authentication token
 */
const login = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    // Authenticate user and generate token
    const token = await userBal.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Export routes with validation middleware
module.exports = {
  register: [
    // Validate email format
    body('email').isEmail().withMessage('Invalid email'),
    // Validate password length
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    // Validate auth provider if provided
    body('auth_provider').optional().isIn(['email', 'google', 'apple']),
    register
  ],
  login: [
    // Validate email format
    body('email').isEmail().withMessage('Invalid email'),
    // Ensure password is provided
    body('password').exists().withMessage('Password is required'),
    login
  ]
};