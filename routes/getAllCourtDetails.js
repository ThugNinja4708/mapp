const express = require('express');
const router = express.Router();
const getAllCourtDetailsController = require('../controllers/getAllCourtDetails');

router.post('/', getAllCourtDetailsController.getAllCourtDetails);
module.exports = router;