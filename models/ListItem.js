const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const List = require('./List');
const Product = require('./Product');

const ListItem = sequelize.define('ListItem', {
  list_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  list_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Lists',
      key: 'list_id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Products',
      key: 'product_id'
    }
  },
  custom_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1
  },
  in_cart: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  added_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'List_Items',
  timestamps: false
});

// Define associations
ListItem.belongsTo(List, { foreignKey: 'list_id' });
ListItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ListItem; 