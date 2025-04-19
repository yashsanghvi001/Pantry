const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  auth_provider: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    defaultValue: 'E',
    validate: {
      isIn: [['E', 'A', 'G']] // E - EMAIL, A - ADMIN, G - GMAIL
    }
  },
  user_role: {
    type: DataTypes.CHAR(1),
    defaultValue: 'U',
    validate: {
      isIn: [['U', 'A']] // U - USER, A - ADMIN
    }
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = User; 