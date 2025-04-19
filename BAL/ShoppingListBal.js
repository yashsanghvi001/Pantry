/**
 * Shopping List Business Access Layer
 * Handles business logic for shopping list operations
 */

const shoppingListDal = require('../DAL/ShoppingListDal');

/**
 * Create a new shopping list
 * @param {number} user_id - User ID
 * @param {string} name - List name
 * @returns {Object} Created shopping list
 */
const createShoppingListBal = async (user_id, name) => {
  return await shoppingListDal.createShoppingList(user_id, name);
};

/**
 * Get all shopping lists for a user
 * @param {number} user_id - User ID
 * @returns {Array} Array of shopping lists
 */
const getShoppingLists = async (user_id) => {
  return await shoppingListDal.getShoppingListsByUser(user_id);
};

/**
 * Get a specific shopping list
 * @param {number} id - Shopping list ID
 * @returns {Object} Shopping list with items
 */
const getShoppingList = async (id) => {
  const list = await shoppingListDal.getShoppingListById(id);
  if (!list) {
    throw new Error('Shopping list not found');
  }
  return list;
};

/**
 * Update a shopping list
 * @param {number} id - Shopping list ID
 * @param {string} name - New list name
 * @returns {Object} Updated shopping list
 */
const updateShoppingListBal = async (id, name) => {
  return await shoppingListDal.updateShoppingList(id, { name });
};

/**
 * Delete a shopping list
 * @param {number} id - Shopping list ID
 * @returns {boolean} True if deletion was successful
 */
const deleteShoppingListBal = async (id) => {
  return await shoppingListDal.deleteShoppingList(id);
};

/**
 * Add an item to a shopping list
 * @param {number} list_id - Shopping list ID
 * @param {number} product_id - Product ID
 * @param {number} quantity - Item quantity
 * @returns {Object} Created shopping list item
 */
const addItemToShoppingListBal = async (list_id, product_id, quantity) => {
  return await shoppingListDal.addItemToShoppingList(list_id, product_id, quantity);
};

/**
 * Delete an item from a shopping list
 * @param {number} item_id - Shopping list item ID
 * @returns {boolean} True if deletion was successful
 */
const deleteShoppingListItemBal = async (item_id) => {
  return await shoppingListDal.deleteShoppingListItem(item_id);
};

module.exports = {
  createShoppingListBal,
  getShoppingLists,
  getShoppingList,
  updateShoppingListBal,
  deleteShoppingListBal,
  addItemToShoppingListBal,
  deleteShoppingListItemBal,
};