const express = require('express');
const { createApplication, updateApplicationStatus, getAllApplications, getApplicationsByStudentId, getUserApplications } = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createApplication);
router.put('/:id', verifyToken, updateApplicationStatus);
router.get('/', verifyToken, getAllApplications);

// Fetch Applications by Student ID
router.get('/student/:studentId', verifyToken, getApplicationsByStudentId);
router.get('/applications/:userId', getUserApplications);

module.exports = router;


