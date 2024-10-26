const express = require('express');
const { createLeaveApplication, getLeaveApplications, getAllLeaveApplications, updateLeaveApplicationStatus } = require('../controllers/leaveapplicationController');
// const { authenticate } = require('../middleware/auth'); // Middleware for authentication
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a leave application
router.post('/', verifyToken, createLeaveApplication);

// Route to get all leave applications for a specific staff member
router.get('/:staffId', verifyToken, getLeaveApplications);
router.get('/', verifyToken, getAllLeaveApplications);
router.put('/:id', verifyToken, updateLeaveApplicationStatus);

module.exports = router;
