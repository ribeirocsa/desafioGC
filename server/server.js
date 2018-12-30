const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Import Routes directory
require('./routes/api/searchController')(app);

// criação de um endpoint que retorna uma msg "hello world"
/*
app.get('/', (req, res) => {
    res.send({ express: 'Hello From Express' });
});
*/

const router = require('./routes/api/searchController');

/*app.get('/searchCity', (req, res) => {
    res.send({ express: 'Hello From Express' });
});*/

app.listen(port, (err) => {
    if (err) { console.log(err); }
    console.log('Listening on port ' + port);
});

app.use('/', router);