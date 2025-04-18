/**
 * User Data Access Layer
 * Handles all database operations related to user management
 */

const db = require('../config/db');

/**
 * Retrieve user by email address
 * @param {string} email - User's email address
 * @returns {Object|null} User object if found, null otherwise
 */
const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};

/**
 * Retrieve user by ID
 * @param {number} id - User ID
 * @returns {Object|null} User object if found, null otherwise
 */
const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Users WHERE user_id = ?', [id]);
  return rows[0];
};

/**
 * Create a new user
 * @param {string} email - User's email address
 * @param {string} password - Hashed password
 * @param {string} auth_provider - Authentication provider
 * @returns {number} ID of the newly created user
 */
const createUser = async (email, password, auth_provider) => {
  const [result] = await db.query(
    'INSERT INTO Users (email, password, auth_provider) VALUES (?, ?, ?)',
    [email, password, auth_provider]
  );
  return result.insertId;
};

/**
 * Update user information
 * @param {number} id - User ID
 * @param {string} email - New email address
 * @param {string} password - New hashed password
 */
const updateUser = async (id, email, password) => {
  await db.query(
    'UPDATE Users SET email = ?, password = ? WHERE user_id = ?',
    [email, password, id]
  );
};

/**
 * Delete user by ID
 * @param {number} id - User ID
 */
const deleteUser = async (id) => {
  await db.query('DELETE FROM Users WHERE user_id = ?', [id]);
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};