const express = require('express');

const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// Import Routes directory
require('./controllers/searchController')(app);


const router = require('./controllers/searchController');

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        logger.error(util.format('Error starting service: %s', err));

    }
    logger.info('Server started on port ' + port);
});


app.use('/', router);