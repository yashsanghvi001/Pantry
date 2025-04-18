/**
 * Database configuration file
 * Sets up the MySQL connection pool for the application
 */

const mysql = require('mysql2/promise');

// Create a connection pool with the following configuration
const pool = mysql.createPool({
  host: 'localhost',      // Database host
  user: 'root',          // Database user
  password: 'root',  // Database password
  database: 'pantry_list', // Database name
  port: 3306,          // Database port
  waitForConnections: true,  // Wait for available connections
  connectionLimit: 10,    // Maximum number of connections in the pool
  queueLimit: 0          // No limit on the connection queue
});

// Export the pool for use in other parts of the application
module.exports = pool;