const axios = require("axios");

//one movie by id main details
//"https://api.themoviedb.org/3/movie/406?api_key=ecab10a318d6e5505711563709a6cd40"
//one movie by id cast and crew
//"https://api.themoviedb.org/3/movie/406/credits?api_key=ecab10a318d6e5505711563709a6cd40"

export const movieDetails1 = async (movieId) => {
  try {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=ecab10a318d6e5505711563709a6cd40&append_to_response=videos`
    );
    return resp.data;
  } catch (err) {
    return null;
  }
};
export const movieDetails2 = async (movieId) => {
  try {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ecab10a318d6e5505711563709a6cd40`
    );
    return resp.data;
  } catch (err) {
    return null;
  }
};
