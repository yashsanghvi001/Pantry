/**
 * List Data Access Layer
 * Handles all database operations related to lists using Sequelize ORM
 */

const List = require('../models/List');
const ListItem = require('../models/ListItem');
const ListMember = require('../models/ListMember');
const Product = require('../models/Product');

/**
 * Create a new list
 * @param {string} name - List name
 * @param {number} budget - List budget
 * @param {number} created_by - User ID who created the list
 * @returns {Object} Created list
 */
const createList = async (name, budget, created_by) => {
  return await List.create({
    name,
    budget,
    created_by
  });
};

/**
 * Get all lists for a user
 * @param {number} user_id - User ID
 * @returns {Array} Array of lists
 */
const getListsByUser = async (user_id) => {
  return await List.findAll({
    where: { created_by: user_id },
    include: [{
      model: ListItem,
      include: [Product]
    }]
  });
};

/**
 * Get a specific list by ID
 * @param {number} id - List ID
 * @returns {Object} List with items
 */
const getListById = async (id) => {
  return await List.findByPk(id, {
    include: [{
      model: ListItem,
      include: [Product]
    }]
  });
};

/**
 * Update a list
 * @param {number} id - List ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated list
 */
const updateList = async (id, updateData) => {
  const list = await List.findByPk(id);
  if (!list) {
    throw new Error('List not found');
  }
  return await list.update(updateData);
};

/**
 * Delete a list
 * @param {number} id - List ID
 * @returns {boolean} True if deletion was successful
 */
const deleteList = async (id) => {
  const list = await List.findByPk(id);
  if (!list) {
    throw new Error('List not found');
  }
  await list.destroy();
  return true;
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
  return await ListItem.create({
    list_id,
    product_id,
    custom_name,
    quantity
  });
};

/**
 * Update a list item
 * @param {number} list_item_id - List item ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated list item
 */
const updateListItem = async (list_item_id, updateData) => {
  const item = await ListItem.findByPk(list_item_id);
  if (!item) {
    throw new Error('List item not found');
  }
  return await item.update(updateData);
};

/**
 * Delete a list item
 * @param {number} list_item_id - List item ID
 * @returns {boolean} True if deletion was successful
 */
const deleteListItem = async (list_item_id) => {
  const item = await ListItem.findByPk(list_item_id);
  if (!item) {
    throw new Error('List item not found');
  }
  await item.destroy();
  return true;
};

/**
 * Share a list with a user
 * @param {number} list_id - List ID
 * @param {number} user_id - User ID to share with
 * @returns {Object} Created list member
 */
const shareList = async (list_id, user_id) => {
  return await ListMember.create({
    list_id,
    user_id
  });
};

module.exports = {
  createList,
  getListsByUser,
  getListById,
  updateList,
  deleteList,
  addItemToList,
  updateListItem,
  deleteListItem,
  shareList
};