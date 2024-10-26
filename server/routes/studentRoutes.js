// // routes/studentRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getAllStudents } = require('../controllers/studentController');

// // GET all students
// router.get('/', getAllStudents);

// module.exports = router;




const express = require('express');
const { getAllStudents } = require('../controllers/studentController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all students
router.get('/', verifyToken, getAllStudents);

module.exports = router;
