const express = require('express');
// const { createNotice } = require('../controllers/noticeController');
const { createNotice, getAllNotices } = require('../controllers/noticeController');
// const { verifyToken } = require('../middleware/authMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createNotice);
router.get('/', verifyToken, getAllNotices);

module.exports = router;