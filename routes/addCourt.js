const express = require('express');
const router = express.Router();
const addCourtController = require('../controllers/addCourt');

router.post('/', addCourtController.addCourt);

module.exports = router;