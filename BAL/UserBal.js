/**
 * User Business Logic Layer
 * Handles user-related business operations including authentication and user management
 */

const userDal = require('../dal/userDal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Register a new user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} auth_provider - Authentication provider (email, google, apple)
 * @returns {number} User ID of the newly created user
 * @throws {Error} If email already exists
 */
const registerUser = async (email, password,role, auth_provider) => {
  // Check if user already exists
  const existingUser = await userDal.getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password for secure storage
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create new user
  const userId = await userDal.createUser(email, hashedPassword,role, auth_provider);
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
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
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
    throw new Error('User not found');
  }
  delete user.password; // Remove sensitive data
  return user;
};

/**
 * Update user information
 * @param {number} id - User ID
 * @param {string} email - New email address
 * @param {string} password - New password (optional)
 */
const updateUser = async (id, email, password) => {
  if (password) {
    // Hash new password if provided
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
  await userDal.updateUser(id, email, password);
};

/**
 * Delete user
 * @param {number} id - User ID
 */
const deleteUser = async (id) => {
  await userDal.deleteUser(id);
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
};