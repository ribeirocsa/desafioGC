const fetch = require('node-fetch');

exports.post = (req, res) => {

    let city = '';
    const API_KEY = process.env.OpenWeatherMap_API_KEY;
        // build api URL with user city
        const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk';
        const apiId = `&appid=df012e8d0c5edd089821d59c9556bb2e&units=metric`;

        const userLocation = (url1, url2, city) => {

            let newUrl = url1 + city + url2;
            return newUrl;
        };

        const apiUrl = userLocation(baseUrl, apiId, city);


        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                res.send({ data });
            })
            .catch(err => {
                res.redirect('/error');
            });
};
