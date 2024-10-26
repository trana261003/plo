const express = require('express');
const { createAssignment, submitAssignment, getAllAssignments, getAssignmentById, getSubmittedStudentsCount, getAssignmentCount } = require('../controllers/assignmentController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createAssignment);
router.put('/:id', verifyToken, submitAssignment);
router.get('/', verifyToken, getAllAssignments);
router.get('/:id', verifyToken, getAssignmentById);
// Get submitted students count for a specific assignment
router.get('/submitted-count/:assignmentId', verifyToken, getSubmittedStudentsCount);
// Get count of assignments
router.get('/count', verifyToken, getAssignmentCount);

module.exports = router;
