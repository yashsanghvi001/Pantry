const express = require('express');
const router = express.Router();
const listController = require('../Controllers/listController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, listController.createList);
router.get('/', authenticate, listController.getLists);
router.get('/:id', authenticate, listController.getList);
router.put('/:id', authenticate, listController.updateList);
router.delete('/:id', authenticate, listController.deleteList);
router.post('/:id/items', authenticate, listController.addItemToList);
router.put('/items/:itemId', authenticate, listController.updateListItem);
router.delete('/items/:itemId', authenticate, listController.deleteListItem);
router.post('/:id/share', authenticate, listController.shareList);

module.exports = router;