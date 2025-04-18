const { body, validationResult } = require('express-validator');
const shoppingListBal = require('../BAL/ShoppingListBal');

const createShoppingListController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name } = req.body;
    const listId = await shoppingListBal.createShoppingListBal(req.user.id, name);
    res.status(201).json({ message: 'Shopping list created successfully', list_id: listId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getShoppingListsController = async (req, res) => {
  try {
    const lists = await shoppingListBal.getShoppingLists(req.user.id);
    res.json(lists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getShoppingListController = async (req, res) => {
  try {
    const list = await shoppingListBal.getShoppingList(req.params.id);
    res.json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateShoppingListController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name } = req.body;
    await shoppingListBal.updateShoppingListBal(req.params.id, name);
    res.json({ message: 'Shopping list updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteShoppingListController = async (req, res) => {
  try {
    await shoppingListBal.deleteShoppingListBal(req.params.id);
    res.json({ message: 'Shopping list deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addItemToShoppingListController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { product_id, quantity } = req.body;
    const itemId = await shoppingListBal.addItemToShoppingListBal(req.params.id, product_id, quantity);
    res.status(201).json({ message: 'Item added to shopping list', item_id: itemId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteShoppingListItemController = async (req, res) => {
  try {
    await shoppingListBal.deleteShoppingListItemBal(req.params.itemId);
    res.json({ message: 'Shopping list item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
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