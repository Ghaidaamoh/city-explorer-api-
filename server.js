'use strict';
const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');
const getmovieHandler = require('./Movies');
const getweatherHandler = require('./Weather');
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

// localhost:3005/movies?cityName=Amman
server.get("/movies",getmovieHandler); 
  

// Error
server.get('*', (request, response) => {
    response.status(404).send('Not Found')
})


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);

})

