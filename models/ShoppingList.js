const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ShoppingList = sequelize.define('ShoppingList', {
  list_id: {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Shopping_Lists',
  timestamps: true
});

// Define association
ShoppingList.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ShoppingList; 