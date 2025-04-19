const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const EmailVerificationToken = sequelize.define('EmailVerificationToken', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Email_Verification_Tokens',
  timestamps: false
});

// Define association
EmailVerificationToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = EmailVerificationToken; 