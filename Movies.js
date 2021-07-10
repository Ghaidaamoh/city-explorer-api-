'use strict';
const axios = require('axios');

function getmovieHandler(req, res) {
  let movieQuery = req.query.cityName;
  const moviesSearch = inMemory.find(ele => ele.city == movieQuery)
  if (moviesSearch !== undefined) {
    console.log('local storage');
    res.status(200).send(
      moviesSearch.movies.map((movie) => {
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

  }
  else {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;

console.log('api');
    axios
      .get(url)
      .then((moviesData) => {
        new MovieData(moviesData.data.results, movieQuery)
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
  }
};


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


const inMemory = [];
class MovieData {
  constructor(movies, city) {
    this.movies = movies,
      this.city = city
    inMemory.push(this)
  }
}
module.exports = getmovieHandler;