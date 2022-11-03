const express = require('express');
const router = express.Router();
const giveAttendanceController = require('../controllers/giveAttendance');

router.post('/', giveAttendanceController.giveAttendance);

module.exports = router;