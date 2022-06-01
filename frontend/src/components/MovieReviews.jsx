import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import MovieReview from "./MovieReview";
import MovieReviewAdd from "./MovieReviewAdd";
import MovieReviewUsername from "./MovieReviewUsername";
import { getReviewByMovie } from "../api/review";

const MovieReviews = ({ movieId, movieTitle }) => {
  const [loggedin, setLoggedin] = useState("");
  const [reviews, setReviews] = useState([]);

  const isLoggedIn = async () => {
    const token = sessionStorage.getItem("token");

    const decoded = await jwt_decode(token);
    console.log("USER-INFO: ", decoded);
    decoded
      ? setLoggedin({ id: decoded.userId }, { username: decoded.username })
      : setLoggedin("");
  };
  const fetchData = async () => {
    const data = await getReviewByMovie(movieId);
    setReviews(data);
  };

  useEffect(() => {
    isLoggedIn();
    fetchData();
  }, []);

  return (
    <div className="movie-reviews-container">
      {reviews &&
        reviews.map((review) => (
          <MovieReview review={review} loggedin={loggedin} />
        ))}

      {loggedin &&
        (!loggedin.username ? (
          <MovieReviewAdd movieId={movieId} movieTitle={movieTitle} />
        ) : (
          <MovieReviewUsername />
        ))}
    </div>
  );
};

export default MovieReviews;
