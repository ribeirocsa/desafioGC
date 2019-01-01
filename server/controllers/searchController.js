const fetch = require('node-fetch');
const util = require('util');
const logger = require('../utils/logger');

module.exports = (app) => {

    let city = '';
    let city1 = '';
    let city2 = '';
    let city3 = '';

    const bodyParser = require("body-parser");

    /** bodyParser.urlencoded(options)
     * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
     * and exposes the resulting object (containing the keys and values) on req.body
     */
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    /**bodyParser.json(options)
     * Parses the text as JSON and exposes the resulting object on req.body.
     */
    app.use(bodyParser.json());

    app.post('/search', (req, res) => {

        city1 = encodeURIComponent(req.body.city1.trim());
        city2 = encodeURIComponent(req.body.city2.trim());
        city3 = encodeURIComponent(req.body.city3.trim());

        logger.info(util.format('Request received for: %s, %s, %s', city1, city2, city3));

        res.redirect('/current-weather');
    });

    app.get('/search-location-weather', (req, res) => {

        const API_KEY = process.env.API_KEY;
        // build api URL with user city
        const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
        const apiId = `&appid=${API_KEY}&units=metric`;

        const userLocation = (baseUrl, apiId, city) => {

            let newUrl = baseUrl + city + apiId;
            return newUrl;
        };

        const apiUrl1 = userLocation(baseUrl, apiId, city1);
        const apiUrl2 = userLocation(baseUrl, apiId, city2);
        const apiUrl3 = userLocation(baseUrl, apiId, city3);

        const validateResponseError = (requestNumber, responseCod, responseMessage) => {
            if (responseCod !== 200) {
                logger.error(util.format('Error on request: %s, %s', requestNumber, responseMessage));
            }

        };

        const apiRequest1 = fetch(apiUrl1)
            .then(res => res.json())
            .then(data => {
                validateResponseError(1, data.cod, data.message);
                logger.debug(util.format('Weather for city %s was correctly retrieved', city1));
                return data;
            })
            .catch(err => {
                logger.error(util.format('Error on getting info for city %s. %s', city1, err));

            });


        const apiRequest2 = fetch(apiUrl2)
            .then(res => res.json())
            .then(data => {
                validateResponseError(2, data.cod, data.message);
                logger.debug(util.format('Weather for city %s was correctly retrieved', city2));
                return data;
            })
            .catch(err => {
                logger.error(util.format('Error on getting info for city %s. %s', city2, err));
            });

        const apiRequest3 = fetch(apiUrl3)
            .then(res => res.json())
            .then(data => {
                validateResponseError(3, data.cod, data.message);
                logger.debug(util.format('Weather for city %s was correctly retrieved', city3));
                return data;
            })
            .catch(err => {
                logger.error(util.format('Error on getting info for city %s. %s', city3, err));
            });

        const combinedData = Promise.all([apiRequest1,apiRequest2,apiRequest3])
                    .then(function(values){
                        combinedData["apiRequest1"] = values[0];
                        combinedData["apiRequest2"] = values[1];
                        combinedData["apiRequest3"] = values[2];
                        combinedData["city1"] = city1;
                        combinedData["city2"] = city2;
                        combinedData["city3"] = city3;


                        res.send( combinedData );
                })
                .catch(err => {
                    //console.log('promise catch:' + err);
                    logger.error(util.format('Error on promise catch: %s', err));

                    res.redirect('/error');
                });
    })
};