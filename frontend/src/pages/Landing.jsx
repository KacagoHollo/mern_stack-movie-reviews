import React from "react";
import { useNavigate } from "react-router-dom";
import message from "../components/message";
const axios = require("axios");

const Landing = ({ server, domain, setDomain }) => {
  const navigate = useNavigate();

  const testFetch = async () => {
    let resp = await axios.get(
      "https://api.themoviedb.org/3/search/movie?api_key=ecab10a318d6e5505711563709a6cd40&query=la haine&page=1"
    );
    console.log(resp.data);
    //console.log(resp.data.results[0]);
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
    </div>
  );
};

export default Landing;
