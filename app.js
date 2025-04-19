/**
 * Main application entry point for the Pantry application
 * This file sets up the Express server and configures middleware and routes
 */

// Import required dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Import middleware
const responseHandler = require('./middleware/responseHandler');

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');

// Configure middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(responseHandler);  // Standardize API responses

// Register API routes
app.use('/api/auth', authRoutes);    // Authentication routes
app.use('/api/users', userRoutes);   // User management routes
app.use('/api/lists', listRoutes);   // List management routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});