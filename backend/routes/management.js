const express = require('express');
const router = express.Router();
const { getAdmins, getUserPerformance } = require('../controllers/management.js');

router.get('/admins', getAdmins);
router.get('/performance/:id', getUserPerformance);

module.exports = router;