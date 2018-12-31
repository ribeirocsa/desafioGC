const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// Import Routes directory
require('./routes/api/searchController')(app);


const router = require('./routes/api/searchController');

app.listen(port, (err) => {
    if (err) { console.log(err); }
    console.log('Listening on port ' + port);
});

app.use('/', router);