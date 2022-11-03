const express = require('express');
const router = express.Router();
const updateUserName = require('../controllers/updateUserName');

router.post('/', updateUserName.updateUserName);

module.exports = router;