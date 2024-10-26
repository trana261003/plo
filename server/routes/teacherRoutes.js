const express = require('express');
const { getAllTeachers } = require('../controllers/teacherController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all students
router.get('/', verifyToken, getAllTeachers);

module.exports = router;
