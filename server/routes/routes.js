// require('module-alias/register');

/*
const fs = require('fs');

module.exports = (app) => {
    // require all API endpoints
    fs.readdirSync(`${__dirname}/`).forEach((file) => {
        require(`./${file.substr(0, file.indexOf('.'))}`)(app);
    });
};*/
const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');
//const searchControllerPOST = require('../controllers/searchPOST');
//const searchControllerGET = require('../controllers/searchGET');

const searchController = require('./api/searchController');

router.get('/', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

router.get('/search', searchController.post);
router.post('/search', searchController.get);
//router.post('/search', searchController.post);

router.get('/teste', controller.post);
router.post('/teste', controller.post);



module.exports = router;