const express = require('express');
const router = express.Router();
const getAllCoachDetailsController = require('../controllers/getAllCoachDetails');

router.post('/', getAllCoachDetailsController.getAllCoachDetails);

module.exports = router;