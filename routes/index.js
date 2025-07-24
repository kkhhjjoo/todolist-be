const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');

router.use('/todo', taskApi);


module.exports = router;