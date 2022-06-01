import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import message from "../components/message";
const axios = require("axios");

const Landing = ({ server, domain, setDomain }) => {
  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([])

  const testFetch = async () => {
    let resp = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=ecab10a318d6e5505711563709a6cd40&sort_by=popularity.desc&page=1"
    );
    console.log(resp.data.results);
    //console.log(resp.data.results[0]);
  };

  let landingMovies = []

  const landingFetch = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=ecab10a318d6e5505711563709a6cd40&sort_by=popularity.desc&page=1")
    .then((response) => {
      for (const movies of response.data.results) {
        const movie = {
          picture: "https://image.tmdb.org/t/p/original" + movies.poster_path,
          title: movies.title,
          release_date: movies.release_date
        }
        landingMovies.push(movie)
      }
    })
    setMovieList(landingMovies)
    // console.log(movieList);
  }

  landingFetch()
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
      {movieList.map((mov, i) => (
        <div key={i} className="movie-list">
          <img src={mov.picture} alt="fuck"/>
          {/* <Link to={`/Movie/${movg.id}`}>
              <img src={mov.picture} alt="Anyád" /> */}
          <h2>{mov.title}</h2>
        </div>
      ))}
      </main>
    </div>
  );
};

export default Landing;
