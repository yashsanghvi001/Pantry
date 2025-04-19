/**
 * List Business Access Layer
 * Handles business logic for list operations
 */

const listDal = require('../DAL/ListDal');
const userDal = require('../DAL/UserDal');

/**
 * Create a new list
 * @param {number} user_id - User ID
 * @param {string} name - List name
 * @param {number} budget - List budget
 * @returns {Object} Created list
 */
const createList = async (user_id, name, budget) => {
  return await listDal.createList(name, budget, user_id);
};

/**
 * Get all lists for a user
 * @param {number} user_id - User ID
 * @returns {Array} Array of lists
 */
const getLists = async (user_id) => {
  return await listDal.getListsByUser(user_id);
};

/**
 * Get a specific list
 * @param {number} id - List ID
 * @returns {Object} List with items
 */
const getList = async (id) => {
  const list = await listDal.getListById(id);
  if (!list) {
    throw new Error('List not found');
  }
  return list;
};

/**
 * Update a list
 * @param {number} id - List ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated list
 */
const updateList = async (id, updateData) => {
  return await listDal.updateList(id, updateData);
};

/**
 * Delete a list
 * @param {number} id - List ID
 * @returns {boolean} True if deletion was successful
 */
const deleteList = async (id) => {
  return await listDal.deleteList(id);
};

/**
 * Add an item to a list
 * @param {number} list_id - List ID
 * @param {number} product_id - Product ID
 * @param {string} custom_name - Custom name for the item
 * @param {number} quantity - Item quantity
 * @returns {Object} Created list item
 */
const addItemToList = async (list_id, product_id, custom_name, quantity) => {
  return await listDal.addItemToList(list_id, product_id, custom_name, quantity);
};

/**
 * Update a list item
 * @param {number} list_item_id - List item ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated list item
 */
const updateListItem = async (list_item_id, updateData) => {
  return await listDal.updateListItem(list_item_id, updateData);
};

/**
 * Delete a list item
 * @param {number} list_item_id - List item ID
 * @returns {boolean} True if deletion was successful
 */
const deleteListItem = async (list_item_id) => {
  return await listDal.deleteListItem(list_item_id);
};

/**
 * Share a list with a user
 * @param {number} list_id - List ID
 * @param {string} email - User email
 * @returns {Object} Created list member
 */
const shareList = async (list_id, email) => {
  const user = await userDal.getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  return await listDal.shareList(list_id, user.user_id);
};

module.exports = {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
  addItemToList,
  updateListItem,
  deleteListItem,
  shareList
};