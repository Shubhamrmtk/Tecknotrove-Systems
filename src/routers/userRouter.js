const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user', authMiddleware.authenticateToken, userController.getUser);
router.post('/register', userController.registerUser);

module.exports = router;
