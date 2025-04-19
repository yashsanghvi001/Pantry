const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Store = require('./Store');

const ProductPrice = sequelize.define('ProductPrice', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Products',
      key: 'product_id'
    }
  },
  store_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Stores',
      key: 'store_id'
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  last_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Product_Prices',
  timestamps: false
});

// Define associations
ProductPrice.belongsTo(Product, { foreignKey: 'product_id' });
ProductPrice.belongsTo(Store, { foreignKey: 'store_id' });

module.exports = ProductPrice; 