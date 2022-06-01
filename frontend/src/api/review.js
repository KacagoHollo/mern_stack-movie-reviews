const axios = require("axios");

export const submitUsername = async (username) => {
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
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const submitReview = async (
  movieId,
  movieTitle,
  reviewTitle,
  reviewContent,
  reviewRating
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
      },
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );
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

export const getReviewByMovie = async (movieId) => {
  console.log("MOVIEID: ", movieId);
  try {
    const resp = await axios.get(
      `http://localhost:4000/api/review?movieId=${movieId}`
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
