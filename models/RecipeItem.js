const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require('./Recipe');
const Product = require('./Product');

const RecipeItem = sequelize.define('RecipeItem', {
  recipe_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Recipes',
      key: 'recipe_id'
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
    allowNull: false
  },
  added_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Recipe_Items',
  timestamps: false
});

// Define associations
RecipeItem.belongsTo(Recipe, { foreignKey: 'recipe_id' });
RecipeItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = RecipeItem; 