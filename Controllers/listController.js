const { body, validationResult } = require('express-validator');
const listBal = require('../BAL/ListBal');

const createList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, budget } = req.body;
    const listId = await listBal.createList(req.user.id, name, budget);
    res.status(201).json({ message: 'List created successfully', list_id: listId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await listBal.getLists(req.user.id);
    res.json(lists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getList = async (req, res) => {
  try {
    const list = await listBal.getList(req.params.id);
    res.json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, budget } = req.body;
    await listBal.updateList(req.params.id, name, budget);
    res.json({ message: 'List updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteList = async (req, res) => {
  try {
    await listBal.deleteList(req.params.id);
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addItemToList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { product_id, custom_name, quantity } = req.body;
    const itemId = await listBal.addItemToList(req.params.id, product_id, custom_name, quantity);
    res.status(201).json({ message: 'Item added to list', item_id: itemId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateListItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { quantity, in_cart } = req.body;
    await listBal.updateListItem(req.params.itemId, quantity, in_cart);
    res.json({ message: 'List item updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteListItem = async (req, res) => {
  try {
    await listBal.deleteListItem(req.params.itemId);
    res.json({ message: 'List item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const shareList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email } = req.body;
    await listBal.shareList(req.params.id, email);
    res.json({ message: 'List shared successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createList: [
    body('name').notEmpty().withMessage('Name is required'),
    body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
    createList
  ],
  getLists,
  getList,
  updateList: [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
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