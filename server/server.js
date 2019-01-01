const express = require('express');
const winston = require('winston');

const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// Import Routes directory
require('./controllers/searchController')(app);


const router = require('./controllers/searchController');

app.listen(port, (err) => {
    if (err) { console.log(err); }
    console.log('Listening on port ' + port);
});

//app.listen(3000, () => winston.info('server is running'));
winston.info('Initialized nconf');
//app.listen(3000, () => logger.info('server is running'));

app.use('/', router);