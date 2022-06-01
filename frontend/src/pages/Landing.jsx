import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import message from "../components/message";
const axios = require("axios");

const Landing = ({ server, domain, setDomain }) => {
  const navigate = useNavigate();

  let { query } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    searchParam(query);
  }, [query]);

  const testFetch = async () => {
    let resp = await axios.get(
      "https://api.themoviedb.org/3/search/movie?api_key=ecab10a318d6e5505711563709a6cd40&query=Jack+Reacher&append_to_response=videos"
    );
    console.log(resp.data);
    //console.log(resp.data.results[0]);
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
          };
          landingMovies.push(movie);
        }
      });
    setMovieList(landingMovies);
    // console.log(movieList);
  };

  landingFetch();

  const searchParam = async (query) => {
    const param = {
      query: query,
    };
  };

  let searchingMovies = [];

  const searchFetch = async () => {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ecab10a318d6e5505711563709a6cd40`
        //{ param }
      )
      .then((response) => {
        for (const moviesS of response.data.results) {
          const movieS = {
            picture:
              "https://image.tmdb.org/t/p/original" + moviesS.poster_path,
            title: moviesS.title,
            release_date: moviesS.release_date,
          };
          searchingMovies.push(movieS);
        }
      });
    setSearchList(searchingMovies);
  };
  //one movie by id main details
  //"https://api.themoviedb.org/3/movie/406?api_key=ecab10a318d6e5505711563709a6cd40"
  //one movie by id cast and crew
  //"https://api.themoviedb.org/3/movie/406/credits?api_key=ecab10a318d6e5505711563709a6cd40"
  //default list
  //"https://api.themoviedb.org/3/discover/movie?api_key=ecab10a318d6e5505711563709a6cd40&sort_by=popularity.desc&page=1"

  /* const sendRequest = async (url) => {
		try {
			const res = await axios(`${server}${url}`, {
				headers: {
					authorization: sessionStorage.getItem("token"),
				},
			});
			setDomain(res.data);
		} catch (error) {
			if (!error.response) {
				message("Network error");
			} else if (error.response.status === 401) {
				message("Login expired.");
				sessionStorage.removeItem("token");
				setDomain("");
				navigate("/login");
			} else {
				message("Hiba");
			}
		}
	}; */

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchParam(e.target.value);
    }
  };

  return (
    <div>
      <button onClick={() => testFetch()}>TEST</button>
      {/*       <img
        src="https://image.tmdb.org/t/p/original/bW4tXG8kZ89ZCurPnzDDSzJbeF5.jpg"
        alt="movie pic"
      />
      <img
        src="https://image.tmdb.org/t/p/original/kuxI08YpwQFGweIXK7TELknwexr.jpg"
        alt="saiid pic"
      /> */}
      <button onClick={() => navigate("/movie")}>Movie</button>
      {/* <button onClick={() => landingFetch()}>Landing</button> */}
      <main>
        <div className="search">
          <input
            placeholder="Search"
            type="text"
            defaultValue={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            maxLength="200"
          />
          <button
            onClick={() => {
              setSearchQuery("");
            }}
            // disabled={query.length < 1}
          >
            Search
          </button>
        </div>

        {movieList.map((mov, i) => (
          <div key={i} className="movie-list">
            <img src={mov.picture} alt="f" />
            {/* <Link to={`/Movie/${movg.id}`}>
                <img src={mov.picture} alt="A" /> */}
            <h2>{mov.title}</h2>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Landing;
