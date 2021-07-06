'use strict';
const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');
const axios = require('axios')

// const weather = require('./data/weather.json');

server.use(cors());

// port 
const PORT = process.env.PORT;

// localhost:3001/
server.get('/', (request, response) => {
    response.status(200).send('Home Route')
})


// localhost:3005/getCityInfo?cityName=Amman&key=
server.get('/getCityInfo',getweatherHandler);

function getweatherHandler(req, res) {
    let weatherQuery = req.query.cityName;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}`
    axios
        .get(url)
        .then(weatherData => {
            // console.log(weatherData.data)
            res.send(weatherData.data.data[0])
        })
        .catch(error => {
            res.status(500).send(error)
        })
}

// Error
server.get('*', (request, response) => {
    response.status(404).send('Not Found')
})

class City {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);

})