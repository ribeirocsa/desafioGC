const express = require('express');

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
    logger.info('Server started ');

});


app.use('/', router);