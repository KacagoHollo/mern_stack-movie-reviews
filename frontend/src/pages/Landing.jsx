import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
// import message from "../components/message";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
const axios = require("axios");

const Landing = ({ server, domain, setDomain }) => {
  const navigate = useNavigate();

  let { query } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const testFetch = async () => {
    let resp = await axios.get(
      "https://api.themoviedb.org/3/search/movie?api_key=ecab10a318d6e5505711563709a6cd40&query=Jack+Reacher&append_to_response=videos"
    );
    console.log(resp.data);
  };

  let landingMovies = [];

  const landingFetch = async () => {
    const response = await axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=ecab10a318d6e5505711563709a6cd40&sort_by=popularity.desc&page=1"
      )
      .then((response) => {
        for (const movies of response.data.results) {
          const movie = {
            picture: "https://image.tmdb.org/t/p/original" + movies.poster_path,
            title: movies.title,
            release_date: movies.release_date,
            id: movies.id,
          };
          landingMovies.push(movie);
        }
      });
    setMovieList(landingMovies);
  };

  landingFetch();
      

  let searchingMovies = [];

  const searchFetch = async (query) => {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ecab10a318d6e5505711563709a6cd40&query=${searchQuery}`, 
      )
      .then((response) => {
        for (const moviesS of response.data.results) {
          const movieS = {
            picture:
              "https://image.tmdb.org/t/p/original" + moviesS.poster_path,
            title: moviesS.title,
            release_date: moviesS.release_date,
            id: moviesS.id,
          };
          searchingMovies.push(movieS);
        }
      });
    setSearchList(searchingMovies);
  };

 
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchQuery(e.target.value);
    }
  };

  useEffect(() => {
    
    searchFetch();
  }, [searchQuery]);


  return (
    <div>
      {/* <button onClick={() => testFetch()}>TEST</button>
      <button onClick={() => navigate("/movie")}>Movie</button> */}
      <main>
        <div className="search">
          <TextField
            variant="filled"
            autoFocus
            label="Find your movie!"
            color="error"
            placeholder="Search"
            type="text"
            value={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            maxLength="200"
          /> <Link to={`/search/${query}`}></Link>
          <Button
            size="medium"
            sx={{borderRadius: "10px" }}
            color='error'
            variant="contained"
            onClick={() => {
              searchFetch();
            }}
            disabled={searchQuery.length < 1}
          >
            Search
          </Button>
        </div>

        { searchQuery.length < 1 ?
        movieList.map((mov, i) => (
          <div key={i} className="movie-list">
            <img
              src={mov.picture}
              alt="f"
              onClick={() => navigate(`/movie/?id=${mov.id}`)}
            />
            <h2>{mov.title}</h2>
          </div>
        )) :
        searchList.map((mov, i) => (
          <div key={i} className="movie-list">
            <img
              src={mov.picture}
              alt="f"
              onClick={() => navigate(`/movie/?id=${mov.id}`)}
            />
            <h2>{mov.title}</h2>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Landing;
