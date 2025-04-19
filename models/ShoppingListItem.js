const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ShoppingList = require('./ShoppingList');
const Product = require('./Product');

const ShoppingListItem = sequelize.define('ShoppingListItem', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  list_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Shopping_Lists',
      key: 'list_id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'product_id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'Shopping_List_Items',
  timestamps: true
});

// Define associations
ShoppingListItem.belongsTo(ShoppingList, { foreignKey: 'list_id' });
ShoppingListItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ShoppingListItem; 