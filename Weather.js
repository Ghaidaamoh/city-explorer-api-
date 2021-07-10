'use strict';
const axios = require('axios');

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

class City {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

module.exports=getweatherHandler;