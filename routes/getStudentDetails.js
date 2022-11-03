const express = require('express');
const router = express.Router();
const getStudentDetailsController = require('../controllers/getStudentDetails');

router.post('/', getStudentDetailsController.getStudentDetails);

module.exports = router;