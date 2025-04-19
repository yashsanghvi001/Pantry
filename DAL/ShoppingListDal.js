/**
 * Shopping List Data Access Layer
 * Handles all database operations related to shopping lists using Sequelize ORM
 */

const ShoppingList = require('../models/ShoppingList');
const ShoppingListItem = require('../models/ShoppingListItem');
const Product = require('../models/Product');

/**
 * Create a new shopping list
 * @param {number} userId - User ID
 * @param {string} name - List name
 * @returns {Object} Created shopping list
 */
const createShoppingList = async (userId, name) => {
  return await ShoppingList.create({
    user_id: userId,
    name
  });
};

/**
 * Get all shopping lists for a user
 * @param {number} userId - User ID
 * @returns {Array} Array of shopping lists
 */
const getShoppingLists = async (userId) => {
  return await ShoppingList.findAll({
    where: { user_id: userId },
    include: [{
      model: ShoppingListItem,
      include: [Product]
    }]
  });
};

/**
 * Get a specific shopping list
 * @param {number} listId - List ID
 * @returns {Object} Shopping list with items
 */
const getShoppingList = async (listId) => {
  return await ShoppingList.findByPk(listId, {
    include: [{
      model: ShoppingListItem,
      include: [Product]
    }]
  });
};

/**
 * Update a shopping list
 * @param {number} listId - List ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated shopping list
 */
const updateShoppingList = async (listId, updateData) => {
  const list = await ShoppingList.findByPk(listId);
  if (!list) {
    throw new Error('Shopping list not found');
  }
  return await list.update(updateData);
};

/**
 * Delete a shopping list
 * @param {number} listId - List ID
 * @returns {boolean} True if deletion was successful
 */
const deleteShoppingList = async (listId) => {
  const list = await ShoppingList.findByPk(listId);
  if (!list) {
    throw new Error('Shopping list not found');
  }
  await list.destroy();
  return true;
};

/**
 * Add an item to a shopping list
 * @param {number} listId - List ID
 * @param {number} productId - Product ID
 * @param {number} quantity - Item quantity
 * @returns {Object} Created shopping list item
 */
const addItemToShoppingList = async (listId, productId, quantity) => {
  return await ShoppingListItem.create({
    list_id: listId,
    product_id: productId,
    quantity
  });
};

/**
 * Delete an item from a shopping list
 * @param {number} itemId - Item ID
 * @returns {boolean} True if deletion was successful
 */
const deleteShoppingListItem = async (itemId) => {
  const item = await ShoppingListItem.findByPk(itemId);
  if (!item) {
    throw new Error('Shopping list item not found');
  }
  await item.destroy();
  return true;
};

module.exports = {
  createShoppingList,
  getShoppingLists,
  getShoppingList,
  updateShoppingList,
  deleteShoppingList,
  addItemToShoppingList,
  deleteShoppingListItem
};