import React, { useState } from "react";
import { Rating } from "@mui/material";
import { deleteReview } from "../api/review";
import { patchReview } from "../api/review";

const MovieReview = ({ review, loggedin }) => {
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [title, setTitle] = useState(review.title);
  const [content, setContent] = useState(review.content);

  return (
    <div className="movie-reviews-review">
      <Rating
        name="customized-10"
        max={10}
        value={rating}
        readOnly={!editing}
        onChange={(e) => {
          setRating(e.target.value);
          console.log(rating);
        }}
      />
      {editing ? (
        <>
          <input
            name="review-title"
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <textarea
            name="review-content"
            id="review-content"
            cols="30"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </>
      ) : (
        <>
          <h4>{title}</h4>
          <p>{content}</p>
        </>
      )}

      <p>{review.username}</p>
      <p>{review.timeStamp}</p>
      {review.userId === loggedin.id && (
        <>
          <button
            onClick={() => {
              deleteReview(review._id);
              window.location.reload();
            }}
          >
            Delete this post
          </button>
          <button
            onClick={() => {
              setEditing(!editing);
              editing &&
                patchReview(
                  review._id,
                  review.movieId,
                  content,
                  rating,
                  review.movieTitle,
                  title,
                  review.username
                );
            }}
          >
            {editing ? "Submit changes" : "I've changed my oppinion"}
          </button>
        </>
      )}
    </div>
  );
};

export default MovieReview;
