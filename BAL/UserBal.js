/**
 * User Business Logic Layer
 * Handles user-related business operations including authentication and user management
 */

const userDal = require('../DAL/UserDal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorMessages } = require('../config/messages');

/**
 * Register a new user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} auth_provider - Authentication provider (email, google, apple)
 * @returns {number} User ID of the newly created user
 * @throws {Error} If email already exists
 */
const registerUser = async (email, password, auth_provider) => {
  // Check if user already exists
  const existingUser = await userDal.getUserByEmail(email);
  if (existingUser) {
    throw new Error(errorMessages.AUTH.EMAIL_EXISTS);
  }

  // Hash password for secure storage
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create new user
  const userId = await userDal.createUser(email, hashedPassword, auth_provider);
  return userId;
};

/**
 * Authenticate user and generate JWT token
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {string} JWT token
 * @throws {Error} If credentials are invalid
 */
const loginUser = async (email, password) => {
  // Find user by email
  const user = await userDal.getUserByEmail(email);
  if (!user) {
    throw new Error(errorMessages.AUTH.INVALID_CREDENTIALS);
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(errorMessages.AUTH.INVALID_CREDENTIALS);
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.user_id, role: user.role || 'user' },
    'secret_key',
    { expiresIn: '1h' }
  );
  return token;
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Object} User object without sensitive data
 * @throws {Error} If user not found
 */
const getUser = async (id) => {
  const user = await userDal.getUserById(id);
  if (!user) {
    throw new Error(errorMessages.USER.NOT_FOUND);
  }
  delete user.password; // Remove sensitive data
  return user;
};

/**
 * Update user information
 * @param {number} id - User ID
 * @param {string} email - New email address
 * @param {string} password - New password (optional)
 * @throws {Error} If user not found or update fails
 */
const updateUser = async (id, email, password) => {
  // Check if user exists
  const user = await userDal.getUserById(id);
  if (!user) {
    throw new Error(errorMessages.USER.NOT_FOUND);
  }

  if (password) {
    // Hash new password if provided
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
  
  try {
    await userDal.updateUser(id, email, password);
  } catch (error) {
    throw new Error(errorMessages.USER.INVALID_UPDATE);
  }
};

/**
 * Delete user
 * @param {number} id - User ID
 * @throws {Error} If user not found or delete fails
 */
const deleteUser = async (id) => {
  // Check if user exists
  const user = await userDal.getUserById(id);
  if (!user) {
    throw new Error(errorMessages.USER.NOT_FOUND);
  }
  
  try {
    await userDal.deleteUser(id);
  } catch (error) {
    throw new Error(errorMessages.USER.DELETE_FAILED);
  }
};


const saveVerificationToken = async (userId, token, expiresAt) => {
  await userDal.saveVerificationToken(userId, token, expiresAt);
};

const verifyEmailToken = async (token) => {
  const tokenData = await userDal.getVerificationToken(token);

  if (!tokenData || new Date() > tokenData.expires_at) {
    return false; // Token is invalid or expired
  }

  // Mark the user as verified
  await userDal.markUserAsVerified(tokenData.user_id);

  // Delete the token after verification
  await userDal.deleteVerificationToken(token);

  return true;
};


module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  saveVerificationToken,
  verifyEmailToken
};