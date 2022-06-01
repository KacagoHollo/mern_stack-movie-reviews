import React, { useState, useEffect } from "react";
import { movieDetails1, movieDetails2 } from "../api/movieDetails";
import MovieDetails from "../components/MovieDetails";
import MovieCrew from "../components/MovieCrew";
// import MovieReviews from "../components/MovieReviews";

const Movie = ({ movieId }) => {
  const [details1, setDetails1] = useState("");
  const [details2, setDetails2] = useState("");

  const getMovieDetails = async (id) => {
    const resp1 = await movieDetails1(id);
    const resp2 = await movieDetails2(id);
    console.log("Resp1: ", resp1);
    console.log("Resp2: ", resp2);
    setDetails1(resp1);
    setDetails2(resp2);
  };

  useEffect(() => {
    getMovieDetails(694);
    //406,694
  }, []);

  return (
    <div>
      <h2>MOVIE DETAILS</h2>
      {details1 && <MovieDetails data={details1} />}
      <h2>CAST AND CREW</h2>
      {details2 && <MovieCrew data={details2} />}
      <h2>REVIEWS</h2>
      <MovieReviews movieId={movieId} />
    </div>
  );
};

export default Movie;
