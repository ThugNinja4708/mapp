const express = require('express');
const router = express.Router();
const convertToCoachController = require('../controllers/convertToCoach');

router.post('/', convertToCoachController.convertToCoach);

module.exports = router;