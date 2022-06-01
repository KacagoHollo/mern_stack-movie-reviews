import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
<<<<<<< HEAD
import { Rating } from "@mui/material";
import { submitUsername, submitReview, getReviewByMovie } from "../api/review";

const MovieReviews = ({ movieId }) => {
  const [loggedin, setLoggedin] = useState("");
  const [username, setUsername] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  movieId = 694;
=======

const MovieReviews = ({ movieId }) => {
  const [loggedin, setLoggedin] = useState(false);
>>>>>>> 714c48f813e3b04bce2ec63c9ee0eb7cb5d7844a

  const isLoggedIn = async () => {
    const token = sessionStorage.getItem("token");
    const decoded = await jwt_decode(token);
    console.log("USER-INFO: ", decoded);
<<<<<<< HEAD
    decoded
      ? setLoggedin({ id: decoded.userId }, { username: decoded.username })
      : setLoggedin("");
  };
  const fetchData = async () => {
    console.log("FETCHIN!");
    const data = await getReviewByMovie(movieId);
    setReviews(data);
=======
    decoded ? setLoggedin(true) : setLoggedin(false);
>>>>>>> 714c48f813e3b04bce2ec63c9ee0eb7cb5d7844a
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
<<<<<<< HEAD

  return (
    <div className="movie-reviews-container">
      <div className="movie-reviews-reviews">
        {reviews &&
          reviews.map((review) => (
            <div>
              <Rating
                name="customized-10"
                max={10}
                value={review.rating}
                readOnly
              />
              <p>{review.content}</p>
              <p>{review.timeStamp}</p>
            </div>
          ))}
      </div>
      {loggedin &&
        (loggedin.username ? (
          <div className="movie-reviews-create">
            <Rating
              name="customized-10"
              defaultValue={0}
              max={10}
              onChange={(e) => {
                setReviewRating(e.target.value);
              }}
            />
            <textarea
              name="review-content"
              id="review-content"
              cols="30"
              rows="10"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="review text"
            ></textarea>
            <button
              onClick={() => {
                submitReview(movieId, reviewContent, reviewRating);
                window.location.reload();
              }}
            >
              Post my review!
            </button>
          </div>
        ) : (
          <div className="set-username-container">
            <p>
              To be able to comment, firts you'll need to setup your username!
            </p>
            <input
              name="set-username"
              id="set-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="chose a username!"
            ></input>
            <button
              onClick={() => {
                submitUsername(username);
                window.location.reload();
              }}
            >
              Submit
            </button>
          </div>
        ))}
    </div>
  );
=======
  return <div>{loggedin ? "LOGGED-IN" : "NOT-LOOGGED-IN"}</div>;
>>>>>>> 714c48f813e3b04bce2ec63c9ee0eb7cb5d7844a
};

export default MovieReviews;
