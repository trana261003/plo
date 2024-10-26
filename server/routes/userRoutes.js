// routes/userRoutes.js
const express = require('express');
const { getAllUsers, getUserProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Define the GET route to fetch user profile
// router.get('/profile', verifyToken, getUserProfile);
router.get('/', verifyToken, getAllUsers);
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;
