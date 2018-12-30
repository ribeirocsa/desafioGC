// permite disponibilizar o fech no node.js e desse modo efetuar pedidos assíncronos à API
const fetch = require('node-fetch');

module.exports = (app) => {

    // let zipcode;
    let city;
    const API_KEY = process.env.OpenWeatherMap_API_KEY;

    app.post('/CityWeather', (req, res) => {

        // city = req.body.city;

        // validação do formato do campo de input
        /*if(!city || zipcode.length < 5 || zipcode.length > 5) {
            res.redirect('/error');
        // se a validação do nome da cidade for correto redireciona para a página onde mostra o tempo atual
        } else {
            res.redirect('/current-weather');
        }*/

        res.redirect('CityWeather');
    });

    app.get('/', (req, res) => {
        // build api URL with user city
        const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
        const apiId = `&appid=${API_KEY}&units=metric`;

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

    })

};