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
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
export const submitReview = async (movieId, content, rating) => {
  try {
    const resp = await axios.post(
      "http://localhost:4000/api/review",
      {
        movieId: movieId,
        content: content,
        rating: rating,
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

export const getReviewByMovie = async (movieId) => {
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
