import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import MovieReview from "../components/MovieReview";
import { getReviewByMovie } from "../api/review";

const Search = () => {
  const [loggedin, setLoggedin] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewerName, setReviewerName] = useState("");
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
    const data = await getReviewByMovie({ movieTitle, reviewerName });
    setReviews(data);
  };

  useEffect(() => {
    isLoggedIn();
    fetchData();
  }, []);
  useEffect(() => {
    isLoggedIn();
    fetchData();
  }, [movieTitle, reviewerName]);

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={movieTitle}
          placeholder="movie title"
          onChange={(e) => {
            setMovieTitle(e.target.value);
          }}
        ></input>
        <input
          className="search-input"
          type="text"
          value={reviewerName}
          placeholder="username"
          onChange={(e) => {
            setReviewerName(e.target.value);
          }}
        ></input>
      </div>
      <div className="search-review-container">
        {reviews &&
          reviews.map((review) => (
            <MovieReview review={review} loggedin={loggedin} />
          ))}
      </div>
    </div>
  );
};

export default Search;
