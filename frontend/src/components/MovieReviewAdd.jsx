import React, { useState } from "react";
import { Rating } from "@mui/material";
import { submitReview } from "../api/review";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

const MovieReviewAdd = ({ movieId, movieTitle, username }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [addReview, setAddReview] = useState(false);
  return (
    <>
      <div className="movie-reviews-create">
        <Button
          sx={{ mt: 5, mb: 5, borderRadius: "10px" }}
          color="error"
          variant="contained"
          className="nav-button"
          onClick={() => {
            setAddReview(!addReview);
          }}
        >
          {addReview ? "Naaah, next time maybe.." : "Add a review"}
        </Button>
        {addReview && (
          <Card className="movie-reviews-review">
            <Rating
              style={{ color: "rgba(164, 3, 34, 0.8)" }}
              name="customized-10"
              defaultValue={0}
              max={10}
              onChange={(e) => {
                setReviewRating(e.target.value);
              }}
            />
            <input
              className="input"
              name="review-title"
              id="review-title"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="review title"
            ></input>
            <textarea
              className="input"
              name="review-content"
              id="review-content"
              cols="30"
              rows="10"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="review text"
            ></textarea>
            <button
              className="review-button"
              onClick={() => {
                submitReview(
                  movieId,
                  movieTitle,
                  reviewTitle,
                  reviewContent,
                  reviewRating,
                  username
                );
              }}
            >
              Post my review!
            </button>
          </Card>
        )}
      </div>
    </>
  );
};

export default MovieReviewAdd;
