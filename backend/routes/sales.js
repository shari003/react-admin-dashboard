const express = require('express');
const router = express.Router();

const {getSales} = require('../controllers/sales.js');

router.get('/sales', getSales);

module.exports = router;