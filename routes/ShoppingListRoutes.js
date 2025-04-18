const express = require('express');
const router = express.Router();
const shoppingListController = require('../Controllers/ShoppingListController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, [
  body('name').notEmpty().withMessage('Name is required'),
  shoppingListController.createShoppingListController
]);
router.get('/', authenticate, shoppingListController.getShoppingListsController);
router.get('/:id', authenticate, shoppingListController.getShoppingListController);
router.put('/:id', authenticate, [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  shoppingListController.updateShoppingListController
]);
router.delete('/:id', authenticate, shoppingListController.deleteShoppingListController);
router.post('/:id/items', authenticate, [
  body('product_id').isInt().withMessage('Product ID must be an integer'),
  body('quantity').isFloat({ min: 0 }).withMessage('Quantity must be a positive number'),
  shoppingListController.addItemToShoppingListController
]);
router.delete('/items/:itemId', authenticate, shoppingListController.deleteShoppingListItemController);

module.exports = router;