const shoppingListDal = require('../DAL/ShoppingListDal');

const createShoppingListBal = async (user_id, name) => {
  return await shoppingListDal.createShoppingList(user_id, name);
};

const getShoppingLists = async (user_id) => {
  return await shoppingListDal.getShoppingListsByUser(user_id);
};

const getShoppingList = async (id) => {
  const list = await shoppingListDal.getShoppingListById(id);
  if (!list) {
    throw new Error('Shopping list not found');
  }
  return list;
};

const updateShoppingListBal = async (id, name) => {
  await shoppingListDal.updateShoppingList(id, name);
};

const deleteShoppingListBal = async (id) => {
  await shoppingListDal.deleteShoppingList(id);
};

const addItemToShoppingListBal = async (list_id, product_id, quantity) => {
  return await shoppingListDal.addItemToShoppingList(list_id, product_id, quantity);
};

const deleteShoppingListItemBal = async (item_id) => {
  await shoppingListDal.deleteShoppingListItem(item_id);
};