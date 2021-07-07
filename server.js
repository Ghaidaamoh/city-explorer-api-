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
// localhost:3005/movies?cityName=Amman
server.get("/movies",getmovieHandler); 
  function getmovieHandler(req, res) {
    let movieQuery = req.query.cityName;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;
    axios
      .get(url)
      .then((moviesData) => {
        res.status(200).send(
          moviesData.data.results.map((movie) => {
            return new Movies(
              movie.title,
              movie.overview,
              movie.release_date,
              movie.vote_average,
              movie.vote_count,
              movie.popularity,
              movie.poster_path
            );
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

class Movies {
    constructor(
      title,
      overview,
      released_on,
      average_votes,
      total_votes,
      popularity,
      poster_path
    ) {
      this.title = title;
      this.overview = overview;
      this.released_on = released_on;
      this.average_votes = average_votes;
      this.total_votes = total_votes;
      this.image_url = "https://image.tmdb.org/t/p/w500/" + poster_path;
      this.popularity = popularity;
    }
  }