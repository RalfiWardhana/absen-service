const express = require('express');
const router = express.Router();
const absentRoutes = require('./absentRoutes');

router.use('/absents', absentRoutes);

module.exports = router;