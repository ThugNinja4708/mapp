const express = require('express');
const router = express.Router();
const deleteStudentController = require('../controllers/deleteStudent');

router.post('/', deleteStudentController.deleteStudent);

module.exports = router;