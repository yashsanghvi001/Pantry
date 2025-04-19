/**
 * User Controller
 * Handles user-related operations
 */

const { body, validationResult } = require('express-validator');
const userBal = require('../BAL/UserBal');
const { errorMessages, successMessages } = require('../config/messages');

/**
 * Get user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data
 */
const getUser = async (req, res) => {
  try {
    const user = await userBal.getUser(req.params.id);
    return res.success(successMessages.USER.RETRIEVED, { user });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Update user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with update status
 */
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }
  
  try {
    const { email, password } = req.body;
    await userBal.updateUser(req.params.id, email, password);
    return res.success(successMessages.USER.UPDATED);
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Delete user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with deletion status
 */
const deleteUser = async (req, res) => {
  try {
    await userBal.deleteUser(req.params.id);
    return res.success(successMessages.USER.DELETED);
  } catch (error) {
    return res.error(error.message);
  }
};

module.exports = {
  getUser,
  updateUser: [
    body('email').optional().isEmail().withMessage(errorMessages.AUTH.INVALID_EMAIL),
    body('password').optional().isLength({ min: 6 }).withMessage(errorMessages.AUTH.PASSWORD_TOO_SHORT),
    updateUser
  ],
  deleteUser
};