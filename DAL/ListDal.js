const db = require('../config/db');

const createList = async (name, budget, created_by) => {
  const [result] = await db.query(
    'INSERT INTO Lists (name, budget, created_by) VALUES (?, ?, ?)',
    [name, budget, created_by]
  );
  return result.insertId;
};

const getListsByUser = async (user_id) => {
  const [rows] = await db.query('SELECT * FROM Lists WHERE created_by = ?', [user_id]);
  return rows;
};

const getListById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Lists WHERE list_id = ?', [id]);
  return rows[0];
};

const updateList = async (id, name, budget) => {
  await db.query(
    'UPDATE Lists SET name = ?, budget = ? WHERE list_id = ?',
    [name, budget, id]
  );
};

const deleteList = async (id) => {
  await db.query('DELETE FROM Lists WHERE list_id = ?', [id]);
};

const addItemToList = async (list_id, product_id, custom_name, quantity) => {
  const [result] = await db.query(
    'INSERT INTO List_Items (list_id, product_id, custom_name, quantity) VALUES (?, ?, ?, ?)',
    [list_id, product_id, custom_name, quantity]
  );
  return result.insertId;
};

const updateListItem = async (list_item_id, quantity, in_cart) => {
  await db.query(
    'UPDATE List_Items SET quantity = ?, in_cart = ? WHERE list_item_id = ?',
    [quantity, in_cart, list_item_id]
  );
};

const deleteListItem = async (list_item_id) => {
  await db.query('DELETE FROM List_Items WHERE list_item_id = ?', [list_item_id]);
};

const shareList = async (list_id, user_id) => {
  await db.query(
    'INSERT INTO List_Shares (list_id, user_id) VALUES (?, ?)',
    [list_id, user_id]
  );
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