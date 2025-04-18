const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { authenticate } = require('../middleware/auth');

router.get('/:id', authenticate, userController.getUser);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;    