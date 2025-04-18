const db = require('../config/db');

const createShoppingList = async (user_id, name) => {
  const [result] = await db.query(
    'INSERT INTO Shopping_Lists (user_id, name) VALUES (?, ?)',
    [user_id, name]
  );
  return result.insertId;
};

const getShoppingListsByUser = async (user_id) => {
  const [rows] = await db.query('SELECT * FROM Shopping_Lists WHERE user_id = ?', [user_id]);
  return rows;
};

const getShoppingListById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Shopping_Lists WHERE list_id = ?', [id]);
  return rows[0];
};

const updateShoppingList = async (id, name) => {
  await db.query(
    'UPDATE Shopping_Lists SET name = ? WHERE list_id = ?',
    [name, id]
  );
};

const deleteShoppingList = async (id) => {
  await db.query('DELETE FROM Shopping_Lists WHERE list_id = ?', [id]);
};

const addItemToShoppingList = async (list_id, product_id, quantity) => {
  const [result] = await db.query(
    'INSERT INTO Shopping_List_Items (list_id, product_id, quantity) VALUES (?, ?, ?)',
    [list_id, product_id, quantity]
  );
  return result.insertId;
};

const deleteShoppingListItem = async (item_id) => {
  await db.query('DELETE FROM Shopping_List_Items WHERE item_id = ?', [item_id]);
};

module.exports = {
  createShoppingList,
  getShoppingListsByUser,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
  addItemToShoppingList,
  deleteShoppingListItem,
};