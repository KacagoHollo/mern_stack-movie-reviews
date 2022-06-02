import jwt_decode from "jwt-decode";
const axios = require("axios");

export const submitUsername = async (username) => {
  console.log("USERNAME: ", username);
  console.log("Token: ", sessionStorage.getItem("token"));
  try {
    const resp = await axios.patch(
      "http://localhost:4000/api/user",
      {
        username: username,
      },
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );
    console.log("NEW TOKEN:", resp.data);
    const decoded = await jwt_decode(resp.data);
    console.log("DECODE: ", decoded);
    sessionStorage.clear();
    sessionStorage.setItem("token", resp.data);
    window.location.reload();
    return resp.data;
  } catch (err) {
    console.log("ERROR:", err);
  }
};

export const submitReview = async (
  movieId,
  movieTitle,
  reviewTitle,
  reviewContent,
  reviewRating,
  username
) => {
  try {
    const resp = await axios.post(
      "http://localhost:4000/api/review",
      {
        movieId: movieId,
        movieTitle: movieTitle,
        title: reviewTitle,
        content: reviewContent,
        rating: reviewRating,
        username: username,
      },
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );
    window.location.reload();
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteReview = async (id) => {
  try {
    const resp = await axios.delete(`http://localhost:4000/api/review/${id}`, {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
    window.location.reload();
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
export const patchReview = async (
  id,
  movieId,
  content,
  rating,
  movieTitle,
  title,
  username
) => {
  try {
    const resp = await axios.patch(
      `http://localhost:4000/api/review/${id}`,
      {
        movieId: movieId,
        content: content,
        rating: rating,
        movieTitle: movieTitle,
        title: title,
        username: username,
      },
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );
    console.log("YAAAAAAAAAAAAAAY!!");
    window.location.reload();
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const getReviewByMovie = async ({
  movieId,
  reviewerId,
  movieTitle,
  reviewerName,
}) => {
  console.log("MOVIEID: ", movieId);
  try {
    const resp = await axios.get(
      `http://localhost:4000/api/review?movieId=${
        movieId ? movieId : ""
      }&movieTitle=${movieTitle ? movieTitle : ""}&reviewerId=${
        reviewerId ? reviewerId : ""
      }&reviewerName=${reviewerName ? reviewerName : ""}`
      /*      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      } */
    );
    console.log("FROM BACKEND: ", resp.data);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
