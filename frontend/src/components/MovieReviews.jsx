import React, { useEffect, useState } from "react";
import MovieReview from "./MovieReview";
import MovieReviewAdd from "./MovieReviewAdd";
import MovieReviewUsername from "./MovieReviewUsername";
import { getReviewByMovie } from "../api/review";

const MovieReviews = ({ movieId, movieTitle, loggedin }) => {
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    const data = await getReviewByMovie({ movieId });
    setReviews(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="movie-reviews-container">
      {reviews &&
        reviews.map((review) => (
          <MovieReview review={review} loggedin={loggedin} />
        ))}

      {loggedin &&
        (loggedin.username ? (
          <MovieReviewAdd movieId={movieId} movieTitle={movieTitle} />
        ) : (
          <MovieReviewUsername />
        ))}
    </div>
  );
};

export default MovieReviews;
