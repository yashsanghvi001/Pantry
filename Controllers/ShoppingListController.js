/**
 * Shopping List Controller
 * Handles shopping list operations
 */

const { body, validationResult } = require('express-validator');
const shoppingListBal = require('../BAL/ShoppingListBal');
const { errorMessages, successMessages } = require('../config/messages');

/**
 * Create a new shopping list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with creation status
 */
const createShoppingListController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }
  try {
    const { name } = req.body;
    const listId = await shoppingListBal.createShoppingListBal(req.user.id, name);
    return res.success(successMessages.SHOPPING_LIST.CREATED, { list_id: listId });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Get all shopping lists for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with lists
 */
const getShoppingListsController = async (req, res) => {
  try {
    const lists = await shoppingListBal.getShoppingLists(req.user.id);
    return res.success(successMessages.SHOPPING_LIST.RETRIEVED, { lists });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Get a specific shopping list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with list details
 */
const getShoppingListController = async (req, res) => {
  try {
    const list = await shoppingListBal.getShoppingList(req.params.id);
    return res.success(successMessages.SHOPPING_LIST.RETRIEVED, { list });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Update a shopping list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with update status
 */
const updateShoppingListController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }
  try {
    const { name } = req.body;
    await shoppingListBal.updateShoppingListBal(req.params.id, name);
    return res.success(successMessages.SHOPPING_LIST.UPDATED);
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Delete a shopping list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with deletion status
 */
const deleteShoppingListController = async (req, res) => {
  try {
    await shoppingListBal.deleteShoppingListBal(req.params.id);
    return res.success(successMessages.SHOPPING_LIST.DELETED);
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Add an item to a shopping list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with item creation status
 */
const addItemToShoppingListController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }
  try {
    const { product_id, quantity } = req.body;
    const itemId = await shoppingListBal.addItemToShoppingListBal(req.params.id, product_id, quantity);
    return res.success(successMessages.SHOPPING_LIST.ITEM_ADDED, { item_id: itemId });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Delete an item from a shopping list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with item deletion status
 */
const deleteShoppingListItemController = async (req, res) => {
  try {
    await shoppingListBal.deleteShoppingListItemBal(req.params.itemId);
    return res.success(successMessages.SHOPPING_LIST.ITEM_DELETED);
  } catch (error) {
    return res.error(error.message);
  }
};

module.exports = {
  createShoppingListController,
  getShoppingListsController,
  getShoppingListController,
  updateShoppingListController,
  deleteShoppingListController,
  addItemToShoppingListController,
  deleteShoppingListItemController,
};