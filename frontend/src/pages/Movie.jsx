import React, { useState, useEffect } from "react";
import { movieDetails1, movieDetails2 } from "../api/movieDetails";
import MovieDetails from "../components/MovieDetails";
import MovieCrew from "../components/MovieCrew";
import MovieReviews from "../components/MovieReviews";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Movie = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [details1, setDetails1] = useState("");
  const [details2, setDetails2] = useState("");
  const movieId = searchParams.get("id");

  const [loggedin, setLoggedin] = useState("");

  const isLoggedIn = async () => {
    const token = sessionStorage.getItem("token");
    console.log("TOKEN: ", token);

    const decoded = await jwt_decode(token);
    console.log("USER-INFO: ", decoded);
    decoded
      ? setLoggedin({ id: decoded.userId, username: decoded.username })
      : setLoggedin("");
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const getMovieDetails = async (id) => {
    const resp1 = await movieDetails1(id);
    const resp2 = await movieDetails2(id);
    console.log("Resp1: ", resp1);
    console.log("Resp2: ", resp2);
    setDetails1(resp1);
    setDetails2(resp2);
  };

  useEffect(() => {
    getMovieDetails(movieId);
    //406,694
  }, []);

  return (
    <div>
      {details1 && details2 && (
        <MovieDetails data={details1} data2={details2} />
      )}
      <h2>CAST AND CREW</h2>
      {details2 && <MovieCrew data={details2} />}
      <h2>REVIEWS</h2>
      <MovieReviews
        movieId={movieId}
        movieTitle={details1.title}
        loggedin={loggedin}
      />
    </div>
  );
};

export default Movie;
