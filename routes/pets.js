const express = require('express');
const router = express.Router();
const petsController = require('../Controller/petsController');

router.get('/pets', petsController.index);

module.exports = router;