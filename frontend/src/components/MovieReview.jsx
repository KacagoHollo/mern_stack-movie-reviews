import React, { useState } from "react";
import { Rating } from "@mui/material";
import { deleteReview } from "../api/review";
import { patchReview } from "../api/review";
import Card from "@mui/material/Card";

const MovieReview = ({ review, loggedin }) => {
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [title, setTitle] = useState(review.title);
  const [content, setContent] = useState(review.content);

  /*   <Card sx={{ minWidth: 150 }} className="actor-card" key={i}>
    <CardMedia component="img" height="200" image={actorPic} alt="" />
    <CardContent>
      <p style={{ color: "whitesmoke" }}>{actor.name}</p>
      <p>{actor.character}</p>
    </CardContent>
  </Card>; */

  return (
    <Card className="movie-reviews-review">
      <p>{review.movieTitle}</p>
      <Rating
        name="customized-10"
        max={10}
        style={{ color: "rgba(164, 3, 34, 0.8)" }}
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
          <h4 className="review-title">{title}</h4>
          <p className="review-content">{content}</p>
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
