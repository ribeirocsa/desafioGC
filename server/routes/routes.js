const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');

router.get('/search', searchController.post);
router.post('/search', searchController.get);

module.exports = router;