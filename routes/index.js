const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const ownKey = process.env.TMDB_API_KEY;

router.get("/movies", async (req, res) => {
  const rowRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${ownKey}`
  );
  const jsonRes = await rowRes.json();

  const movies = jsonRes.results.map((data) => {
    return {
      title: data.original_title,
      poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      overview: data.overview,
    };
  });

  res.json({ movies });
});

module.exports = router;

// const movies = {
//   title: jsonRes.original_title,
//   poster: jsonRes.poster_path,
//   voteAverage: jsonRes.vote_average,
//   voteCount: jsonRes.vote_count,
//   overview: jsonRes.overview,
// };
