/**
 * List Controller
 * Handles list-related operations
 */

const { body, validationResult } = require('express-validator');
const listBal = require('../BAL/ListBal');
const { errorMessages, successMessages } = require('../config/messages');

/**
 * Get all lists for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with lists
 */
const getLists = async (req, res) => {
  try {
    const userId = req.user.id;
    const lists = await listBal.getLists(userId);
    return res.success(successMessages.LIST.RETRIEVED, { lists });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Get a specific list by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with list
 */
const getList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await listBal.getList(id);
    return res.success(successMessages.LIST.RETRIEVED, { list });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Create a new list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with created list
 */
const createList = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }

  try {
    const { name, budget } = req.body;
    const userId = req.user.id;
    const list = await listBal.createList(userId, name, budget);
    return res.success(successMessages.LIST.CREATED, { list });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Update an existing list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated list
 */
const updateList = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;
    const list = await listBal.updateList(id, updateData);
    return res.success(successMessages.LIST.UPDATED, { list });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Delete a list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with deletion status
 */
const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await listBal.deleteList(id);
    return res.success(successMessages.LIST.DELETED);
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Add an item to a list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with created list item
 */
const addItemToList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }
  try {
    const { product_id, custom_name, quantity } = req.body;
    const listItem = await listBal.addItemToList(req.params.id, product_id, custom_name, quantity);
    return res.success(successMessages.LIST.ITEM_ADDED, { list_item: listItem });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Update a list item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated list item
 */
const updateListItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }
  try {
    const { itemId } = req.params;
    const updateData = req.body;
    const listItem = await listBal.updateListItem(itemId, updateData);
    return res.success(successMessages.LIST.ITEM_UPDATED, { list_item: listItem });
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Delete a list item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with deletion status
 */
const deleteListItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    await listBal.deleteListItem(itemId);
    return res.success(successMessages.LIST.ITEM_DELETED);
  } catch (error) {
    return res.error(error.message);
  }
};

/**
 * Share a list with a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with sharing status
 */
const shareList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error('Validation failed', { errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const { email } = req.body;
    const listMember = await listBal.shareList(id, email);
    return res.success(successMessages.LIST.SHARED, { list_member: listMember });
  } catch (error) {
    return res.error(error.message);
  }
};

// Export routes with validation middleware
module.exports = {
  getLists,
  getList,
  createList: [
    body('name').notEmpty().withMessage(errorMessages.VALIDATION.REQUIRED_FIELD('name')),
    body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
    createList
  ],
  updateList: [
    body('name').optional().notEmpty().withMessage(errorMessages.VALIDATION.REQUIRED_FIELD('name')),
    body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
    updateList
  ],
  deleteList,
  addItemToList: [
    body('product_id').optional().isInt().withMessage('Product ID must be an integer'),
    body('custom_name').optional().notEmpty().withMessage('Custom name cannot be empty'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    addItemToList
  ],
  updateListItem: [
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('in_cart').optional().isBoolean().withMessage('In cart must be a boolean'),
    updateListItem
  ],
  deleteListItem,
  shareList: [
    body('email').isEmail().withMessage('Invalid email'),
    shareList
  ]
};