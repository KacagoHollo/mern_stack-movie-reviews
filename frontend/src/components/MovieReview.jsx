import React, { useState } from "react";
import { Rating } from "@mui/material";
import { deleteReview } from "../api/review";
import { patchReview } from "../api/review";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

const MovieReview = ({ review, loggedin }) => {
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [title, setTitle] = useState(review.title);
  const [content, setContent] = useState(review.content);

  console.log("REVIEW", review);
  const navigate = useNavigate();

  return (
    <Card className="movie-reviews-review">
      <p
        className="review-title-link"
        onClick={() => navigate(`/movie/?id=${review.movieId}`)}
      >
        {review.movieTitle}
      </p>
      <Rating
        name="customized-10"
        max={10}
        style={{ color: "rgba(164, 3, 34, 0.8)" }}
        value={editing ? rating : review.rating}
        readOnly={!editing}
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
      {editing ? (
        <>
          <input
            className="review-title input"
            name="review-title"
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <textarea
            className="review-content input"
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
          <h4 className="review-title">{review.title}</h4>
          <p className="review-content">{review.content}</p>
        </>
      )}

      <p>
        written by {review.username} on{" "}
        {review.timeStamp.slice(0, 10) + " " + review.timeStamp.slice(11, 16)}
      </p>

      {review.userId === loggedin.id && (
        <>
          <button
            className="review-button"
            onClick={() => {
              deleteReview(review._id);
            }}
          >
            Delete this post
          </button>
          <button
            className="review-button"
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
    </Card>
  );
};

export default MovieReview;
