/**
 * Authentication Controller
 * Handles user registration and login functionality
 */

const { body, validationResult } = require('express-validator');
const userBal = require('../BAL/UserBal');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // For sending emails
const { errorMessages, successMessages } = require('../config/messages');

// Define valid auth providers
const VALID_AUTH_PROVIDERS = ['E','G', 'A'];

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
    return res.error('Validation failed', { errors: errors.array() });
  }

  try {
    const { email, password, role, auth_provider } = req.body;
    
    // Validate auth_provider
    if (auth_provider && !VALID_AUTH_PROVIDERS.includes(auth_provider)) {
      return res.error(errorMessages.AUTH.INVALID_AUTH_PROVIDER(VALID_AUTH_PROVIDERS));
    }

    // Register user through business logic layer
    const userId = await userBal.registerUser(email, password, role, auth_provider);
    return res.success(successMessages.AUTH.REGISTER_SUCCESS, { user_id: userId });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Verify user email with token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with verification status
 */
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token through business logic layer
    const isVerified = await userBal.verifyEmailToken(token);

    if (isVerified) {
      return res.success('Email verified successfully. You can now log in.');
    } else {
      return res.error('Invalid or expired token.');
    }
  } catch (error) {
    return res.error(error.message);
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
    return res.error('Validation failed', { errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    // Authenticate user and generate token
    const token = await userBal.loginUser(email, password);
    return res.success(successMessages.AUTH.LOGIN_SUCCESS, { token });
  } catch (error) {
    return res.error(error.message);
  }
};

// Export routes with validation middleware
module.exports = {
  verifyEmail,
  register: [
    // Validate email format
    body('email').isEmail().withMessage(errorMessages.AUTH.INVALID_EMAIL),
    // Validate password length
    body('password')
      .isLength({ min: 6 })
      .withMessage(errorMessages.AUTH.PASSWORD_TOO_SHORT),
    // Validate auth provider if provided
    body('auth_provider')
      .optional()
      .isIn(VALID_AUTH_PROVIDERS)
      .withMessage(errorMessages.AUTH.INVALID_AUTH_PROVIDER(VALID_AUTH_PROVIDERS)),
    register
  ],
  login: [
    // Validate email format
    body('email').isEmail().withMessage(errorMessages.AUTH.INVALID_EMAIL),
    // Ensure password is provided
    body('password').exists().withMessage(errorMessages.AUTH.PASSWORD_REQUIRED),
    login
  ]
};