/**
 * Application Configuration
 * Contains all configuration settings for the application
 */

module.exports = {
  database: {
    name: 'pantry_list',
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
  },
  jwt: {
    secret: 'secret_key',
    expiresIn: '1h'
  },
  server: {
    port: process.env.PORT || 3000
  }
}; 