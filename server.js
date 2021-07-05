'use strict';
const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');


const weather = require('./assetes/weather.json');

server.use(cors());

// port 
const PORT = process.env.PORT;

// localhost:3001/
server.get('/', (request, response) => {
    response.status(200).send('Home Route')
})


// localhost:3001/test
server.get('/test', (request, response) => {
    response.status(200).send('My server is a live')
})


//localhost:3001/getCityInfo?cityName=Amman
try {
    server.get('/getCityInfo', (req, res) => {
        console.log(req.query);
        let selectedCity = weather.results.find(city => {
            if (city.city_name == req.query.cityName) {
                return city
            }
        })
        const cityWeather = selectedCity.data.map(day => {
            return new City(day.valid_date, day.weather.description)
        })
        // res.status(200).send(selectedCity);
        res.status(200).send(cityWeather)
    })
} catch {
    res.status(404).send('Error 404 : You send a wrong request')
}

// Error
server.get('*', (request, response) => {
    response.status(404).send('Not Found')
})
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);

})
class City {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}