/**
 * Authentication Middleware
 * Handles JWT token verification and user authentication
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware function to authenticate requests using JWT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, 'secret_key');
    // Attach user data to request object
    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid token
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { authenticate };