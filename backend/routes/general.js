const express = require('express');
const router = express.Router();

const { getUser, getDashboardStats } = require("../controllers/general.js");

router.get('/user/:id', getUser);
router.get('/dashboard', getDashboardStats)

module.exports = router;