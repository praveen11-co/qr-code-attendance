const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Endpoint for marking attendance
router.post('/mark', attendanceController.markAttendance);

module.exports = router;
