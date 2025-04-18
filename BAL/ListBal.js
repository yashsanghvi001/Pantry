const listDal = require('../dal/listDal');
const userDal = require('../dal/userDal');

const createList = async (user_id, name, budget) => {
  return await listDal.createList(name, budget, user_id);
};

const getLists = async (user_id) => {
  return await listDal.getListsByUser(user_id);
};

const getList = async (id) => {
  const list = await listDal.getListById(id);
  if (!list) {
    throw new Error('List not found');
  }
  return list;
};

const updateList = async (id, name, budget) => {
  await listDal.updateList(id, name, budget);
};

const deleteList = async (id) => {
  await listDal.deleteList(id);
};

const addItemToList = async (list_id, product_id, custom_name, quantity) => {
  return await listDal.addItemToList(list_id, product_id, custom_name, quantity);
};

const updateListItem = async (list_item_id, quantity, in_cart) => {
  await listDal.updateListItem(list_item_id, quantity, in_cart);
};

const deleteListItem = async (list_item_id) => {
  await listDal.deleteListItem(list_item_id);
};

const shareList = async (list_id, email) => {
  const user = await userDal.getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  await listDal.shareList(list_id, user.user_id);
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