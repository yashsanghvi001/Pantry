const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const List = sequelize.define('List', {
  list_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Lists',
  timestamps: false
});

// Define association
List.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = List; 