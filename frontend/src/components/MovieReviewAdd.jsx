import React, { useState } from "react";
import { Rating } from "@mui/material";
import { submitReview } from "../api/review";

const MovieReviewAdd = ({ movieId, movieTitle }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  return (
    <>
      <div className="movie-reviews-create">
        <input
          name="review-title"
          id="review-title"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          placeholder="review title"
        ></input>
        <textarea
          name="review-content"
          id="review-content"
          cols="30"
          rows="10"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          placeholder="review text"
        ></textarea>
        <Rating
          name="customized-10"
          defaultValue={0}
          max={10}
          onChange={(e) => {
            setReviewRating(e.target.value);
          }}
        />
        <button
          onClick={() => {
            submitReview(
              movieId,
              movieTitle,
              reviewTitle,
              reviewContent,
              reviewRating
            );
            window.location.reload();
          }}
        >
          Post my review!
        </button>
      </div>
    </>
  );
};

export default MovieReviewAdd;
