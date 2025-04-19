/**
 * Response Handler Middleware
 * Standardizes all API responses with a consistent format
 */

const { errorMessages, successMessages } = require('../config/messages');

/**
 * Response handler middleware
 * Wraps all responses in a standardized format
 */
const responseHandler = (req, res, next) => {
  // Store the original res.json method
  const originalJson = res.json;
  
  // Override the res.json method
  res.json = function(data) {
    // If the response is already in our standard format, return it as is
    if (data && typeof data === 'object' && 'isError' in data && 'message' in data && 'response' in data) {
      return originalJson.call(this, data);
    }
    
    // Create a standardized response object
    const standardResponse = {
      isError: false,
      message: data.message || '',
      response: data
    };
    
    // If there's a status code indicating an error, update isError
    if (res.statusCode >= 400) {
      standardResponse.isError = true;
    }
    
    // Call the original json method with our standardized response
    return originalJson.call(this, standardResponse);
  };
  
  // Store the original res.status method
  const originalStatus = res.status;
  
  // Override the res.status method to handle error messages
  res.status = function(code) {
    // Call the original status method
    const result = originalStatus.call(this, code);
    
    // If this is an error status, set isError to true
    if (code >= 400) {
      // We'll set isError in the json method
      return result;
    }
    
    return result;
  };
  
  // Add a helper method for error responses
  res.error = function(message, data = null) {
    this.status(400);
    return this.json({
      isError: true,
      message: message,
      response: data
    });
  };
  
  // Add a helper method for success responses
  res.success = function(message, data = null) {
    return this.json({
      isError: false,
      message: message,
      response: data
    });
  };
  
  next();
};

module.exports = responseHandler; 