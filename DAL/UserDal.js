/**
 * User Data Access Layer
 * Handles all database operations related to user management using Sequelize ORM
 */

const User = require('../models/User');
const EmailVerificationToken = require('../models/EmailVerificationToken');

/**
 * Retrieve user by email address
 * @param {string} email - User's email address
 * @returns {Object|null} User object if found, null otherwise
 */
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

/**
 * Retrieve user by ID
 * @param {number} id - User ID
 * @returns {Object|null} User object if found, null otherwise
 */
const getUserById = async (id) => {
  return await User.findByPk(id);
};

/**
 * Create a new user
 * @param {string} email - User's email address
 * @param {string} password - Hashed password
 * @param {string} auth_provider - Authentication provider
 * @returns {Object} Created user object
 */
const createUser = async (email, password, auth_provider) => {
  return await User.create({
    email,
    password,
    auth_provider
  });
};

/**
 * Update user information
 * @param {number} id - User ID
 * @param {Object} updateData - Object containing fields to update
 * @returns {Object} Updated user object
 */
const updateUser = async (id, updateData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  return await user.update(updateData);
};

/**
 * Delete user by ID
 * @param {number} id - User ID
 * @returns {boolean} True if deletion was successful
 */
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
  return true;
};

/**
 * Save email verification token
 * @param {number} userId - User ID
 * @param {string} token - Verification token
 * @param {Date} expiresAt - Token expiration date
 * @returns {Object} Created token object
 */
const saveVerificationToken = async (userId, token, expiresAt) => {
  return await EmailVerificationToken.create({
    user_id: userId,
    token,
    expires_at: expiresAt
  });
};

/**
 * Get verification token
 * @param {string} token - Verification token
 * @returns {Object|null} Token object if found, null otherwise
 */
const getVerificationToken = async (token) => {
  return await EmailVerificationToken.findOne({ where: { token } });
};

/**
 * Mark user as verified
 * @param {number} userId - User ID
 * @returns {Object} Updated user object
 */
const markUserAsVerified = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return await user.update({ is_verified: true });
};

/**
 * Delete verification token
 * @param {string} token - Verification token
 * @returns {boolean} True if deletion was successful
 */
const deleteVerificationToken = async (token) => {
  const verificationToken = await EmailVerificationToken.findOne({ where: { token } });
  if (!verificationToken) {
    throw new Error('Token not found');
  }
  await verificationToken.destroy();
  return true;
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  saveVerificationToken,
  getVerificationToken,
  markUserAsVerified,
  deleteVerificationToken
};