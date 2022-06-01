import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const MovieReviews = ({ movieId }) => {
  const [loggedin, setLoggedin] = useState(false);

  const isLoggedIn = async () => {
    const token = sessionStorage.getItem("token");
    const decoded = await jwt_decode(token);
    console.log("USER-INFO: ", decoded);
    decoded ? setLoggedin(true) : setLoggedin(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return <div>{loggedin ? "LOGGED-IN" : "NOT-LOOGGED-IN"}</div>;
};

export default MovieReviews;
